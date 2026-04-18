import { useState, useEffect, useRef } from "react";
import ToolLogo from "@/components/ToolLogo";

const MARQUEE_CSS = `
@keyframes marquee-ltr {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0%);  }
}
@keyframes marquee-rtl {
  from { transform: translateX(0%);  }
  to   { transform: translateX(-50%); }
}
.marquee-pause:hover .marquee-track {
  animation-play-state: paused;
}
`;

const PALETTE = [
  { label: "Test Automation",    text: "#22d3ee", border: "rgba(34,211,238,0.5)",  glow: "rgba(34,211,238,0.15)",  bg: "rgba(34,211,238,0.07)",  speed: 24 },
  { label: "Programming",        text: "#a855f7", border: "rgba(168,85,247,0.5)",  glow: "rgba(168,85,247,0.15)",  bg: "rgba(168,85,247,0.07)",  speed: 32 },
  { label: "Testing Frameworks", text: "#ec4899", border: "rgba(236,72,153,0.5)",  glow: "rgba(236,72,153,0.15)",  bg: "rgba(236,72,153,0.07)",  speed: 26 },
  { label: "API Testing",        text: "#f59e0b", border: "rgba(245,158,11,0.5)",  glow: "rgba(245,158,11,0.15)",  bg: "rgba(245,158,11,0.07)",  speed: 34 },
  { label: "DevOps & CI/CD",     text: "#22c55e", border: "rgba(34,197,94,0.5)",   glow: "rgba(34,197,94,0.15)",   bg: "rgba(34,197,94,0.07)",   speed: 28 },
];

interface Category {
  name: string;
  tools: { name: string; logo: string }[];
}

export default function SkillsMarquee({ categories }: { categories: Category[] }) {
  const [spotlight, setSpotlight] = useState<number | null>(null);
  const [rowVisible, setRowVisible] = useState<boolean[]>(() => Array(categories.length).fill(false));
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRowVisible(Array(categories.length).fill(true));
      return;
    }

    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // stagger each row
          categories.forEach((_, i) => {
            setTimeout(() => {
              setRowVisible(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 120);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [categories.length]);

  const handleLabelClick = (i: number) => {
    setSpotlight(prev => (prev === i ? null : i));
  };

  return (
    <div ref={wrapperRef} className="space-y-4">
      <style>{MARQUEE_CSS}</style>

      {categories.map((cat, rowIndex) => {
        const pal = PALETTE[rowIndex];
        const dir = rowIndex % 2 === 0 ? "marquee-rtl" : "marquee-ltr";
        const items = [...cat.tools, ...cat.tools, ...cat.tools, ...cat.tools];

        const isSpotlit  = spotlight === rowIndex;
        const isDimmed   = spotlight !== null && !isSpotlit;
        const visible    = rowVisible[rowIndex];
        const fromLeft   = rowIndex % 2 === 0;

        return (
          <div
            key={cat.name}
            className="group"
            style={{
              opacity:    isDimmed ? 0.25 : 1,
              transform:  visible ? "translateX(0)" : `translateX(${fromLeft ? "-60px" : "60px"})`,
              transition: "opacity 0.4s ease, transform 0.6s ease",
              transitionDelay: visible ? "0ms" : `${rowIndex * 120}ms`,
            }}
          >
            {/* row label — clickable for spotlight */}
            <button
              onClick={() => handleLabelClick(rowIndex)}
              className="text-xs font-semibold uppercase tracking-widest mb-2 ml-1 cursor-pointer bg-transparent border-0 p-0 transition-all duration-300"
              style={{
                color: pal.text,
                textShadow: isSpotlit ? `0 0 12px ${pal.text}, 0 0 24px ${pal.text}` : "none",
              }}
            >
              {pal.label}
            </button>

            {/* marquee strip */}
            <div
              className="marquee-pause relative overflow-hidden rounded-xl"
              style={{
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
                maskImage:        "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              }}
            >
              {/* neon bottom border */}
              <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(to right, transparent, ${pal.border}, transparent)` }}
              />

              <div
                className="marquee-track flex gap-3 w-max py-2 px-1"
                style={{ animation: `${dir} ${pal.speed}s linear infinite` }}
              >
                {items.map((tool, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border shrink-0 transition-transform duration-200 hover:scale-105"
                    style={{
                      color:       pal.text,
                      borderColor: pal.border,
                      background:  pal.bg,
                      boxShadow:   `0 0 14px ${pal.glow}, inset 0 0 10px ${pal.glow}`,
                    }}
                  >
                    <ToolLogo name={tool.name} fallback={tool.logo} className="h-7 w-7 shrink-0" />
                    <span className="text-sm font-semibold whitespace-nowrap">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
