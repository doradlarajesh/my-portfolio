import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;
const COLORS = ["#00d4ff", "#d946ef"];

function Particles({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 4,
      phase: Math.random() * Math.PI * 2,
      speed: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  useFrame(({ clock }) => {
    const group = groupRef.current;
    if (!group) return;
    const t = clock.getElapsedTime();
    const mx = mouseRef.current?.x ?? 0;
    const my = mouseRef.current?.y ?? 0;
    group.rotation.y += (mx * 0.3 - group.rotation.y) * 0.05;
    group.rotation.x += (-my * 0.2 - group.rotation.x) * 0.05;
    group.children.forEach((child, i) => {
      const p = positions[i];
      child.position.y = p.y + Math.sin(t * p.speed + p.phase) * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshBasicMaterial color={COLORS[i % 2]} />
        </mesh>
      ))}
    </group>
  );
}

const HeroParticles = () => {
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ alpha: true }}
      >
        <Particles mouseRef={mouseRef} />
      </Canvas>
    </div>
  );
};

export default HeroParticles;
