import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, Loader2 } from 'lucide-react';
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

      <article className="container max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Journal
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 items-center mb-6 text-sm font-medium text-gray-500">
            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-y border-gray-200 dark:border-gray-800 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src={post.author?.avatar} alt={post.author?.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold">{post.author?.name}</p>
                <p className="text-sm text-gray-500">{post.author?.bio}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden mb-16 bg-gray-100 dark:bg-gray-900 aspect-video">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
};

export default BlogPostPage;
