import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { Separator } from '@/components/ui/separator';

// Mock blog data (would come from API in production)
const blogPosts = [
  {
    id: 1,
    title: "Data Analyst with Python: A Comprehensive Guide",
    excerpt: "Learn how to leverage Python libraries like Pandas, NumPy, and Matplotlib for effective Data Analyst and visualization.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    category: "Data Analyst",
    date: "May 15, 2023",
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Building Modern Web Applications with React",
    excerpt: "A deep dive into creating scalable and maintainable web applications using React and modern development practices.",
    coverImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=80",
    category: "Web Development",
    date: "June 3, 2023",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "SQL for Data Analyst: Advanced Techniques",
    excerpt: "Master advanced SQL techniques for Data Analyst, including window functions, CTEs, and complex joins.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    category: "Data Analyst",
    date: "July 12, 2023",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Data Visualization Best Practices",
    excerpt: "Learn how to create effective and insightful data visualizations that communicate your findings clearly.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    category: "Data Analyst",
    date: "August 22, 2023",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "Full-Stack Development with TypeScript",
    excerpt: "Building robust full-stack applications using TypeScript, React, and Node.js with best practices.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    category: "Web Development",
    date: "September 5, 2023",
    readTime: "9 min read"
  },
  {
    id: 6,
    title: "Data-Driven Decision Making",
    excerpt: "How to use Data Analyst to make informed business decisions and drive organizational success.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    category: "Data Analyst",
    date: "October 18, 2023",
    readTime: "7 min read"
  },
  {
    id: 7,
    title: "Building RESTful APIs with Node.js",
    excerpt: "A comprehensive guide to creating scalable and secure RESTful APIs using Node.js and Express.",
    coverImage: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&auto=format&fit=crop&q=80",
    category: "Web Development",
    date: "November 7, 2023",
    readTime: "8 min read"
  },
  {
    id: 8,
    title: "Data Analyst Workflow Optimization",
    excerpt: "Tips and techniques for streamlining your Data Analyst workflow and improving productivity.",
    coverImage: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=800&auto=format&fit=crop&q=80",
    category: "Data Analyst",
    date: "December 12, 2023",
    readTime: "6 min read"
  },
];

// Extract unique categories
const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter posts based on search term and selected category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-16 left-16 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-animation"></div>
          <div className="absolute bottom-16 right-16 w-28 h-28 bg-gradient-to-br from-accent/15 to-primary/15 rounded-lg rotate-45 blur-xl floating-animation" style={{animationDelay: '2.5s'}}></div>
        </div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
              My <span className="gradient-text">Blog</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-muted-foreground leading-relaxed">
              Thoughts, insights, and perspectives on data analysis, web development, and modern technology trends.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <div className="container px-4">
        
        <AnimatedSection delay={100} className="py-20">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-12 py-3 rounded-2xl border-2 focus:border-primary/50 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        {filteredPosts.length > 0 ? (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={150 + index * 50}>
                <Link to={`/blog/${post.id}`} className="group block overflow-hidden rounded-2xl glass-effect transition-all hover:shadow-2xl hover:-translate-y-3">
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">{post.date}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h2 className="text-2xl font-bold mb-3 transition-colors group-hover:text-primary leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-medium">{post.readTime}</span>
                      <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">Read More →</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="my-20 text-center">
            <div className="glass-effect rounded-2xl p-12 max-w-md mx-auto">
              <h2 className="text-3xl font-bold mb-4">No posts found</h2>
              <p className="text-muted-foreground text-lg">
                Try changing your search term or selecting a different category.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;