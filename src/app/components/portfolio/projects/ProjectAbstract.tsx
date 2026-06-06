import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import type { AbstractVariant } from "@/features/portfolio/data/portfolio.data";

function Bars({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(time * 2 + i) * 0.5;
      child.rotation.x = time * 0.5 + i;
      child.rotation.y = time * 0.3 + i;
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[(i - 2) * 0.5, 0, 0]}>
          <boxGeometry args={[0.2, 1.5, 0.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function Dots({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.z = time * 0.5;
    group.current.children.forEach((child, i) => {
      child.position.y = Math.sin(time * 3 + i * 2) * 0.4;
    });
  });

  return (
    <group ref={group}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.8, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={2} distort={0.4} speed={4} />
        </mesh>
      ))}
    </group>
  );
}

function Grid({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    const time = state.clock.elapsedTime;
    group.current.rotation.y = time * 0.2;
    group.current.rotation.x = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group ref={group}>
      {[-0.6, 0.6].map((x) =>
        [-0.6, 0.6].map((y) =>
          [-0.6, 0.6].map((z) => (
            <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} wireframe />
            </mesh>
          ))
        )
      )}
    </group>
  );
}

function Rune({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.5;
      meshRef.current.rotation.x = time * 0.3;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -time * 0.4;
      wireRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} transparent opacity={0.4} roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh ref={wireRef} scale={1.2}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} wireframe />
      </mesh>
    </group>
  );
}

const variants = {
  bars: Bars,
  dots: Dots,
  grid: Grid,
  rune: Rune,
};

export function ProjectAbstract({ variant, color }: { variant: AbstractVariant; color: string }) {
  const Component = variants[variant] || Rune;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden rounded-full mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Float speed={2.5} rotationIntensity={0.5} floatIntensity={2}>
            <Component color={color} />
          </Float>
          <Sparkles count={40} scale={4} size={2} speed={0.4} opacity={0.6} color={color} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
