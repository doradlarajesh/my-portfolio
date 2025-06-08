
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Code2, 
  Bug, 
  Shield, 
  Users, 
  Award, 
  Mail, 
  LinkedIn, 
  Github, 
  Download,
  CheckCircle,
  Target,
  Zap,
  Globe,
  ChevronDown,
  ExternalLink
} from "lucide-react";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const skills = [
    { name: "Test Automation", level: 95, category: "Core" },
    { name: "Selenium WebDriver", level: 90, category: "Tools" },
    { name: "Cypress", level: 88, category: "Tools" },
    { name: "Java", level: 85, category: "Languages" },
    { name: "Python", level: 82, category: "Languages" },
    { name: "API Testing", level: 92, category: "Core" },
    { name: "Performance Testing", level: 80, category: "Core" },
    { name: "CI/CD", level: 87, category: "DevOps" },
    { name: "Docker", level: 75, category: "DevOps" },
    { name: "Kubernetes", level: 70, category: "DevOps" },
    { name: "TestNG/JUnit", level: 90, category: "Frameworks" },
    { name: "REST Assured", level: 88, category: "Frameworks" }
  ];

  const experiences = [
    {
      title: "Principal QA Engineer",
      company: "TechCorp Solutions",
      period: "2020 - Present",
      description: "Leading QA strategy and automation initiatives for enterprise-scale applications. Built comprehensive test automation frameworks resulting in 80% reduction in manual testing efforts.",
      achievements: [
        "Architected end-to-end test automation framework serving 15+ development teams",
        "Reduced regression testing time from 2 weeks to 2 days",
        "Mentored 8 junior QA engineers and established QA best practices"
      ]
    },
    {
      title: "Senior QA Engineer",
      company: "InnovateTech Inc",
      period: "2017 - 2020",
      description: "Specialized in API testing and microservices quality assurance. Implemented performance testing strategies for high-traffic applications.",
      achievements: [
        "Designed API testing framework handling 500+ endpoints",
        "Improved application performance by 40% through comprehensive load testing",
        "Led quality assurance for 12 major product releases"
      ]
    },
    {
      title: "QA Engineer",
      company: "StartupVenture",
      period: "2013 - 2017",
      description: "Full-stack quality assurance for web and mobile applications. Established testing processes from ground up.",
      achievements: [
        "Built first automated testing suite for the company",
        "Reduced production bugs by 65% through systematic testing",
        "Implemented mobile testing strategies for iOS and Android"
      ]
    }
  ];

  const projects = [
    {
      title: "E2E Automation Framework",
      description: "Comprehensive test automation framework built with Selenium, TestNG, and Docker for scalable testing across multiple environments.",
      tech: ["Java", "Selenium", "TestNG", "Docker", "Jenkins"],
      impact: "80% reduction in manual testing"
    },
    {
      title: "API Testing Suite",
      description: "RESTful API testing framework with comprehensive validation, data-driven testing, and integration with CI/CD pipelines.",
      tech: ["Python", "REST Assured", "Pytest", "Postman"],
      impact: "500+ endpoints automated"
    },
    {
      title: "Performance Testing Platform",
      description: "Load testing framework for microservices architecture with real-time monitoring and reporting capabilities.",
      tech: ["JMeter", "Grafana", "InfluxDB", "Kubernetes"],
      impact: "40% performance improvement"
    }
  ];

  const certifications = [
    { name: "ISTQB Advanced Test Automation Engineer", year: "2023" },
    { name: "AWS Certified DevOps Engineer", year: "2022" },
    { name: "Certified Kubernetes Administrator", year: "2021" },
    { name: "Selenium WebDriver Certification", year: "2020" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className={`text-center space-y-8 max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Alex Rodriguez
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Principal QA Engineer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              11+ years of experience crafting robust quality assurance strategies, 
              leading automation initiatives, and ensuring exceptional software quality at scale.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="bg-blue-500/10 border-blue-500 text-blue-300 px-4 py-2">
              <Bug className="w-4 h-4 mr-2" />
              Quality Assurance
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 border-purple-500 text-purple-300 px-4 py-2">
              <Code2 className="w-4 h-4 mr-2" />
              Test Automation
            </Badge>
            <Badge variant="outline" className="bg-pink-500/10 border-pink-500 text-pink-300 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Team Leadership
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
              <Download className="w-4 h-4 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Professional Journey</h2>
            <p className="text-gray-400 text-lg">11+ years of delivering quality excellence</p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <CardTitle className="text-white text-xl">{exp.title}</CardTitle>
                      <CardDescription className="text-blue-400 font-medium">{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-purple-500 text-purple-300 mt-2 md:mt-0">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{exp.description}</p>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technical Expertise</h2>
            <p className="text-gray-400 text-lg">Mastery across the quality assurance spectrum</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Core', 'Tools', 'Languages', 'DevOps', 'Frameworks'].map((category) => (
              <Card key={category} className="bg-slate-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skills.filter(skill => skill.category === category).map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-300 text-sm">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 text-lg">Innovative solutions that drive quality excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-slate-800/50 border-gray-700 hover:bg-slate-800/70 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{project.title}</CardTitle>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium text-sm">{project.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Achievements & Certifications</h2>
            <p className="text-gray-400 text-lg">Continuous learning and professional growth</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-blue-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Reduced testing cycles by 80% through automation</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Mentored 15+ QA engineers across multiple teams</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Established QA practices adopted company-wide</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="w-4 h-4 text-pink-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">Led quality initiatives for global product launches</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{cert.name}</span>
                    <Badge variant="outline" className="border-blue-500 text-blue-300 text-xs">
                      {cert.year}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Let's Connect</h2>
          <p className="text-gray-400 text-lg mb-12">
            Ready to discuss quality assurance strategies, automation frameworks, 
            or leadership opportunities in testing excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              <Mail className="w-4 h-4 mr-2" />
              alex.rodriguez@email.com
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
              <LinkedIn className="w-4 h-4 mr-2" />
              LinkedIn Profile
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
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
          © 2024 Alex Rodriguez. Built with React, TypeScript, and Tailwind CSS.
        </p>
      </footer>
    </div>
  );
};

export default Index;
