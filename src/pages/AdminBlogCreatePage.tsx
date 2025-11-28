import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';

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
                    <h1 className="text-3xl font-bold text-foreground">Create New Post</h1>
                    <p className="text-muted-foreground mt-1">Share your thoughts with the world</p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => navigate('/admin/blog')}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </Button>
            </div>

            {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-destructive">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column: Basic Info */}
                    <div className="space-y-6">
                        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-card-foreground">Basic Information</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-card-foreground">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter post title"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-card-foreground">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Development, Design"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-card-foreground">Excerpt</label>
                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    placeholder="Brief summary for the card preview"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-muted-foreground"
                                />
                            </div>

                            <div className="flex items-center pt-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleCheckboxChange}
                                        className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
                                    />
                                    <span className="font-medium text-card-foreground">Featured Post</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Image & Media */}
                    <div className="space-y-6">
                        <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
                            <h2 className="text-xl font-semibold text-card-foreground">Cover Image</h2>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-card-foreground">Upload Image</label>
                                <ImageUpload
                                    images={formData.coverImage ? [formData.coverImage] : []}
                                    onChange={handleImageChange}
                                    maxImages={1}
                                    disabled={isLoading}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Recommended size: 1200x630px. Max size: 5MB.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Width: Content */}
                <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-card-foreground">Content</h2>
                        <span className="text-xs text-muted-foreground">Markdown Supported</span>
                    </div>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your post content here..."
                        required
                        rows={20}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm placeholder:text-muted-foreground"
                    />
                </div>

                <div className="flex justify-end gap-4 pt-4 border-t border-border">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/blog')}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
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
