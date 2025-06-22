import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Sparkles, ChevronDown, Calendar, User, Code, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
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
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="relative p-12 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl opacity-60"></div>
          <div className="relative">
            <div className="relative">
              <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-primary/20 border-t-primary mb-6"></div>
              <div className="absolute inset-0 h-16 w-16 mx-auto animate-ping rounded-full border-2 border-primary/10"></div>
            </div>
            <p className="text-lg text-gray-600">Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <div className="relative p-12 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm text-center max-w-md">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/30 rounded-3xl opacity-60"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Project</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
            <Button asChild className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-8 py-3 hover:shadow-xl transition-all duration-300 rounded-2xl">
              <Link to="/portfolio">
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Portfolio
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentProject) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <div className="relative p-12 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm text-center max-w-md">
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 to-orange-50/30 rounded-3xl opacity-60"></div>
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">The project you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white px-8 py-3 hover:shadow-xl transition-all duration-300 rounded-2xl">
              <Link to="/portfolio">
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                  Back to Portfolio
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 overflow-hidden">
      <SEOHead
        title={`${currentProject.title} - Project Details | Nicola Ananda`}
        description={currentProject.description}
        keywords={`${currentProject.title}, ${currentProject.category}, ${currentProject.technologies.join(', ')}, Nicola Ananda, Portfolio`}
        url={`https://nicola.id/portfolio/${currentProject._id}`}
        image={currentProject.imageUrls[0]}
      />

      {/* Modern Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/30 via-transparent to-pink-50/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.1),transparent),radial-gradient(ellipse_at_bottom_right,rgba(255,154,158,0.1),transparent)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-16 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-8 w-24 h-24 bg-gradient-to-br from-accent/6 to-primary/6 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <Link to="/portfolio" className="group mb-8 inline-flex items-center text-base font-medium text-gray-600 hover:text-primary transition-colors">
              <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
            
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                Project Details
              </div>
              
              <span className={`inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg border border-white/20 backdrop-blur-sm mb-8 ${
                currentProject.category === 'Data Analyst' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                  : currentProject.category === 'Web Development'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                  : 'bg-gradient-to-r from-green-500 to-green-600'
              }`}>
                {currentProject.category}
              </span>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8 tracking-tight">
                <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">
                  {currentProject.title}
                </span>
              </h1>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-xs font-medium tracking-widest uppercase">View Details</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>
      
      {/* Enhanced Project Content Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-16 lg:grid-cols-3 lg:gap-20">
              <div className="lg:col-span-2">
                <AnimatedSection delay={100}>
                  <div className="relative p-4 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm mb-12">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={currentProject.imageUrls[currentImageIndex]}
                        alt={currentProject.title}
                        className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {currentProject.imageUrls.map((img: string, idx: number) => (
                      <div 
                        key={idx} 
                        className={`group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-lg border ${
                          idx === currentImageIndex 
                            ? 'ring-4 ring-primary/50 shadow-2xl scale-105 border-primary/30' 
                            : 'hover:scale-105 border-gray-100 hover:border-gray-200 bg-white/80 backdrop-blur-sm'
                        }`}
                        onClick={() => setCurrentImageIndex(idx)}
                      >
                        <AspectRatio ratio={16/9}>
                          <img
                            src={img}
                            alt={`${currentProject.title} ${idx + 1}`}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </AspectRatio>
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
                
                <AnimatedSection delay={200} className="mt-16">
                  <div className="relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-8">
                        <Code className="w-4 h-4" />
                        Project Details
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Implementation</h2>
                  
                      <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                          <h3 className="text-xl font-semibold mb-4 text-blue-700 flex items-center">
                            <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">i</span>
                            </div>
                            Project Description
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-lg">{currentProject.description}</p>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100">
                          <h3 className="text-xl font-semibold mb-4 text-red-700 flex items-center">
                            <div className="w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">!</span>
                            </div>
                            The Challenge
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-lg">{currentProject.challenge}</p>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                          <h3 className="text-xl font-semibold mb-4 text-green-700 flex items-center">
                            <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">✓</span>
                            </div>
                            The Solution
                          </h3>
                          <p className="text-gray-700 leading-relaxed text-lg">{currentProject.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
              
              <div>
                <AnimatedSection delay={150}>
                  <div className="relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm sticky top-24">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        Project Info
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-8">Project Information</h3>
                      
                      <div className="space-y-6">
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                          <div className="flex items-center mb-3">
                            <User className="w-5 h-5 text-blue-600 mr-2" />
                            <h4 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Client</h4>
                          </div>
                          <p className="text-lg font-semibold text-gray-900">{currentProject.client}</p>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                          <div className="flex items-center mb-3">
                            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                            <h4 className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Completion Date</h4>
                          </div>
                          <p className="text-lg font-semibold text-gray-900">{currentProject.completionDate}</p>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                          <div className="flex items-center mb-4">
                            <Code className="w-5 h-5 text-green-600 mr-2" />
                            <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide">Technologies Used</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {currentProject.technologies.map((tech: string, idx: number) => (
                              <span 
                                key={idx}
                                className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border border-white/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-3 pt-6 border-t border-gray-100">
                          {currentProject.liveUrl && (
                            <Button asChild className="group relative overflow-hidden w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl transition-all duration-300 h-12 rounded-2xl font-semibold">
                              <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                <span className="relative z-10 flex items-center justify-center">
                                  <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                  Live Preview
                                </span>
                              </a>
                            </Button>
                          )}
                          
                          {currentProject.githubUrl && (
                            <Button asChild variant="outline" className="w-full hover:bg-primary/10 hover:text-primary h-12 rounded-2xl font-semibold border-2 border-gray-200 hover:border-primary/30 transition-all duration-300">
                              <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                View Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
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
            <AnimatedSection>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                  <Eye className="w-4 h-4" />
                  Interested in Similar Work?
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Let's Create Something <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Amazing</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Inspired by this project? Let's collaborate and bring your vision to life with the same dedication and expertise.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                    <Link to="/contact">
                      <span className="relative z-10 flex items-center">
                        Start Your Project
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
                    <Link to="/portfolio">
                      View More Projects
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioDetailPage;
