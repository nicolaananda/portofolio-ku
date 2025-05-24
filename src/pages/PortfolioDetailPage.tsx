import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from '../components/AnimatedSection';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';

// Mock project data (would come from API in production)
const projects = [
  {
    id: "7",
    title: "Data Analyst Dashboard",
    category: "Data Analyst",
    client: "BusinessMetrics Inc.",
    completionDate: "October 2023",
    technologies: ["Python", "Pandas", "Plotly", "React", "TypeScript"],
    description: "An interactive dashboard for visualizing business metrics and KPIs. The platform provides real-time Data Analyst, customizable reports, and automated insights generation. Features include data filtering, trend analysis, and export capabilities.",
    challenge: "The main challenge was processing and visualizing large datasets in real-time while maintaining performance and user experience.",
    solution: "I implemented a hybrid architecture using Python for data processing and React for the frontend. The solution includes data caching, progressive loading, and optimized rendering techniques.",
    imageUrls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-project.com",
    githubUrl: "https://github.com/username/project"
  },
  {
    id: "8",
    title: "E-Commerce Analytics Platform",
    category: "Data Analyst",
    client: "RetailInsights",
    completionDate: "May 2023",
    technologies: ["Python", "SQL", "Tableau", "AWS", "Docker"],
    description: "A comprehensive analytics platform for e-commerce businesses. The system tracks customer behavior, sales metrics, inventory levels, and marketing campaign performance. Features include predictive analytics, customer segmentation, and automated reporting.",
    challenge: "Integrating data from multiple sources and ensuring data consistency across different platforms was the primary challenge.",
    solution: "I designed an ETL pipeline using Python and AWS services, with data validation and cleaning processes. The solution includes automated data quality checks and real-time synchronization.",
    imageUrls: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-project.com",
    githubUrl: "https://github.com/username/project"
  },
  {
    id: "3",
    title: "Modern Web Application",
    category: "Web Development",
    client: "TechStartup",
    completionDate: "January 2023",
    technologies: ["React", "Node.js", "TypeScript", "MongoDB", "Docker"],
    description: "A full-stack web application built with modern technologies. Features include user authentication, real-time updates, responsive design, and API integration. The application follows best practices for performance, security, and maintainability.",
    challenge: "Implementing real-time features while maintaining application performance and scalability was challenging.",
    solution: "I used WebSocket for real-time communication and implemented a microservices architecture. The solution includes proper error handling, logging, and monitoring.",
    imageUrls: [
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-project.com",
    githubUrl: "https://github.com/username/project"
  },
  {
    id: "4",
    title: "Data Visualization Tool",
    category: "Data Analyst",
    client: "DataViz Corp",
    completionDate: "August 2023",
    technologies: ["D3.js", "React", "TypeScript", "Python", "FastAPI"],
    description: "A custom data visualization tool for complex datasets. The application provides interactive charts, graphs, and dashboards. Features include data filtering, custom visualizations, and export capabilities.",
    challenge: "Creating performant and interactive visualizations for large datasets was the main challenge.",
    solution: "I implemented data aggregation and progressive loading techniques, along with optimized rendering strategies using D3.js and React.",
    imageUrls: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-project.com",
    githubUrl: "https://github.com/username/project"
  },
  {
    id: "5",
    title: "RESTful API Service",
    category: "Web Development",
    client: "APIConnect",
    completionDate: "March 2023",
    technologies: ["Node.js", "Express", "MongoDB", "TypeScript", "Docker"],
    description: "A scalable RESTful API service with comprehensive documentation and testing. Features include authentication, rate limiting, caching, and monitoring. The service follows REST best practices and includes proper error handling.",
    challenge: "Ensuring API security and handling high traffic loads were the main challenges.",
    solution: "I implemented JWT authentication, rate limiting, and caching strategies. The solution includes comprehensive logging and monitoring.",
    imageUrls: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-project.com",
    githubUrl: "https://github.com/username/project"
  },
  {
    id: "6",
    title: "Business Intelligence Dashboard",
    category: "Data Analyst",
    client: "Enterprise Solutions",
    completionDate: "December 2022",
    technologies: ["Python", "SQL", "Power BI", "Azure", "Docker"],
    description: "A real-time business intelligence dashboard with advanced analytics and reporting features. The platform provides insights into business performance, market trends, and operational metrics. Features include automated reporting, data alerts, and custom analytics.",
    challenge: "Processing and analyzing large volumes of data in real-time while maintaining dashboard performance was challenging.",
    solution: "I implemented a data warehouse solution with optimized queries and caching. The solution includes automated data refresh and real-time updates.",
    imageUrls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-project.com",
    githubUrl: "https://github.com/username/project"
  },
  {
    id: "2",
    title: "E-Commerce Growth & Market Insights (Revtoko.co)",
    category: "Data Analyst",
    client: "Revtoko.co",
    completionDate: "March 2024",
    technologies: ["Tableau", "Excel", "SQL", "PowerPoint", "Business Intelligence"],
    description: "A data-driven business analysis project aimed at increasing user acquisition and market share for an e-commerce platform. The project involved analyzing user registration trends, product category performance, customer journey, conversion rates, and providing actionable business recommendations.",
    challenge: "Stagnant user growth and the need to identify new strategies for boosting user acquisition and retention in a competitive e-commerce landscape.",
    solution: "Conducted in-depth Data Analyst on user behavior, sales, and conversion funnels. Delivered strategic recommendations including localized marketing, checkout optimization, and personalized retention programs. Presented findings in a comprehensive dashboard and business report.",
    imageUrls: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://example-dashboard.com",
    githubUrl: "https://github.com/username/revtoko-portfolio"
  },
  {
    id: "1",
    title: "Customer Retention Analysis Dashboard",
    category: "Data Analytics",
    client: "B2B Marketplace Telkom",
    completionDate: "April 2024",
    technologies: ["Python", "Pandas", "Tableau", "SQL", "Power BI"],
    description: "A comprehensive dashboard designed to analyze customer retention and segmentation for a B2B marketplace. It leverages cohort analysis, Customer Lifetime Value (CLV), and Average Revenue Per User (ARPU) to provide actionable insights for reducing churn and increasing customer lifetime value.",
    challenge: "The main challenge was integrating and processing large volumes of transactional data from various buyer segments (Gold, Silver, Bronze) while delivering real-time analytics to guide marketing strategies effectively.",
    solution: "We implemented an end-to-end data pipeline using Python and SQL for data extraction and transformation, combined with Tableau and Power BI for dynamic visualization. Cohort analysis and root cause analysis models were developed to identify retention trends and churn drivers, enabling proactive marketing interventions.",
    imageUrls: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599658880436-c61792e70672?w=800&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://docs.google.com/presentation/d/1G3xvu6xoKDDeOOPkKbkkG4H6-0M6g0RX-BPJdvg5Nnc/edit?usp=sharing",
    githubUrl: "https://github.com/username/customer-retention-dashboard"
  }
  
];

const PortfolioDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProject = () => {
      setIsLoading(true);
      setTimeout(() => {
        const project = projects.find(p => p.id === id);
        setCurrentProject(project);
        setIsLoading(false);
      }, 500); // Simulate loading
    };
    
    fetchProject();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="glass-effect rounded-2xl p-12 text-center">
          <div className="h-16 w-16 mx-auto animate-spin rounded-full border-4 border-primary border-t-transparent mb-6"></div>
          <p className="text-lg text-muted-foreground">Loading project...</p>
        </div>
      </div>
    );
  }
  
  if (!currentProject) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-20">
        <div className="glass-effect rounded-2xl p-12 text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <p className="text-muted-foreground mb-8">The project you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 hover:shadow-xl transition-all duration-300">
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-20 left-20 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-animation"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-lg rotate-45 blur-xl floating-animation" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="relative container px-4 z-10">
          <AnimatedSection>
            <Link to="/portfolio" className="group mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </Link>
            
            <div className="max-w-4xl">
              <span className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-lg mb-6">
                {currentProject.category}
              </span>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-6">
                {currentProject.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                {currentProject.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      <div className="container px-4">
        
        <div className="py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimatedSection delay={100}>
                <div className="glass-effect rounded-2xl p-2 mb-8">
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={currentProject.imageUrls[currentImageIndex]}
                      alt={currentProject.title}
                      className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {currentProject.imageUrls.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className={`group cursor-pointer overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg ${
                        idx === currentImageIndex 
                          ? 'ring-4 ring-primary/50 shadow-xl scale-105' 
                          : 'hover:scale-105 glass-effect'
                      }`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <AspectRatio ratio={16/9}>
                        <img
                          src={img}
                          alt={`${currentProject.title} ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              
              <AnimatedSection delay={200} className="mt-12">
                <div className="glass-effect rounded-2xl p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-8">Project Details</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">The Challenge</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{currentProject.challenge}</p>
                    </div>
                    
                    <Separator className="my-8" />
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-primary">The Solution</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{currentProject.solution}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            <div>
              <AnimatedSection delay={150}>
                <div className="glass-effect rounded-2xl p-8 sticky top-24">
                  <h3 className="text-2xl font-bold mb-6">Project Info</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Client</h4>
                      <p className="text-lg font-medium">{currentProject.client}</p>
                    </div>
                    
                    <div className="p-4 rounded-xl bg-gradient-to-r from-accent/10 to-primary/10">
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Completion Date</h4>
                      <p className="text-lg font-medium">{currentProject.completionDate}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-3">
                        {currentProject.technologies.map((tech: string, idx: number) => (
                          <span 
                            key={idx}
                            className="inline-block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4">
                      <Button asChild className="w-full bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl transition-all duration-300 h-12">
                        <a href={currentProject.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-5 w-5" />
                          Live Preview
                        </a>
                      </Button>
                      
                      <Button asChild variant="outline" className="w-full hover:bg-primary/10 hover:text-primary h-12">
                        <a href={currentProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-5 w-5" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetailPage;
