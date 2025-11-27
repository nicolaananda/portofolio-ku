import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Loader2
} from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

interface BlogFormData {
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    featured: boolean;
    readTime: string;
    author: {
        name: string;
        avatar: string;
        bio: string;
    };
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

export default function BlogCreatePage() {
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        excerpt: '',
        content: '',
        coverImage: '',
        category: '',
        featured: false,
        readTime: '5 min read',
        author: {
            name: "Nicola Ananda",
            avatar: "/profile.webp",
            bio: "Data Analyst and Web Developer"
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        console.log('API URL:', import.meta.env.VITE_API_URL);
        console.log('Access Token:', accessToken);
        console.log('Form Data:', formData);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/admin/blog');
            } else {
                setError(data.message || 'Failed to create post');
            }
        } catch (error) {
            setError('An error occurred while creating the post');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-6xl mx-auto space-y-6"
        >
            {/* Header */}
            <motion.div variants={fadeIn} className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Create New Post</h1>
                    <p className="text-slate-400 mt-1">Write a new journal entry</p>
                </div>
                <button
                    onClick={() => navigate('/admin/blog')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="font-medium">Back to List</span>
                </button>
            </motion.div>

            {error && (
                <motion.div
                    variants={fadeIn}
                    className="rounded-lg bg-red-900/50 border border-red-800 p-4 text-red-300"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Post Details</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="title" className="text-sm font-medium text-slate-300">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium text-slate-300">
                                Category
                            </label>
                            <input
                                id="category"
                                type="text"
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="readTime" className="text-sm font-medium text-slate-300">
                                Read Time
                            </label>
                            <input
                                id="readTime"
                                type="text"
                                required
                                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={formData.readTime}
                                onChange={(e) =>
                                    setFormData({ ...formData, readTime: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-slate-300">
                                Cover Image
                            </label>
                            <ImageUpload
                                images={formData.coverImage ? [formData.coverImage] : []}
                                onChange={(urls) => setFormData({ ...formData, coverImage: urls[0] || '' })}
                                maxImages={1}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="rounded border-slate-600 bg-slate-700/50 text-blue-600 focus:ring-blue-500"
                                    checked={formData.featured}
                                    onChange={(e) =>
                                        setFormData({ ...formData, featured: e.target.checked })
                                    }
                                />
                                Featured Post
                            </label>
                        </div>
                    </div>
                </motion.div>

                <motion.div variants={fadeIn} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Content</h2>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="excerpt" className="text-sm font-medium text-slate-300">
                                Excerpt
                            </label>
                            <textarea
                                id="excerpt"
                                required
                                rows={3}
                                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                value={formData.excerpt}
                                onChange={(e) =>
                                    setFormData({ ...formData, excerpt: e.target.value })
                                }
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label htmlFor="content" className="text-sm font-medium text-slate-300">
                                    Full Content
                                </label>
                                <span className="text-xs text-slate-400">HTML supported</span>
                            </div>
                            <textarea
                                id="content"
                                required
                                rows={15}
                                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical font-mono text-sm"
                                value={formData.content}
                                onChange={(e) =>
                                    setFormData({ ...formData, content: e.target.value })
                                }
                                placeholder="Write your article content here..."
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    variants={fadeIn}
                    className="flex justify-end gap-4 pt-6"
                >
                    <button
                        type="button"
                        onClick={() => navigate('/admin/blog')}
                        className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isLoading ? 'Creating...' : 'Create Post'}
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
}
