
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import profilePhoto from "@/assets/profile-photo.png";
import articleBddAi from "@/assets/article-bdd-ai.png";
import articlePostmanGithubActions from "@/assets/article-postman-github-actions.jpg";
import articleSlackWebhook from "@/assets/article-slack-webhook.jpg";
import articlePostmanBackup from "@/assets/article-postman-backup.jpg";
import { 
  Code2, 
  Bug, 
  Shield, 
  Users, 
  Award, 
  Mail, 
  Linkedin, 
  Github, 
  Download,
  CheckCircle,
  Target,
  Zap,
  Globe,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  BookOpen,
  Phone,
  Calendar,
  Activity,
  Monitor,
  FileCheck,
  BarChart3,
  Quote,
  Building2
} from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    // Initialize particles
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));
    setParticles(initialParticles);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
// Continuous typing animation

const fullName = "Rajesh Doradla";
let currentIndex = 0;
let isDeleting = false;

const typeTimer = setInterval(() => {

  if (!isDeleting) {
    if (currentIndex < fullName.length) { // Changed to < length for better logic
      currentIndex++;
      setTypedText(fullName.slice(0, currentIndex));
    } else {
      // Pause before starting to delete
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    }

  } else {
    // FIX APPLIED HERE: The deletion logic must run, and only AFTER 
    // the last character is deleted (currentIndex is 0), should the pause begin.
    
    if (currentIndex > 0) {
      currentIndex--;
    } 
    
    setTypedText(fullName.slice(0, currentIndex)); // Moved this out of the 'if'

    if (currentIndex === 0) { // Check for currentIndex 0 AFTER the text has been set to ""
      // Pause before starting to type again
      setTimeout(() => {
        isDeleting = false;
      }, 1000);
    }
  }
}, isDeleting ? 100 : 150);

    // Particle animation
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;
        let newVx = particle.vx;
        let newVy = particle.vy;

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) newVx = -newVx;
        if (newY <= 0 || newY >= window.innerHeight) newVy = -newVy;

        // Attraction to mouse
        const dx = mousePosition.x - newX;
        const dy = mousePosition.y - newY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          newVx += dx * 0.0001;
          newVy += dy * 0.0001;
        }

        return {
          ...particle,
          x: Math.max(0, Math.min(window.innerWidth, newX)),
          y: Math.max(0, Math.min(window.innerHeight, newY)),
          vx: Math.max(-3, Math.min(3, newVx)),
          vy: Math.max(-3, Math.min(3, newVy))
        };
      }));
    };

    const particleInterval = setInterval(animateParticles, 50);
    
    // Handle scroll for active section highlighting
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'projects', 'achievements', 'articles', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection

      // Check sections in reverse order to handle overlap better
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          // For the last section (contact), use a different detection logic
          if (section === 'contact') {
            // If we're near the bottom of the page or in the contact section
            if (scrollPosition >= offsetTop - 100 || 
                (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100) {
              setActiveSection(section);
              return;
            }
          } else if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Auto-play testimonials
    const testimonialTimer = setInterval(() => {
      if (isAutoPlaying) {
        setCurrentTestimonial((prev) => (prev + 1) % 2); // 2 testimonials
      }
    }, 5000); // Change every 5 seconds
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typeTimer);
      clearInterval(testimonialTimer);
    };
  }, [isAutoPlaying]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'experience', label: 'Experience', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'testimonials', label: 'Testimonials', icon: Quote },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  // Tool logos and skills data
  const skillCategories = [
    {
      name: "Test Automation",
      tools: [
        { name: "iOS XCUITest", logo: "📱" },
        { name: "Appium", logo: "📲" },
        { name: "Selenium", logo: "🌐" },
        { name: "Playwright", logo: "🎭" }
      ]
    },
    {
      name: "Programming Languages",
      tools: [
        { name: "Java", logo: "☕" },
        { name: "JavaScript", logo: "📜" },
        { name: "Swift", logo: "🔷" },
        { name: "Python", logo: "🐍" }
      ]
    },
    {
      name: "Testing Frameworks",
      tools: [
        { name: "TestNG", logo: "🧪" },
        { name: "JUnit", logo: "✅" },
        { name: "Jest", logo: "🃏" },
        { name: "Pytest", logo: "🔬" }
      ]
    },
    {
      name: "API Testing",
      tools: [
        { name: "REST Assured", logo: "🔗" },
        { name: "Postman", logo: "📮" },
        { name: "Insomnia", logo: "😴" },
        { name: "Newman", logo: "👨" }
      ]
    },
    {
      name: "DevOps & CI/CD",
      tools: [
        { name: "GitHub Actions", logo: "🔄" },
        { name: "Fastlane", logo: "🚀" },
        { name: "Jenkins", logo: "👷" },
        { name: "Docker", logo: "🐳" }
      ]
    }
  ];

  const experiences = [
    {
      title: "Principal QA Engineer",
      company: "Backbase",
      period: "Jul 2021 - Present",
      duration: "3+ years",
      description: "Led Quality department of BDO Online and BDO Pay (largest Philippines Bank) with 6M+ active users. Spearheaded QA team growth from 2 to 73 members while implementing AI tools in STLC processes.",
      achievements: [
        "Led Quality department overseeing iOS, Android and Web app components with 6M+ active users",
        "Drove strategic adoption of AI tools (GEMINI, COPILOT) in STLC from test case generation to PR review",
        "Designed automation frameworks (XCUITest, Espresso, Playwright) reducing 87% regression effort"
      ],
      color: "from-blue-500 to-purple-500",
      website: "https://www.backbase.com/"
    },
    {
      title: "Senior QA Engineer",
      company: "SS&C EZE Software Group",
      period: "Oct 2016 - Jun 2021",
      duration: "4+ years",
      description: "Developed automation frameworks for Algorithmic Trading OMS with FIX protocol validations. Implemented CI/CD pipelines resulting in 55% reduction in release cycle time.",
      achievements: [
        "Developed automation frameworks using TestComplete, Selenium for complex Algorithmic Trading OMS",
        "Achieved 60% reduction in manual testing effort through comprehensive test strategies",
        "Implemented CI/CD pipelines with Jenkins, GitHub Actions reducing release cycle time by 55%"
      ],
      color: "from-purple-500 to-pink-500",
      website: "https://www.ezesoft.com/"
    },
    {
      title: "QA Engineer",
      company: "Prolifics Corporation Ltd",
      period: "Apr 2014 - Sep 2016",
      duration: "2+ years",
      description: "Designed test scenarios and developed automated functional test suites for US Retailer William Sonoma & Pottery Barn. Started many initiatives and served as POC for triages and war rooms facilitating cross-team communication.",
      achievements: [
        "Developed automated functional test suite using Selenium WebDriver and Cucumber",
        "Analyzed requirements and designed test scenarios from requirement and low level and high level design documents for US Retailer",
        "Worked closely with development team/On-shore team on the design and implementation of enhancements based on the tuning recommendations.",
        "Served as POC for triages and war rooms driving defect resolution and root cause analysis"
      ],
      color: "from-pink-500 to-red-500",
      website: "https://prolifics.com/usa/"
    }
  ];

  const projects = [
    {
      title: "BDO Pay Mobile App",
      client: "BDO Unibank - Phillipines ",
      description: "Retail Banking money paying application which can be used to P2P, P2M and lending facility. End-to-end testing automation for a mobile banking application with 2M+ active users. Implemented functional and automation test strategies.",
      tech: ["XCUITest", "Playwright", "Espresso", "SauceLabs", "Git Hub Actions", "Grafana"],
      impact: "99.9% uptime achieved",
      status: "Live Production",
      links: {
        playstore: "https://play.google.com/store/apps/details?id=ph.com.bdo.pay&hl=en",
        appstore: "https://apps.apple.com/us/app/bdo-pay/id6450918577"
      }
    },
    {
      title: "BDO Online Web & Mobile App",
      client: "BDO Unibank - Phillipines ",
      description: "Retail Banking app used for every banking need. E2E Quality framework set-up. Lead the QA team in Functional and Automation effort. Set up CICD pipelines.",
      tech: ["Playwright", "XCUITest", "Espresso", "SauceLabs", "Git Hub Actions", "Datadog"],
      impact: "40% faster deployment cycles",
      status: "Live Production",
      links: {
        website: "https://www.onlinebanking.bdo.com.ph/en-US/",
        playstore: "https://play.google.com/store/apps/details?id=ph.com.bdo.retail&hl=en",
        appstore: "https://apps.apple.com/us/app/bdo-online/id1551584630"
      }
    },
    {
      title: "EZE OMS Web and Mobile App",
      client: "SS&C EZE Software",
      description: "Algorithmic Trading order management system specifically designed for Hedge Funds.",
      tech: ["Playwright", "Appium", "Test Complete", "Jenkins"],
      impact: "100% Regression Suite for Desktop, Web, Mobile automation making apps ready for CICD",
      status: "Live Production",
      links: {
        website: "https://www.ezesoftcloud.com/ims/#/login",
        playstore: "https://play.google.com/store/apps/details?id=com.ezesoft.mobile&hl=en",
        appstore: "https://apps.apple.com/in/app/eze-for-iphone/id1528044898"
      }
    },
    {
      title: "William Sonoma and Pottery Barn Ecommerce Web Apps",
      client: "William Sonoma Inc",
      description: "Developed multiple internal applications for WS, one of the largest retailer in US",
      tech: ["Selenium", "Cucumber", "Jenkins"],
      impact: "Below 5% Defect Escape Rate to Prod",
      status: "Live Production",
      links: {
        website: "https://www.williams-sonoma.com/"
      }
    }
  ];

  const certifications = [
    { name: "Prompt Engineering Professional Certification", year: "2025" },
    { name: "ISTQB® Certified CTFL", year: "2016" },
    { name: "Charted Financial Analyst - CFA (foundations)", year: "2018" },
    { name: "Postman API Tester", year: "2023" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent cursor-pointer transform hover:scale-110 transition-transform duration-300">
                RD
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`group px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/50 shadow-md shadow-blue-500/20'
                          : 'text-gray-300 hover:text-white hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-slate-800 transition-all duration-200"
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
          <div className="md:hidden transition-all duration-300 ease-in-out">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-lg">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group w-full flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300'
                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
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

      {/* EPIC Interactive Background System */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Interactive Particle System */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
              style={{
                left: particle.x,
                top: particle.y,
                boxShadow: `0 0 20px hsl(${220 + Math.sin(Date.now() * 0.001 + particle.id) * 60} 70% 60% / 0.5)`
              }}
            />
          ))}
          
          {/* Connection lines between particles */}
          <svg className="absolute inset-0 w-full h-full opacity-30">
            {particles.map((particle, i) => 
              particles.slice(i + 1).map((otherParticle, j) => {
                const distance = Math.sqrt(
                  Math.pow(particle.x - otherParticle.x, 2) + 
                  Math.pow(particle.y - otherParticle.y, 2)
                );
                if (distance < 150) {
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={particle.x}
                      y1={particle.y}
                      x2={otherParticle.x}
                      y2={otherParticle.y}
                      stroke="url(#particleGradient)"
                      strokeWidth="1"
                      opacity={Math.max(0, 1 - distance / 150)}
                    />
                  );
                }
                return null;
              })
            )}
            <defs>
              <linearGradient id="particleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(220 70% 60%)" />
                <stop offset="100%" stopColor="hsl(280 70% 60%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Mouse Cursor Glow Effect */}
        <div 
          className="absolute w-96 h-96 pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: `radial-gradient(circle, hsl(220 70% 60% / 0.1) 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />

        {/* Animated Matrix-style Code Rain */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-matrix-rain text-green-400 font-mono text-xs leading-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-fall opacity-70"
                style={{
                  left: `${i * 5}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              >
                {['describe("QA Test"', 'expect(bug).toBe(null)', 'await page.click()', 'assert.equal()', 'cy.get(".button")', 'test.skip()', 'beforeEach()', 'it("should pass")'][Math.floor(Math.random() * 8)]}
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Geometric Morphing Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-24 h-24 animate-morph-1 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 animate-spin-slow rounded-full"></div>
          </div>
          <div className="absolute top-40 right-32 w-20 h-20 animate-morph-2 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 animate-pulse rounded-lg rotate-45"></div>
          </div>
          <div className="absolute bottom-32 left-32 w-28 h-28 animate-morph-3 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 animate-bounce rounded-full"></div>
          </div>
        </div>

        {/* Glitch Effect Overlay */}
        <div className="absolute inset-0 animate-glitch opacity-5 mix-blend-screen">
          <div className="w-full h-full bg-gradient-to-r from-red-500 via-transparent to-blue-500"></div>
        </div>

        {/* Professional QA Icons with Enhanced Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-16 animate-orbit-1">
            <Bug className="w-14 h-14 text-red-400 animate-pulse" />
          </div>
          <div className="absolute top-32 right-24 animate-orbit-2">
            <Code2 className="w-12 h-12 text-green-400 animate-spin-slow" />
          </div>
          <div className="absolute bottom-40 left-24 animate-orbit-3">
            <Activity className="w-13 h-13 text-yellow-400 animate-bounce" />
          </div>
          <div className="absolute top-1/3 right-1/3 animate-orbit-4">
            <Monitor className="w-11 h-11 text-blue-400 animate-pulse" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 animate-orbit-5">
            <FileCheck className="w-12 h-12 text-purple-400 animate-spin-slow" />
          </div>
          <div className="absolute top-2/3 left-1/3 animate-orbit-6">
            <BarChart3 className="w-14 h-14 text-pink-400 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
        {/* Dynamic mesh gradient background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className={`text-center space-y-8 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Profile Picture */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Avatar className="w-40 h-40 border-4 border-gradient-to-r from-blue-400 to-purple-400 shadow-2xl">
                <AvatarImage 
                  src={profilePhoto} 
                  alt="Rajesh Doradla"
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold">
                  RD
                </AvatarFallback>
              </Avatar>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-20 animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in min-h-[1.2em] flex items-center justify-center relative">
              <span className="animate-text-glow">{typedText}</span>
              <span className="animate-pulse ml-1 text-blue-400">|</span>
              <div className="absolute inset-0 animate-glitch-text opacity-20 pointer-events-none">
                {typedText}
              </div>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 animate-fade-in">
              Principal QA Engineer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in">
              11+ years of experience crafting robust quality assurance strategies, 
              leading automation initiatives, and ensuring exceptional software quality at scale.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500 text-blue-300 px-4 py-2 hover:bg-blue-500/20 transition-all duration-300 hover:scale-105">
              <Bug className="w-4 h-4 mr-2" />
              Quality Assurance
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500 text-purple-300 px-4 py-2 hover:bg-purple-500/20 transition-all duration-300 hover:scale-105">
              <Code2 className="w-4 h-4 mr-2" />
              Test Automation
            </Badge>
            <Badge variant="outline" className="bg-pink-500/10 border-pink-500 text-pink-300 px-4 py-2 hover:bg-pink-500/20 transition-all duration-300 hover:scale-105">
              <Users className="w-4 h-4 mr-2" />
              Team Leadership
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
              onClick={() => window.open('https://drive.google.com/file/d/1_oe5oUWi9nIDz1xrHgrBqBt0XFXQwQQR/view', '_blank')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
        
        <button 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hover:text-white transition-colors duration-300 cursor-pointer group"
          onClick={() => scrollToSection('experience')}
        >
          <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
        </button>
      </section>

      {/* Experience Section - Enhanced 3D Timeline */}
      <section id="experience" className="py-20 px-4 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm px-6 py-2 rounded-full border border-blue-500/30">
                <Briefcase className="w-5 h-5 text-blue-400 animate-pulse" />
                <span className="text-blue-300 font-medium text-sm tracking-wider uppercase">Career Timeline</span>
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              11+ years of delivering quality excellence across global enterprises
            </p>
          </div>
          
          <div className="relative">
            {/* Professional Timeline Spine */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-transparent"></div>
            </div>
            
            <div className="space-y-16">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`relative group ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  style={{
                    animation: 'fade-in 0.8s ease-out forwards',
                    animationDelay: `${index * 0.2}s`,
                    opacity: 0
                  }}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-slate-900 shadow-lg group-hover:scale-125 transition-all duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Date Badge */}
                  <div className={`hidden md:block absolute top-0 transform ${index % 2 === 0 ? 'left-1/2 ml-16' : 'right-1/2 mr-16'} z-10`}>
                    <div className="relative">
                      <div className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-blue-500/20">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-white">{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-full ${index % 2 === 0 ? 'md:w-[calc(50%-4rem)] md:mr-auto' : 'md:w-[calc(50%-4rem)] md:ml-auto'} ml-16 md:ml-0`}>
                    <Card className="relative bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 group/card overflow-hidden">
                      {/* Subtle top accent */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.color} opacity-60 group-hover/card:opacity-100 transition-opacity duration-300`}></div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <CardTitle className="text-xl font-bold text-white mb-2 group-hover/card:text-blue-400 transition-colors duration-300">
                              {exp.title}
                            </CardTitle>
                            <CardDescription className="text-base font-medium text-blue-300 flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {exp.company}
                            </CardDescription>
                          </div>
                          <div className="md:hidden">
                            <Badge variant="outline" className="border-blue-500/50 text-blue-300 bg-blue-500/10">
                              {exp.period}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="relative z-10 space-y-4">
                        <p className="text-gray-300 leading-relaxed text-sm">
                          {exp.description}
                        </p>
                        
                        {/* Achievements */}
                        <div className="space-y-2 pt-2">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Achievements</h4>
                          {exp.achievements.map((achievement, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start space-x-2 text-sm text-gray-300"
                            >
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="leading-relaxed">{achievement}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Visit website button */}
                        <div className="pt-4">
                          <Button 
                            variant="outline"
                            size="sm"
                            className="w-full bg-slate-700/30 border-slate-600 hover:bg-blue-600/20 hover:border-blue-500 text-white transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(exp.website, '_blank');
                            }}
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Tool Logos */}
      <section id="skills" className="py-20 px-4 bg-slate-800/30 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 opacity-10 animate-float">
            <Code2 className="w-16 h-16 text-blue-400" />
          </div>
          <div className="absolute top-40 right-20 opacity-10 animate-float-delayed">
            <Bug className="w-12 h-12 text-purple-400" />
          </div>
          <div className="absolute bottom-40 left-20 opacity-10 animate-float">
            <Shield className="w-14 h-14 text-green-400" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Expertise</h2>
            <p className="text-gray-400 text-lg">Mastery across the quality assurance spectrum</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10 transform hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-white text-lg group-hover:text-blue-400 transition-colors duration-300">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex flex-col items-center p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 group/tool hover:scale-105">
                        <div className="text-2xl mb-2 group-hover/tool:scale-110 transition-transform duration-300">
                          {tool.logo}
                        </div>
                        <span className="text-gray-300 text-xs text-center group-hover/tool:text-white transition-colors duration-300">
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Live Projects & Client Work</h2>
            <p className="text-gray-400 text-lg">Real-world solutions delivering measurable impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-300 group cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white group-hover:text-blue-400 transition-colors duration-300 mb-2">{project.title}</CardTitle>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="border-blue-500 text-blue-300 text-xs">
                          {project.client}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            project.status === 'Live Production' 
                              ? 'border-green-500 text-green-300' 
                              : project.status === 'Active Development'
                              ? 'border-yellow-500 text-yellow-300'
                              : project.status === 'Recently Launched'
                              ? 'border-purple-500 text-purple-300'
                              : 'border-orange-500 text-orange-300'
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">{project.description}</p>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="border-gray-600 text-gray-300 text-xs hover:border-blue-500 hover:text-blue-300 transition-all duration-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                      <span className="text-green-400 font-medium text-sm group-hover:text-green-300 transition-colors duration-300">{project.impact}</span>
                    </div>
                    
                    {/* App Store Links */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.links.website && (
                        <a 
                          href={project.links.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          Website
                        </a>
                      )}
                      {project.links.playstore && (
                        <a 
                          href={project.links.playstore} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Play Store
                        </a>
                      )}
                      {project.links.appstore && (
                        <a 
                          href={project.links.appstore} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xs rounded-full hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:scale-105 shadow-lg font-medium"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          App Store
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Achievements & Certifications</h2>
            <p className="text-gray-400 text-lg">Continuous learning and professional growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Globe className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Built and scaled offshore QA teams from ground</span>
                </div>
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Zap className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Reduced testing cycles by 80% through automation</span>
                </div>
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Users className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Mentored 15+ QA engineers across multiple teams</span>
                </div>
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Established QA practices and KPI's adopted company-wide</span>
                </div>
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Globe className="w-4 h-4 text-pink-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Led quality initiatives for global product launches</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                    <span className="text-gray-300 text-sm">{cert.name}</span>
                    <Badge variant="outline" className="border-blue-500 text-blue-300 text-xs hover:border-blue-400 hover:text-blue-200 transition-colors duration-300">
                      {cert.year}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Published Articles Section */}
      <section id="articles" className="py-20 bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Published Articles
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Sharing knowledge and insights from my journey in Quality Engineering and Test Automation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={articleBddAi} 
                  alt="Resurrection of BDD by AI"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Medium
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  Resurrection of BDD by AI
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Discover how AI is reviving close dead BDD from Obsolete to Essential in Test Automation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-300">BDD</Badge>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-300">AI</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-300">Test Automation</Badge>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://medium.com/@doradlarajesh/resurrection-of-bdd-by-ai-f2c7fe1a7538', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={articlePostmanGithubActions}
                  alt="Postman GitHub Actions Integration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Medium
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  Postman GitHub Actions Integration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Complete guide on integrating Postman with GitHub Actions using Newman, HTML Allure reporting, and Slack notifications for deployment using Pages.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-300">Postman</Badge>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-300">GitHub Actions</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-300">Newman</Badge>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://doradlarajesh.medium.com/postman-github-actions-integration-with-newman-html-allure-slack-reporting-deploy-using-pages-fbcf33bdec79', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={articleSlackWebhook} 
                  alt="Understanding Webhooks & Slack Integration"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Medium
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  Understanding Webhooks & Slack Integration
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Comprehensive guide on webhooks and how to create Slack webhook integrations for real-time notifications and automation.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-300">Webhooks</Badge>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-300">Slack</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-300">Integration</Badge>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://medium.com/@doradlarajesh/what-is-webhook-how-to-create-slack-webhook-36c692bbec3b', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={articlePostmanBackup} 
                  alt="Postman GitHub Integration for Collection Backup"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Medium
                  </Badge>
                </div>
                <CardTitle className="text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                  Postman GitHub Integration for Collection Backup
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Step-by-step tutorial on integrating Postman with GitHub for automated collection backup and version control management.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-300">Postman</Badge>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-300">GitHub</Badge>
                  <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30 text-green-300">Backup</Badge>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-300"
                  onClick={() => window.open('https://medium.com/@doradlarajesh/postman-github-integration-for-backing-up-collection-7b98f1c8030c', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-800/30 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-fade-in">
              Testimonials
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in">
              What colleagues and leaders say about working with me
            </p>
          </div>

          <div 
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Testimonial Cards with Animated Transitions */}
            <div className="relative perspective-1000 mb-12">
              {/* First Testimonial */}
              <div
                className={`transition-all duration-700 ease-in-out transform ${
                  currentTestimonial === 0
                    ? 'opacity-100 scale-100 rotate-0 relative z-10'
                    : 'opacity-0 scale-95 -rotate-2 absolute inset-0 z-0 pointer-events-none'
                }`}
              >
                <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-xl shadow-2xl hover:shadow-blue-500/20 relative overflow-hidden group">
                  {/* Animated Quote Icon */}
                  <div className="absolute top-6 left-6 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
                    <Quote className="w-20 h-20 text-blue-400" />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="pt-12 pb-8 px-8 relative z-10">
                    <div className="mb-8">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="text-yellow-400 text-2xl animate-fade-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed italic relative">
                        <span className="absolute -left-4 -top-2 text-4xl text-blue-400 opacity-50">"</span>
                        Rajesh is one of the best professional & a gem of a person to work with. I have Managed him over 3+ years during this period he has built the skill in Fintech domain and built Automation Framework for complex and dynamic Algorithmic Trading. His project management & out of box thinking was clearly visible in creating Automation suite using Test complete. He has evolved to be the SME for the team and used his skills in mentoring and guiding the team on complex implementations.
                        <br /><br />
                        He is very detailed oriented and does deep analysis, he brings high level of quality to the table with innovative mindset. Moreover, he is calm as cucumber and believes in the principle of 'let the work speak'. There is no doubt in saying that he is great package to have in any organization and I am sure he will climb many more ladders and add a great amount of value wherever he is.
                        <span className="absolute -right-4 -bottom-2 text-4xl text-blue-400 opacity-50">"</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 pt-6 border-t border-slate-700/50">
                      <Avatar className="h-16 w-16 ring-4 ring-blue-500/30 transition-all duration-300 group-hover:ring-blue-400/50 group-hover:scale-110">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl">
                          SS
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg">Shanishetty Srinivas</p>
                        <p className="text-gray-400">Director at SS&C EZE Software</p>
                        <Badge variant="outline" className="mt-2 text-xs bg-blue-500/10 border-blue-500/30 text-blue-300 hover:bg-blue-500/20 transition-colors">
                          <Linkedin className="w-3 h-3 mr-1" />
                          LinkedIn
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Second Testimonial */}
              <div
                className={`transition-all duration-700 ease-in-out transform ${
                  currentTestimonial === 1
                    ? 'opacity-100 scale-100 rotate-0 relative z-10'
                    : 'opacity-0 scale-95 rotate-2 absolute inset-0 z-0 pointer-events-none'
                }`}
              >
                <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 backdrop-blur-xl shadow-2xl hover:shadow-purple-500/20 relative overflow-hidden group">
                  {/* Animated Quote Icon */}
                  <div className="absolute top-6 left-6 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
                    <Quote className="w-20 h-20 text-purple-400" />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardContent className="pt-12 pb-8 px-8 relative z-10">
                    <div className="mb-8">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="text-yellow-400 text-2xl animate-fade-in"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed italic relative">
                        <span className="absolute -left-4 -top-2 text-4xl text-purple-400 opacity-50">"</span>
                        Rajesh worked on one of my teams working for a luxury retail client. His business acumen, knowledge, commitment on the projects that he worked on were impeccable, and he became an irreplaceable player soon. He became a subject matter expert on the Direct to Consumer business and was a stellar performer. Would love to work with him any day.
                        <span className="absolute -right-4 -bottom-2 text-4xl text-purple-400 opacity-50">"</span>
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4 pt-6 border-t border-slate-700/50">
                      <Avatar className="h-16 w-16 ring-4 ring-purple-500/30 transition-all duration-300 group-hover:ring-purple-400/50 group-hover:scale-110">
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-xl">
                          PI
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg">Prashant Ivaturi</p>
                        <p className="text-gray-400">AI Product Leader at Oracle</p>
                        <Badge variant="outline" className="mt-2 text-xs bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-colors">
                          <Linkedin className="w-3 h-3 mr-1" />
                          LinkedIn
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Custom Navigation Controls */}
            <div className="flex items-center justify-center gap-8">
              {/* Previous Button */}
              <button
                onClick={() => {
                  setCurrentTestimonial((prev) => (prev - 1 + 2) % 2);
                  setIsAutoPlaying(false);
                }}
                className="group bg-slate-800/80 hover:bg-slate-700 border-2 border-slate-700 hover:border-blue-500 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                aria-label="Previous testimonial"
              >
                <ChevronDown className="w-6 h-6 rotate-90 group-hover:scale-110 transition-transform" />
              </button>

              {/* Progress Indicators */}
              <div className="flex gap-3">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index);
                      setIsAutoPlaying(false);
                    }}
                    className="group relative"
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentTestimonial === index
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125'
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                    {currentTestimonial === index && isAutoPlaying && (
                      <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" />
                    )}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => {
                  setCurrentTestimonial((prev) => (prev + 1) % 2);
                  setIsAutoPlaying(false);
                }}
                className="group bg-slate-800/80 hover:bg-slate-700 border-2 border-slate-700 hover:border-purple-500 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50"
                aria-label="Next testimonial"
              >
                <ChevronDown className="w-6 h-6 -rotate-90 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Auto-play Indicator */}
            <div className="text-center mt-6">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 mx-auto"
              >
                {isAutoPlaying ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Auto-playing (hover to pause)
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-gray-400 rounded-full" />
                    Paused
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-gray-400 text-lg mb-12">
            Ready to discuss quality assurance strategies, automation frameworks, 
            or leadership opportunities in testing excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
              onClick={() => window.open('mailto:doradlarajesh@gmail.com')}
            >
              <Mail className="w-4 h-4 mr-2" />
              doradlarajesh@gmail.com
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
              onClick={() => window.open('https://www.linkedin.com/in/rajesh-doradla/', '_blank')}
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn Profile
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border-0"
              onClick={() => window.open('https://github.com/doradlarajesh', '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub Profile
            </Button>
          </div>
        </div>
      </section>

      <Separator className="bg-gray-700" />
      
      {/* Footer */}
      <footer className="py-8 px-4 text-center">
        <p className="text-gray-400">
          © 2025 Rajesh Doradla. Built with React, TypeScript, and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default Index;
