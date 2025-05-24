import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, User } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import SocialIcons from '../components/SocialIcons';
import AnimatedSection from '../components/AnimatedSection';
import SkillBadge from '../components/SkillBadge';
import LazyImage from '../components/LazyImage';

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
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl floating-animation"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-accent/15 to-primary/15 rounded-lg rotate-45 blur-xl floating-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-primary/25 to-accent/25 rounded-full blur-lg floating-animation" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container relative z-10 px-4 pt-20 pb-8">
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
            <div className="order-2 text-center md:order-1 md:text-left">
              <h1 className="font-sans text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Hello, I'm <span className="gradient-text">Nicola Ananda</span>
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
              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary/20 shadow-2xl md:h-80 md:w-80 pulse-glow floating-animation">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-transparent to-primary/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/10"></div>
                <LazyImage
                  src="/profile_optimized.jpg"
                  webpSrc="/profile.webp"
                  alt="Nicola Ananda - Data Analyst & Web Developer"
                  className="relative z-10 h-full w-full transition-all duration-700 hover:scale-110 hover:rotate-2"
                  sizes="(max-width: 768px) 256px, 320px"
                  loading="eager"
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
            <AnimatedSection delay={200} className="card-hover rounded-2xl glass-effect p-8 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Data Analyst</h3>
              <p className="text-muted-foreground">
                Transforming raw data into meaningful insights using statistical analysis, 
                data mining, and predictive modeling techniques.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={300} className="card-hover rounded-2xl glass-effect p-8 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Web Development</h3>
              <p className="text-muted-foreground">
                Building modern web applications using React, TypeScript, and Node.js. 
                Graduate of Devscale's Fullstack JavaScript program.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={400} className="card-hover rounded-2xl glass-effect p-8 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-accent to-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">AI-Enabled Development</h3>
              <p className="text-muted-foreground">
                Currently pursuing AI-Enabled Python Web Development, combining 
                artificial intelligence with modern web technologies.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={500} className="card-hover rounded-2xl glass-effect p-8 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Data Visualization</h3>
              <p className="text-muted-foreground">
                Creating interactive and insightful dashboards using Tableau, 
                Power BI, and custom visualization libraries.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={600} className="card-hover rounded-2xl glass-effect p-8 group">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      
      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container px-4">
          <AnimatedSection delay={100}>
            <h2 className="section-title mx-auto text-center">Technical Skills</h2>
          </AnimatedSection>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatedSection delay={200}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                }
                name="React"
                level="Advanced"
                color="primary"
                delay={200}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
                  </svg>
                }
                name="TypeScript"
                level="Advanced"
                color="accent"
                delay={300}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                  </svg>
                }
                name="Tailwind CSS"
                level="Expert"
                color="gradient"
                delay={400}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 12v12h24V0H0v12zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.549.666l-3.976 2.49s-.197-.294-.297-.416c-.297-.366-.623-.532-1.297-.532-.663 0-1.075.264-1.075.646 0 .394.412.533 1.105.856 1.146.53 1.854 1.132 1.854 2.42 0 1.405-.885 2.206-2.104 2.206-1.447 0-2.421-.766-2.889-1.934l4.12-2.55c.166.264.288.461.537.461.255 0 .416-.149.416-.461 0-.416-.254-.555-.73-.849-.513-.316-1.342-.822-1.342-1.934 0-1.406.885-1.976 2.067-1.976.91 0 1.548.39 2.061 1.308zM9.97 11.707c.455 0 .825.262 1.029.595l3.905-2.376c-.685-1.188-1.944-1.983-3.934-1.983-2.223 0-4.075 1.813-4.075 4.057s1.852 4.057 4.075 4.057c2.064 0 3.82-.915 4.487-2.188l-4.066-2.23c-.214.367-.611.595-1.421.595-1.125 0-1.958-.873-1.958-1.927 0-1.054.833-1.927 1.958-1.927z"/>
                  </svg>
                }
                name="Node.js"
                level="Intermediate"
                color="primary"
                delay={500}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                }
                name="Git & GitHub"
                level="Advanced"
                color="accent"
                delay={600}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={700}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm-.895 16.219c-2.532 0-4.362-1.039-4.362-3.314 0-1.116.457-2.194 1.341-2.972l.141-.119c.685-.6 1.611-.9 2.75-.9.685 0 1.295.1 1.81.3v.9c-.515-.3-1.125-.45-1.81-.45-.9 0-1.67.225-2.28.675-.61.45-.915 1.05-.915 1.8 0 1.5.915 2.25 2.745 2.25.685 0 1.295-.15 1.81-.45v.9c-.515.2-1.125.3-1.81.3-.515 0-.97-.075-1.365-.225zm7.095-8.219c0 2.7-1.8 4.5-4.5 4.5s-4.5-1.8-4.5-4.5 1.8-4.5 4.5-4.5 4.5 1.8 4.5 4.5z"/>
                  </svg>
                }
                name="Python"
                level="Intermediate"
                color="gradient"
                delay={700}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={800}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                  </svg>
                }
                name="HTML/CSS"
                level="Expert"
                color="primary"
                delay={800}
              />
            </AnimatedSection>
            
            <AnimatedSection delay={900}>
              <SkillBadge
                icon={
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zm-1.25 14.75V9.25h2.5v5.5h-2.5zm0-7.5V5.75h2.5v1.5h-2.5z"/>
                  </svg>
                }
                name="Data Analysis"
                level="Expert"
                color="accent"
                delay={900}
              />
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
            <AnimatedSection delay={200} className="group overflow-hidden rounded-2xl glass-effect transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" 
                  alt="Customer Retention Analysis Dashboard" 
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
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
            <AnimatedSection delay={300} className="group overflow-hidden rounded-2xl glass-effect transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                  alt="E-Commerce Growth & Market Insights (Revtoko.co)" 
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
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
            <AnimatedSection delay={400} className="group overflow-hidden rounded-2xl glass-effect transition-all hover:shadow-2xl hover:-translate-y-2">
              <div className="relative h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80" 
                  alt="Data Analyst Dashboard" 
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
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
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl floating-animation"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-lg rotate-45 blur-xl floating-animation" style={{animationDelay: '3s'}}></div>
        
        <div className="relative container px-4 text-center text-white">
          <AnimatedSection>
            <h2 className="text-4xl font-bold md:text-5xl mb-6">
              Ready to <span className="text-white drop-shadow-lg">Transform</span> Your Ideas?
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl opacity-95 leading-relaxed">
              Let's collaborate to build beautiful, responsive web applications that showcase your brand and deliver exceptional user experiences, with a touch of data analytics to drive informed decisions.
            </p>
            <div className="mt-10">
              <Button asChild variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl px-8 py-4 text-lg font-semibold">
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
