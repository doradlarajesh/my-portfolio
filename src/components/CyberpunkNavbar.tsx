import { useState } from "react";
import { Bug, Home, User, Code2, Briefcase, Award, BookOpen, Quote, Phone, Menu, X } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface CyberpunkNavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const CyberpunkNavbar = ({ activeSection, onNavigate }: CyberpunkNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'testimonials', label: 'Testimonials', icon: Quote },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/90 backdrop-blur-xl border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with bug icon */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavigate('home')}
              className="flex items-center space-x-2 group"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                RD
              </span>
              <Bug className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors duration-300" />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden ${
                      isActive
                        ? 'text-cyan-300'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {/* Glow background for active state */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg border border-cyan-500/50" />
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300" />
                    
                    <Icon className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-200" />
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 hover:text-white hover:bg-cyan-500/10 transition-all duration-200 border border-cyan-500/30"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0a0a1a]/95 backdrop-blur-lg border-t border-cyan-500/20">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`group w-full flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border-l-2 border-cyan-400'
                      : 'text-gray-400 hover:text-white hover:bg-cyan-500/10'
                  }`}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default CyberpunkNavbar;
