"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function FloatingCore() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <Float speed={0.85} rotationIntensity={0.2} floatIntensity={0.36}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial color="#7BA8F5" wireframe transparent opacity={0.7} depthWrite={false} />
      </mesh>
      <mesh scale={0.72}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#9EADBF" wireframe transparent opacity={0.28} depthWrite={false} />
      </mesh>
    </Float>
  );
}

function FloatingRing() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.04;
  });
  return (
    <Float speed={0.55} rotationIntensity={0.1} floatIntensity={0.26}>
      <mesh ref={ref} rotation={[Math.PI / 3.15, 0.18, 0]}>
        <torusGeometry args={[2.6, 0.022, 12, 96]} />
        <meshBasicMaterial color="#D0D8E2" transparent opacity={0.78} depthWrite={false} />
      </mesh>
    </Float>
  );
}

function Scene() {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.018;
  });
  return (
    <group ref={group} position={[0.05, 0, 0]}>
      <FloatingCore />
      <FloatingRing />
    </group>
  );
}

export function HeroScene3D() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-[-6%] top-[58%] z-[3] opacity-[0.22] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.45)_35%,black_70%)] sm:top-[52%] sm:opacity-30 lg:inset-0 lg:left-[45%] lg:top-0 lg:bottom-0 lg:opacity-100 lg:[mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.4)_14%,black_38%)]"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0.2, 0.05, 4.45], fov: 40 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
