import { RefObject, useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createFlightSceneTimeline } from "./sceneTimeline";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

interface ScrollSceneCanvasProps {
  triggerRef: RefObject<HTMLElement>;
  disabled?: boolean;
}

const COLORS = {
  base: 0x090909,
  violet: 0xaf50ff,
  cosmic: 0x6c4bd6,
  whisper: 0xf7f9fa,
  metal: 0x15151d,
};

export function ScrollSceneCanvas({ triggerRef, disabled = false }: ScrollSceneCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled || !containerRef.current || !triggerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.base, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      120
    );
    camera.position.set(0, 0.1, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(COLORS.base, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const trackGeometry = <T extends THREE.BufferGeometry>(geometry: T) => {
      geometries.push(geometry);
      return geometry;
    };
    const trackMaterial = <T extends THREE.Material>(material: T) => {
      materials.push(material);
      return material;
    };

    const ambient = new THREE.AmbientLight(0x686078, 0.4);
    scene.add(ambient);
    
    // Key light (white-purple from top right)
    const keyLight = new THREE.DirectionalLight(0xebd1ff, 2.8);
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);
    
    // Rim light (purple behind)
    const rimLight = new THREE.PointLight(0x9d00ff, 6.0, 15, 1.2);
    rimLight.position.set(-3, 1.5, -4);
    scene.add(rimLight);
    
    // Soft fill (weak left)
    const fillLight = new THREE.DirectionalLight(0x7e8eb5, 0.8);
    fillLight.position.set(-5, 0, 2);
    scene.add(fillLight);

    const ship = new THREE.Group();
    ship.position.set(2.15, 0, 0);
    scene.add(ship);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load("/data_capsule.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.75, 0.75, 0.75);
      
      model.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          trackGeometry(child.geometry);
          if (Array.isArray(child.material)) {
            child.material.forEach(m => trackMaterial(m));
          } else if (child.material) {
            trackMaterial(child.material);
          }
        }
      });
      ship.add(model);
    });

    const rings = new THREE.Group();
    scene.add(rings);
    [1.8, 2.55, 3.3].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(radius, 0.008, 8, 140)),
        trackMaterial(
          new THREE.MeshBasicMaterial({
            color: index === 1 ? COLORS.violet : COLORS.cosmic,
            transparent: true,
            opacity: 0.18 - index * 0.03,
          })
        )
      );
      ring.rotation.x = Math.PI / 2 + index * 0.18;
      ring.rotation.y = index * 0.45;
      rings.add(ring);
    });

    const starCount = 360;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    const colorA = new THREE.Color(COLORS.violet);
    const colorB = new THREE.Color(COLORS.whisper);
    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 18;
      positions[idx + 1] = (Math.random() - 0.5) * 12;
      positions[idx + 2] = -Math.random() * 28;

      const color = i % 4 === 0 ? colorB : colorA;
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    }

    const starGeometry = trackGeometry(new THREE.BufferGeometry());
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const starMaterial = trackMaterial(
      new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const flightTimeline = createFlightSceneTimeline({ camera, ship, rings, stars });
    const scrollTrigger = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top top",
      end: "+=260%",
      scrub: 1,
      pin: true,
      pinType: "transform",
      anticipatePin: 1,
      animation: flightTimeline,
      invalidateOnRefresh: true,
    });
    
    // Post-processing Bloom
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.2, // strength
      0.6, // radius
      0.6  // threshold
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const copyItems = gsap.utils.toArray<HTMLElement>(
      triggerRef.current.querySelectorAll(".flight-copy")
    );
    gsap.set(copyItems, { autoAlpha: 0, y: 34, filter: "blur(12px)" });
    gsap.set(copyItems[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" });

    const copyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=260%",
        scrub: 0.8,
      },
    });

    copyItems.forEach((item, index) => {
      if (index === 0) {
        copyTimeline.to({}, { duration: 0.5 });
        return;
      }

      copyTimeline
        .to(copyItems[index - 1], {
          autoAlpha: 0,
          y: -28,
          filter: "blur(12px)",
          duration: 0.32,
          ease: "power2.inOut",
        })
        .fromTo(
          item,
          { autoAlpha: 0, y: 34, filter: "blur(12px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.42, ease: "power3.out" },
          ">-=0.02"
        )
        .to({}, { duration: 0.44 });
    });

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.25;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.18;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = container.clientWidth / Math.max(container.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frame = 0;
    let hidden = document.hidden;
    const handleVisibility = () => {
      hidden = document.hidden;
      if (!hidden) frame = requestAnimationFrame(animate);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    function animate() {
      if (hidden) return;
      frame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      ship.position.y += Math.sin(elapsed * 1.2) * 0.0009;
      ship.rotation.x += (mouseY - ship.rotation.x) * 0.025;
      ship.rotation.z += (mouseX - ship.rotation.z) * 0.025;
      rings.rotation.z += 0.0014;
      stars.position.z = (elapsed * 0.7) % 4;
      camera.lookAt(0, 0, 0);
      composer.render();
    }
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      scrollTrigger.kill();
      copyTimeline.scrollTrigger?.kill();
      copyTimeline.kill();
      flightTimeline.kill();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      composer.dispose();
      renderer.dispose();
    };
  }, [disabled, triggerRef]);

  return <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true" />;
}
