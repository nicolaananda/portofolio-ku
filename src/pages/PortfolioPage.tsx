import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { Briefcase, Sparkles, Filter, ChevronDown, ExternalLink, Github, Eye } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface Project {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

interface ApiProject {
  _id: string;
  title: string;
  category: string;
  imageUrls: string[];
  description: string;
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

  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="relative">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary/20 border-t-primary mx-auto mb-4"></div>
            <div className="absolute inset-0 h-16 w-16 animate-ping rounded-full border-2 border-primary/10 mx-auto"></div>
          </div>
          <p className="text-gray-600 text-lg">Loading amazing projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Projects</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="rounded-2xl px-6 py-3">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 overflow-hidden">
      <SEOHead
        title="Portfolio - Nicola Ananda | Data Analysis & Web Development Projects"
        description="Explore my portfolio of data analysis and web development projects. See real-world applications showcasing Python, React, TypeScript, and modern technologies."
        keywords="Portfolio, Projects, Data Analysis, Web Development, Python, React, TypeScript, Nicola Ananda"
        url="https://nicola.id/portfolio"
        image="/portfolio.webp"
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
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-8">
                <Briefcase className="w-4 h-4" />
                My Work
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                Project <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Portfolio</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                Explore my recent projects showcasing innovation in 
                <span className="text-gray-800 font-semibold"> data science</span> and modern web technologies.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-xs font-medium tracking-widest uppercase">Explore Projects</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>
      
      {/* Enhanced Portfolio Content Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,1)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>

        <div className="container px-4 relative z-10">
          {/* Category Filter */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                <Filter className="w-4 h-4" />
                Filter Projects
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    className={`group rounded-2xl px-6 py-3 text-sm font-semibold transition-all duration-300 border-2 ${
                      selectedCategory === cat 
                        ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-xl hover:shadow-2xl hover:shadow-primary/25 transform hover:-translate-y-1' 
                        : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary backdrop-blur-sm'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className="relative z-10">{cat}</span>
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          {/* Enhanced Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <AnimatedSection 
                key={project._id} 
                delay={200 + index * 100}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    
                    {/* Category badge */}
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

                    {/* Hover Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/portfolio/${project._id}`}>
                        <div className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors backdrop-blur-sm shadow-lg">
                          <Eye size={16} className="text-gray-700" />
                        </div>
                      </Link>
                    </div>
                    
                    {/* Project Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {truncateText(project.description)}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/portfolio/${project._id}`} 
                        className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group/link"
                      >
                        View Details
                        <span className="ml-1 group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                      
                      <div className="flex gap-2">
                        <div className="p-2 bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors cursor-pointer">
                          <ExternalLink size={14} />
                        </div>
                        <div className="p-2 bg-gray-100 hover:bg-gray-800 hover:text-white rounded-full transition-colors cursor-pointer">
                          <Github size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          {/* Enhanced No Results Message */}
          {filteredProjects.length === 0 && (
            <AnimatedSection delay={300} className="text-center py-20">
              <div className="bg-white rounded-3xl p-12 max-w-md mx-auto border border-gray-100 shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Projects Found</h3>
                <p className="text-gray-600">
                  No projects match the selected category. Try selecting a different filter.
                </p>
              </div>
            </AnimatedSection>
          )}
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
                  <Sparkles className="w-4 h-4" />
                  Ready to Collaborate
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Like What You <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">See?</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Ready to bring your ideas to life? Let's discuss how we can create something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                    <Link to="/contact">
                      <span className="relative z-10 flex items-center">
                        Start a Project
                        <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </span>
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
                    <Link to="/about">
                      Learn More About Me
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

export default PortfolioPage;