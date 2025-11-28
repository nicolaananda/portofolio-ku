import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '../components/SEOHead';
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
    <div className="bg-background text-foreground min-h-screen pt-24 pb-20">
      <SEOHead
        title={`${post.title} - Nicola Ananda`}
        description={post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 160)}
        keywords={`${post.category}, Blog, Article`}
        url={`https://nicola.id/blog/${post.slug || post._id}`}
        image={post.coverImage}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black dark:bg-white origin-left z-50"
        style={{ scaleX }}
      />

      <article className="container max-w-3xl mx-auto px-4">
        {/* Navigation */}
        <Link to="/blog" className="inline-flex items-center text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-12">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journal
        </Link>

        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center gap-4 items-center mb-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <span className="text-black dark:text-white">
              {post.category}
            </span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 leading-tight text-balance">
            {post.title}
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
              <img src={post.author?.avatar} alt={post.author?.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">{post.author?.name}</p>
              <p className="text-xs text-gray-500">{post.author?.bio}</p>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden mb-16 bg-gray-100 dark:bg-gray-900 aspect-video relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-a:text-black dark:prose-a:text-white prose-a:no-underline prose-a:border-b prose-a:border-black/20 dark:prose-a:border-white/20 hover:prose-a:border-black dark:hover:prose-a:border-white prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-black/10 dark:border-white/10 flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="rounded-full">
              <Bookmark className="w-4 h-4 mr-2" /> Save
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
