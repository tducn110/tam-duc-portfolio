import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const COLORS = {
  base: 0x090909,
  tubeBody: 0x111115,
  tubeMetal: 0x1a1a22,
  accent: 0xaf50ff,
  cosmic: 0x6c4bd6,
  chrome: 0x2a2a35,
  ringHighlight: 0x3d3d4a,
  eyepiece: 0x0e0e14,
  tripod: 0x18181f,
};

export function RefractorScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // ─── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(COLORS.base, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // ─── Scene & Camera ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(COLORS.base, 0.012);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(6, 3.5, 10);
    camera.lookAt(0, 0.5, 0);

    // ─── Disposable registry ─────────────────────────────────────────────
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const createGeometry = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };

    const createMaterial = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    // ─── TELESCOPE GROUP ─────────────────────────────────────────────────
    const telescopeGroup = new THREE.Group();
    scene.add(telescopeGroup);

    // Slight initial tilt to show it at a heroic angle
    telescopeGroup.rotation.x = -0.15;
    telescopeGroup.rotation.z = 0.05;

    // ─── 1. MAIN TUBE BODY ───────────────────────────────────────────────
    const tubeGeo = createGeometry(new THREE.CylinderGeometry(0.42, 0.48, 5.0, 32));
    const tubeMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.tubeBody,
        metalness: 0.85,
        roughness: 0.2,
      })
    );
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    tubeMesh.rotation.z = Math.PI / 2; // Lay tube horizontal
    tubeMesh.position.set(0, 1.8, 0);
    telescopeGroup.add(tubeMesh);

    // ─── 2. DECORATIVE TUBE RINGS ────────────────────────────────────────
    const ringPositions = [-1.8, -0.6, 0.6, 1.8];
    ringPositions.forEach((xPos) => {
      const ringGeo = createGeometry(new THREE.TorusGeometry(0.5, 0.035, 8, 32));
      const ringMat = createMaterial(
        new THREE.MeshStandardMaterial({
          color: COLORS.ringHighlight,
          metalness: 0.95,
          roughness: 0.15,
        })
      );
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(xPos, 1.8, 0);
      ring.rotation.y = Math.PI / 2;
      telescopeGroup.add(ring);
    });

    // ─── 3. LENS HOOD (Truncated Cone / Dew Shield) ──────────────────────
    const hoodGeo = createGeometry(new THREE.CylinderGeometry(0.58, 0.48, 1.0, 32));
    const hoodMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.tubeMetal,
        metalness: 0.9,
        roughness: 0.15,
      })
    );
    const hoodMesh = new THREE.Mesh(hoodGeo, hoodMat);
    hoodMesh.rotation.z = Math.PI / 2;
    hoodMesh.position.set(3.0, 1.8, 0);
    telescopeGroup.add(hoodMesh);

    // ─── 4. OBJECTIVE LENS (Emissive Violet Glow) ────────────────────────
    const lensGeo = createGeometry(new THREE.CircleGeometry(0.52, 32));
    const lensMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.cosmic,
        emissive: COLORS.accent,
        emissiveIntensity: 0.6,
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
      })
    );
    const lensMesh = new THREE.Mesh(lensGeo, lensMat);
    lensMesh.position.set(3.5, 1.8, 0);
    lensMesh.rotation.y = Math.PI / 2;
    telescopeGroup.add(lensMesh);

    // Inner lens ring for depth
    const lensRingGeo = createGeometry(new THREE.TorusGeometry(0.53, 0.025, 8, 32));
    const lensRingMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.chrome,
        metalness: 0.95,
        roughness: 0.1,
      })
    );
    const lensRing = new THREE.Mesh(lensRingGeo, lensRingMat);
    lensRing.position.set(3.5, 1.8, 0);
    lensRing.rotation.y = Math.PI / 2;
    telescopeGroup.add(lensRing);

    // ─── 5. FOCUSER DRAWTUBE ─────────────────────────────────────────────
    const focuserGeo = createGeometry(new THREE.CylinderGeometry(0.3, 0.35, 1.2, 24));
    const focuserMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.chrome,
        metalness: 0.9,
        roughness: 0.18,
      })
    );
    const focuser = new THREE.Mesh(focuserGeo, focuserMat);
    focuser.rotation.z = Math.PI / 2;
    focuser.position.set(-3.1, 1.8, 0);
    telescopeGroup.add(focuser);

    // Focuser knob
    const knobGeo = createGeometry(new THREE.CylinderGeometry(0.15, 0.15, 0.35, 16));
    const knobMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.ringHighlight,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const knob = new THREE.Mesh(knobGeo, knobMat);
    knob.position.set(-2.8, 1.8, 0.4);
    telescopeGroup.add(knob);

    // ─── 6. EYEPIECE ────────────────────────────────────────────────────
    const eyepieceBodyGeo = createGeometry(
      new THREE.CylinderGeometry(0.2, 0.18, 0.8, 16)
    );
    const eyepieceBodyMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.eyepiece,
        metalness: 0.85,
        roughness: 0.2,
      })
    );
    const eyepieceBody = new THREE.Mesh(eyepieceBodyGeo, eyepieceBodyMat);
    eyepieceBody.rotation.z = Math.PI / 2;
    eyepieceBody.position.set(-3.9, 1.8, 0);
    telescopeGroup.add(eyepieceBody);

    // Eyepiece eye-relief sphere
    const eyeSphereGeo = createGeometry(new THREE.SphereGeometry(0.12, 16, 16));
    const eyeSphereMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.cosmic,
        emissive: COLORS.cosmic,
        emissiveIntensity: 0.35,
        metalness: 0.6,
        roughness: 0.15,
      })
    );
    const eyeSphere = new THREE.Mesh(eyeSphereGeo, eyeSphereMat);
    eyeSphere.position.set(-4.3, 1.8, 0);
    telescopeGroup.add(eyeSphere);

    // ─── 7. FINDER SCOPE (small tube on top) ─────────────────────────────
    const finderGeo = createGeometry(new THREE.CylinderGeometry(0.08, 0.1, 1.8, 12));
    const finderMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.tubeMetal,
        metalness: 0.85,
        roughness: 0.2,
      })
    );
    const finder = new THREE.Mesh(finderGeo, finderMat);
    finder.rotation.z = Math.PI / 2;
    finder.position.set(0.5, 2.55, 0);
    telescopeGroup.add(finder);

    // Finder scope bracket/mount rings
    [-0.3, 0.3].forEach((offset) => {
      const bracketGeo = createGeometry(new THREE.TorusGeometry(0.12, 0.02, 6, 16));
      const bracketMat = createMaterial(
        new THREE.MeshStandardMaterial({
          color: COLORS.chrome,
          metalness: 0.95,
          roughness: 0.1,
        })
      );
      const bracket = new THREE.Mesh(bracketGeo, bracketMat);
      bracket.position.set(0.5 + offset, 2.55, 0);
      bracket.rotation.y = Math.PI / 2;
      telescopeGroup.add(bracket);

      // Bracket strut connecting to main tube
      const strutGeo = createGeometry(
        new THREE.CylinderGeometry(0.02, 0.02, 0.32, 6)
      );
      const strutMat = createMaterial(
        new THREE.MeshStandardMaterial({
          color: COLORS.chrome,
          metalness: 0.9,
          roughness: 0.2,
        })
      );
      const strut = new THREE.Mesh(strutGeo, strutMat);
      strut.position.set(0.5 + offset, 2.3, 0);
      telescopeGroup.add(strut);
    });

    // ─── 8. MOUNT HEAD (Alt-Az block) ────────────────────────────────────
    const mountHeadGeo = createGeometry(
      new THREE.BoxGeometry(0.7, 0.35, 0.7)
    );
    const mountHeadMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.tubeMetal,
        metalness: 0.9,
        roughness: 0.15,
      })
    );
    const mountHead = new THREE.Mesh(mountHeadGeo, mountHeadMat);
    mountHead.position.set(0, 1.35, 0);
    telescopeGroup.add(mountHead);

    // Mount connector cylinder
    const mountConnGeo = createGeometry(
      new THREE.CylinderGeometry(0.12, 0.15, 0.3, 12)
    );
    const mountConnMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.chrome,
        metalness: 0.9,
        roughness: 0.2,
      })
    );
    const mountConn = new THREE.Mesh(mountConnGeo, mountConnMat);
    mountConn.position.set(0, 1.1, 0);
    telescopeGroup.add(mountConn);

    // ─── 9. TRIPOD ──────────────────────────────────────────────────────
    const tripodSpread = 1.8;
    const tripodHeight = 3.2;
    const tripodTopY = 0.95;
    const tripodAngles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];

    tripodAngles.forEach((angle) => {
      const legX = Math.sin(angle) * tripodSpread;
      const legZ = Math.cos(angle) * tripodSpread;

      const legLength = Math.sqrt(
        tripodSpread * tripodSpread + tripodHeight * tripodHeight
      );

      const legGeo = createGeometry(
        new THREE.CylinderGeometry(0.04, 0.05, legLength, 8)
      );
      const legMat = createMaterial(
        new THREE.MeshStandardMaterial({
          color: COLORS.tripod,
          metalness: 0.85,
          roughness: 0.25,
        })
      );
      const leg = new THREE.Mesh(legGeo, legMat);

      // Position at midpoint between top joint and ground
      leg.position.set(legX / 2, tripodTopY - tripodHeight / 2, legZ / 2);

      // Point leg from top to ground endpoint
      const from = new THREE.Vector3(0, tripodTopY, 0);
      const to = new THREE.Vector3(legX, tripodTopY - tripodHeight, legZ);
      const dir = to.clone().sub(from).normalize();
      const axis = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(axis, dir);
      leg.setRotationFromQuaternion(quat);

      telescopeGroup.add(leg);

      // Rubber foot cap
      const footGeo = createGeometry(new THREE.SphereGeometry(0.07, 8, 8));
      const footMat = createMaterial(
        new THREE.MeshStandardMaterial({
          color: 0x0a0a0a,
          metalness: 0.3,
          roughness: 0.8,
        })
      );
      const foot = new THREE.Mesh(footGeo, footMat);
      foot.position.set(legX, tripodTopY - tripodHeight, legZ);
      telescopeGroup.add(foot);
    });

    // Tripod center hub
    const hubGeo = createGeometry(new THREE.SphereGeometry(0.14, 12, 12));
    const hubMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.chrome,
        metalness: 0.9,
        roughness: 0.15,
      })
    );
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.position.set(0, tripodTopY, 0);
    telescopeGroup.add(hub);

    // Tripod accessory tray (thin disc between legs)
    const trayGeo = createGeometry(new THREE.CylinderGeometry(0.8, 0.8, 0.04, 24));
    const trayMat = createMaterial(
      new THREE.MeshStandardMaterial({
        color: COLORS.tubeMetal,
        metalness: 0.8,
        roughness: 0.3,
      })
    );
    const tray = new THREE.Mesh(trayGeo, trayMat);
    tray.position.set(0, tripodTopY - tripodHeight * 0.5, 0);
    telescopeGroup.add(tray);

    // ─── 10. LIGHTING ────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x444455, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xeeeeff, 1.2);
    dirLight.position.set(5, 8, 6);
    dirLight.castShadow = false;
    scene.add(dirLight);

    // Secondary fill light from the opposite side for rim lighting
    const fillLight = new THREE.DirectionalLight(0x8866aa, 0.4);
    fillLight.position.set(-5, 2, -4);
    scene.add(fillLight);

    // Violet point light near the lens for glowing effect
    const lensGlow = new THREE.PointLight(COLORS.accent, 2.5, 8, 1.8);
    lensGlow.position.set(3.8, 1.8, 0);
    telescopeGroup.add(lensGlow);

    // Subtle cosmic backlight
    const backGlow = new THREE.PointLight(COLORS.cosmic, 1.0, 12, 2);
    backGlow.position.set(-4, 2, -2);
    telescopeGroup.add(backGlow);

    // ─── MOUSE PARALLAX ──────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // ─── GSAP SCROLL TRIGGER ─────────────────────────────────────────────
    const scrollState = { progress: 0 };

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      end: "bottom 20%",
      scrub: 1.5,
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    // Scroll-driven telescope tilt animation
    const scrollAnim = gsap.to(telescopeGroup.rotation, {
      x: -0.5,
      y: Math.PI * 0.6,
      z: 0.1,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
      },
    });

    // Scroll-driven camera zoom
    const cameraScrollAnim = gsap.to(camera.position, {
      x: 4,
      y: 2,
      z: 8,
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 2,
      },
    });

    // ─── RESIZE HANDLER ──────────────────────────────────────────────────
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // ─── ANIMATION LOOP ──────────────────────────────────────────────────
    let animFrameId = 0;
    let running = false;
    let inViewport = false;
    let hidden = document.hidden;
    const clock = new THREE.Clock();

    const stopAnimation = () => {
      running = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      animFrameId = 0;
    };

    const startAnimation = () => {
      if (running || hidden || !inViewport) return;
      running = true;
      animFrameId = requestAnimationFrame(animate);
    };

    const handleVisibility = () => {
      hidden = document.hidden;
      if (hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        inViewport = entry.isIntersecting;
        if (inViewport) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: "240px" }
    );
    viewportObserver.observe(container);

    function animate() {
      if (hidden || !inViewport) {
        running = false;
        return;
      }
      animFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Auto-rotation (slow)
      telescopeGroup.rotation.y += 0.0015;

      // Mouse parallax with inertia
      targetRotY += (mouseX * 0.12 - targetRotY) * 0.04;
      targetRotX += (mouseY * 0.06 - targetRotX) * 0.04;

      telescopeGroup.rotation.y += targetRotY * 0.01;
      telescopeGroup.rotation.x += targetRotX * 0.01;

      // Lens emissive pulsing
      (lensMat as THREE.MeshStandardMaterial).emissiveIntensity =
        0.4 + Math.sin(elapsed * 1.5) * 0.25;

      // Lens glow light pulsing
      lensGlow.intensity = 2.0 + Math.sin(elapsed * 2.0) * 0.8;

      // Eyepiece subtle pulse
      (eyeSphereMat as THREE.MeshStandardMaterial).emissiveIntensity =
        0.2 + Math.sin(elapsed * 1.2 + 1.0) * 0.15;

      camera.lookAt(0, 0.5, 0);
      renderer.render(scene, camera);
    }

    startAnimation();

    // ─── CLEANUP ─────────────────────────────────────────────────────────
    return () => {
      stopAnimation();
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      scrollTrigger.kill();
      scrollAnim.scrollTrigger?.kill();
      cameraScrollAnim.scrollTrigger?.kill();

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[500px] md:h-[600px] relative"
    />
  );
}
