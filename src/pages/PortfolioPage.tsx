import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { Briefcase, Sparkles, ExternalLink, Github, Layers } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="h-20 w-20 animate-spin rounded-full border-4 dark:border-slate-800 border-gray-200 border-t-cyan-500 mx-auto"></div>
            <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full border-2 border-cyan-500/20 mx-auto"></div>
          </div>
          <p className="dark:text-slate-400 text-gray-600 text-lg font-bold">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/20">
            <Sparkles className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-black dark:text-white text-gray-900 mb-4">Error Loading Projects</h2>
          <p className="dark:text-slate-400 text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="rounded-2xl px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 overflow-hidden bg-white dark:bg-black">
      {/* Enhanced Liquid Glass Background */}
      <div className="dark:opacity-100 opacity-30 liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture dark:opacity-100 opacity-50"></div>
      <SEOHead
        title="Portfolio - Nicola Ananda | Data Analysis & Web Development Projects"
        description="Explore my portfolio of data analysis and web development projects showcasing Python, React, TypeScript, and modern technologies."
        keywords="Portfolio, Projects, Data Analysis, Web Development, Python, React, TypeScript"
        url="https://nicola.id/portfolio"
        image="/portfolio.webp"
      />

      {/* Hero Section - Compact */}
      <section className="relative pt-32 pb-16">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full liquid-glass text-cyan-400 font-semibold mb-6">
                <Briefcase className="w-4 h-4" />
                My Work
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black mb-4 leading-tight">
                <span className="dark:text-white text-gray-900">Featured </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-600">Projects</span>
              </h1>
              
              <p className="text-lg dark:text-slate-400 text-gray-600 mb-8">
                Showcasing my best work in data science, web development & AI
              </p>

              {/* Filter Pills - Inline */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg scale-105'
                        : 'liquid-glass dark:text-slate-400 text-gray-600 hover:scale-105 hover:text-cyan-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Section - Bento Grid Style */}
      <section className="relative py-16 pb-32">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project._id} delay={50 + index * 30}>
                <Link to={`/portfolio/${project._id}`} className="group block h-full">
                  <div className="relative liquid-glass-strong rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
                    {/* Image with Overlay */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                      
                      {/* Category Badge - Top Left */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider bg-gradient-to-r from-cyan-500/80 to-purple-600/80 backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Quick Action Icons - Top Right */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        {project.liveUrl && (
                          <a 
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white/10 hover:bg-cyan-500/30 backdrop-blur-md rounded-lg border border-white/20 transition-all hover:scale-110"
                            title="View Live"
                          >
                            <ExternalLink size={14} className="text-white" />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 bg-white/10 hover:bg-purple-500/30 backdrop-blur-md rounded-lg border border-white/20 transition-all hover:scale-110"
                            title="View Code"
                          >
                            <Github size={14} className="text-white" />
                          </a>
                        )}
                      </div>

                      {/* Hover Overlay Info */}
                      <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-full">
                          <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-1">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            Click to view details
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-black dark:text-white text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-600 transition-all">
                        {project.title}
                      </h3>
                      
                      <p className="dark:text-slate-400 text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack Pills */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t dark:border-slate-800/50 border-gray-200">
                          {project.technologies.slice(0, 4).map((tech, idx) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-1 text-[10px] font-semibold rounded-md dark:bg-gradient-to-r dark:from-cyan-500/10 dark:to-purple-500/10 bg-gradient-to-r from-cyan-50 to-purple-50 dark:text-cyan-400 text-cyan-600 dark:border-cyan-500/20 border-cyan-200 border uppercase tracking-wide"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-2.5 py-1 text-[10px] font-bold rounded-md dark:text-purple-400 text-purple-600">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <AnimatedSection delay={200} className="col-span-full">
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 mb-6">
                  <Sparkles className="w-10 h-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-black dark:text-white text-gray-900 mb-2">No Projects Found</h3>
                <p className="dark:text-slate-400 text-gray-600 mb-6">
                  Try selecting a different category
                </p>
                <button 
                  onClick={() => setSelectedCategory('All')}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:shadow-lg transition-all"
                >
                  View All Projects
                </button>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="relative py-20">
        <div className="container px-4">
          <AnimatedSection>
            <div className="relative max-w-5xl mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-3xl"></div>
              
              {/* CTA Card */}
              <div className="relative liquid-glass-strong rounded-3xl p-12 text-center">
                <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-gray-900 mb-4 leading-tight">
                  Have a Project in Mind?
                </h2>
                <p className="text-lg dark:text-slate-400 text-gray-600 mb-8 max-w-2xl mx-auto">
                  Let's collaborate and create something amazing together
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-lg font-black bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg text-white">
                    <Link to="/contact" className="flex items-center gap-2">
                      Start a Project
                      <Layers size={20} />
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-lg font-black liquid-glass-button dark:text-white text-gray-900">
                    <Link to="/about">
                      Learn More About Me
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
