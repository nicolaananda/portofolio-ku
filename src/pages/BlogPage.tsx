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
      <div className="container px-4">
        <AnimatedSection>
          <h1 className="section-title text-center">Blog</h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
            Thoughts, insights, and perspectives on web development, design, and technology.
          </p>
        </AnimatedSection>
        
        <AnimatedSection delay={100} className="mt-12">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        <Separator className="my-10" />
        
        {filteredPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={150 + index * 50}>
                <Link to={`/blog/${post.id}`} className="group block overflow-hidden rounded-lg bg-card transition-shadow hover:shadow-md">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <span className="text-sm font-medium text-primary">Read More</span>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="my-16 text-center">
            <h2 className="text-2xl font-semibold">No posts found</h2>
            <p className="mt-2 text-muted-foreground">
              Try changing your search term or selecting a different category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;