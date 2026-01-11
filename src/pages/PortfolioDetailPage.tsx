import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, Layers, Loader2, Share2, ArrowUpRight, Sparkles } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { HTMLContent } from '@/components/HTMLContent';
import { motion, AnimatePresence } from 'framer-motion';

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
  summary?: string;
  liveUrl?: string;
  repoUrl?: string;
}

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden selection:bg-blue-500/30">
      <SEOHead
        title={`${project.title} - Project Case Study`}
        description={project.description}
        keywords={`Portfolio, ${project.category}, ${project.technologies?.join(', ')}`}
        url={`https://nicola.id/portfolio/${project.slug || project._id}`}
        image={project.imageUrls?.[0]}
      />

      {/* NOISE TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* BACKGROUND BLOBS */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30 dark:opacity-20 overflow-hidden">
        <div className="absolute -top-[20%] right-0 w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      {/* NAVIGATION */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none mix-blend-difference text-white"
      >
        <Link to="/portfolio" className="group flex items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-3 group-hover:-translate-x-2 transition-transform duration-300">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-bold tracking-widest uppercase text-sm hidden md:block">Back</span>
          </div>
        </Link>
        <button
          onClick={() => {
            const shareData = {
              title: project.title,
              text: project.description?.slice(0, 100),
              url: window.location.href,
            };
            if (navigator.share) {
              navigator.share(shareData).catch(console.error);
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }
          }}
          className="group pointer-events-auto hover:rotate-12 transition-transform duration-300"
          aria-label="Share project"
        >
          <Share2 className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="container max-w-7xl mx-auto px-4 md:px-8 relative z-10 pt-32 pb-24">

        {/* HEADER SECTION - CENTERED */}
        <div className="flex flex-col items-center text-center space-y-8 mb-16 md:mb-24">
          {/* Category Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">{project.category}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60"
          >
            {project.title}
          </motion.h1>

          {/* AI Summary / Short Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            {project.summary ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-blue-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">AI Overview</span>
                </div>
                <p className="text-xs md:text-2xl text-foreground/90 font-serif italic leading-relaxed">
                  "{project.summary}"
                </p>
              </div>
            ) : (
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {project.description?.replace(/<[^>]*>?/gm, '').slice(0, 180)}...
              </p>
            )}
          </motion.div>
        </div>

        {/* VISUALS SECTION (Hero + Gallery) */}
        <div className="mb-24 space-y-12">
          {/* HERO IMAGE */}
          {project.imageUrls?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-2xl group cursor-zoom-in border border-foreground/5"
              onClick={() => setSelectedImage(project.imageUrls[0])}
            >
              <img
                src={project.imageUrls[0]}
                alt={`${project.title} Main Visual`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          )}

          {/* GALLERY SLIDER (Moved to Top) */}
          {project.imageUrls?.length > 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-2">
                <h2 className="text-xl font-bold opacity-50 uppercase tracking-widest">Gallery</h2>
                <div className="h-px flex-1 bg-foreground/10" />
              </div>

              <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:-mx-0 md:px-0">
                {project.imageUrls.slice(1).map((img, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="snap-center shrink-0 w-[85vw] md:w-[400px] aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-lg cursor-zoom-in relative group border border-foreground/5"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img src={img} className="w-full h-full object-cover object-top" alt={`Detail shot ${idx + 1}`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CONTENT GRID */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12 lg:gap-24 items-start">

          {/* LEFT: RICH CONTENT (With Border) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-gray-50/50 dark:bg-white/5 border border-foreground/5 backdrop-blur-sm"
          >
            <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:font-black prose-headings:tracking-tight prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-img:rounded-2xl">
              <HTMLContent html={project.description} />
            </div>
          </motion.div>

          {/* RIGHT: STICKY SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:sticky lg:top-32 space-y-8"
          >
            <div className="p-8 rounded-[2rem] bg-gray-50/50 dark:bg-white/5 border border-foreground/5 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5" /> Project Details
              </h3>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Role</span>
                  <p className="font-medium">Full Stack Developer</p>
                </div>
                {project.client && (
                  <div className="pt-4 border-t border-foreground/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Client</span>
                    <p className="font-medium">{project.client}</p>
                  </div>
                )}
                {project.completionDate && (
                  <div className="pt-4 border-t border-foreground/5">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">Date</span>
                    <p className="font-medium">{new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                  </div>
                )}
                <div className="pt-4 border-t border-foreground/5">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">Technologies</span>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-bold rounded-full bg-background border border-foreground/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background rounded-xl font-bold hover:opacity-90 transition-opacity">
                    Visit Live Site <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-4 border border-foreground/10 rounded-xl font-bold hover:bg-foreground/5 transition-colors">
                    <Github className="w-4 h-4" /> View Source
                  </a>
                )}
              </div>
            </div>
          </motion.div>

        </div>

        <div className="h-px bg-foreground/10 my-24" />

        {/* Next Project Teaser
        <div className="bg-gray-50/50 dark:bg-white/5 p-12 rounded-[2.5rem] text-center border border-foreground/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-lg text-gray-500 uppercase tracking-widest mb-4">Up Next</h3>
          <Link to="/portfolio" className="inline-block">
            <span className="text-4xl md:text-6xl font-black tracking-tighter hover:underline decoration-4 underline-offset-8 decoration-blue-500">
              Explore More
            </span>
          </Link>
        </div> */}
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <span className="text-2xl leading-none">&times;</span>
            </button>

            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              src={selectedImage}
              alt="Full screen view"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDetailPage;
