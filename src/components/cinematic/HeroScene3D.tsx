"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function FloatingCore() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial color="#3978E8" wireframe transparent opacity={0.32} />
      </mesh>
    </Float>
  );
}

function FloatingRing() {
  return (
    <Float speed={0.75} rotationIntensity={0.2} floatIntensity={0.35}>
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.35, 0.018, 12, 64]} />
        <meshStandardMaterial color="#9EADBF" transparent opacity={0.45} />
      </mesh>
    </Float>
  );
}

export function HeroScene3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-60" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 4, 4]} intensity={0.85} color="#F4F6F8" />
        <pointLight position={[-3, 2, 2]} intensity={0.45} color="#F07832" />
        <FloatingCore />
        <FloatingRing />
      </Canvas>
    </div>
  );
}
