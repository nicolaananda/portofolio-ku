import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, Code, Database, Layout, Smartphone, MousePointer2, MapPin, Github, Linkedin, Mail, Terminal, Cpu, Globe, BarChart3, PieChart, Activity } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
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
      icon: <Database className="w-6 h-6" />,
      description: "Turning raw data into clear, actionable insights."
    },
    {
      title: "Web Development",
      icon: <Layout className="w-6 h-6" />,
      description: "Crafting pixel-perfect, high-performance websites."
    },
    {
      title: "Mobile Apps",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Native-feeling mobile experiences for all devices."
    },
    {
      title: "System Design",
      icon: <Code className="w-6 h-6" />,
      description: "Scalable architecture for complex digital problems."
    }
  ];

  return (
    <div className="bg-background text-foreground overflow-x-hidden relative">
      <SEOHead
        title="Nicola Ananda - Data Analyst & Full Stack Developer"
        description="Portfolio of Nicola Ananda. Specializing in Data Analytics, Web Development, and System Design. Based in Malang, Indonesia."
        keywords="Nicola Ananda, Data Analyst, Full Stack Developer, Web Developer, Portfolio, Malang, Indonesia"
        url="https://nicola.id"
        image="/og-image.webp"
      />

      {/* Background Elements - Abstract & Tech */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Animated Blobs */}
        <div className="blob bg-blue-500/20 w-[800px] h-[800px] top-[-200px] left-[-200px] mix-blend-multiply filter blur-[120px] animate-blob"></div>
        <div className="blob bg-purple-500/20 w-[600px] h-[600px] bottom-[-100px] right-[-100px] mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="blob bg-emerald-500/20 w-[400px] h-[400px] top-[40%] left-[60%] mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000 opacity-50"></div>
      </div>

      {/* HERO SECTION - Bento Grid (No Photo, Abstract Visuals) */}
      <section className="min-h-screen flex flex-col justify-center px-4 pt-24 pb-12">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {/* 1. Intro Card (Large) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 glass-panel p-8 md:p-12 flex flex-col justify-center rounded-[2.5rem] animate-fadeInUp relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Code className="w-32 h-32" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-6 w-fit relative z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for work
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-6 relative z-10">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Nicola.</span><br />
                I turn data into digital experiences.
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-md relative z-10">
                A Data Analyst & Full Stack Developer. I build systems that are not just functional, but intelligent and beautiful.
              </p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <Button asChild className="rounded-full h-12 px-8 font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <Link to="/contact">Let's Talk</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 px-8 font-bold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                  <Link to="/portfolio">View Work</Link>
                </Button>
              </div>
            </div>

            {/* 2. Abstract Data Visual (Tall) - Replaces Photo */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 row-span-1 md:row-span-2 glass-panel p-6 rounded-[2.5rem] relative overflow-hidden group animate-fadeInUp flex flex-col" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">System Status</h3>
                <Activity className="w-4 h-4 text-green-500 animate-pulse" />
              </div>

              {/* Fake Terminal / Data Stream */}
              <div className="flex-1 bg-black/5 dark:bg-white/5 rounded-2xl p-4 font-mono text-xs overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/10 pointer-events-none"></div>
                <div className="space-y-2 text-gray-600 dark:text-gray-400 opacity-80">
                  <p><span className="text-blue-500">➜</span> <span className="text-purple-500">~</span> init portfolio_v6</p>
                  <p><span className="text-green-500">✔</span> Loaded modules...</p>
                  <p><span className="text-green-500">✔</span> React.js initialized</p>
                  <p><span className="text-green-500">✔</span> Tailwind CSS ready</p>
                  <p><span className="text-blue-500">➜</span> <span className="text-purple-500">~</span> analyzing data...</p>
                  <div className="flex gap-1 h-16 items-end mt-4">
                    {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                      <div key={i} className="flex-1 bg-blue-500/50 rounded-t-sm animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                  </div>
                  <p className="mt-4"><span className="text-blue-500">➜</span> <span className="text-purple-500">~</span> optimization: <span className="text-green-500">100%</span></p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Location</p>
                    <p className="font-bold">Malang, Indonesia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Role / Stats (Small) */}
            <div className="col-span-1 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-between animate-fadeInUp hover:scale-[1.02] transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-1">Data Driven</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Analytics & Insights</p>
              </div>
              <div className="mt-8">
                <div className="text-4xl font-black mb-1">4+</div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Years Exp.</p>
              </div>
            </div>

            {/* 4. Tech Stack (Wide) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-center animate-fadeInUp relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <div className="absolute -right-10 -bottom-10 opacity-5">
                <Cpu className="w-40 h-40" />
              </div>
              {/* Tech Stack - Logos */}
              <div className="mb-12">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-4">
                  {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'Python', 'SQL', 'Tableau'].map((tech) => {
                    const iconName = tech.toLowerCase().replace(/\./g, 'dot').replace(/\s+/g, '');
                    const slug =
                      iconName === 'react' ? 'react' :
                        iconName === 'nextjs' ? 'nextdotjs' :
                          iconName === 'nodejs' ? 'nodedotjs' :
                            iconName === 'c++' ? 'cplusplus' :
                              iconName === 'c#' ? 'csharp' :
                                iconName === 'tailwind' ? 'tailwindcss' :
                                  iconName === 'sql' ? 'postgresql' :
                                    iconName === 'tableau' ? 'tableau' :
                                      iconName;

                    return (
                      <div key={tech} className="group flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border border-black/5 dark:border-white/5 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={`https://cdn.simpleicons.org/${slug}/000000/ffffff`}
                            alt={tech}
                            className="w-5 h-5 dark:invert"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerText = tech[0];
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 5. Socials (Small) */}
            <div className="col-span-1 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-bold mb-6">Connect</h3>
              <div className="flex gap-4">
                <a href="https://github.com/nicolaananda" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/nicolaananda" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-[#0077b5] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:gmail@nicola.id" className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES - Glass Cards with Hover Effect */}
      <section className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">What I Do</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Solving complex problems with code and data.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className="group glass-panel p-8 rounded-[2rem] hover:scale-[1.02] transition-transform duration-300 border-t-4 border-transparent hover:border-blue-500">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center mb-6 text-black dark:text-white group-hover:rotate-6 transition-transform shadow-inner">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK - Enhanced Grid */}
      <section className="py-20 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Selected Work
            </h2>
            <Link to="/portfolio" className="hidden md:flex items-center gap-2 font-bold hover:underline decoration-2 underline-offset-4">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-gray-100 dark:bg-gray-900 rounded-[2rem] animate-pulse" />
              ))
            ) : (
              featuredProjects.map((project) => (
                <Link
                  to={`/portfolio/${project.slug || project.id}`}
                  key={project.id}
                  className="group block"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-gray-900 mb-6 relative shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                      <p className="text-white font-bold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Case Study</p>
                    </div>
                  </div>

                  <div className="px-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                          {project.category}
                        </div>
                        <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Button asChild variant="outline" className="rounded-full h-12 px-8">
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA SECTION - Glass Panel */}
      <section className="py-20 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="glass-panel rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Inner Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                Ready to collaborate?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                I'm currently available for freelance projects. Let's build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="rounded-full h-14 px-10 text-lg font-bold shadow-xl hover:scale-105 transition-transform">
                  <Link to="/contact">
                    Start a Project
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full h-14 px-10 text-lg font-bold border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <a href="mailto:gmail@nicola.id">
                    gmail@nicola.id
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
