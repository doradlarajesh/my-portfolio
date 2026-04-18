import { useRef, useState, CSSProperties, RefObject } from "react";

interface TiltResult {
  ref: RefObject<HTMLDivElement>;
  style: CSSProperties;
  glareStyle: CSSProperties;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export function useTilt(maxAngle = 12): TiltResult {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, moving: false });

  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    const rx = -(dy / (rect.height / 2)) * maxAngle;
    const ry = (dx / (rect.width / 2)) * maxAngle;
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setTilt({ rx, ry, gx, gy, moving: true });
  };

  const onMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, moving: false });
  };

  if (isTouch) {
    return {
      ref,
      style: {},
      glareStyle: { display: "none" },
      onMouseMove: () => {},
      onMouseLeave: () => {},
    };
  }

  const style: CSSProperties = {
    transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(1.02,1.02,1.02)`,
    transition: tilt.moving ? "0.1s ease-out" : "0.4s ease",
    willChange: "transform",
  };

  const glareStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    pointerEvents: "none",
    background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
    zIndex: 1,
  };

  return { ref, style, glareStyle, onMouseMove, onMouseLeave };
}
