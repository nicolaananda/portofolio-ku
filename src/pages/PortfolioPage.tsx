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
      <div className="container px-4">
        <AnimatedSection>
          <h1 className="section-title text-center">My Portfolio</h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-muted-foreground">
            Explore my recent projects and see how I approach design and development challenges.
          </p>
        </AnimatedSection>
        
        <div className="mt-12">
          <AnimatedSection delay={100}>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'outline' : 'ghost'}
                  className="rounded-full"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </AnimatedSection>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <AnimatedSection 
                key={project.id} 
                delay={150 + index * 50}
                className="group overflow-hidden rounded-lg bg-card transition-all hover:shadow-lg"
              >
                <Link to={`/portfolio/${project.id}`}>
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="secondary">View Details</Button>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary">{project.category}</span>
                    <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
                    <p className="mt-2 text-muted-foreground">{project.description}</p>
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