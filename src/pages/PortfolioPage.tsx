import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Search, AlertCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import useProjects from '../hooks/useProjects';

const PortfolioPage = () => {
  const { projects, isLoading, error } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let result = projects;
    if (activeCategory !== 'All') {
      result = result.filter(project => project.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    setFilteredProjects(result);
  }, [activeCategory, searchQuery, projects]);

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden">
      <SEOHead
        title="Portfolio - Nicola Ananda"
        description="Explore the selected works of Nicola Ananda. A collection of data analytics, web development, and mobile application projects."
        keywords="Portfolio, Projects, Case Studies, Web Development, Data Analytics"
        url="https://nicola.id/portfolio"
        image="/portfolio-og.webp"
      />

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="blob bg-green-500/10 w-[600px] h-[600px] top-[-100px] left-[20%] mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="blob bg-blue-500/10 w-[500px] h-[500px] bottom-[-100px] right-[10%] mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-32 pb-20">
        {/* HEADER */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 animate-reveal">
            Selected Work
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            A curated collection of projects where design meets data.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 sticky top-20 z-30 bg-background/80 backdrop-blur-xl p-4 rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeCategory === category
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Gagal memuat proyek</h2>
            <p className="text-sm text-gray-500 max-w-sm">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="rounded-full mt-2">
              Coba Lagi
            </Button>
          </div>
        )}

        {/* Loading */}
        {isLoading && !error && (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="break-inside-avoid rounded-[2rem] bg-gray-100 dark:bg-gray-900 animate-pulse aspect-[4/3]" />
            ))}
          </div>
        )}

        {/* MASONRY GRID */}
        {!isLoading && !error && (
          filteredProjects.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              {filteredProjects.map((project) => (
                <Link
                  to={`/portfolio/${project.slug || project._id}`}
                  key={project._id}
                  className="group block break-inside-avoid"
                >
                  <div className="relative rounded-[2rem] overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <img
                      src={project.imageUrls[0]}
                      alt={project.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">{project.category}</div>
                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{project.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="px-2 py-1 rounded-md bg-white/20 text-white text-xs font-bold backdrop-blur-sm">{tech}</span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 rounded-md bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No projects found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
