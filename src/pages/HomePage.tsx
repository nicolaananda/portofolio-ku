import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Download, Mail, Phone, MapPin, Star, Zap, Target, Award, Code, Briefcase, Coffee, Sparkles, ChevronDown } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import SocialIcons from '../components/SocialIcons';
import AnimatedSection from '../components/AnimatedSection';
import SkillBadge from '../components/SkillBadge';
import LazyImage from '../components/LazyImage';
import SEOHead from '../components/SEOHead';

const HomePage = () => {
  const typingStrings = [
    "Data Analyst",
    "Web Developer",
    "Fullstack JavaScript Developer",
    "AI-Enabled Developer",
    "Business Intelligence Expert"
  ];

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
  
  return (
    <div className="flex min-h-screen flex-col">
      <SEOHead
        title="Nicola Ananda - Data Analyst & Web Developer | Portfolio"
        description="Professional Data Analyst and Full Stack Web Developer specializing in React, TypeScript, Python, and modern web technologies. Based in Malang, Indonesia."
        keywords="Nicola Ananda, Data Analyst, Web Developer, React, TypeScript, Python, Portfolio, Malang, Indonesia, Full Stack Developer, Business Intelligence, Data Visualization"
        url="https://nicola.id"
        image="/profile.webp"
        structuredData={structuredData}
      />
      {/* Elegant Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-50/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        </div>
        
        {/* Elegant floating elements */}
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-3xl animate-pulse opacity-70"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 bg-gradient-to-br from-accent/6 to-primary/6 rounded-full blur-2xl animate-pulse opacity-50" style={{animationDelay: '1.5s'}}></div>
        
        <div className="container relative z-10 px-4 py-20">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="text-center lg:text-left space-y-8">
              {/* Elegant status indicator */}
              <div className="mb-10 inline-flex items-center rounded-full bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 text-sm font-medium text-green-700 border border-green-100 shadow-sm backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4 text-green-500" />
                Available for new opportunities
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl font-bold leading-[1.1] tracking-tight lg:text-6xl xl:text-7xl">
                  <span className="block text-gray-900 mb-2">Hello, I'm</span>
                  <span className="block bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent animate-gradient">
                    Nicola Ananda
                  </span>
                </h1>
                
                <div className="text-2xl font-medium text-gray-600 lg:text-3xl">
                  <span className="text-gray-800 font-semibold">A passionate </span>
                  <TypingAnimation
                    strings={typingStrings}
                    className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold"
                  />
                </div>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
                Transforming complex data into <span className="text-gray-800 font-medium">actionable insights</span> while crafting 
                <span className="text-gray-800 font-medium"> beautiful, functional</span> web applications that drive business success.
              </p>
              
              {/* Elegant action buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start pt-4">
                <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
                  <Link to="/portfolio">
                    <span className="relative z-10 flex items-center">
                      View My Work
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-2xl px-8 py-6 text-base font-semibold border-2 border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 backdrop-blur-sm">
                  <Link to="/about">
                    <User size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Learn More About Me
                  </Link>
                </Button>
              </div>
              
              {/* Elegant social section */}
              <div className="flex flex-col items-center lg:items-start gap-6 pt-8">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300"></div>
                  <p className="text-sm text-gray-500 font-medium tracking-wide">CONNECT WITH ME</p>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300"></div>
                </div>
                <SocialIcons />
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Elegant profile container with sophisticated shadows */}
                <div className="relative h-80 w-80 lg:h-96 lg:w-96">
                  {/* Layered background elements for depth */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-300/10 to-accent/20 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                  <div className="absolute inset-2 bg-gradient-to-tl from-accent/15 via-transparent to-primary/15 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{animationDelay: '1s'}}></div>
                  
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white/60 shadow-2xl shadow-gray-900/10 group-hover:shadow-3xl group-hover:shadow-primary/10 transition-all duration-700 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10"></div>
                    <LazyImage
                      src="/profile_optimized.jpg"
                      webpSrc="/profile.webp"
                      alt="Nicola Ananda - Data Analyst & Web Developer"
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 320px, 384px"
                      loading="eager"
                    />
                    {/* Elegant overlay */}
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/20 ring-inset"></div>
                  </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Elegant scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-xs font-medium tracking-widest uppercase">Scroll Down</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* Elegant Services Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                What I Do
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Crafting Digital <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                I combine analytical expertise with modern development skills to deliver 
                comprehensive solutions that drive business growth and innovation.
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            <AnimatedSection delay={200} className="group">
              <div className="relative p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Data Analysis</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                    Transform raw data into meaningful insights using advanced statistical analysis, 
                    predictive modeling, and cutting-edge analytics techniques.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200">Python</span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200">SQL</span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200">Tableau</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300} className="group">
              <div className="relative p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Web Development</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                    Build modern, responsive web applications using React, TypeScript, 
                    and Node.js with focus on exceptional user experience and performance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 text-sm rounded-full font-medium border border-purple-200">React</span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 text-sm rounded-full font-medium border border-purple-200">TypeScript</span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 text-sm rounded-full font-medium border border-purple-200">Node.js</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={400} className="group">
              <div className="relative p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">AI Integration</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-light text-lg">
                    Integrate artificial intelligence and machine learning capabilities 
                    into web applications for smarter, data-driven solutions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium border border-green-200">AI/ML</span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium border border-green-200">Python</span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 text-sm rounded-full font-medium border border-green-200">Django</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Elegant Skills Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                <Code className="w-4 h-4" />
                Technical Expertise
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Toolkit</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                A comprehensive arsenal spanning data analysis, web development, and modern technologies
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {[
              { name: "React", level: "Advanced", icon: "⚛️", color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
              { name: "TypeScript", level: "Advanced", icon: "📘", color: "from-blue-600 to-indigo-600", bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
              { name: "Python", level: "Expert", icon: "🐍", color: "from-green-500 to-emerald-600", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
              { name: "SQL", level: "Advanced", icon: "🗄️", color: "from-orange-500 to-red-500", bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
              { name: "Tableau", level: "Expert", icon: "📊", color: "from-blue-400 to-cyan-500", bg: "bg-cyan-50", text: "text-cyan-700", border: "border-cyan-200" },
              { name: "Node.js", level: "Intermediate", icon: "🟢", color: "from-green-600 to-lime-600", bg: "bg-lime-50", text: "text-lime-700", border: "border-lime-200" },
              { name: "Git", level: "Advanced", icon: "🔄", color: "from-gray-600 to-slate-600", bg: "bg-slate-50", text: "text-slate-700", border: "border-slate-200" },
              { name: "Data Analysis", level: "Expert", icon: "📈", color: "from-purple-500 to-violet-600", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" }
            ].map((skill, index) => (
              <AnimatedSection key={skill.name} delay={200 + index * 50}>
                <div className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{skill.name}</h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${skill.bg} ${skill.text} ${skill.border} border`}>
                        {skill.level}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Elegant Featured Projects Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Briefcase className="w-4 h-4" />
                Featured Work
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Project <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Showcase</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Real-world applications showcasing data analysis and web development expertise
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {/* Project 1 */}
            <AnimatedSection delay={200} className="group">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" 
                    alt="Customer Retention Analysis Dashboard" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">Data Analytics</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-200 transition-colors">
                      Customer Retention Analysis
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed font-light">
                    Comprehensive dashboard analyzing customer retention and segmentation for B2B marketplace 
                    using cohort analysis and CLV metrics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">Python</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">Tableau</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">SQL</span>
                  </div>
                  <Link to="/portfolio/1" className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group-hover:gap-3 gap-2">
                    View Project
                    <ArrowRight size={16} className="transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Project 2 */}
            <AnimatedSection delay={300} className="group">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 bg-white transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                    alt="E-Commerce Growth Analysis" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">Business Analytics</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-200 transition-colors">
                      E-Commerce Growth Analysis
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed font-light">
                    Data-driven analysis for increasing user acquisition and market share, 
                    including user journey mapping and conversion optimization.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">Market Analysis</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">User Analytics</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">Growth Strategy</span>
                  </div>
                  <Link to="/portfolio/2" className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group-hover:gap-3 gap-2">
                    View Project
                    <ArrowRight size={16} className="transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
            
            {/* Project 3 */}
            <AnimatedSection delay={400} className="group">
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 bg-white transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                    alt="Interactive Dashboard" 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">Web Development</span>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-green-200 transition-colors">
                      Interactive Analytics Dashboard
                    </h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed font-light">
                    Real-time dashboard for visualizing business metrics and KPIs with 
                    customizable reports and automated insights generation.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">React</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">D3.js</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium border border-gray-200">API Integration</span>
                  </div>
                  <Link to="/portfolio/7" className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group-hover:gap-3 gap-2">
                    View Project
                    <ArrowRight size={16} className="transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="text-center mt-16">
            <Button asChild size="lg" className="group rounded-2xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
              <Link to="/portfolio">
                View All Projects
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Elegant Contact Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection delay={100}>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                  <Mail className="w-4 h-4" />
                  Let's Connect
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Ready to Create Something <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Amazing?</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                  Let's transform your data into actionable insights and build exceptional web applications 
                  that drive your business forward.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
                  <Link to="/contact">
                    <span className="relative z-10 flex items-center">
                      <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                      Start a Conversation
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                  <Link to="/about">
                    <User size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                    Learn More About Me
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
