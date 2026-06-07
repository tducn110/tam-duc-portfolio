import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── SHADER FOR THE FLUID NEON AURORA BACKGROUND ──────────────────────────────────
const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Moving coordinate waves for fluid-like behavior
    float wave1 = sin(uv.x * 2.5 + uTime * 0.25) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 2.0 - uTime * 0.3) * 0.5 + 0.5;
    float wave3 = sin((uv.x + uv.y) * 1.5 + uTime * 0.4) * 0.5 + 0.5;

    // Slow organic blending color variables
    vec3 col1 = vec3(0.28, 0.12, 0.58); // Cosmic Indigo
    vec3 col2 = vec3(0.03, 0.42, 0.38); // Deep Cyber Teal
    vec3 col3 = vec3(0.55, 0.22, 0.85); // Electric Violet
    vec3 col4 = vec3(0.04, 0.04, 0.06); // Dark Deep Space

    // Blend fluid blobs together
    vec3 finalCol = mix(col4, col1, wave1 * 0.45);
    finalCol = mix(finalCol, col2, wave2 * 0.35);
    finalCol = mix(finalCol, col3, wave3 * 0.25);

    // Dynamic light bleed from mouse position
    float distToMouse = distance(uv, uMouse);
    float mouseGlow = smoothstep(0.45, 0.0, distToMouse) * 0.22;
    finalCol += vec3(0.68, 0.31, 1.0) * mouseGlow;

    // Outer vignette for cinematic contrast
    float vignette = uv.x * (1.0 - uv.x) * uv.y * (1.0 - uv.y) * 16.0;
    finalCol *= clamp(vignette, 0.08, 1.0);

    gl_FragColor = vec4(finalCol, 1.0);
  }
`;

// ─── SHADER FOR THE 3D PERSPECTIVE CYBERNETIC GRID ────────────────────────────────
const gridVertexShader = `
  uniform float uScroll;
  varying vec3 vWorldPosition;
  void main() {
    vec3 pos = position;
    // Animate grid lines backward/forward based on page scroll speed
    pos.y += uScroll * 45.0;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const gridFragmentShader = `
  uniform vec3 uGridColor;
  uniform float uTime;
  varying vec3 vWorldPosition;

  void main() {
    // Determine line grid spacing
    float coordX = vWorldPosition.x;
    float coordY = vWorldPosition.y;

    float gridX = abs(fract(coordX / 25.0 - 0.5) - 0.5) / 0.015;
    float gridY = abs(fract(coordY / 25.0 - 0.5) - 0.5) / 0.015;

    float line = min(gridX, gridY);
    float gridPattern = 1.0 - min(line, 1.0);

    // Smooth fading depth projection to grid horizon
    float distToCamera = distance(vWorldPosition, vec3(0.0, -25.0, 100.0));
    float fade = smoothstep(320.0, 60.0, distToCamera);

    // Subtle neon glow pulsing
    vec3 glowColor = uGridColor * (1.0 + 0.4 * sin(uTime * 1.8));
    gl_FragColor = vec4(glowColor, gridPattern * fade * 0.22);
  }
`;

// ─── SHADER FOR GLOWING STAR PARTICLES ────────────────────────────────────────────
const starVertexShader = `
  uniform float uTime;
  attribute float aSpeed;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec3 pos = position;
    
    // Wave motion for dynamic cosmic breathing effect
    pos.x += sin(uTime * aSpeed + position.y * 0.01) * 3.0;
    pos.y += cos(uTime * aSpeed * 0.8 + position.x * 0.01) * 3.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (14.0 / -mvPosition.z) * (1.0 + 0.35 * sin(uTime * 1.5 + position.x * 0.05));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.15, dist) * 0.8;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090909, 0.0125);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 95);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x090909, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    // ─── 1. Fluid Aurora Background Mesh ──────────────────────────────
    const bgUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };

    const bgGeometry = new THREE.PlaneGeometry(2, 2);
    const bgMaterial = new THREE.ShaderMaterial({
      vertexShader: auroraVertexShader,
      fragmentShader: auroraFragmentShader,
      uniforms: bgUniforms,
      depthWrite: false,
      depthTest: false,
    });

    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // ─── 2. Interactive Infinite 3D Grid Floor ───────────────────────
    const gridUniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uGridColor: { value: new THREE.Color("#af50ff") }, // Cosmic Violet grid
    };

    const gridGeometry = new THREE.PlaneGeometry(500, 500, 20, 20);
    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: gridVertexShader,
      fragmentShader: gridFragmentShader,
      uniforms: gridUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const gridMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    gridMesh.rotation.x = -Math.PI / 2; // Lie flat horizontally
    gridMesh.position.y = -35;          // Position below layout elements
    gridMesh.position.z = 20;
    scene.add(gridMesh);

    // ─── 3. Breathing Star Particles (Nebula) ─────────────────────────
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 180 : 520;

    const starGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0xaf50ff), // Cosmic Violet
      new THREE.Color(0x0d9488), // Teal
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0xa78bfa), // Lilac
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 450;
      positions[idx + 1] = (Math.random() - 0.5) * 450;
      positions[idx + 2] = (Math.random() - 0.5) * 450;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;

      speeds[i] = 0.3 + Math.random() * 1.7;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

    const starUniforms = {
      uTime: { value: 0 },
    };

    const starMaterial = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: starUniforms,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    // ─── Scroll & Mouse listeners ──────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Norm coordinates [-1 to 1] for camera offset
      mouseX = (event.clientX - window.innerWidth / 2) * 0.035;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.035;

      // Norm coordinates [0 to 1] for fluid background light bleed
      bgUniforms.uMouse.value.x = event.clientX / window.innerWidth;
      bgUniforms.uMouse.value.y = 1.0 - event.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Link scroll percentage to grid speed & camera vertical pivot
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,
      onUpdate: (self) => {
        gridUniforms.uScroll.value = self.progress;
      }
    });

    // Subtly rotate the grid plane and stars on scroll for layered depth
    const starfieldScroll = gsap.to(starfield.rotation, {
      y: Math.PI * 0.8,
      z: Math.PI * 0.25,
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // ─── Rendering Loop ───────────────────────────────────────────────
    let animationFrameId = 0;
    let lastRender = 0;
    let hidden = document.hidden;
    const targetFrameMs = 1000 / 30;

    const handleVisibility = () => {
      hidden = document.hidden;
      if (!hidden) lastRender = 0;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const animate = (now = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      if (hidden || now - lastRender < targetFrameMs) return;
      lastRender = now;

      const elapsedTime = now / 1000;
      bgUniforms.uTime.value = elapsedTime;
      gridUniforms.uTime.value = elapsedTime;
      starUniforms.uTime.value = elapsedTime;

      // Slow orbital rotate
      starfield.rotation.y += 0.0002;
      starfield.rotation.x += 0.0001;

      // Smooth camera interpolation (inertia)
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      camera.position.x = targetX;
      camera.position.y = -targetY + (camera.position.y - -targetY) * 0.93;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      scrollTrigger.kill();
      starfieldScroll.scrollTrigger?.kill();

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      bgGeometry.dispose();
      bgMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 h-full w-full pointer-events-none z-[4] opacity-[1]"
    />
  );
}
