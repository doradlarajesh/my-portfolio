import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import ToolLogo from "@/components/ToolLogo";

export interface SkillNode {
  name: string;
  logo: string;
  category: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Test Automation": "text-cyan-400 border-cyan-500",
  "Programming Languages": "text-purple-400 border-purple-500",
  "Testing Frameworks": "text-pink-400 border-pink-500",
  "API Testing": "text-amber-400 border-amber-500",
  "DevOps & CI/CD": "text-green-400 border-green-500",
};

const CATEGORY_GLOW: Record<string, string> = {
  "Test Automation": "rgba(34,211,238,0.6)",
  "Programming Languages": "rgba(168,85,247,0.6)",
  "Testing Frameworks": "rgba(236,72,153,0.6)",
  "API Testing": "rgba(251,191,36,0.6)",
  "DevOps & CI/CD": "rgba(74,222,128,0.6)",
};

function fibonacciSphere(n: number, radius: number) {
  return Array.from({ length: n }, (_, i) => {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
    const phi = Math.PI * (1 + Math.sqrt(5)) * i;
    return new THREE.Vector3(
      radius * Math.sin(theta) * Math.cos(phi),
      radius * Math.sin(theta) * Math.sin(phi),
      radius * Math.cos(theta)
    );
  });
}

function SkillPills({ skills }: { skills: SkillNode[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const positions = fibonacciSphere(skills.length, 2.5);

  return (
    <>
      {skills.map((skill, i) => {
        const pos = positions[i];
        const colorClass = CATEGORY_COLORS[skill.category] ?? "text-gray-400 border-gray-500";
        const glow = CATEGORY_GLOW[skill.category] ?? "rgba(156,163,175,0.6)";
        const isHovered = hoveredIndex === i;
        return (
          <Html key={skill.name} position={[pos.x, pos.y, pos.z]} center>
            <div
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border bg-black/60 backdrop-blur-sm cursor-default select-none transition-all duration-200 ${colorClass}`}
              style={{
                transform: isHovered ? "scale(1.25)" : "scale(1)",
                boxShadow: isHovered ? `0 0 12px ${glow}` : "none",
                fontSize: "11px",
                whiteSpace: "nowrap",
              }}
            >
              <ToolLogo name={skill.name} fallback={skill.logo} className="h-4 w-4" />
              <span className="font-medium">{skill.name}</span>
            </div>
          </Html>
        );
      })}
    </>
  );
}

function AutoRotateControls() {
  const controlsRef = useRef<any>(null);
  const { gl } = useThree();
  const isPointerOver = useRef(false);

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      autoRotate
      autoRotateSpeed={0.8}
      onStart={() => { isPointerOver.current = true; }}
      onEnd={() => { isPointerOver.current = false; }}
    />
  );
}

interface SkillsOrbProps {
  skills: SkillNode[];
}

const SkillsOrb = ({ skills }: SkillsOrbProps) => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
        <AutoRotateControls />
        <SkillPills skills={skills} />
      </Canvas>
    </div>
  );
};

export default SkillsOrb;
