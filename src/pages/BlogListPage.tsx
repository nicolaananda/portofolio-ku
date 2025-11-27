import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
    FileText,
    Search,
    Trash2,
    Edit,
    Plus,
    Calendar,
    User,
    Eye,
    Clock
} from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    category: string;
    excerpt: string;
    coverImage: string;
    author: {
        name: string;
    };
    createdAt: string;
    featured: boolean;
    readTime: string;
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

export default function BlogListPage() {
    const { accessToken } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setPosts(data.data);
            } else {
                setError(data.message || 'Failed to fetch blog posts');
            }
        } catch (error) {
            setError('An error occurred while fetching blog posts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                setPosts(posts.filter(post => post._id !== id));
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to delete post');
            }
        } catch (error) {
            setError('An error occurred while deleting the post');
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [accessToken]);

    const filteredPosts = posts.filter(post => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = filterCategory === 'all' || post.category === filterCategory;

        return matchesSearch && matchesFilter;
    });

    const categories = ['all', ...new Set(posts.map(p => p.category))];

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="text-gray-500">Loading posts...</p>
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
                    <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
                    <p className="text-slate-400 mt-1">Manage your journal entries</p>
                </div>
                <Link
                    to="/admin/blog/create"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
                >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">Add New Post</span>
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
                        placeholder="Search posts..."
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

            {/* Posts Grid */}
            <motion.div
                variants={fadeIn}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {filteredPosts.map((post) => (
                    <motion.div
                        key={post._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ y: -5 }}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        <div className="aspect-video overflow-hidden bg-slate-800 relative">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                                }}
                            />
                            {post.featured && (
                                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-500/90 text-black text-xs font-bold rounded shadow-lg">
                                    FEATURED
                                </div>
                            )}
                        </div>
                        <div className="p-6 space-y-4 flex-1 flex flex-col">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full border border-blue-800/50">
                                        {post.category}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-400">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-white line-clamp-2 mb-2">{post.title}</h3>
                                <p className="text-slate-400 text-sm line-clamp-3">{post.excerpt}</p>
                            </div>

                            <div className="pt-4 border-t border-slate-700">
                                <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        <span>{post.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        to={`/admin/blog/${post._id}/edit`}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                                    >
                                        <Edit className="h-4 w-4" />
                                        <span className="text-sm font-medium">Edit</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-red-900/20 text-red-300 hover:bg-red-900/30 transition-colors border border-red-800/30"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="text-sm font-medium">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
