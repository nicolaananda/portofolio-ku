import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

export default function AdminBlogCreatePage() {
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        coverImage: '',
        featured: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleImageChange = (urls: string[]) => {
        // We only take the first image for the cover
        setFormData(prev => ({ ...prev, coverImage: urls[0] || '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Create New Post</h1>
                    <p className="text-slate-400 mt-1">Share your thoughts with the world</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate('/admin/blog')}
                    className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to List
                </Button>
            </div>

            {error && (
                <div className="rounded-lg bg-red-900/50 border border-red-800 p-4 text-red-300">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column: Basic Info */}
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-white">Basic Information</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter post title"
                                    required
                                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Development, Design"
                                    required
                                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    placeholder="Brief summary for the card preview"
                                    required
                                    rows={4}
                                    className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>

                            <div className="flex items-center pt-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleCheckboxChange}
                                        className="w-5 h-5 rounded border-slate-600 bg-slate-700/50 text-blue-500 focus:ring-blue-500"
                                    />
                                    <span className="font-medium text-slate-300">Featured Post</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image & Media */}
                    <div className="space-y-6">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-white">Cover Image</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Upload Image</label>
                                <ImageUpload
                                    images={formData.coverImage ? [formData.coverImage] : []}
                                    onChange={handleImageChange}
                                    maxImages={1}
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-slate-400">
                                    Recommended size: 1200x630px. Max size: 5MB.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Width: Content */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 shadow-xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">Content</h2>
                    </div>

                    <div className="rounded-lg border border-slate-600 bg-slate-700/50 overflow-hidden text-black dark:text-gray-200">
                        <RichTextEditor
                            value={formData.content}
                            onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                            placeholder="Write your post content here..."
                            minHeight="600px"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-slate-700">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/blog')}
                        className="px-6 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Create Post
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
