import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Award, Users, Code, Calendar, Mail, CheckCircle, MapPin, Sparkles, Star, Trophy, Target } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SEOHead from '../components/SEOHead';

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Person",
      "name": "Nicola Ananda",
      "jobTitle": ["Data Analyst", "Web Developer"],
      "description": "Professional Data Analyst and Full Stack Web Developer with expertise in data analysis, business intelligence, and modern web development technologies.",
      "url": "https://nicola.id/about",
      "image": "https://nicola.id/about.webp",
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Fullstack JavaScript Developer",
          "credentialCategory": "Certificate",
          "educationalLevel": "Professional Training"
        }
      ]
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <SEOHead
        title="About Me - Nicola Ananda | Data Analyst & Web Developer"
        description="Learn more about Nicola Ananda, a professional Data Analyst and Full Stack Web Developer with expertise in Python, React, TypeScript, and business intelligence. Based in Malang, Indonesia."
        keywords="About Nicola Ananda, Data Analyst Profile, Web Developer Background, Python Expert, React Developer, TypeScript, Business Intelligence, Malang Indonesia"
        url="https://nicola.id/about"
        image="/about.webp"
        structuredData={structuredData}
      />
      {/* Elegant Hero Section */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-50/20 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        </div>
        
        {/* Elegant floating elements */}
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-3xl animate-pulse opacity-70"></div>
        <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse opacity-60" style={{animationDelay: '3s'}}></div>
        
        <div className="relative container px-4 z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                About Me
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-10 tracking-tight">
                <span className="block mb-2">Meet</span>
                <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Nicola Ananda</span>
              </h1>
              
              <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-light">
                <p className="text-xl">
                  I am a passionate <strong className="text-gray-900 font-semibold">Data Analyst</strong> dedicated to transforming raw data into valuable business insights. My analytical skills include data interpretation, trend identification, and creating comprehensive reports that support informed decision-making.
                </p>
                
                <p>
                  In addition to my data analysis expertise, I possess a <strong className="text-gray-900 font-semibold">versatile skill set</strong> in web development, gained through Devscale's Fullstack JavaScript program. This unique combination allows me to create user-friendly dashboards and interactive data visualizations.
                </p>
                
                <p>
                  As a <strong className="text-gray-900 font-semibold">cross-functional team member</strong>, I bring both analytical and technical skills to any organization. My methodical approach bridges the gap between data insights and practical business applications.
                </p>
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-8 py-6 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
                  <a href="/resume.pdf" download>
                    <span className="relative z-10 flex items-center">
                      <Download size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Download Resume
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-2xl px-8 py-6 text-base font-semibold border-2 border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                  <a href="/contact">
                    <Mail size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Get In Touch
                  </a>
                </Button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="order-1 lg:order-2">
              <div className="relative group">
                {/* Sophisticated image container with layered effects */}
                <div className="relative h-80 w-80 lg:h-96 lg:w-96 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-300/10 to-accent/20 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
                  <div className="absolute inset-2 bg-gradient-to-tl from-accent/15 via-transparent to-primary/15 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-700" style={{animationDelay: '1s'}}></div>
                  
                  <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-white/60 shadow-2xl shadow-gray-900/10 group-hover:shadow-3xl group-hover:shadow-primary/10 transition-all duration-700 backdrop-blur-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10"></div>
                    <img 
                      src="/about.webp" 
                      alt="Nicola Ananda" 
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 ring-inset"></div>
                  </div>
                  

                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Elegant Skills Overview Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                <Code className="w-4 h-4" />
                Technical Skills
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                A comprehensive toolkit for modern data analysis and web development
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="group relative p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Data Analysis</h3>
                  <ul className="space-y-4 text-gray-600">
                    <SkillItem name="Python" icon="🐍" />
                    <SkillItem name="SQL" icon="🗄️" />
                    <SkillItem name="Statistical Analysis" icon="📊" />
                    <SkillItem name="Machine Learning" icon="🤖" />
                    <SkillItem name="Data Visualization" icon="📈" />
                  </ul>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="group relative p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Web Development</h3>
                  <ul className="space-y-4 text-gray-600">
                    <SkillItem name="React & TypeScript" icon="⚛️" />
                    <SkillItem name="Next.js" icon="🔼" />
                    <SkillItem name="Node.js" icon="🟢" />
                    <SkillItem name="Modern JavaScript" icon="📜" />
                    <SkillItem name="RESTful APIs" icon="🔌" />
                  </ul>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="group relative p-10 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 bg-white/80 backdrop-blur-sm h-full transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-green-500/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Tools & Technologies</h3>
                  <ul className="space-y-4 text-gray-600">
                    <SkillItem name="Tableau" icon="📊" />
                    <SkillItem name="Power BI" icon="📈" />
                    <SkillItem name="Advanced Excel" icon="📑" />
                    <SkillItem name="Git & GitHub" icon="🔄" />
                    <SkillItem name="Docker" icon="🐳" />
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Elegant Experience Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                <Award className="w-4 h-4" />
                Professional Experience
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Career <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Key roles and achievements in data analysis and technical operations
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-5xl mx-auto space-y-10">
            <AnimatedSection delay={100}>
              <div className="group relative bg-white rounded-3xl border border-gray-100 p-10 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Engineering On Site (EOS)</h3>
                        <p className="text-primary font-semibold mb-2">PT. Jalin Mayantara</p>
                        <p className="text-gray-600 font-medium">April 2025 - July 2025</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200 mt-4 lg:mt-0">
                      Current Role
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                    Specialized in school data management and quality assurance for the PPDB (Student Admission) web application system.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Organized complex student datasets from multiple schools, improving data integrity by 85%</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Conducted comprehensive testing, identifying 30+ critical bugs before public release</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Configured system parameters to align with specific school requirements</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="group relative bg-white rounded-3xl border border-gray-100 p-10 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Target className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Data Analyst Associate</h3>
                        <p className="text-primary font-semibold mb-2">B2B Padi by Telkom</p>
                        <p className="text-gray-600 font-medium">February 2024 - May 2024</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-200 mt-4 lg:mt-0">
                      Completed
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                    Drove data-driven decision making through comprehensive analysis and visualization of key business metrics.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Analyzed purchasing patterns using Python, Tableau, and SQL for market insights</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Designed interactive dashboards enabling real-time decision-making</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Developed K-means Clustering Analysis, improving marketing effectiveness by 25%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="group relative bg-white rounded-3xl border border-gray-100 p-10 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 transform hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Trophy className="w-7 h-7" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Founder</h3>
                        <p className="text-primary font-semibold mb-2">iNyx Store (Online Gadgets Shop)</p>
                        <p className="text-gray-600 font-medium">May 2021 - December 2024</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800 border border-purple-200 mt-4 lg:mt-0">
                      Entrepreneurial
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed font-light text-lg">
                    Founded and scaled a successful e-commerce platform, demonstrating strong business acumen and technical expertise.
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Implemented data analytics for pricing optimization, achieving 10% monthly sales growth</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Expanded product catalog by 200% while maintaining competitive pricing</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="font-light">Led team of 5 employees with data-driven decision-making processes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Elegant Education Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50/30">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                <Calendar className="w-4 h-4" />
                Education & Certifications
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Learning <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                Continuous learning and professional development in data analysis and web technologies
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="group relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">AI-Enabled Python Web Development</h3>
                    <p className="text-blue-600 font-medium">Devscale.id • 2025 (In Progress)</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-light">
                  Intensive bootcamp focused on integrating AI with modern web development using Python.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="group relative bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl border border-purple-100 p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Fullstack MERN Development</h3>
                    <p className="text-purple-600 font-medium">Devscale.id • 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-light">
                  Comprehensive training in MongoDB, Express.js, React, and Node.js with modern JavaScript frameworks.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl border border-green-100 p-8 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Full Stack Data Analytics</h3>
                    <p className="text-green-600 font-medium">RevoU • 2024</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-light">
                  Rigorous training in data processing, visualization, and business intelligence using Python, SQL, and Tableau.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="group relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl border border-orange-100 p-8 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 h-full transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Award className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Bachelor of Sport Science</h3>
                    <p className="text-orange-600 font-medium">State University of Malang • 2023</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed font-light">
                  Developed strong analytical and research skills through practical applications and theoretical studies.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Elegant Contact CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                  <Mail className="w-4 h-4" />
                  Let's Collaborate
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Ready to Work <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Together?</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed font-light max-w-3xl mx-auto">
                  Let's discuss how my data analysis and web development skills can help drive your project forward.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5">
                    <a href="/contact">
                      <span className="relative z-10 flex items-center">
                        <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                        Start a Conversation
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                    <a href="/resume.pdf" download>
                      <Download size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

interface SkillItemProps {
  name: string;
  icon: string;
}

const SkillItem = ({ name, icon }: SkillItemProps) => {
  return (
    <li className="flex items-center gap-4 group">
      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
      <span className="font-medium text-lg">{name}</span>
    </li>
  );
};

export default AboutPage;
