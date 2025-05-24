import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { useState } from 'react';

const projects = [
  {
    id: 7,
    title: 'Data Analyst Dashboard',
    category: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    description: 'Interactive dashboard for business metrics visualization using Python, Pandas, and Plotly.',
  },
  {
    id: 8,
    title: 'E-Commerce Analytics Platform',
    category: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'Comprehensive analytics platform for tracking e-commerce metrics and customer behavior.',
  },
  {
    id: 3,
    title: 'Modern Web Application',
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=80',
    description: 'Full-stack web application built with React, Node.js, and TypeScript.',
  },
  {
    id: 4,
    title: 'Data Visualization Tool',
    category: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: 'Custom data visualization tool for complex datasets using D3.js and React.',
  },
  {
    id: 5,
    title: 'RESTful API Service',
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    description: 'Scalable RESTful API service with Node.js, Express, and MongoDB.',
  },
  {
    id: 6,
    title: 'Business Intelligence Dashboard',
    category: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    description: 'Real-time business intelligence dashboard with advanced analytics and reporting features.',
  },
  {
    id: 2,
    title: 'E-Commerce Growth & Market Insights (Revtoko.co)',
    category: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    description: 'Comprehensive data-driven business analysis and strategic recommendations to boost user acquisition and market share for an e-commerce platform.',
  },
  {
    id: 1,
    title: 'Customer Retention & Churn Analysis (B2B Marketplace Telkom)',
    category: 'Data Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    description: 'Data-driven analysis focusing on customer segmentation, cohort retention trends, and churn drivers to enhance buyer loyalty and increase lifetime value in a government-backed B2B marketplace.',
  }
  
];

const categories = [
  'All',
  'Web Development',
  'Data Analyst',
  'UI/UX Design',
  'Mobile Development',
];

const PortfolioPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-10 left-20 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-animation"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-lg rotate-45 blur-xl floating-animation" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
              My <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-center text-xl text-muted-foreground leading-relaxed">
              Explore my recent projects and see how I approach design and development challenges with a focus on data-driven solutions and modern web technologies.
            </p>
          </AnimatedSection>
        </div>
      </section>
      
      <div className="container px-4">
        
        <div className="py-20">
          <AnimatedSection delay={100}>
            <div className="mb-16 flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  className={`rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat 
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl' 
                      : 'hover:bg-primary/10 hover:text-primary'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </AnimatedSection>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <AnimatedSection 
                key={project.id} 
                delay={150 + index * 50}
                className="group overflow-hidden rounded-2xl glass-effect transition-all hover:shadow-2xl hover:-translate-y-3"
              >
                <Link to={`/portfolio/${project.id}`}>
                  <div className="relative h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-20"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100 z-30">
                      <Button 
                        variant="secondary" 
                        className="bg-white/90 text-gray-900 hover:bg-white border-2 border-white/30 backdrop-blur-sm shadow-2xl transform scale-95 group-hover:scale-100 transition-transform duration-300"
                      >
                        View Details
                      </Button>
                    </div>
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-30">
                      <span className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;