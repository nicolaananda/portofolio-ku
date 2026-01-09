import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';
import { RichTextEditor } from '@/components/editor/RichTextEditor';

export default function AdminBlogEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [blogId, setBlogId] = useState<string | null>(null);

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
                    setBlogId(data.data.id);
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

    const handleImageChange = (urls: string[]) => {
        // We only take the first image for the cover
        setFormData(prev => ({ ...prev, coverImage: urls[0] || '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError('');

        try {
            const targetId = blogId || id;
            const response = await fetch(`${import.meta.env.VITE_API_URL}/blog/${targetId}`, {
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
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Edit Post</h1>
                    <p className="text-muted-foreground mt-1">Update your content</p>
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
                                    disabled={isSaving}
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
                    </div>

                    <RichTextEditor
                        value={formData.content}
                        onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                        placeholder="Write your post content here..."
                        minHeight="600px"
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
                        disabled={isSaving}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
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
