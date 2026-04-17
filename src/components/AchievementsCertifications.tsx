import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Zap, Users, Shield, Rocket, Award, BadgeCheck, Filter, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import SectionHeader from "@/components/SectionHeader";
import cfaCertificate from "@/assets/cfa-certificate.png";

// ─── Data ────────────────────────────────────────────────────────────

const achievements = [
  { icon: Globe, title: "Built and scaled offshore QA teams from ground", color: "from-blue-400 to-cyan-400" },
  { icon: Zap, title: "Reduced testing cycles by 80% through automation", color: "from-yellow-400 to-orange-400" },
  { icon: Users, title: "Mentored 15+ QA engineers across multiple teams", color: "from-green-400 to-emerald-400" },
  { icon: Shield, title: "Established QA practices and KPIs adopted company-wide", color: "from-purple-400 to-pink-400" },
  { icon: Rocket, title: "Led quality initiatives for global product launches", color: "from-red-400 to-rose-400" },
];

type CertCategory = "All" | "Tech" | "AI" | "Finance";

interface Certification {
  name: string;
  year: string;
  issuer: string;
  category: CertCategory;
  gradient: string;
  image: string | null;
}

// ─── REORDER CERTIFICATIONS HERE ─────────────────────────────────
// Change the order of items below to control display order.
// Move items up/down in this array to rearrange them on the page.
const certifications: Certification[] = [
  {
    name: "Claude Code 101",
    year: "2025",
    issuer: "Anthropic",
    category: "AI",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: null,
  },
  {
    name: "Backbase QA Certified",
    year: "2024",
    issuer: "Backbase",
    category: "Tech",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    image: null,
  },
  {
    name: "Claude 101",
    year: "2025",
    issuer: "Anthropic",
    category: "AI",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    image: null,
  },
  {
    name: "AI Evaluations",
    year: "2025",
    issuer: "Arize AI",
    category: "AI",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    image: null,
  },
  {
    name: "Prompt Engineering Professional Certification",
    year: "2025",
    issuer: "Certiprof",
    category: "AI",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    image: null,
  },
  {
    name: "ISTQB® Certified CTFL",
    year: "2016",
    issuer: "ISTQB",
    category: "Tech",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    image: null,
  },
  {
    name: "Chartered Financial Analyst - CFA (Foundations)",
    year: "2018",
    issuer: "CFA Institute",
    category: "Finance",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    image: cfaCertificate,
  },
  {
    name: "Postman API Tester",
    year: "2023",
    issuer: "Postman",
    category: "Tech",
    gradient: "from-orange-500 via-rose-500 to-pink-500",
    image: null,
  },
];

const categories: CertCategory[] = ["All", "Tech", "AI", "Finance"];

// ─── Sub-components ──────────────────────────────────────────────────

const AchievementCard = ({ achievement, index }: { achievement: typeof achievements[0]; index: number }) => (
  <div
    className="group relative flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/15 transition-all duration-500 animate-fade-in"
    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
  >
    <div className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${achievement.color} shadow-lg`}>
      <achievement.icon className="w-4 h-4 text-white" />
    </div>
    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300 pt-0.5">
      {achievement.title}
    </p>
  </div>
);

const CertificationCard = ({ cert, index, onClick }: { cert: Certification; index: number; onClick: () => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="group cursor-pointer relative"
  >
    {/* Glow effect behind card */}
    <div className={`absolute -inset-1 bg-gradient-to-r ${cert.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700`} />
    
    <div className="relative h-full overflow-hidden rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/[0.08] group-hover:border-white/20 transition-all duration-500 shadow-2xl">
      {/* Top gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${cert.gradient}`} />
      
      {/* Decorative corner accent */}
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${cert.gradient} opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500`} />
      
      <div className="p-5 flex flex-col h-full">
        {/* Badge icon */}
        <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Award className="w-5 h-5 text-white" />
        </div>
        
        {/* Issuer badge (highlighted) */}
        <Badge className={`w-fit mb-3 bg-gradient-to-r ${cert.gradient} text-white border-0 text-[11px] px-2.5 py-0.5 shadow-lg`}>
          {cert.issuer}
        </Badge>
        
        {/* Title */}
        <h4 className="text-white font-semibold text-sm leading-snug mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300 flex-1">
          {cert.name}
        </h4>
        
        {/* Year + action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
          <span className="text-xs text-gray-500 font-medium">{cert.year}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </div>
    </div>
  </motion.div>
);

const FilterButton = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
      active
        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/25"
        : "bg-white/[0.03] text-gray-400 border-white/10 hover:bg-white/[0.08] hover:text-white hover:border-white/20"
    }`}
  >
    {label}
  </button>
);

// ─── Main Component ──────────────────────────────────────────────────

const AchievementsCertifications = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeFilter, setActiveFilter] = useState<CertCategory>("All");

  const filteredCerts = activeFilter === "All"
    ? certifications
    : certifications.filter((c) => c.category === activeFilter);

  return (
    <section id="achievements" className="py-28 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0c0a1a] to-slate-900">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[140px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          title="Achievements & Certifications"
          description="Impact highlights, verified credentials, and continuous learning across QA, AI, and delivery excellence."
        />

        {/* ──── ACHIEVEMENTS ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/20">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Key Achievements</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <AchievementCard key={i} achievement={a} index={i} />
            ))}
          </div>
        </motion.div>

        {/* ──── CERTIFICATIONS ──── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header with filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20">
                <BadgeCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
                <p className="text-xs text-gray-500 mt-0.5">{certifications.length} credentials earned</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-500 mr-1" />
              {categories.map((cat) => (
                <FilterButton
                  key={cat}
                  label={cat}
                  active={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                />
              ))}
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert, i) => (
                <CertificationCard
                  key={cert.name}
                  cert={cert}
                  index={i}
                  onClick={() => setSelectedCert(cert)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredCerts.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-sm">
              No certifications in this category yet.
            </div>
          )}
        </motion.div>
      </div>

      {/* ──── Certificate Modal ──── */}
      <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
        <DialogContent className="sm:max-w-2xl bg-slate-900/95 backdrop-blur-xl border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              {selectedCert?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Issued by {selectedCert?.issuer} • {selectedCert?.year}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedCert?.image ? (
              <div className={`w-full rounded-xl bg-gradient-to-br ${selectedCert.gradient} p-1`}>
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.name} Certificate`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ) : (
              <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${selectedCert?.gradient || 'from-purple-600 to-blue-600'} p-[2px]`}>
                <div className="w-full h-full rounded-[10px] bg-slate-800 flex flex-col items-center justify-center p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCert?.gradient || ''} flex items-center justify-center mb-6 shadow-lg`}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white text-center mb-2">
                    {selectedCert?.name}
                  </h3>
                  <p className="text-gray-400 text-center mb-4">
                    {selectedCert?.issuer}
                  </p>
                  <Badge className={`bg-gradient-to-r ${selectedCert?.gradient || ''} text-white border-0 px-4 py-2 text-lg`}>
                    {selectedCert?.year}
                  </Badge>
                  <p className="text-sm text-gray-500 mt-6 text-center">
                    Certificate preview placeholder
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AchievementsCertifications;
