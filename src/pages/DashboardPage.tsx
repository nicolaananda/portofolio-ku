import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  FileText, 
  Mail, 
  TrendingUp, 
  Users,
  Calendar,
  Eye,
  MessageCircle,
  Briefcase,
  ArrowUpRight,
  Clock,
  Plus,
  Search,
  Filter
} from 'lucide-react';

interface DashboardStats {
  totalPortfolios: number;
  totalContacts: number;
  unreadContacts: number;
  recentPortfolios?: any[];
  recentContacts?: any[];
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

export default function DashboardPage() {
  const { accessToken } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalPortfolios: 0,
    totalContacts: 0,
    unreadContacts: 0,
    recentPortfolios: [],
    recentContacts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTimeframe, setActiveTimeframe] = useState('month');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const portfolioResponse = await fetch('http://localhost:5002/api/portfolio?limit=5', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const portfolioData = await portfolioResponse.json();

        const contactResponse = await fetch('http://localhost:5002/api/contact?limit=5', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const contactData = await contactResponse.json();

        setStats({
          totalPortfolios: portfolioData.total || 0,
          totalContacts: contactData.total || 0,
          unreadContacts: contactData.data?.filter((contact: any) => !contact.isRead).length || 0,
          recentPortfolios: portfolioData.data || [],
          recentContacts: contactData.data || [],
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [accessToken]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const portfolioGrowth = 12.5;
  const contactGrowth = 23.2;

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={staggerContainer}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <motion.div 
        variants={fadeIn}
        className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">Welcome to Dashboard</h1>
          <p className="opacity-90">Here's what's happening with your portfolio today.</p>
        </div>
      </motion.div>
      
      {/* Search and Filter Bar */}
      <motion.div 
        variants={fadeIn}
        className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search portfolios or messages..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={staggerContainer}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {/* Total Portfolios */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-blue-50 p-3">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {portfolioGrowth}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalPortfolios}</h3>
          <p className="text-sm text-gray-600 mt-1">Total Portfolios</p>
        </motion.div>

        {/* Total Messages */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-green-50 p-3">
              <Mail className="h-6 w-6 text-green-600" />
            </div>
            <span className="flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              {contactGrowth}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.totalContacts}</h3>
          <p className="text-sm text-gray-600 mt-1">Total Messages</p>
        </motion.div>

        {/* Unread Messages */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-lg bg-orange-50 p-3">
              <MessageCircle className="h-6 w-6 text-orange-600" />
            </div>
            {stats.unreadContacts > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-600 rounded-full animate-pulse">
                New
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{stats.unreadContacts}</h3>
          <p className="text-sm text-gray-600 mt-1">Unread Messages</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={fadeIn}
          className="bg-gradient-to-br from-primary to-primary/90 rounded-xl p-6 text-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/admin/portfolio/create"
              className="flex items-center justify-between p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors group"
            >
              <span className="text-sm font-medium">Add Portfolio</span>
              <Plus className="h-4 w-4 transform group-hover:rotate-90 transition-transform" />
            </Link>
            <Link
              to="/admin/contact"
              className="flex items-center justify-between p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors group"
            >
              <span className="text-sm font-medium">View Messages</span>
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity Section */}
      <motion.div 
        variants={staggerContainer}
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Recent Portfolios */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Portfolios</h2>
              <Link
                to="/admin/portfolio"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 group"
              >
                View all
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.recentPortfolios?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentPortfolios.slice(0, 5).map((portfolio: any) => (
                  <motion.div 
                    key={portfolio._id}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{portfolio.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-500">{portfolio.category}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{portfolio.client}</span>
                      </div>
                    </div>
                    <Link
                      to={`/admin/portfolio/${portfolio._id}/edit`}
                      className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 group"
                    >
                      Edit
                      <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No portfolios yet</p>
            )}
          </div>
        </motion.div>

        {/* Recent Messages */}
        <motion.div 
          variants={fadeIn}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Messages</h2>
              <Link
                to="/admin/contact"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1 group"
              >
                View all
                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            {stats.recentContacts?.length > 0 ? (
              <div className="space-y-4">
                {stats.recentContacts.slice(0, 5).map((contact: any) => (
                  <motion.div 
                    key={contact._id}
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${
                      contact.isRead ? 'bg-gray-300' : 'bg-primary animate-pulse'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{contact.subject}</p>
                      <p className="text-sm text-gray-500 truncate mt-1">{contact.email}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No messages yet</p>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Activity Chart */}
      <motion.div 
        variants={fadeIn}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Activity Overview</h2>
          <div className="flex items-center gap-2">
            {['week', 'month', 'year'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setActiveTimeframe(timeframe)}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  activeTimeframe === timeframe
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Chart visualization coming soon</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
} 