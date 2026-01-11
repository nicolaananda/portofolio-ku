import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '../components/SEOHead';
import { HTMLContent } from '@/components/HTMLContent';
import { motion, useScroll, useSpring } from 'framer-motion';

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
  author?: {
    name: string;
    avatar: string;
    bio: string;
  };
}

interface ApiResponse {
  status: string;
  message?: string;
  data: BlogPost;
}

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/blog/${id}`);
        const data: ApiResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blog post');
        }

        setPost({
          ...data.data,
          readTime: data.data.readTime || '5 min read',
          author: data.data.author || {
            name: "Nicola Ananda",
            avatar: "/profile.webp",
            bio: "Data Analyst and Web Developer"
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, API_URL]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <p className="text-gray-500">{error || "The article you're looking for doesn't exist."}</p>
        <Button asChild variant="outline">
          <Link to="/blog">Back to Journal</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen pt-32 pb-24">
      <SEOHead
        title={`${post.title} - Nicola Ananda`}
        description={post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)}
        keywords={`${post.category}, Blog, Article`}
        url={`https://nicola.id/blog/${post.slug || post._id}`}
        image={post.coverImage}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-foreground origin-left z-50"
        style={{ scaleX }}
      />

      <article className="container max-w-3xl mx-auto px-6">
        {/* Navigation */}
        <div className="mb-12">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-foreground transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight mb-8 leading-[1.1] text-balance">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ring-2 ring-background">
              <img src={post.author?.avatar} alt={post.author?.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-sm">
              <p className="font-bold text-foreground">{post.author?.name}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-xl overflow-hidden mb-12 bg-gray-100 dark:bg-gray-900 aspect-video shadow-sm">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <HTMLContent
          html={post.content}
          className="prose prose-lg dark:prose-invert max-w-none font-serif leading-relaxed
            prose-headings:font-serif prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-gray-700 dark:prose-p:text-gray-300
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-md
            prose-blockquote:border-l-4 prose-blockquote:border-black dark:prose-blockquote:border-white prose-blockquote:italic"
        />

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              {post.category}
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bookmark className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
