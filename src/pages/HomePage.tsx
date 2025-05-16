import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import SocialIcons from '../components/SocialIcons';
import AnimatedSection from '../components/AnimatedSection';

const HomePage = () => {
  const typingStrings = [
    "Data Analyst",
    "Web Developer",
    "Fullstack JavaScript Developer",
    "AI-Enabled Developer",
    "Business Intelligence Expert"
  ];
  
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="container relative z-10 px-4 pt-20 pb-8">
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
            <div className="order-2 text-center md:order-1 md:text-left">
              <h1 className="font-sans text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Hello, I'm <span className="text-primary">Nicola Ananda</span>
              </h1>
              
              <div className="mt-4 h-12 text-2xl font-medium text-foreground md:text-3xl">
                I'm a{" "}
                <TypingAnimation
                  strings={typingStrings}
                  className="text-accent"
                />
              </div>
              
              <p className="mt-6 text-lg text-muted-foreground">
                A versatile professional combining data analytics expertise with modern web development skills. 
                Transforming complex data into actionable insights while building beautiful, functional web applications.
              </p>
              
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/portfolio">
                    View My Work
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/about">
                    About Me
                    <User size={18} />
                  </Link>
                </Button>
                {/* <Button asChild variant="ghost" size="lg">
                  <Link to="/blog">Blog</Link>
                </Button> */}
              </div>
              
              <div className="mt-8 justify-center md:justify-start md:flex">
                <SocialIcons />
              </div>
            </div>
            
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 shadow-xl md:h-80 md:w-80">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10"></div>
                {/* Replace with actual profile image */}
                <img
                  src="/profile.jpg"
                  alt="Nicola Ananda"
                  className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="bg-muted/30 py-20">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <h2 className="section-title mx-auto text-center">What I Do</h2>
          </AnimatedSection>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={200} className="card-hover rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Data Analyst</h3>
              <p className="text-muted-foreground">
                Transforming raw data into meaningful insights using statistical analysis, 
                data mining, and predictive modeling techniques.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300} className="card-hover rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Web Development</h3>
              <p className="text-muted-foreground">
                Building modern web applications using React, TypeScript, and Node.js. 
                Graduate of Devscale's Fullstack JavaScript program.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={400} className="card-hover rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">AI-Enabled Development</h3>
              <p className="text-muted-foreground">
                Currently pursuing AI-Enabled Python Web Development, combining 
                artificial intelligence with modern web technologies.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={500} className="card-hover rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Data Visualization</h3>
              <p className="text-muted-foreground">
                Creating interactive and insightful dashboards using Tableau, 
                Power BI, and custom visualization libraries.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={600} className="card-hover rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Business Intelligence</h3>
              <p className="text-muted-foreground">
                Developing comprehensive BI solutions to help organizations make 
                data-driven decisions and optimize their operations.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Featured Work Section */}
      <section className="py-20">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <h2 className="section-title mx-auto text-center">Featured Projects</h2>
          </AnimatedSection>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Featured Project 1 */}
            <AnimatedSection delay={200} className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" 
                  alt="Customer Retention Analysis Dashboard" 
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Customer Retention Analysis Dashboard</h3>
                <p className="mb-4 text-muted-foreground">A comprehensive dashboard designed to analyze customer retention and segmentation for a B2B marketplace. It leverages cohort analysis, Customer Lifetime Value (CLV), and Average Revenue Per User (ARPU) to provide actionable insights for reducing churn and increasing customer lifetime value.</p>
                <Link to="/portfolio/1" className="text-sm font-medium text-primary hover:text-primary/80">
                  View Project →
                </Link>
              </div>
            </AnimatedSection>
            
            {/* Featured Project 2 */}
            <AnimatedSection delay={300} className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                  alt="E-Commerce Growth & Market Insights (Revtoko.co)" 
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">E-Commerce Growth & Market Insights (Revtoko.co)</h3>
                <p className="mb-4 text-muted-foreground">A data-driven business analysis project aimed at increasing user acquisition and market share for an e-commerce platform. The project involved analyzing user registration trends, product category performance, customer journey, conversion rates, and providing actionable business recommendations.</p>
                <Link to="/portfolio/2" className="text-sm font-medium text-primary hover:text-primary/80">
                  View Project →
                </Link>
              </div>
            </AnimatedSection>
            
            {/* Featured Project 3 */}
            <AnimatedSection delay={400} className="group overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                  alt="Data Analyst Dashboard" 
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">Data Analyst Dashboard</h3>
                <p className="mb-4 text-muted-foreground">An interactive dashboard for visualizing business metrics and KPIs. The platform provides real-time Data Analyst, customizable reports, and automated insights generation. Features include data filtering, trend analysis, and export capabilities.</p>
                <Link to="/portfolio/7" className="text-sm font-medium text-primary hover:text-primary/80">
                  View Project →
                </Link>
              </div>
            </AnimatedSection>
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild>
              <Link to="/portfolio">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="bg-primary py-16 text-white">
        <div className="container px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold md:text-4xl">Need Modern Web Solutions?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
              Let's collaborate to build beautiful, responsive web applications that showcase your brand and deliver exceptional user experiences, with a touch of data analytics to drive informed decisions.
            </p>
            <div className="mt-8">
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
