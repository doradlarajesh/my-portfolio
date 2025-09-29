
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profilePhoto from "@/assets/profile-photo.png";
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
  BarChart3
} from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    setIsVisible(true);
    
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
    
    // Handle scroll for active section highlighting
    const handleScroll = () => {
      const sections = ['home', 'experience', 'skills', 'projects', 'achievements', 'articles', 'contact'];
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(typeTimer);
    };
  }, []);

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
      description: "Leading Quality department of BDO Online and BDO Pay (largest Philippines Bank) with 6M+ active users. Spearheaded QA team growth from 2 to 73 members while implementing AI tools in STLC processes.",
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
      description: "Designed test scenarios and developed automated functional test suites for US Retailer Pottery Barn. Served as POC for triages and war rooms facilitating cross-team communication.",
      achievements: [
        "Analyzed requirements and designed test scenarios from requirement documents for US Retailer",
        "Developed automated functional test suite using Selenium WebDriver and Cucumber",
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
      description: "End-to-end testing automation for a mobile banking application with 2M+ active users. Implemented functional and automation test strategies.",
      tech: ["XCUITest", "Espresso", "SauceLabs", "Git Hub Actions"],
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
      description: "E2E Quality framework set-up. Lead the QA team in Functional and Automation effort. Set up CICD pipelines.",
      tech: ["Playwright", "XCUITest", "Espresso", "SauceLabs", "Git Hub Actions"],
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
      description: "HIPAA-compliant testing framework for healthcare management platform. Specialized in data privacy validation and medical device integration testing.",
      tech: ["Playwright", "Appium", "Test Complete", "Jenkins"],
      impact: "HIPAA compliance achieved",
      status: "Recently Launched",
      links: {
        website: "https://www.ezesoftcloud.com/ims/#/login",
        playstore: "https://play.google.com/store/apps/details?id=com.ezesoft.mobile&hl=en",
        appstore: "https://apps.apple.com/in/app/eze-for-iphone/id1528044898"
      }
    }
  ];

  const certifications = [
    { name: "ISTQB® Certified CTFL", year: "2023" },
    { name: "GitHub Actions Certification", year: "2022" },
    { name: "iOS XCUITest Advanced", year: "2021" },
    { name: "Selenium WebDriver Expert", year: "2020" }
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

      {/* Animated background particles and QA animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
          
          {/* QA Automation themed floating icons */}
          <div className="absolute top-20 left-10 opacity-20 animate-float">
            <Bug className="w-8 h-8 text-red-400 animate-pulse" />
          </div>
          <div className="absolute top-32 right-20 opacity-20 animate-float" style={{animationDelay: '1s'}}>
            <Code2 className="w-6 h-6 text-green-400 animate-spin" style={{animationDuration: '8s'}} />
          </div>
          <div className="absolute bottom-40 left-20 opacity-20 animate-float" style={{animationDelay: '2s'}}>
            <Activity className="w-7 h-7 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute top-1/3 right-1/3 opacity-20 animate-float" style={{animationDelay: '1.5s'}}>
            <Monitor className="w-5 h-5 text-blue-400 animate-bounce" />
          </div>
          <div className="absolute bottom-1/3 right-1/4 opacity-20 animate-float" style={{animationDelay: '0.5s'}}>
            <FileCheck className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
          <div className="absolute top-2/3 left-1/3 opacity-20 animate-float" style={{animationDelay: '2.5s'}}>
            <BarChart3 className="w-8 h-8 text-pink-400 animate-bounce" style={{animationDelay: '3s'}} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5QzkyQUMiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
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
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in min-h-[1.2em] flex items-center justify-center">
              {typedText}
              <span className="animate-pulse ml-1 text-blue-400">|</span>
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

      {/* Experience Section - Timeline View */}
      <section id="experience" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Journey</h2>
            <p className="text-gray-400 text-lg">11+ years of delivering quality excellence</p>
          </div>
          
          <div className="relative">
            {/* Timeline line with scroll effect */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-purple-300 animate-pulse opacity-50"></div>
              <div className="absolute w-full h-8 bg-gradient-to-b from-white to-transparent animate-bounce opacity-30" style={{animationDuration: '3s'}}></div>
            </div>
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 z-10 animate-pulse"></div>
                  
                  {/* Date indicator - positioned opposite to content */}
                  <div className={`hidden md:block absolute top-0 ${index % 2 === 0 ? 'left-1/2 ml-8 text-left' : 'right-1/2 mr-8 text-right'}`}>
                    <div className="flex items-center space-x-2 bg-slate-800/70 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-600 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-800/90">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{exp.period}</span>
                    </div>
                  </div>
                  
                  {/* Content card */}
                  <div className={`w-full ${index % 2 === 0 ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8'} ml-12 md:ml-0`}>
                    <Card 
                      className={`bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-500 group hover:shadow-2xl transform hover:-translate-y-2 animate-fade-in hover:shadow-purple-500/20 cursor-pointer`}
                      onClick={() => window.open(exp.website, '_blank')}
                    >
                      <CardHeader>
                        <div className="flex flex-col space-y-2">
                          <div className={`w-12 h-1 bg-gradient-to-r ${exp.color} rounded-full group-hover:w-24 transition-all duration-500`}></div>
                          <CardTitle className="text-white text-xl group-hover:text-blue-400 transition-colors duration-300">{exp.title}</CardTitle>
                          <CardDescription className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">{exp.company}</CardDescription>
                          <div className="flex items-center space-x-4 md:hidden">
                            <Badge variant="outline" className="border-purple-500 text-purple-300">
                              {exp.period}
                            </Badge>
                            <Badge variant="outline" className="border-gray-500 text-gray-300">
                              {exp.duration}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">{exp.description}</p>
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start space-x-2 group/item hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0 group-hover/item:text-green-300 transition-colors duration-200" />
                              <span className="text-gray-300 text-sm group-hover/item:text-gray-200 transition-colors duration-200">{achievement}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Click to visit company website
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
                  <Zap className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Reduced testing cycles by 80% through automation</span>
                </div>
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Users className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Mentored 15+ QA engineers across multiple teams</span>
                </div>
                <div className="flex items-start space-x-3 hover:bg-slate-700/30 p-2 rounded transition-all duration-200">
                  <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Established QA practices adopted company-wide</span>
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
            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
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

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
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

            <Card className="group bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
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
