import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, Github, Loader2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface Project {
  _id: string;
  slug?: string;
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
  slug?: string;
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
          slug: project.slug,
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h2 className="text-2xl font-bold">Error Loading Projects</h2>
        <p className="text-gray-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground pt-24 pb-20">
      <SEOHead
        title="Portfolio - Nicola Ananda"
        description="Explore my portfolio of data analysis and web development projects."
        keywords="Portfolio, Projects, Data Analysis, Web Development"
        url="https://nicola.id/portfolio"
        image="/portfolio.webp"
      />

      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-[10vw] leading-[0.8] font-black tracking-tighter mb-8">
            SELECTED<br />WORK
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="text-xl md:text-2xl font-medium max-w-xl">
              A collection of projects that showcase my passion for data and design.
            </p>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${selectedCategory === cat
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                      : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {filteredProjects.map((project) => (
            <Link to={`/portfolio/${project.slug || project._id}`} key={project._id} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 mb-6">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.liveUrl && (
                    <div className="p-2 bg-white/90 dark:bg-black/90 rounded-full backdrop-blur-sm">
                      <ExternalLink size={16} />
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="p-2 bg-white/90 dark:bg-black/90 rounded-full backdrop-blur-sm">
                      <Github size={16} />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl font-bold tracking-tight group-hover:underline decoration-2 underline-offset-4">
                    {project.title}
                  </h3>
                  <ArrowRight className="transform -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-sm font-medium text-gray-400">
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No Projects Found</h3>
            <p className="text-gray-500 mb-8">Try selecting a different category.</p>
            <Button onClick={() => setSelectedCategory('All')} variant="outline">
              View All Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
