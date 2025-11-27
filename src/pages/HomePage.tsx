import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Code, Database, Layout, Smartphone } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useState, useEffect } from 'react';

interface Project {
  _id: string;
  slug?: string;
  title: string;
  category: string;
  imageUrls: string[];
  description: string;
  technologies: string[];
}

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/portfolio`);
        const data = await response.json();
        if (response.ok) {
          setFeaturedProjects(data.data.slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFeaturedProjects();
  }, []);

  const services = [
    {
      title: "Data Analytics",
      icon: <Database className="w-8 h-8" />,
      description: "Transforming raw data into actionable business insights with Python & SQL."
    },
    {
      title: "Web Development",
      icon: <Layout className="w-8 h-8" />,
      description: "Building high-performance, scalable web applications with React & Node.js."
    },
    {
      title: "Mobile Apps",
      icon: <Smartphone className="w-8 h-8" />,
      description: "Creating seamless mobile experiences for iOS and Android platforms."
    },
    {
      title: "System Design",
      icon: <Code className="w-8 h-8" />,
      description: "Architecting robust and scalable software solutions for complex problems."
    }
  ];

  return (
    <div className="bg-background text-foreground overflow-hidden">
      <SEOHead
        title="Nicola Ananda - Data Analyst & Web Developer"
        description="Portfolio of Nicola Ananda, a Data Analyst and Full Stack Developer based in Indonesia."
        keywords="Nicola Ananda, Portfolio, Data Analyst, Web Developer"
        url="https://nicola.id"
        image="/profile.webp"
      />

      {/* HERO SECTION - Typographic Assault */}
      <section className="relative min-h-[90vh] flex flex-col justify-center px-4 pt-20">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8 animate-fadeInUp">
            <span className="inline-block px-4 py-2 rounded-full border border-black/10 dark:border-white/10 text-sm font-medium tracking-wide">
              AVAILABLE FOR FREELANCE WORK
            </span>
          </div>

          <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter mb-8 animate-reveal">
            <span className="block">DATA</span>
            <span className="block text-gray-300 dark:text-gray-700">&</span>
            <span className="block">DESIGN</span>
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mt-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl max-w-xl font-medium leading-tight">
              I'm Nicola Ananda. I build digital products that look good and work even better.
            </p>

            <div className="flex gap-4">
              <Button asChild size="lg" className="rounded-full h-14 px-8 text-lg font-bold bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform">
                <Link to="/portfolio">
                  View Work <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-8 text-lg font-bold border-2 hover:bg-black/5 dark:hover:bg-white/10">
                <Link to="/contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <div className="border-y-2 border-black dark:border-white py-6 overflow-hidden bg-black text-white dark:bg-white dark:text-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              <span className="text-4xl font-black tracking-tighter">REACT</span>
              <span className="text-4xl font-serif italic">Python</span>
              <span className="text-4xl font-black tracking-tighter">TYPESCRIPT</span>
              <span className="text-4xl font-serif italic">Data Science</span>
              <span className="text-4xl font-black tracking-tighter">NODE.JS</span>
              <span className="text-4xl font-serif italic">UI/UX</span>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES SECTION - Sticky Stack / Grid */}
      <section className="py-32 px-4 border-b border-black/5 dark:border-white/5">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 md:mb-0">
              WHAT<br />I DO
            </h2>
            <p className="text-xl max-w-md text-gray-500 dark:text-gray-400">
              Combining technical expertise with creative problem solving to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
            {services.map((service, idx) => (
              <div key={idx} className="bg-background p-8 h-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                <div className="mb-6 text-black dark:text-white group-hover:scale-110 transition-transform duration-300 origin-left">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK - Parallax / Big Cards */}
      <section className="py-32 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
              SELECTED<br />WORK
            </h2>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-xl font-bold hover:underline decoration-2 underline-offset-4">
              View All Projects <ArrowUpRight />
            </Link>
          </div>

          <div className="space-y-20 md:space-y-32">
            {isLoading ? (
              <div className="h-96 w-full bg-gray-100 dark:bg-gray-900 animate-pulse rounded-3xl"></div>
            ) : (
              featuredProjects.map((project, idx) => (
                <Link to={`/portfolio/${project.slug || project._id}`} key={project._id} className="group block">
                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className={`md:col-span-7 ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900">
                        <img
                          src={project.imageUrls[0]}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    <div className={`md:col-span-5 ${idx % 2 === 1 ? 'md:order-1' : ''}`}>
                      <div className="space-y-6">
                        <span className="inline-block px-3 py-1 rounded-full border border-black/20 dark:border-white/20 text-xs font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight group-hover:underline decoration-4 underline-offset-8">
                          {project.title}
                        </h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="text-sm font-medium text-gray-400">
                              #{tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="mt-20 text-center md:hidden">
            <Button asChild size="lg" className="rounded-full w-full">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-4 bg-black text-white dark:bg-white dark:text-black">
        <div className="container max-w-5xl mx-auto text-center">
          <h2 className="text-[10vw] font-black tracking-tighter leading-none mb-12">
            LET'S TALK
          </h2>
          <p className="text-xl md:text-3xl font-medium mb-12 max-w-2xl mx-auto text-gray-400 dark:text-gray-600">
            Have a project in mind? I'm currently available for new opportunities.
          </p>
          <Button asChild size="lg" className="h-20 px-12 text-2xl font-bold rounded-full bg-white text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800 transition-colors">
            <Link to="/contact">
              Start a Conversation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
