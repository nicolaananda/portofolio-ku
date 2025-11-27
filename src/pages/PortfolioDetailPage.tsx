import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Loader2, Code, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import SEOHead from '../components/SEOHead';

interface Project {
  _id: string;
  slug?: string;
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
  const [isZoomed, setIsZoomed] = useState(false);

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

    if (id) {
      fetchProject();
    }
  }, [id, API_URL]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isZoomed || !currentProject) return;

      if (e.key === 'Escape') {
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else if (e.key === 'ArrowRight' && currentImageIndex < currentProject.imageUrls.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    };

    if (isZoomed) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed, currentImageIndex, currentProject]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error || !currentProject) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <p className="text-gray-500">{error || "The project you're looking for doesn't exist."}</p>
        <Button asChild variant="outline">
          <Link to="/portfolio">Back to Portfolio</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen pt-24 pb-20">
      <SEOHead
        title={`${currentProject.title} - Nicola Ananda`}
        description={currentProject.description}
        keywords={`${currentProject.title}, ${currentProject.category}, Portfolio`}
        url={`https://nicola.id/portfolio/${currentProject.slug || currentProject._id}`}
        image={currentProject.imageUrls[0]}
      />

      <div className="container max-w-7xl mx-auto px-4">
        {/* Navigation */}
        <Link to="/portfolio" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
              {currentProject.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          <div className="space-y-8 lg:pt-4">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Category</h3>
                <p className="font-medium">{currentProject.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Client</h3>
                <p className="font-medium">{currentProject.client}</p>
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Date</h3>
                <p className="font-medium">{currentProject.completionDate}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {currentProject.liveUrl && (
                <Button asChild className="w-full justify-between group">
                  <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit Live Site
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
              {currentProject.githubUrl && (
                <Button asChild variant="outline" className="w-full justify-between group">
                  <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    View Source Code
                    <Github className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div
          className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 mb-20 cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <AspectRatio ratio={16 / 9}>
            <img
              src={currentProject.imageUrls[currentImageIndex]}
              alt={currentProject.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>

        {/* Content & Gallery */}
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Details */}
          <div className="lg:col-span-7 space-y-16">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
              <div dangerouslySetInnerHTML={{ __html: currentProject.challenge.replace(/\n/g, '<br/>') }} />

              <h3 className="text-2xl font-bold mb-4 mt-12">The Solution</h3>
              <div dangerouslySetInnerHTML={{ __html: currentProject.solution.replace(/\n/g, '<br/>') }} />
            </div>
          </div>

          {/* Right: Tech Stack & Thumbnails */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {currentProject.imageUrls.map((img, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${idx === currentImageIndex ? 'border-black dark:border-white' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <AspectRatio ratio={4 / 3}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => prev > 0 ? prev - 1 : prev);
            }}
            disabled={currentImageIndex === 0}
            className="absolute left-4 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImageIndex(prev => prev < currentProject!.imageUrls.length - 1 ? prev + 1 : prev);
            }}
            disabled={currentImageIndex === currentProject!.imageUrls.length - 1}
            className="absolute right-4 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <img
            src={currentProject!.imageUrls[currentImageIndex]}
            alt={currentProject!.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PortfolioDetailPage;
