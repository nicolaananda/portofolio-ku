import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Download, Star, TrendingUp, Users, Award, ExternalLink, Github, Sparkles } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import SocialIcons from '../components/SocialIcons';
import AnimatedSection from '../components/AnimatedSection';
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
    "Business Analyst"
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

  const stats = [
    { icon: <TrendingUp className="w-5 h-5" />, value: '50+', label: 'Projects Completed' },
    { icon: <Users className="w-5 h-5" />, value: '30+', label: 'Happy Clients' },
    { icon: <Award className="w-5 h-5" />, value: '5+', label: 'Years Experience' },
    { icon: <Star className="w-5 h-5" />, value: '100%', label: 'Client Satisfaction' }
  ];

  const services = [
    {
      title: 'Data Analytics',
      description: 'Transform data into actionable insights with Python, SQL, and advanced visualization tools.',
      skills: ['Python', 'SQL', 'Tableau', 'Power BI']
    },
    {
      title: 'Full Stack Development',
      description: 'Build scalable web applications with modern frameworks and best practices.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB']
    },
    {
      title: 'AI & Machine Learning',
      description: 'Implement intelligent solutions with ML models and neural networks.',
      skills: ['TensorFlow', 'PyTorch', 'NLP', 'Computer Vision']
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <SEOHead
        title="Nicola Ananda - Data Analyst & Web Developer | Portfolio"
        description="Professional Data Analyst and Full Stack Web Developer specializing in React, TypeScript, Python, and modern web technologies."
        keywords="Nicola Ananda, Data Analyst, Web Developer, React, TypeScript, Python, Portfolio"
        url="https://nicola.id"
        image="/profile.webp"
        structuredData={structuredData}
      />

      {/* Enhanced Liquid Glass Background */}
      <div className="liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture"></div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-4 py-32">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <AnimatedSection className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-white/80">Available for Work</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight">
                  <span className="block text-white">Nicola</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Ananda
                  </span>
                </h1>
                
                <div className="flex items-baseline gap-3 text-xl lg:text-2xl">
                  <TypingAnimation
                    strings={typingStrings}
                    className="font-semibold text-white/60"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-lg lg:text-xl text-white/50 leading-relaxed max-w-xl">
                Specialized in transforming complex data into business value and building 
                exceptional digital experiences.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {stats.slice(0, 2).map((stat, idx) => (
                  <div key={idx} className="liquid-glass rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-cyan-400">{stat.icon}</div>
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <p className="text-sm text-white/40">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg" className="h-12 px-8 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/25">
                  <Link to="/portfolio">
                    View Portfolio
                    <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
                <button className="liquid-glass-button h-12 px-8 rounded-2xl text-white font-semibold flex items-center gap-2">
                  <Link to="/contact" className="flex items-center gap-2">
                    <Mail size={18} />
                    Contact Me
                  </Link>
                </button>
              </div>

              {/* Social */}
              <div className="pt-2 flex items-center gap-4">
                <div className="h-px w-12 bg-white/10"></div>
                <SocialIcons />
              </div>
            </AnimatedSection>

            {/* Right - Enhanced Profile Card */}
            <AnimatedSection delay={200}>
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-[3rem] blur-3xl"></div>
                
                {/* Main Card */}
                <div className="relative liquid-glass-strong rounded-[3rem] p-8 transition-glass">
                  
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="aspect-[3/4] rounded-[2rem] overflow-hidden">
                      <img
                        src="/profile_optimized.jpg"
                        alt="Nicola Ananda - Data Scientist & Developer"
                        className="w-full h-full object-cover"
                        width={400}
                        height={533}
                        loading="eager"
                      />
                    </div>
                    
                    {/* Floating Badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 liquid-glass-strong px-6 py-3 rounded-2xl border border-white/20">
                      <p className="text-sm font-semibold text-white">Data Scientist & Developer</p>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="space-y-4 mt-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {stats.slice(2).map((stat, idx) => (
                        <div key={idx} className="liquid-glass rounded-xl p-4 text-center">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="text-purple-400">{stat.icon}</div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                              {stat.value}
                            </span>
                          </div>
                          <p className="text-xs text-white/40">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quick Links */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button asChild size="sm" className="liquid-glass-button rounded-xl font-medium">
                        <Link to="/about">
                          About Me
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="liquid-glass-button rounded-xl font-medium">
                        <a href="/resume.pdf" download>
                          <Download size={14} className="mr-2" />
                          Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative py-32 px-4">
        <div className="container max-w-7xl mx-auto">
          
          {/* Section Header */}
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-white/80">What I Do</span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
              Services & Expertise
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Delivering comprehensive solutions across the full technology stack
            </p>
          </AnimatedSection>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <AnimatedSection key={idx} delay={100 + idx * 100}>
                <div className="liquid-glass-strong rounded-[2rem] p-8 transition-glass hover:-translate-y-2 h-full">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-white/60 leading-relaxed">{service.description}</p>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {service.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-3 py-1.5 text-xs font-medium rounded-lg liquid-glass text-white/70">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="relative py-32 px-4">
        <div className="container max-w-7xl mx-auto">
          
          {/* Section Header */}
          <AnimatedSection className="flex items-end justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass mb-6">
                <Star className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-white/80">Portfolio</span>
              </div>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
                Featured Work
              </h2>
              <p className="text-lg text-white/50">
                Selected projects showcasing my expertise
              </p>
            </div>
            <Link to="/portfolio" className="hidden lg:flex items-center gap-2 text-white/50 hover:text-white transition-colors font-medium">
              View All
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-white/40">{error}</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, idx) => (
                <AnimatedSection key={project._id} delay={100 + idx * 100}>
                  <Link to={`/portfolio/${project._id}`} className="group block">
                    <div className="liquid-glass-strong rounded-[2rem] overflow-hidden transition-glass hover:-translate-y-2 h-full flex flex-col">
                      
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={project.imageUrls[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                        
                        {/* Floating Actions */}
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {project.liveUrl && (
                            <div className="liquid-glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white">
                              <ExternalLink size={16} />
                            </div>
                          )}
                          {project.githubUrl && (
                            <div className="liquid-glass-button w-10 h-10 rounded-xl flex items-center justify-center text-white">
                              <Github size={16} />
                            </div>
                          )}
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-4 py-2 text-xs font-semibold rounded-xl liquid-glass text-white/90">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-4 leading-relaxed flex-1">
                          {truncateText(project.description, 100)}
                        </p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIdx) => (
                            <span key={techIdx} className="px-2.5 py-1 text-xs text-white/40 bg-white/5 rounded-lg">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2.5 py-1 text-xs text-white/30 bg-white/5 rounded-lg">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* View All Link */}
          <AnimatedSection delay={400} className="text-center mt-12">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-medium">
              Explore All Projects
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 px-4">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-[3rem] blur-3xl"></div>
              
              {/* CTA Card */}
              <div className="relative liquid-glass-strong rounded-[3rem] p-12 lg:p-16 text-center transition-glass">
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass mb-8">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-sm font-medium text-white/80">Let's Collaborate</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                  Ready to Start<br />Your Next Project?
                </h2>
                
                <p className="text-lg lg:text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Let's work together to transform your ideas into reality with data-driven solutions and modern technology.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg" className="h-14 px-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-cyan-500/25">
                    <Link to="/contact">
                      <Mail className="mr-2" size={20} />
                      Get In Touch
                    </Link>
                  </Button>
                  <button className="liquid-glass-button h-14 px-10 rounded-2xl text-white font-semibold">
                    <Link to="/about" className="flex items-center gap-2">
                      Learn More
                      <ArrowRight size={20} />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
