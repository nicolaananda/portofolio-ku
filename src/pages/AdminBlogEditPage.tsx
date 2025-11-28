import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminBlogEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        coverImage: '',
        featured: false
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setFormData({
                        title: data.data.title,
                        excerpt: data.data.excerpt,
                        content: data.data.content,
                        category: data.data.category,
                        coverImage: data.data.coverImage,
                        featured: data.data.featured || false
                    });
                } else {
                    setError(data.message || 'Failed to fetch post');
                }
            } catch (error) {
                setError('An error occurred while fetching the post');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${id}`, {
                method: 'PUT',
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
                setError(data.message || 'Failed to update post');
            }
        } catch (error) {
            setError('An error occurred while updating the post');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-4 mb-8">
                <Link
                    to="/admin/blog"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
                    <p className="text-gray-500">Update your content</p>
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter post title"
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Excerpt</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            placeholder="Brief summary for the card preview"
                            required
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                        />
                    </div>

                    {/* Category & Featured */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-900">Category</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="e.g. Development, Design"
                                required
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div className="flex items-center h-full pt-6">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleCheckboxChange}
                                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <span className="font-medium text-gray-900">Featured Post</span>
                            </label>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Cover Image URL</label>
                        <div className="flex gap-4">
                            <input
                                type="url"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        {formData.coverImage && (
                            <div className="mt-4 relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                <img
                                    src={formData.coverImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-900">Content (Markdown)</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your post content here..."
                            required
                            rows={15}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black font-mono text-sm"
                        />
                    </div>

                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/blog')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="bg-black text-white hover:bg-gray-800"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
