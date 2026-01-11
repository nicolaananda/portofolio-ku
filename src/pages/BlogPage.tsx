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
    <div className="bg-background text-foreground min-h-screen pt-32 pb-20">
      <SEOHead
        title="Journal - Nicola Ananda"
        description="Thoughts, insights, and perspectives on data analysis, web development, and modern technology trends."
        keywords="Blog, Data Analysis, Web Development, Tech Trends"
        url="https://nicola.id/blog"
      />

      <div className="container max-w-3xl mx-auto px-6">
        {/* Minimal Header */}
        <div className="mb-16 border-b border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight text-foreground">
              Journal.
            </h1>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                className="pl-8 w-full md:w-48 bg-transparent border-none focus:ring-0 placeholder:text-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Categories / Tabs */}
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                  ? 'text-foreground border-b-2 border-foreground pb-1'
                  : 'text-gray-500 hover:text-foreground'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Post Stream */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-12">
            {filteredPosts.map((post) => (
              <Link
                to={`/blog/${post.slug || post._id}`}
                key={post._id}
                className="group block"
              >
                <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 items-start">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                      <span className="text-blue-600 dark:text-blue-400">{post.category}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold font-serif leading-tight group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed font-serif text-base">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-medium text-gray-400 pt-2">
                      <span>{post.readTime || '5 min read'}</span>
                      {post.featured && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-amber-500"><Sparkles className="w-3 h-3" /> Featured</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="w-full md:w-40 aspect-[16/10] md:aspect-square shrink-0 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Sparkles className="w-8 h-8 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-serif font-bold mb-2">No stories found</h2>
            <p className="text-gray-500 mb-6 text-sm">
              We couldn't find any articles matching your criteria.
            </p>
            <Button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} variant="outline" size="sm">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;