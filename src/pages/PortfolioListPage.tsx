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
  _id: string;
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
      const response = await fetch('http://localhost:5002/api/portfolio', {
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
      const response = await fetch(`http://localhost:5002/api/portfolio/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setPortfolios(portfolios.filter(portfolio => portfolio._id !== id));
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
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeIn} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolios</h1>
          <p className="text-gray-500 mt-1">Manage your portfolio projects</p>
        </div>
        <Link
          to="/admin/portfolio/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors group"
        >
          <Plus className="h-4 w-4" />
          <span className="font-medium">Add New Portfolio</span>
        </Link>
      </motion.div>

      {error && (
        <motion.div 
          variants={fadeIn}
          className="rounded-md bg-red-50 p-4 text-red-500"
        >
          {error}
        </motion.div>
      )}

      {/* Search and Filter */}
      <motion.div 
        variants={fadeIn}
        className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search portfolios..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterCategory === category
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
            key={portfolio._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {portfolio.imageUrls[0] && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={portfolio.imageUrls[0]}
                  alt={portfolio.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{portfolio.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{portfolio.category}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {portfolio.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(portfolio.completionDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{portfolio.client}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                {portfolio.liveUrl && (
                  <a
                    href={portfolio.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
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
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <Link
                  to={`/admin/portfolio/${portfolio._id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm font-medium">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(portfolio._id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
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