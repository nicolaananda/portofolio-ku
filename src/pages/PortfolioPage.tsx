import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { useState, useEffect } from 'react';
import { Briefcase, Sparkles, Filter, ChevronDown } from 'lucide-react';

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

        // Transform the data to match our Project interface
        const transformedProjects = data.data.map((project: ApiProject) => ({
          _id: project._id,
          title: project.title,
          category: project.category,
          imageUrl: project.imageUrls[0] || '', // Use the first image as the main image
          description: project.description,
        }));

        setProjects(transformedProjects);

        // Extract unique categories from projects and add 'All' category
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Projects</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Elegant Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
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
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8">
                <Briefcase className="w-4 h-4" />
                My Work
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
                Project <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Portfolio</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-12">
                Explore my recent projects and see how I approach design and development challenges with a focus on 
                <span className="text-gray-800 font-medium"> data-driven solutions</span> and modern web technologies.
              </p>
            </div>
          </AnimatedSection>
        </div>

        {/* Elegant scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <p className="text-xs font-medium tracking-widest uppercase">Explore Projects</p>
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>
      
      {/* Portfolio Content Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container px-4">
          {/* Category Filter */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
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
                        ? 'bg-gradient-to-r from-primary to-accent text-white border-transparent shadow-xl hover:shadow-2xl hover:shadow-primary/20 transform hover:-translate-y-0.5' 
                        : 'border-gray-200 text-gray-700 hover:border-primary/30 hover:bg-primary/5 hover:text-primary backdrop-blur-sm'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    <span className="relative z-10">{cat}</span>
                    {selectedCategory === cat && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          {/* Projects Grid */}
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <AnimatedSection 
                key={project._id} 
                delay={200 + index * 100}
                className="group"
              >
                <Link to={`/portfolio/${project._id}`}>
                  <div className="relative overflow-hidden rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white transform hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"></div>
                      
                      {/* View button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 z-30">
                        <Button 
                          variant="secondary" 
                          className="bg-white/90 text-gray-900 hover:bg-white border-2 border-white/30 backdrop-blur-sm shadow-2xl transform scale-90 group-hover:scale-100 transition-all duration-300 rounded-2xl px-6 py-3 font-semibold"
                        >
                          View Details
                        </Button>
                      </div>
                      
                      {/* Category badge */}
                      <div className="absolute top-6 left-6 z-30">
                        <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg border border-white/20 backdrop-blur-sm ${
                          project.category === 'Data Analyst' 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                            : project.category === 'Web Development'
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                            : 'bg-gradient-to-r from-green-500 to-green-600'
                        }`}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
          
          {/* No results message */}
          {filteredProjects.length === 0 && (
            <AnimatedSection delay={300} className="text-center py-20">
              <div className="glass-effect rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Projects Found</h3>
                <p className="text-gray-600 font-light">
                  No projects match the selected category. Try selecting a different filter.
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;