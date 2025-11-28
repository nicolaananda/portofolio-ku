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
    Link as LinkIcon,
    Tag,
    Eye
} from 'lucide-react';

interface BlogPost {
    _id: string;
    title: string;
    category: string;
    createdAt: string;
    excerpt: string;
    coverImage: string;
    slug?: string;
    featured?: boolean;
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

export default function AdminBlogListPage() {
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
                    <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
                    <p className="text-gray-500 mt-1">Manage your journal entries</p>
                </div>
                <Link
                    to="/admin/blog/create"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors group"
                >
                    <Plus className="h-4 w-4" />
                    <span className="font-medium">New Post</span>
                </Link>
            </motion.div>

            {error && (
                <motion.div
                    variants={fadeIn}
                    className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-600"
                >
                    {error}
                </motion.div>
            )}

            {/* Search and Filter */}
            <motion.div
                variants={fadeIn}
                className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            >
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setFilterCategory(category)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterCategory === category
                                    ? 'bg-black text-white'
                                    : 'text-gray-600 hover:text-black hover:bg-gray-100'
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
                        className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        <div className="aspect-video overflow-hidden bg-gray-100 relative">
                            {post.coverImage ? (
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <FileText className="w-12 h-12" />
                                </div>
                            )}
                            {post.featured && (
                                <div className="absolute top-2 right-2 px-2 py-1 bg-yellow-400 text-black text-xs font-bold uppercase rounded shadow-sm">
                                    Featured
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded">
                                        {post.category}
                                    </span>
                                    <span className="text-xs text-gray-400 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">{post.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
                                <Link
                                    to={`/blog/${post.slug || post._id}`}
                                    target="_blank"
                                    className="p-2 rounded-lg text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                                    title="View Live"
                                >
                                    <Eye className="w-4 h-4" />
                                </Link>
                                <div className="flex-1"></div>
                                <Link
                                    to={`/admin/blog/${post._id}/edit`}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
                                >
                                    <Edit className="w-4 h-4" /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(post._id)}
                                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                                >
                                    <Trash2 className="w-4 h-4" /> Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
