import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Sparkles, ChevronRight, Calendar, User, Code, Eye, Zap, Target, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SEOHead from '../components/SEOHead';

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

const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch project');
        }

        setCurrentProject(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProject();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20 bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="h-20 w-20 animate-spin rounded-full border-4 dark:border-slate-800 border-gray-200 border-t-cyan-500 mx-auto"></div>
            <div className="absolute inset-0 h-20 w-20 animate-ping rounded-full border-2 border-cyan-500/20 mx-auto"></div>
          </div>
          <p className="text-lg dark:text-slate-400 text-gray-600 font-bold">Loading project details...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20 bg-white dark:bg-slate-950">
        <div className="liquid-glass-strong rounded-3xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/20">
            <Sparkles className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-3xl font-black dark:text-white text-gray-900 mb-4">Error Loading Project</h2>
          <p className="dark:text-slate-400 text-gray-600 mb-8 leading-relaxed">{error}</p>
          <Button asChild className="rounded-2xl px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-white">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  if (!currentProject) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20 bg-white dark:bg-slate-950">
        <div className="liquid-glass-strong rounded-3xl p-12 text-center max-w-md">
          <div className="w-20 h-20 dark:bg-slate-800 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border-2 dark:border-slate-700 border-gray-200">
            <Sparkles className="w-10 h-10 dark:text-slate-500 text-gray-400" />
          </div>
          <h2 className="text-3xl font-black dark:text-white text-gray-900 mb-4">Project Not Found</h2>
          <p className="dark:text-slate-400 text-gray-600 mb-8 leading-relaxed">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="rounded-2xl px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 font-bold text-white">
            <Link to="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 overflow-hidden bg-white dark:bg-slate-950">
      <SEOHead
        title={`${currentProject.title} - Project Details | Nicola Ananda`}
        description={currentProject.description}
        keywords={`${currentProject.title}, ${currentProject.category}, ${currentProject.technologies.join(', ')}, Nicola Ananda, Portfolio`}
        url={`https://nicola.id/portfolio/${currentProject._id}`}
        image={currentProject.imageUrls[0]}
      />

      {/* Background Effects */}
      <div className="dark:opacity-100 opacity-30 liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture dark:opacity-100 opacity-50"></div>

      {/* Hero Section */}
      <section className="relative py-32">
        <div className="container px-4 relative z-10">
          <AnimatedSection>
            <Link to="/portfolio" className="group mb-12 inline-flex items-center text-base font-bold dark:text-slate-400 text-gray-600 hover:text-cyan-400 transition-colors">
              <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
            
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-cyan-400 font-bold mb-8">
                <Sparkles className="w-5 h-5" />
                Project Case Study
              </div>
              
              <span className={`inline-block px-6 py-3 rounded-2xl text-sm font-black text-white shadow-lg mb-8 ${
                currentProject.category === 'Data Analyst' 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                  : currentProject.category === 'Web Development'
                  ? 'bg-gradient-to-r from-purple-500 to-fuchsia-600'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600'
              }`}>
                {currentProject.category}
              </span>
              
              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-600">
                  {currentProject.title}
                </span>
              </h1>

              <p className="text-xl dark:text-slate-400 text-gray-600 leading-relaxed max-w-3xl">
                {currentProject.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-24 dark:bg-slate-900/50 bg-gray-50/50">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Left Column - Images */}
              <div className="lg:col-span-2">
                <AnimatedSection delay={100}>
                  {/* Main Image */}
                  <div className="relative liquid-glass-strong rounded-3xl p-4 hover:shadow-2xl transition-all duration-500 mb-8">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={currentProject.imageUrls[currentImageIndex]}
                        alt={currentProject.title}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Thumbnail Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-12">
                    {currentProject.imageUrls.map((img: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 ${
                          idx === currentImageIndex 
                            ? 'ring-4 ring-cyan-500/50 scale-105' 
                            : 'liquid-glass hover:scale-105'
                        }`}
                        onClick={() => setCurrentImageIndex(idx)}
                      >
                        <AspectRatio ratio={16/9}>
                          <img
                            src={img}
                            alt={`${currentProject.title} ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 dark:bg-slate-950/30 bg-black/20 dark:group-hover:bg-slate-950/10 group-hover:bg-black/10 transition-colors"></div>
                        </AspectRatio>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
                
                {/* Project Details */}
                <AnimatedSection delay={200}>
                  <div className="space-y-8">
                    {/* Description */}
                    <div className="liquid-glass-strong rounded-3xl p-8 transition-all duration-500 hover:shadow-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                          <Sparkles className="w-7 h-7 text-cyan-400" />
                        </div>
                        <h2 className="text-3xl font-black dark:text-white text-gray-900">Overview</h2>
                      </div>
                      <p className="text-lg dark:text-slate-300 text-gray-600 leading-relaxed">{currentProject.description}</p>
                    </div>

                    {/* Challenge */}
                    <div className="liquid-glass-strong rounded-3xl p-8 transition-all duration-500 hover:shadow-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center">
                          <Target className="w-7 h-7 text-orange-400" />
                        </div>
                        <h2 className="text-3xl font-black dark:text-white text-gray-900">The Challenge</h2>
                      </div>
                      <p className="text-lg dark:text-slate-300 text-gray-600 leading-relaxed">{currentProject.challenge}</p>
                    </div>
                    
                    {/* Solution */}
                    <div className="liquid-glass-strong rounded-3xl p-8 transition-all duration-500 hover:shadow-xl">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
                          <Award className="w-7 h-7 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-black dark:text-white text-gray-900">The Solution</h2>
                      </div>
                      <p className="text-lg dark:text-slate-300 text-gray-600 leading-relaxed">{currentProject.solution}</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              {/* Right Column - Info Sidebar */}
              <div>
                <AnimatedSection delay={150}>
                  <div className="liquid-glass-strong rounded-3xl p-8 transition-all duration-500 hover:shadow-xl sticky top-24">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass text-purple-400 font-bold mb-8">
                      <Zap className="w-5 h-5" />
                      Project Info
                    </div>
                    
                    <div className="space-y-6 mb-8">
                      {/* Client */}
                      <div className="p-5 rounded-2xl liquid-glass">
                        <div className="flex items-center mb-3">
                          <User className="w-5 h-5 text-cyan-400 mr-3" />
                          <h4 className="text-sm font-black dark:text-slate-400 text-gray-500 uppercase tracking-wider">Client</h4>
                        </div>
                        <p className="text-lg font-bold dark:text-white text-gray-900">{currentProject.client}</p>
                      </div>
                      
                      {/* Date */}
                      <div className="p-5 rounded-2xl liquid-glass">
                        <div className="flex items-center mb-3">
                          <Calendar className="w-5 h-5 text-purple-400 mr-3" />
                          <h4 className="text-sm font-black dark:text-slate-400 text-gray-500 uppercase tracking-wider">Completed</h4>
                        </div>
                        <p className="text-lg font-bold dark:text-white text-gray-900">{currentProject.completionDate}</p>
                      </div>
                      
                      {/* Technologies */}
                      <div className="p-5 rounded-2xl liquid-glass">
                        <div className="flex items-center mb-4">
                          <Code className="w-5 h-5 text-emerald-400 mr-3" />
                          <h4 className="text-sm font-black dark:text-slate-400 text-gray-500 uppercase tracking-wider">Tech Stack</h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {currentProject.technologies.map((tech: string, idx: number) => (
                            <span 
                              key={idx}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-sm font-bold text-cyan-400 hover:scale-105 transition-transform"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-4 pt-6 border-t dark:border-slate-800 border-gray-200">
                      {currentProject.liveUrl && (
                        <Button asChild className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-black text-lg shadow-lg text-white">
                          <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-3 h-5 w-5" />
                            Live Preview
                            <ChevronRight className="ml-3 h-5 w-5" />
                          </a>
                        </Button>
                      )}
                      
                      {currentProject.githubUrl && (
                        <Button asChild className="w-full h-14 rounded-2xl liquid-glass-button font-black text-lg dark:text-purple-400 text-purple-600 border border-purple-500/30">
                          <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-3 h-5 w-5" />
                            View Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="container px-4">
          <AnimatedSection>
            <div className="relative max-w-5xl mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-3xl blur-3xl"></div>
              
              {/* CTA Card */}
              <div className="relative liquid-glass-strong rounded-3xl p-12 text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass text-purple-400 font-bold mb-6">
                  <Eye className="w-5 h-5" />
                  Interested?
                </div>
                <h2 className="text-4xl lg:text-5xl font-black dark:text-white text-gray-900 mb-4 leading-tight">
                  Let's Create Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Amazing</span>
                </h2>
                <p className="text-lg dark:text-slate-400 text-gray-600 mb-8 max-w-2xl mx-auto">
                  Inspired by this project? Let's collaborate and bring your vision to life.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-lg font-black bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg text-white">
                    <Link to="/contact" className="flex items-center gap-2">
                      Start Your Project
                      <ChevronRight size={20} />
                    </Link>
                  </Button>
                  <Button asChild size="lg" className="rounded-2xl px-8 py-6 text-lg font-black liquid-glass-button dark:text-white text-gray-900">
                    <Link to="/portfolio">
                      View More Projects
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

export default PortfolioDetailPage;
