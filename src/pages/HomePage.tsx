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
    <div className="min-h-screen bg-white dark:bg-black overflow-hidden">
      <SEOHead
        title="Nicola Ananda - Data Analyst & Web Developer | Portfolio"
        description="Professional Data Analyst and Full Stack Web Developer specializing in React, TypeScript, Python, and modern web technologies."
        keywords="Nicola Ananda, Data Analyst, Web Developer, React, TypeScript, Python, Portfolio"
        url="https://nicola.id"
        image="/profile.webp"
        structuredData={structuredData}
      />

      {/* Enhanced Liquid Glass Background */}
      <div className="dark:opacity-100 opacity-30 liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture dark:opacity-100 opacity-50"></div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center px-4 py-24">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <AnimatedSection className="space-y-6">
              {/* Main Heading */}
              <div className="space-y-3">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                  <span className="block dark:text-white text-gray-900">Nicola</span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Ananda
                  </span>
                </h1>
                
                <div className="flex items-baseline gap-3 text-lg lg:text-xl">
                  <TypingAnimation
                    strings={typingStrings}
                    className="font-medium dark:text-white/60 text-gray-600"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-base lg:text-lg dark:text-white/50 text-gray-600 leading-relaxed max-w-lg">
                Transforming data into insights and building digital experiences.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg" className="h-11 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium">
                  <Link to="/portfolio">
                    View Work
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
                <Button asChild size="lg" className="liquid-glass-button h-11 px-6 rounded-xl dark:text-white text-gray-900 font-medium">
                  <Link to="/contact" className="flex items-center gap-2">
                    <Mail size={16} />
                    Contact
                  </Link>
                </Button>
              </div>

              {/* Social */}
              <div className="pt-2">
                <SocialIcons />
              </div>
            </AnimatedSection>

            {/* Right - Profile Image */}
            <AnimatedSection delay={200}>
              <div className="relative">
                {/* Profile Card */}
                <div className="relative liquid-glass-strong rounded-3xl p-4 transition-glass">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                    <img
                      src="/profile_optimized.jpg"
                      alt="Nicola Ananda - Data Scientist & Developer"
                      className="w-full h-full object-cover"
                      width={400}
                      height={533}
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Stats - Clean section below hero */}
          <AnimatedSection delay={300} className="mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="liquid-glass rounded-xl p-5 text-center transition-transform hover:-translate-y-1">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-cyan-400">{stat.icon}</div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs dark:text-white/50 text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          
          {/* Section Header */}
          <AnimatedSection className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-3">
              Services
            </h2>
            <p className="text-base dark:text-white/50 text-gray-600 max-w-xl">
              Delivering solutions across the full technology stack
            </p>
          </AnimatedSection>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <AnimatedSection key={idx} delay={100 + idx * 100}>
                <div className="liquid-glass-strong rounded-2xl p-6 transition-glass hover:-translate-y-1 h-full">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-2">{service.title}</h3>
                      <p className="dark:text-white/60 text-gray-600 text-sm leading-relaxed">{service.description}</p>
                    </div>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {service.skills.map((skill, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 text-xs font-medium rounded-lg liquid-glass dark:text-white/70 text-gray-700">
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
      <section className="relative py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          
          {/* Section Header */}
          <AnimatedSection className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-2">
                Featured Work
              </h2>
              <p className="text-base dark:text-white/50 text-gray-600">
                Selected projects
              </p>
            </div>
            <Link to="/portfolio" className="hidden lg:flex items-center gap-2 dark:text-white/50 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors text-sm font-medium">
              View All
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-10 w-10 animate-spin rounded-full border-2 dark:border-white/10 border-gray-300 border-t-cyan-400"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="dark:text-white/40 text-gray-500 text-sm">{error}</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-4">
              {featuredProjects.map((project, idx) => (
                <AnimatedSection key={project._id} delay={100 + idx * 100}>
                  <Link to={`/portfolio/${project._id}`} className="group block">
                    <div className="liquid-glass-strong rounded-2xl overflow-hidden transition-glass hover:-translate-y-1 h-full flex flex-col">
                      
                      {/* Image */}
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img 
                          src={project.imageUrls[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                        {/* Category Badge */}
                        <div className="absolute bottom-3 left-3">
                          <span className="px-3 py-1.5 text-xs font-medium rounded-lg liquid-glass text-white/90">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold dark:text-white text-gray-900 mb-2 group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="dark:text-white/50 text-gray-600 text-sm mb-3 leading-relaxed flex-1 line-clamp-2">
                          {truncateText(project.description, 80)}
                        </p>
                        
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.slice(0, 3).map((tech, techIdx) => (
                            <span key={techIdx} className="px-2 py-0.5 text-xs dark:text-white/40 text-gray-600 dark:bg-white/5 bg-gray-100 rounded">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-0.5 text-xs dark:text-white/30 text-gray-500 dark:bg-white/5 bg-gray-100 rounded">
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
          <AnimatedSection delay={400} className="text-center mt-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 dark:text-white/50 text-gray-600 dark:hover:text-white hover:text-gray-900 transition-colors text-sm font-medium">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="liquid-glass-strong rounded-2xl p-10 lg:p-12 text-center transition-glass">
              
              <h2 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-3 leading-tight">
                Ready to Start Your Next Project?
              </h2>
              
              <p className="text-base dark:text-white/50 text-gray-600 mb-8 max-w-xl mx-auto">
                Let's work together to transform your ideas into reality.
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" className="h-11 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-medium">
                  <Link to="/contact">
                    <Mail className="mr-2" size={16} />
                    Get In Touch
                  </Link>
                </Button>
                <Button asChild size="lg" className="liquid-glass-button h-11 px-8 rounded-xl dark:text-white text-gray-900 font-medium">
                  <Link to="/about" className="flex items-center gap-2">
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
