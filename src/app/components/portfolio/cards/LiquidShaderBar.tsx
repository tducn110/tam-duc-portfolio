import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { type ColorKey } from "@/shared/lib/tokens";

const fragmentShader = `
uniform float uTime;
uniform float uFill;
uniform vec3 uColor;
uniform vec3 uBgColor;
varying vec2 vUv;

// Simplex noise function
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Calculate noise to distort the fill boundary
  float noise1 = snoise(vec2(uv.y * 5.0, uTime * 1.5)) * 0.05;
  float noise2 = snoise(vec2(uv.x * 2.0, uTime * 2.0)) * 0.03;
  
  // Create a wavy boundary
  float wave = sin(uv.y * 10.0 + uTime * 3.0) * 0.02;
  float boundary = uFill + noise1 + noise2 + wave;
  
  // Smoothstep for anti-aliased edge
  float fillMask = smoothstep(boundary + 0.02, boundary - 0.02, uv.x);
  
  // Add some glowing "bubbles" or "energy" inside the filled area
  float bubbleNoise = snoise(vec2(uv.x * 10.0 + uTime, uv.y * 20.0 - uTime * 2.0));
  float bubbleMask = smoothstep(0.4, 0.8, bubbleNoise) * fillMask * 0.5;
  
  // Edge highlight
  float edgeMask = smoothstep(boundary + 0.05, boundary, uv.x) - smoothstep(boundary, boundary - 0.05, uv.x);
  edgeMask *= 0.8;
  
  // Final color mixing
  vec3 finalColor = mix(uBgColor, uColor, fillMask);
  finalColor += uColor * bubbleMask; // Add bubbles
  finalColor += vec3(1.0) * edgeMask; // Add bright edge
  
  // Ensure background is transparent
  float alpha = fillMask > 0.0 ? 1.0 : 0.3;
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

function LiquidPlane({ targetFill, colorHex, isExploring }: { targetFill: number, colorHex: string, isExploring: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const color = useMemo(() => new THREE.Color(colorHex), [colorHex]);
  const bgColor = useMemo(() => new THREE.Color("#161128"), []); // whisper/10 approx

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      
      // Animate fill smoothly from 0 to targetFill
      const currentFill = materialRef.current.uniforms.uFill.value;
      if (currentFill < targetFill) {
        materialRef.current.uniforms.uFill.value += (targetFill - currentFill) * 0.05;
      }
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uFill: { value: 0.0 },
      uColor: { value: color },
      uBgColor: { value: bgColor },
    }),
    [color, bgColor]
  );

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export function LiquidShaderBar({ dots, color, isExploring }: { dots: number, color: ColorKey, isExploring: boolean }) {
  const fillRatio = dots / 5;
  // Map our ColorKey to a hex approximation for the shader
  const hexMap: Record<ColorKey, string> = {
    violet: "#af50ff",
    cosmic: "#6c4bd6",
    mauve: "#d6b4fc",
    steel: "#8b949e",
    slate: "#6e7681",
    indigo: "#6366f1",
    teal: "#14b8a6",
    amber: "#f59e0b",
    rose: "#f43f5e",
    whisper: "#f7f9fa",
    amethyst: "#af50ff",
    sky: "#6c4bd6"
  };
  const hexColor = hexMap[color] || "#af50ff";

  return (
    <div className="w-full h-2 rounded-full overflow-hidden relative shadow-inner" style={{ background: "rgba(255,255,255,0.05)" }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 100 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true, antialias: false }}
      >
        <LiquidPlane targetFill={fillRatio} colorHex={hexColor} isExploring={isExploring} />
      </Canvas>
    </div>
  );
}
