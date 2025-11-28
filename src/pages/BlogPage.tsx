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
          readTime: post.readTime || '5 min read'
        }));

        setPosts(fetchedPosts);

        const uniqueCategories = ['All', ...new Set(fetchedPosts.map(post => post.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
        <div className="mb-20">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 animate-reveal leading-[0.85]">
            JOURNAL
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-black/10 dark:border-white/10 pt-8">
            <div className="flex flex-wrap gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${selectedCategory === category
                    ? 'text-black dark:text-white underline underline-offset-4 decoration-2'
                    : 'text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-auto">
              <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-8 w-full md:w-64 bg-transparent border-none border-b border-black/10 dark:border-white/10 focus:border-black dark:focus:border-white rounded-none px-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="space-y-24">
            {/* Featured Hero Post */}
            {featuredPost && (
              <Link to={`/blog/${featuredPost.slug || featuredPost._id}`} className="group block relative animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8 relative overflow-hidden rounded-2xl aspect-[16/9] bg-gray-100 dark:bg-gray-900">
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </div>
                  <div className="lg:col-span-4 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                      <span className="text-black dark:text-white">Featured</span>
                      <span>•</span>
                      <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black leading-tight mb-6 group-hover:underline decoration-2 underline-offset-4">
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
                {otherPosts.map((post, idx) => (
                  <Link
                    to={`/blog/${post.slug || post._id}`}
                    key={post._id}
                    className="group block border-b border-black/10 dark:border-white/10 py-12 hover:bg-black/5 dark:hover:bg-white/5 transition-colors px-4 -mx-4 animate-fadeInUp"
                    style={{ animationDelay: `${0.1 * idx}s` }}
                  >
                    <div className="grid md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-3 text-sm font-bold text-gray-400 uppercase tracking-wider">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                      <div className="md:col-span-7">
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                          {post.category}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold group-hover:underline decoration-2 underline-offset-4 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="md:col-span-2 flex justify-end">
                        <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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