import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Download, Mail, Phone, MapPin, Star, Zap, Target, Award, Code, Briefcase, Coffee, Sparkles, ChevronDown, ExternalLink, Github, Eye } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import SocialIcons from '../components/SocialIcons';
import AnimatedSection from '../components/AnimatedSection';
import SkillBadge from '../components/SkillBadge';
import LazyImage from '../components/LazyImage';
import SEOHead from '../components/SEOHead';
import { useState, useEffect } from 'react';

interface Project {
  _id: string;
  title: string;
  category: string;
  client: string;
  completionDate: string;
  technologies: string[];
  description: string;
  challenge: string;
  solution: string;
  imageUrls: string[];
  liveUrl: string;
  githubUrl: string;
}

const HomePage = () => {
  const typingStrings = [
    "Data Scientist",
    "Full Stack Developer", 
    "AI Engineer",
    "Business Intelligence Expert",
    "Digital Innovator"
  ];

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nicola Ananda",
    "jobTitle": ["Data Analyst", "Web Developer", "Full Stack Developer"],
    "description": "Professional Data Analyst and Full Stack Web Developer specializing in React, TypeScript, Python, and modern web technologies.",
    "url": "https://nicola.id",
    "image": "https://nicola.id/profile.webp",
    "sameAs": [
      "https://linkedin.com/in/nicola-ananda",
      "https://github.com/nicolaananda",
      "https://twitter.com/NoAbsen13"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Malang",
      "addressRegion": "East Java",
      "addressCountry": "Indonesia"
    },
    "knowsAbout": [
      "Data Analysis", 
      "Web Development", 
      "React", 
      "TypeScript", 
      "Python", 
      "Business Intelligence",
      "Data Visualization",
      "Full Stack Development"
    ]
  };
  
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch projects');
        }

        setFeaturedProjects(data.data.slice(0, 3));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  const skills = [
    { name: "Python", level: 95, category: "Data & AI", icon: "🐍", color: "from-green-400 to-emerald-600" },
    { name: "React", level: 90, category: "Frontend", icon: "⚛️", color: "from-blue-400 to-cyan-600" },
    { name: "TypeScript", level: 88, category: "Frontend", icon: "📘", color: "from-blue-600 to-indigo-600" },
    { name: "Node.js", level: 85, category: "Backend", icon: "🟢", color: "from-green-500 to-lime-600" },
    { name: "SQL", level: 92, category: "Database", icon: "🗄️", color: "from-orange-400 to-red-500" },
    { name: "Tableau", level: 94, category: "Analytics", icon: "📊", color: "from-purple-400 to-pink-600" }
  ];

  const services = [
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      title: "Data Analytics & BI",
      description: "Transform complex datasets into actionable business insights with advanced analytics, machine learning, and interactive dashboards.",
      features: ["Predictive Analytics", "Business Intelligence", "Data Visualization", "Statistical Modeling"],
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50"
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      title: "Full Stack Development",
      description: "Build scalable, modern web applications with cutting-edge technologies and exceptional user experiences.",
      features: ["React & Next.js", "Node.js APIs", "Database Design", "Cloud Deployment"],
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: "AI & Machine Learning",
      description: "Integrate intelligent features and automation into applications using modern AI technologies and frameworks.",
      features: ["ML Model Development", "AI Integration", "Automation Scripts", "NLP Solutions"],
      gradient: "from-green-500 to-teal-600",
      bgGradient: "from-green-50 to-teal-50"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <SEOHead
        title="Nicola Ananda - Data Analyst & Web Developer | Portfolio"
        description="Professional Data Analyst and Full Stack Web Developer specializing in React, TypeScript, Python, and modern web technologies. Based in Malang, Indonesia."
        keywords="Nicola Ananda, Data Analyst, Web Developer, React, TypeScript, Python, Portfolio, Malang, Indonesia, Full Stack Developer, Business Intelligence, Data Visualization"
        url="https://nicola.id"
        image="/profile.webp"
        structuredData={structuredData}
      />

      {/* Modern Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/30 via-transparent to-pink-50/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.1),transparent),radial-gradient(ellipse_at_bottom_right,rgba(255,154,158,0.1),transparent)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-16 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="container relative z-10 px-4 py-16">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Content Section */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-semibold text-green-700 border border-green-200/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Available for Projects
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl font-bold leading-tight tracking-tight lg:text-6xl xl:text-7xl">
                  <span className="block text-gray-900 mb-2">Hi, I'm</span>
                  <span className="block bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                    Nicola Ananda
                  </span>
                </h1>
                
                <div className="text-2xl font-medium text-gray-600 lg:text-3xl min-h-[3rem]">
                  <TypingAnimation
                    strings={typingStrings}
                    className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold"
                  />
                </div>
              </div>
              
              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transforming <span className="font-semibold text-gray-800">complex data</span> into powerful insights and 
                building <span className="font-semibold text-gray-800">innovative web solutions</span> that drive business growth.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start pt-6">
                <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1">
                  <Link to="/portfolio">
                    <span className="relative z-10 flex items-center">
                      <Eye size={18} className="mr-2" />
                      View My Work
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-2xl px-8 py-4 text-base font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                  <Link to="/contact">
                    <Mail size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Let's Connect
                  </Link>
                </Button>
              </div>
              
              {/* Social Links */}
              <div className="flex flex-col items-center lg:items-start gap-4 pt-8">
                <p className="text-sm text-gray-500 font-medium tracking-wide">CONNECT WITH ME</p>
                <SocialIcons />
              </div>
            </div>
            
            {/* Profile Image Section */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="relative h-80 w-80 lg:h-96 lg:w-96">
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-300/20 to-accent/30 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-tl from-accent/20 via-transparent to-primary/20 rounded-full blur-2xl opacity-40"></div>
                  
                  {/* Main Image Container */}
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/80 shadow-2xl shadow-gray-900/20 group-hover:shadow-3xl group-hover:shadow-primary/20 transition-all duration-700 backdrop-blur-sm">
                    <LazyImage
                      src="/profile_optimized.jpg"
                      webpSrc="/profile_hero.webp"
                      responsiveVariants={{
                        mobile: "/profile_320.webp",
                        tablet: "/profile_640.webp", 
                        desktop: "/profile_hero.webp"
                      }}
                      alt="Nicola Ananda - Data Analyst & Web Developer"
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 320px, (max-width: 1024px) 640px, 800px"
                      loading="eager"
                      priority={true}
                      width={384}
                      height={384}
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/30 ring-inset"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-xs font-medium tracking-widest uppercase">Explore</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,1)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <AnimatedSection delay={100}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                What I Do
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Expertise That <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Delivers</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Comprehensive solutions spanning data science, web development, and AI integration
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={200 + index * 100} className="group">
                <div className={`relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm h-full transform hover:-translate-y-2`}>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 text-sm">
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Skills Grid */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                <Code className="w-4 h-4" />
                Technical Stack
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
              </h2>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={200 + index * 50}>
                <div className="group p-6 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.category}</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects with Enhanced Design */}
      <section className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                <Briefcase className="w-4 h-4" />
                Featured Work
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Latest <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Real-world applications showcasing innovation in data science and web development
              </p>
            </div>
          </AnimatedSection>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
                <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-2 border-primary/10"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Unable to Load Projects</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {featuredProjects.map((project, index) => (
                <AnimatedSection key={project._id} delay={200 + index * 100} className="group">
                  <div className="relative overflow-hidden rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={project.imageUrls[0]} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white backdrop-blur-sm ${
                          project.category === 'Data Analyst' 
                            ? 'bg-blue-500/90' 
                            : project.category === 'Web Development'
                            ? 'bg-purple-500/90'
                            : 'bg-green-500/90'
                        }`}>
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {truncateText(project.description)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <Link to={`/portfolio/${project._id}`} className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors">
                          View Details
                          <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <div className="flex gap-2">
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                               className="p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors">
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                               className="p-2 bg-gray-100 hover:bg-gray-800 hover:text-white rounded-full transition-colors">
                              <Github size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}
          
          <div className="text-center mt-16">
            <Button asChild size="lg" className="group rounded-2xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <Link to="/portfolio">
                Explore All Projects
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-purple-50/50 to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={100}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                  <Mail className="w-4 h-4" />
                  Ready to Collaborate
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Let's Build Something <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Extraordinary</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Ready to transform your ideas into reality? Let's collaborate and create innovative solutions 
                  that make a real impact on your business.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                  <Link to="/contact">
                    <span className="relative z-10 flex items-center">
                      <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                      Start a Project
                    </span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
                  <Link to="/about">
                    <User size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Learn More
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
