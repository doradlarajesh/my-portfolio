import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Zap, Users, Shield, Rocket, Award, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import cfaCertificate from "@/assets/cfa-certificate.png";

const achievements = [
  {
    icon: Globe,
    title: "Built and scaled offshore QA teams from ground",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: Zap,
    title: "Reduced testing cycles by 80% through automation",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Users,
    title: "Mentored 15+ QA engineers across multiple teams",
    color: "from-green-400 to-emerald-400",
  },
  {
    icon: Shield,
    title: "Established QA practices and KPIs adopted company-wide",
    color: "from-purple-400 to-pink-400",
  },
  {
    icon: Rocket,
    title: "Led quality initiatives for global product launches",
    color: "from-red-400 to-rose-400",
  },
];

const certifications = [
  {
    name: "Prompt Engineering Professional Certification",
    year: "2025",
    issuer: "Blockchain Council",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    image: null,
  },
  {
    name: "ISTQB® Certified CTFL",
    year: "2016",
    issuer: "ISTQB",
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    image: null,
  },
  {
    name: "Chartered Financial Analyst - CFA (Foundations)",
    year: "2018",
    issuer: "CFA Institute",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    image: cfaCertificate,
  },
  {
    name: "Postman API Tester",
    year: "2023",
    issuer: "Postman",
    gradient: "from-orange-500 via-rose-500 to-pink-500",
    image: null,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const AchievementsCertifications = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <section id="achievements" className="py-24 px-4 relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Achievements & Certifications
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Continuous learning and professional growth
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Achievements Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                <Award className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Key Achievements</h3>
            </div>

            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl -z-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color} bg-opacity-20 shrink-0`}>
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-200 text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                      {achievement.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <ExternalLink className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">Certifications</h3>
            </div>

            <TooltipProvider delayDuration={200}>
              <div className="grid gap-4">
                {certifications.map((cert, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <motion.div
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCert(cert)}
                        className="group cursor-pointer"
                      >
                        <div className="relative overflow-hidden rounded-2xl">
                          {/* Ticket notch effects */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-slate-900 rounded-r-full -ml-2 z-10" />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-slate-900 rounded-l-full -mr-2 z-10" />
                          
                          {/* Card content */}
                          <div className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-purple-500/20">
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${cert.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                            
                            {/* Glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${cert.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-10`} />
                            
                            <div className="relative flex items-center justify-between">
                              <div className="flex-1 pr-4">
                                <h4 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300 mb-1">
                                  {cert.name}
                                </h4>
                                <p className="text-sm text-gray-400">{cert.issuer}</p>
                              </div>
                              <Badge className={`bg-gradient-to-r ${cert.gradient} text-white border-0 px-3 py-1.5 text-sm font-medium shadow-lg`}>
                                {cert.year}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="bg-slate-800 border border-slate-600 text-white px-4 py-2 rounded-lg shadow-xl"
                    >
                      <p className="text-sm font-medium">Tap to view credential</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </motion.div>
        </div>
      </div>

      {/* Certificate Modal */}
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
              /* Actual certificate image */
              <div className={`w-full rounded-xl bg-gradient-to-br ${selectedCert?.gradient || 'from-purple-600 to-blue-600'} p-1`}>
                <img 
                  src={selectedCert.image} 
                  alt={`${selectedCert.name} Certificate`}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ) : (
              /* Certificate placeholder with gradient */
              <div className={`w-full aspect-[4/3] rounded-xl bg-gradient-to-br ${selectedCert?.gradient || 'from-purple-600 to-blue-600'} p-1`}>
                <div className="w-full h-full rounded-lg bg-slate-800 flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center mb-6">
                    <Award className="w-12 h-12 text-white" />
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
