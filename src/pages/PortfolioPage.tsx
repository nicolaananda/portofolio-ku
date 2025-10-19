import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { Briefcase, Sparkles, Filter, ExternalLink, Github, Eye, Grid3x3, LayoutGrid, Layers } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface Project {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

interface ApiProject {
  _id: string;
  title: string;
  category: string;
  imageUrls: string[];
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
}

interface ApiResponse {
  status: string;
  message?: string;
  data: ApiProject[];
}

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry');

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio`);
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch projects');
        }

        const transformedProjects = data.data.map((project: ApiProject) => ({
          _id: project._id,
          title: project.title,
          category: project.category,
          imageUrl: project.imageUrls[0] || '',
          description: project.description,
          technologies: project.technologies,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl
        }));

        setProjects(transformedProjects);
        const uniqueCategories = ['All', ...new Set(transformedProjects.map(project => project.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-black">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="h-20 w-20 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-500 mx-auto"></div>
            <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full border-2 border-cyan-500/20 mx-auto"></div>
          </div>
          <p className="text-slate-400 text-lg font-bold">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-black">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/20">
            <Sparkles className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">Error Loading Projects</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="rounded-2xl px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 overflow-hidden bg-black">
      {/* Enhanced Liquid Glass Background */}
      <div className="liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture"></div>
      <SEOHead
        title="Portfolio - Nicola Ananda | Data Analysis & Web Development Projects"
        description="Explore my portfolio of data analysis and web development projects showcasing Python, React, TypeScript, and modern technologies."
        keywords="Portfolio, Projects, Data Analysis, Web Development, Python, React, TypeScript"
        url="https://nicola.id/portfolio"
        image="/portfolio.webp"
      />

      {/* Hero Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 gradient-dark-mesh"></div>
        
        <div className="container px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold mb-8">
                <Briefcase className="w-5 h-5" />
                Portfolio
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
                <span className="text-white">Project </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-600">Showcase</span>
              </h1>
              
              <p className="text-xl text-slate-400 leading-relaxed mb-12">
                Explore my work spanning data science, web development, and AI integration
              </p>

              {/* View Mode Toggle */}
              <div className="flex justify-center gap-3 mb-8">
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    viewMode === 'masonry'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'liquid-glass text-slate-400 hover:border-white/20'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5 inline mr-2" />
                  Masonry
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                      : 'liquid-glass text-slate-400 hover:border-white/20'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5 inline mr-2" />
                  Grid
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="relative py-8 liquid-glass-subtle border-y border-white/5">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'liquid-glass text-slate-400 hover:border-white/20 hover:text-cyan-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative py-32">
        <div className="container px-4">
          {viewMode === 'masonry' ? (
            // Masonry Layout
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <AnimatedSection 
                  key={project._id} 
                  delay={100 + index * 50}
                  className="break-inside-avoid mb-6"
                >
                  <div className="group relative liquid-glass-strong rounded-3xl overflow-hidden transition-glass hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60"></div>
                      
                      {/* Overlay actions */}
                      <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link 
                          to={`/portfolio/${project._id}`}
                          className="p-4 liquid-glass rounded-2xl hover:bg-cyan-500/10 transition-colors"
                        >
                          <Eye className="w-6 h-6 text-cyan-400" />
                        </Link>
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 liquid-glass rounded-2xl hover:bg-purple-500/10 transition-colors"
                          >
                            <ExternalLink className="w-6 h-6 text-purple-400" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 liquid-glass rounded-2xl hover:bg-white/5 transition-colors"
                          >
                            <Github className="w-6 h-6 text-white" />
                          </a>
                        )}
                      </div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 rounded-full text-xs font-black text-white bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed mb-4">
                        {truncateText(project.description)}
                      </p>
                      
                      {/* Tech stack */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-lg font-medium border border-slate-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            // Grid Layout
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <AnimatedSection key={project._id} delay={100 + index * 50}>
                  <div className="group relative liquid-glass-strong rounded-3xl overflow-hidden transition-glass hover:-translate-y-2 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
                      
                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 rounded-full text-xs font-black text-white bg-cyan-500/20 backdrop-blur-xl border border-cyan-500/30">
                          {project.category}
                        </span>
                      </div>

                      {/* Quick actions */}
                      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-cyan-500/20 hover:bg-cyan-500/30 backdrop-blur-xl rounded-xl border border-cyan-500/30 transition-colors"
                          >
                            <ExternalLink size={16} className="text-cyan-400" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-800/50 hover:bg-slate-800/70 backdrop-blur-xl rounded-xl border border-slate-700 transition-colors"
                          >
                            <Github size={16} className="text-white" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed mb-4 flex-1">
                        {truncateText(project.description)}
                      </p>
                      
                      {/* Tech stack */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-lg font-medium border border-slate-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link 
                        to={`/portfolio/${project._id}`}
                        className="inline-flex items-center text-cyan-400 font-bold hover:text-cyan-300 transition-colors group/link"
                      >
                        View Details
                        <ExternalLink size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <AnimatedSection delay={300} className="text-center py-20">
              <div className="liquid-glass-strong rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4">No Projects Found</h3>
                <p className="text-slate-400">
                  No projects match the selected category. Try another filter.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        
        <div className="container px-4 relative">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold mb-8">
                <Sparkles className="w-5 h-5" />
                Let's Collaborate
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Like What You <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">See?</span>
              </h2>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="rounded-2xl px-10 py-8 text-xl font-black bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg neon-cyan">
                  <Link to="/contact">
                    Start a Project
                    <Layers size={24} className="ml-3" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-2xl px-10 py-8 text-xl font-black border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-400">
                  <Link to="/about">
                    Learn More
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

export default PortfolioPage;
