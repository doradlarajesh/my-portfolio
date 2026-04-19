import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import { Globe, ExternalLink, Calendar, CheckCircle, Briefcase } from "lucide-react";

export interface Experience {
  title: string;
  company: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  color: string;
  website: string;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
  timelineProgress: number;
}

// Static logo map — Vite bundles whatever files exist in company-logos/
// Keys must match the filename without extension (case-sensitive)
const logoModules = import.meta.glob(
  "../assets/company-logos/*.{png,svg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const companyLogoSrc: Record<string, string> = Object.fromEntries(
  Object.entries(logoModules).map(([path, src]) => {
    const filename = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
    return [filename, src];
  })
);

// filename key → company name mapping
const COMPANY_META: Record<string, { initials: string; logoKey: string; glow: string; glowHover: string }> = {
  "Backbase":                { initials: "BB", logoKey: "backbase",  glow: "0 0 0 1px rgba(59,130,246,0.3),  0 0 24px rgba(59,130,246,0.12)",  glowHover: "0 0 0 1px rgba(59,130,246,0.6),  0 0 32px rgba(59,130,246,0.25)"  },
  "SS&C EZE Software Group": { initials: "EZ", logoKey: "ezesoft",   glow: "0 0 0 1px rgba(168,85,247,0.3),  0 0 24px rgba(168,85,247,0.12)", glowHover: "0 0 0 1px rgba(168,85,247,0.6),  0 0 32px rgba(168,85,247,0.25)" },
  "Prolifics Corporation Ltd":{ initials: "PC", logoKey: "prolifics", glow: "0 0 0 1px rgba(236,72,153,0.3),  0 0 24px rgba(236,72,153,0.12)", glowHover: "0 0 0 1px rgba(236,72,153,0.6),  0 0 32px rgba(236,72,153,0.25)" },
};

const FALLBACK_META = { initials: "Co", logoKey: "", glow: "0 0 0 1px rgba(100,116,139,0.3), 0 0 24px rgba(100,116,139,0.12)", glowHover: "0 0 0 1px rgba(100,116,139,0.6), 0 0 32px rgba(100,116,139,0.25)" };

function CompanyLogo({ meta, color }: { meta: typeof FALLBACK_META; color: string }) {
  const src = meta.logoKey ? companyLogoSrc[meta.logoKey] : undefined;

  if (!src) {
    // File not yet added — show gradient initials badge
    return (
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
        <span className="text-white text-xs font-bold tracking-tight">{meta.initials}</span>
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded-xl bg-slate-700/50 flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5">
      <img
        src={src}
        alt="company logo"
        className="w-full h-full object-contain"
        style={{ mixBlendMode: "screen" }}
      />
    </div>
  );
}

// Spring cubic-bezier for the node pop
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

interface CardRowProps {
  exp: Experience;
  index: number;
  isActive: boolean;
}

function ExperienceCard({ exp, index, isActive }: CardRowProps) {
  const rowRef  = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isLeft  = index % 2 === 0;
  const meta    = COMPANY_META[exp.company] ?? FALLBACK_META;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVisible(true); return; }

    const el = rowRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animate in when entering, reset when fully out so it re-animates on next scroll
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`relative group ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* ── Timeline Node ── */}
      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
        <div className="relative">
          {/* Pulsing rings when active */}
          {isActive && (
            <>
              <div className="absolute inset-0 -m-3 rounded-full bg-blue-500/30 animate-ping" />
              <div className="absolute inset-0 -m-2 rounded-full bg-purple-500/20 animate-pulse" />
            </>
          )}

          {/* Core node — springs in when card becomes visible */}
          <div
            ref={nodeRef}
            className={`w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-3 border-slate-900 shadow-lg ${
              isActive ? "shadow-blue-500/50" : ""
            } group-hover:scale-150 group-hover:shadow-purple-500/50`}
            style={{
              transform: visible ? (isActive ? "scale(1.25)" : "scale(1)") : "scale(0)",
              transition: `transform 0.4s ${SPRING}`,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white/30 blur-sm" />
          </div>

          {/* Orbital ring */}
          {isActive && (
            <div className="absolute inset-0 -m-4 rounded-full border-2 border-blue-400/40 animate-spin-slow" />
          )}
        </div>
      </div>

      {/* ── Date Badge (desktop only) ── */}
      <div className={`hidden md:block absolute top-0 transform ${isLeft ? "left-1/2 ml-16" : "right-1/2 mr-16"} z-10`}>
        <div className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/20">
          <Calendar className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-white">{exp.period}</span>
        </div>
      </div>

      {/* ── Content Card ── */}
      <div
        className={`w-full ${isLeft ? "md:w-[calc(50%-4rem)] md:mr-auto" : "md:w-[calc(50%-4rem)] md:ml-auto"} ml-16 md:ml-0`}
        style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateX(0)" : `translateX(${isLeft ? "-48px" : "48px"})`,
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <Card
          className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm transition-all duration-300 group/card overflow-hidden"
          style={{ boxShadow: hovered ? meta.glowHover : meta.glow }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Top accent bar — 1 px → 2 px on hover */}
          <div
            className={`absolute top-0 left-0 right-0 bg-gradient-to-r ${exp.color} transition-all duration-300`}
            style={{ height: hovered ? "2px" : "1px", opacity: hovered ? 1 : 0.6 }}
          />

          <CardHeader className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <CompanyLogo meta={meta} color={exp.color} />

                <div className="flex-1 min-w-0">
                  <CardTitle className="text-xl font-bold text-white mb-1 group-hover/card:text-blue-400 transition-colors duration-300">
                    {exp.title}
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-blue-300">
                    {exp.company}
                  </CardDescription>
                </div>
              </div>

              {/* Mobile period badge */}
              <div className="md:hidden flex-shrink-0">
                <Badge variant="outline" className="border-blue-500/50 text-blue-300 bg-blue-500/10 text-xs">
                  {exp.period}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="relative z-10 space-y-4">
            <p className="text-gray-300 leading-relaxed text-sm">{exp.description}</p>

            {/* Achievements */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Achievements</h4>
              {exp.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{achievement}</span>
                </div>
              ))}
            </div>

            {/* Visit website button */}
            <div className="pt-4">
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-slate-700 to-slate-600 hover:from-blue-600 hover:to-purple-600 border border-slate-500 hover:border-blue-400 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
                onClick={(e) => { e.stopPropagation(); window.open(exp.website, "_blank"); }}
              >
                <Globe className="w-4 h-4 mr-2" />
                Visit Company Website
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ExperienceTimeline({ experiences, timelineProgress }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section heading */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm px-6 py-2 rounded-full border border-blue-500/30">
              <Briefcase className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-blue-300 font-medium text-sm tracking-wider uppercase">Career Timeline</span>
            </div>
          </div>
          <SectionHeader
            title="Professional Journey"
            description="11+ years of delivering quality excellence across global enterprises"
            className="mb-0"
            descriptionClassName="max-w-2xl"
          />
        </div>

        <div className="relative">
          {/* Timeline spine */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/40 via-purple-500/40 to-pink-500/20" />
            <div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-400 via-purple-400 to-transparent transition-all duration-700 ease-out"
              style={{ height: `${timelineProgress * 100}%` }}
            />
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute w-full h-32 bg-gradient-to-b from-transparent via-white to-transparent opacity-60 blur-sm"
                style={{ top: "-128px", animation: "travel-light 3s ease-in-out infinite" }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300/20 via-purple-300/20 to-transparent blur-md" />
          </div>

          {/* Cards */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const nodeProgress = (index + 1) / experiences.length;
              const isActive = timelineProgress >= nodeProgress - 0.1;
              return (
                <ExperienceCard
                  key={index}
                  exp={exp}
                  index={index}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
