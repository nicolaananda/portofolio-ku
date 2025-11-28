import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Layers, Loader2, Share2, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface Project {
  _id: string;
  slug?: string;
  title: string;
  category: string;
  client?: string;
  completionDate?: string;
  imageUrls: string[];
  description: string;
  challenge?: string;
  solution?: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
}

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/portfolio/${id}`);
        const data = await response.json();

        if (response.ok) {
          setProject(data.data);
        } else {
          console.error('Project not found');
          navigate('/portfolio');
        }
      } catch (err) {
        console.error('Failed to fetch project', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id, navigate, API_URL]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="bg-background text-foreground min-h-screen pb-24 relative overflow-x-hidden">
      <SEOHead
        title={`${project.title} - Project Case Study`}
        description={project.description}
        keywords={`Portfolio, ${project.category}, ${project.technologies.join(', ')}`}
        url={`https://nicola.id/portfolio/${project.slug || project._id}`}
        image={project.imageUrls[0]}
      />

      {/* TOP NAV - Floating */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
        <Link to="/portfolio" className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
          <ArrowLeft className="w-5 h-5 text-black dark:text-white" />
        </Link>
        <button className="w-10 h-10 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
          <Share2 className="w-5 h-5 text-black dark:text-white" />
        </button>
      </div>

      {/* HERO - Full Screen Mobile First */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <img
          src={project.imageUrls[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-blue-500/20">
              {project.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4 animate-reveal">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 line-clamp-2 max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAR - Horizontal Scroll */}
      <section className="border-b border-black/5 dark:border-white/5 sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="container max-w-4xl mx-auto">
          <div className="flex overflow-x-auto no-scrollbar py-4 px-6 md:px-0 gap-8 md:gap-16 items-center">
            {project.client && (
              <div className="flex flex-col flex-shrink-0">
                <span className="text-xs font-bold uppercase text-gray-400 mb-1">Client</span>
                <span className="font-bold whitespace-nowrap">{project.client}</span>
              </div>
            )}
            {project.completionDate && (
              <div className="flex flex-col flex-shrink-0">
                <span className="text-xs font-bold uppercase text-gray-400 mb-1">Date</span>
                <span className="font-bold whitespace-nowrap">{new Date(project.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            )}
            <div className="flex flex-col flex-shrink-0">
              <span className="text-xs font-bold uppercase text-gray-400 mb-1">Role</span>
              <span className="font-bold whitespace-nowrap">Full Stack Dev</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT STACK */}
      <div className="container max-w-4xl mx-auto px-4 py-12 space-y-12">

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <Button asChild className="flex-1 rounded-full h-12 font-bold shadow-lg">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                Visit Site <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </Button>
          )}
          {project.repoUrl && (
            <Button asChild variant="outline" className="flex-1 rounded-full h-12 font-bold border-2">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                Code <Github className="ml-2 w-4 h-4" />
              </a>
            </Button>
          )}
        </div>

        {/* Challenge Card */}
        <div className="glass-panel p-8 rounded-[2rem]">
          <h2 className="text-2xl font-black tracking-tighter mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 text-sm">01</span>
            The Challenge
          </h2>
          <div
            className="prose dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: project.challenge || "No challenge description provided." }}
          />
        </div>

        {/* Image 2 */}
        {project.imageUrls[1] && (
          <div className="rounded-[2rem] overflow-hidden shadow-xl">
            <img src={project.imageUrls[1]} alt="Detail 1" className="w-full h-auto" />
          </div>
        )}

        {/* Solution Card */}
        <div className="glass-panel p-8 rounded-[2rem]">
          <h2 className="text-2xl font-black tracking-tighter mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 text-sm">02</span>
            The Solution
          </h2>
          <div
            className="prose dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed max-w-none"
            dangerouslySetInnerHTML={{ __html: project.solution || "No solution description provided." }}
          />
        </div>

        {/* Tech Stack - Logos */}
        <div>
          <h3 className="text-lg font-bold mb-6">Technologies</h3>
          <div className="flex flex-wrap gap-4">
            {project.technologies.map((tech) => {
              // Simple mapping for icon names (lowercase, remove spaces/dots)
              const iconName = tech.toLowerCase().replace(/\./g, 'dot').replace(/\s+/g, '');
              // Handle special cases for Simple Icons
              const slug =
                iconName === 'react' ? 'react' :
                  iconName === 'nextjs' ? 'nextdotjs' :
                    iconName === 'nodejs' ? 'nodedotjs' :
                      iconName === 'c++' ? 'cplusplus' :
                        iconName === 'c#' ? 'csharp' :
                          iconName;

              return (
                <div key={tech} className="group flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <img
                      src={`https://cdn.simpleicons.org/${slug}/000000/ffffff`}
                      alt={tech}
                      className="w-6 h-6 dark:invert"
                      onError={(e) => {
                        // Fallback if icon not found
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerText = tech[0];
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">
                    {tech}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Image 3 */}
        {project.imageUrls[2] && (
          <div className="rounded-[2rem] overflow-hidden shadow-xl">
            <img src={project.imageUrls[2]} alt="Detail 2" className="w-full h-auto" />
          </div>
        )}

      </div>

      {/* NEXT PROJECT FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link to="/portfolio" className="group flex items-center gap-2 pl-4 pr-2 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-2xl hover:scale-105 transition-transform">
          <span className="text-sm font-bold">Next Project</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
