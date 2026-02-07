import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Download, Settings, Code2, Users } from "lucide-react";
import heroSlightGlitch from "@/assets/hero-slight-glitch.png";
import heroMoreGlitch from "@/assets/hero-more-glitch.png";

interface CyberpunkHeroProps {
  onContactClick: () => void;
}

const CyberpunkHero = ({ onContactClick }: CyberpunkHeroProps) => {
  const [typedText, setTypedText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const fullName = "Rajesh Doradla";
    let currentIndex = 0;
    let isDeleting = false;

    const typeTimer = setInterval(() => {
      if (!isDeleting) {
        if (currentIndex < fullName.length) {
          currentIndex++;
          setTypedText(fullName.slice(0, currentIndex));
        } else {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
        }
        setTypedText(fullName.slice(0, currentIndex));
        if (currentIndex === 0) {
          setTimeout(() => {
            isDeleting = false;
          }, 1000);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearInterval(typeTimer);
  }, []);

  const skillPills = [
    { icon: Settings, label: "Quality Assurance", color: "cyan" },
    { icon: Code2, label: "Test Automation", color: "purple" },
    { icon: Users, label: "Team Leadership", color: "magenta" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Main Name with Glowing Effect */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold min-h-[1.2em] relative">
                <span 
                  className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 40px rgba(0, 212, 255, 0.5), 0 0 80px rgba(139, 92, 246, 0.3)',
                    filter: 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))'
                  }}
                >
                  {typedText}
                </span>
                <span className="text-cyan-400 animate-pulse">|</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-300 font-medium">
                Principal QA Engineer
              </p>
              
              <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                11+ years of experience crafting robust quality assurance strategies, 
                leading automation initiatives, and ensuring exceptional software quality at scale.
              </p>
            </div>

            {/* Skill Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {skillPills.map((skill, index) => {
                const Icon = skill.icon;
                const colorClasses = {
                  cyan: 'border-cyan-500/60 text-cyan-300 shadow-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-400',
                  purple: 'border-purple-500/60 text-purple-300 shadow-purple-500/20 hover:bg-purple-500/10 hover:border-purple-400',
                  magenta: 'border-pink-500/60 text-pink-300 shadow-pink-500/20 hover:bg-pink-500/10 hover:border-pink-400',
                };
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-full border-2 bg-black/30 backdrop-blur-sm transition-all duration-300 cursor-default ${colorClasses[skill.color as keyof typeof colorClasses]}`}
                    style={{
                      boxShadow: skill.color === 'cyan' 
                        ? '0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.05)'
                        : skill.color === 'purple'
                        ? '0 0 20px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.05)'
                        : '0 0 20px rgba(236, 72, 153, 0.2), inset 0 0 20px rgba(236, 72, 153, 0.05)'
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-medium">{skill.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Button 
                onClick={onContactClick}
                className="relative group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white border-0 overflow-hidden transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
                }}
              >
                {/* Glowing border effect */}
                <span className="absolute inset-0 rounded-md border-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors duration-300" />
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
              
              <Button 
                onClick={() => window.open('https://drive.google.com/file/d/1_oe5oUWi9nIDz1xrHgrBqBt0XFXQwQQR/view', '_blank')}
                className="relative group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-500 hover:via-purple-500 hover:to-blue-500 text-white border-0 overflow-hidden transition-all duration-300 transform hover:scale-105"
                style={{
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(139, 92, 246, 0.2)',
                }}
              >
                {/* Glowing border effect */}
                <span className="absolute inset-0 rounded-md border-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors duration-300" />
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* Main hero image with glitch effect on hover */}
              <div className="relative z-10 transition-all duration-500">
                <img 
                  src={isHovered ? heroMoreGlitch : heroSlightGlitch}
                  alt="Rajesh Doradla"
                  className="w-full h-auto object-contain drop-shadow-2xl transition-all duration-300"
                  style={{
                    filter: isHovered 
                      ? 'drop-shadow(0 0 40px rgba(0, 212, 255, 0.6)) drop-shadow(0 0 80px rgba(236, 72, 153, 0.4))'
                      : 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.4)) drop-shadow(0 0 60px rgba(139, 92, 246, 0.3))',
                  }}
                />
              </div>


              {/* Floating particles around image */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full animate-pulse"
                    style={{
                      background: i % 2 === 0 ? '#00d4ff' : '#d946ef',
                      left: `${10 + i * 15}%`,
                      top: `${20 + (i % 3) * 25}%`,
                      boxShadow: `0 0 10px ${i % 2 === 0 ? '#00d4ff' : '#d946ef'}`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CyberpunkHero;
