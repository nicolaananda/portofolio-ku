import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Search,
  Filter,
  Trash2,
  Edit,
  Plus,
  Calendar,
  Link as LinkIcon,
  Github,
  Tag,
  ArrowUpRight
} from 'lucide-react';

interface Portfolio {
  id: string;
  title: string;
  category: string;
  client: string;
  completionDate: string;
  technologies: string[];
  description: string;
  imageUrls: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PortfolioListPage() {
  const { accessToken } = useAuth();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchPortfolios = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPortfolios(data.data);
      } else {
        setError(data.message || 'Failed to fetch portfolios');
      }
    } catch (error) {
      setError('An error occurred while fetching portfolios');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this portfolio?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setPortfolios(portfolios.filter(portfolio => portfolio.id !== id));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete portfolio');
      }
    } catch (error) {
      setError('An error occurred while deleting the portfolio');
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, [accessToken]);

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch =
      portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.technologies.some(tech =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesFilter = filterCategory === 'all' || portfolio.category === filterCategory;

    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...new Set(portfolios.map(p => p.category))];

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-500">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Portfolios</h1>
          <p className="text-slate-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          to="/admin/portfolio/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
        >
          <Plus className="h-4 w-4" />
          <span className="font-medium">Add New Portfolio</span>
        </Link>
      </motion.div>

      {error && (
        <motion.div
          variants={fadeIn}
          className="rounded-lg bg-red-900/50 border border-red-800 p-4 text-red-300"
        >
          {error}
        </motion.div>
      )}

      {/* Search and Filter */}
      <motion.div
        variants={fadeIn}
        className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search portfolios..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-600 bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filterCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Portfolios Grid */}
      <motion.div
        variants={fadeIn}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredPortfolios.map((portfolio) => (
          <motion.div
            key={portfolio.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="aspect-video overflow-hidden bg-slate-800">
              {portfolio.imageUrls && portfolio.imageUrls.length > 0 && portfolio.imageUrls[0] ? (
                <img
                  src={portfolio.imageUrls[0]}
                  alt={portfolio.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center ${portfolio.imageUrls && portfolio.imageUrls.length > 0 && portfolio.imageUrls[0] ? 'hidden' : ''}`}>
                <div className="text-center text-slate-400">
                  <div className="w-16 h-16 mx-auto mb-2 bg-slate-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📷</span>
                  </div>
                  <p className="text-sm">No Image</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{portfolio.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Tag className="h-4 w-4 text-slate-400" />
                  <span className="text-sm text-slate-400">{portfolio.category}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {portfolio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full border border-blue-800/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(portfolio.completionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{portfolio.client}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                {portfolio.liveUrl && (
                  <a
                    href={portfolio.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                  >
                    <LinkIcon className="h-4 w-4" />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                )}
                {portfolio.githubUrl && (
                  <a
                    href={portfolio.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors border border-slate-600"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                <Link
                  to={`/admin/portfolio/${portfolio.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm font-medium">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(portfolio.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-900/20 text-red-300 hover:bg-red-900/30 transition-colors border border-red-800/30"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
} 