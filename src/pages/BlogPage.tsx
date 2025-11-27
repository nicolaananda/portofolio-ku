import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, ArrowUpRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SEOHead from '../components/SEOHead';

interface BlogPost {
  _id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  createdAt: string;
  readTime?: string;
  featured?: boolean;
  author?: {
    name: string;
    avatar: string;
  };
}

interface ApiResponse {
  status: string;
  message?: string;
  data: BlogPost[];
}

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/blog`);
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blog posts');
        }

        const fetchedPosts = data.data.map(post => ({
          ...post,
          // Ensure date is formatted nicely if needed, or use as is
          date: new Date(post.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          readTime: post.readTime || '5 min read' // Fallback if not provided
        }));

        setPosts(fetchedPosts);

        // Extract categories
        const uniqueCategories = ['All', ...new Set(fetchedPosts.map(post => post.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
        // Fallback to empty state or mock data if critical
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured) || filteredPosts[0];
  const otherPosts = filteredPosts.filter(post => post._id !== featuredPost?._id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h2 className="text-2xl font-bold">Error Loading Journal</h2>
        <p className="text-gray-500">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen pt-24 pb-20">
      <SEOHead
        title="Journal - Nicola Ananda"
        description="Thoughts, insights, and perspectives on data analysis, web development, and modern technology trends."
        keywords="Blog, Data Analysis, Web Development, Tech Trends"
        url="https://nicola.id/blog"
      />

      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-20 border-b border-black/10 dark:border-white/10 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
            <h1 className="text-[15vw] leading-[0.8] font-black tracking-tighter">
              JOURNAL
            </h1>
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-1">Issue 01</p>
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500">2024 Edition</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 ${selectedCategory === category
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                      : 'bg-transparent border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 w-full md:w-64 bg-transparent border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="space-y-20">
            {/* Featured Hero Post */}
            {featuredPost && (
              <Link to={`/blog/${featuredPost.slug || featuredPost._id}`} className="group block relative">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 relative overflow-hidden rounded-3xl aspect-[16/9] lg:aspect-[21/9] bg-gray-100 dark:bg-gray-900">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm font-bold text-gray-500 mb-4">
                      <span className="px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black">
                        Featured
                      </span>
                      <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black leading-tight mb-6 group-hover:underline decoration-4 underline-offset-8">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 line-clamp-3 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Read Story <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* List View for Other Posts */}
            {otherPosts.length > 0 && (
              <div className="border-t border-black/10 dark:border-white/10">
                {otherPosts.map((post) => (
                  <Link
                    to={`/blog/${post.slug || post._id}`}
                    key={post._id}
                    className="group block border-b border-black/10 dark:border-white/10 py-12 hover:bg-black/5 dark:hover:bg-white/5 transition-colors px-4 -mx-4"
                  >
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-3 text-sm font-medium text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="md:col-span-6">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold group-hover:underline decoration-2 underline-offset-4 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="md:col-span-3 flex justify-end">
                        <div className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-20 text-center border-t border-black/10 dark:border-white/10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No stories found</h2>
            <p className="text-gray-500 mb-6">
              Try changing your search term or selecting a different category.
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} variant="outline">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;