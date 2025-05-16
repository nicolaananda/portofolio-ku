import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
            <AnimatedSection className="order-2 md:order-1">
              <h1 className="section-title">About Me</h1>
              <p className="mt-6 text-lg text-muted-foreground text-justify">
                I am a passionate <strong className="text-primary">Data Analyst</strong> aspirant, dedicated to transforming raw data into valuable business insights. My analytical skills include data interpretation, trend identification, and creating comprehensive reports that support informed decision-making. I am currently enhancing my capabilities in AI-powered Data Analysis while building on my strong foundation in business intelligence and reporting.
              </p>
              <p className="mt-4 text-lg text-muted-foreground text-justify">
                In addition to my data analysis expertise, I possess a <strong className="text-primary">versatile skill set</strong> in web development, gained through Devscale's Fullstack JavaScript program. This unique combination allows me to not only analyze complex datasets but also create user-friendly dashboards and interactive data visualizations that effectively communicate findings to all stakeholders, regardless of technical background.
              </p>
              <p className="mt-4 text-lg text-muted-foreground text-justify">
                Furthermore, I have completed a comprehensive program in <strong className="text-primary">Fullstack Digital Marketing</strong>, equipping me with the knowledge to drive digital growth and engagement through strategic online marketing initiatives. This cross-functional expertise enables me to bridge the gap between data insights, web development, and digital marketing, making me a valuable asset to any organization.
              </p>
              <p className="mt-4 text-lg text-muted-foreground text-justify">
                As a <strong className="text-primary">cross-functional team member</strong>, I bring both analytical and technical skills to any organization. My methodical approach to data processing includes thorough cleaning, transformation, and analysis, while my web development capabilities enable me to implement practical solutions that bridge the gap between data insights and business applications. I excel at translating complex data into clear recommendations and actionable strategies that drive business growth.
              </p>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="order-1 md:order-2">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/about.webp" 
                  alt="Nicola" 
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <AnimatedSection>
            <h2 className="section-title">My Skills</h2>
          </AnimatedSection>
          
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={100}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <h3 className="mb-3 text-base font-semibold">Data Analyst</h3>
                <ul className="space-y-2">
                  <SkillItem name="Python" proficiency={95} icon="🐍" />
                  <SkillItem name="SQL" proficiency={90} icon="📊" />
                  <SkillItem name="Statistical Analysis" proficiency={95} icon="📈" />
                  <SkillItem name="Data Mining" proficiency={85} icon="⛏️" />
                  <SkillItem name="Machine Learning" proficiency={80} icon="🤖" />
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <h3 className="mb-3 text-base font-semibold">Web Development</h3>
                <ul className="space-y-2">
                  <SkillItem name="React & TypeScript" proficiency={90} icon="⚛️" />
                  <SkillItem name="Next.js" proficiency={85} icon="🔼" />
                  <SkillItem name="Node.js" proficiency={85} icon="🟢" />
                  <SkillItem name="Modern JavaScript" proficiency={90} icon="📜" />
                  <SkillItem name="RESTful APIs" proficiency={85} icon="🔌" />
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <h3 className="mb-3 text-base font-semibold">Tools & Technologies</h3>
                <ul className="space-y-2">
                  <SkillItem name="Tableau" proficiency={95} icon="📊" />
                  <SkillItem name="Power BI" proficiency={85} icon="📈" />
                  <SkillItem name="Google Data Studio" proficiency={80} icon="📊" />
                  <SkillItem name="Advanced Excel" proficiency={90} icon="📑" />
                  <SkillItem name="Git & GitHub" proficiency={90} icon="🔄" />
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={400}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <h3 className="mb-3 text-base font-semibold">Additional Technical Skills</h3>
                <ul className="space-y-2">
                  <SkillItem name="Django" proficiency={75} icon="🐍" />
                  <SkillItem name="HTML/CSS" proficiency={90} icon="🌐" />
                  <SkillItem name="Image Editing" proficiency={80} icon="🖼️" />
                  <SkillItem name="Basic Video Editing" proficiency={75} icon="🎬" />
                  <SkillItem name="Docker" proficiency={80} icon="🐳" />
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={500}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <h3 className="mb-3 text-base font-semibold">Soft Skills</h3>
                <ul className="space-y-2">
                  <SkillItem name="Problem-Solving" proficiency={95} icon="🧩" />
                  <SkillItem name="Critical Thinking" proficiency={90} icon="🧠" />
                  <SkillItem name="Data Storytelling" proficiency={90} icon="📚" />
                  <SkillItem name="Effective Communication" proficiency={85} icon="💬" />
                  <SkillItem name="Teamwork" proficiency={90} icon="👥" />
                </ul>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={600}>
              <div className="group relative overflow-hidden rounded-lg border bg-card p-4 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <h3 className="mb-3 text-base font-semibold">Professional Attributes</h3>
                <ul className="space-y-2">
                  <SkillItem name="Business Insight Development" proficiency={85} icon="💼" />
                  <SkillItem name="Adaptability" proficiency={90} icon="🔄" />
                  <SkillItem name="Time Management" proficiency={85} icon="⏰" />
                  <SkillItem name="Attention to Detail" proficiency={95} icon="🔍" />
                  <SkillItem name="Analytical Thinking" proficiency={95} icon="🧮" />
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection>
            <h2 className="section-title">Work Experience</h2>
          </AnimatedSection>
          
          <div className="mt-12 grid gap-8 max-w-4xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">April 2025 - July 2025</span>
                      <h3 className="mt-2 text-xl font-semibold">Engineering On Site (EOS)</h3>
                      <p className="mt-1 text-accent">PT. Jalin Mayantara</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Current
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground text-justify">
                    Specialized in school data management and quality assurance for the PPDB (Student Admission) web application system. Focused on data organization, system testing, and configuration to ensure smooth operation of the student admission process.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground text-justify">
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Organized and standardized complex student datasets from multiple schools, improving data integrity and accessibility for the admission system</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Conducted comprehensive testing of the PPDB web application, identifying and documenting over 30 critical bugs before public release</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Performed thorough testing of web demos on spmb.id before public release, ensuring functionality and user experience met quality standards</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Configured system parameters and settings to align with specific school requirements and admission policies</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Cleaned and validated student registration data, reducing errors by 85% and ensuring accurate processing of applications</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">February 2024 - May 2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Data Analyst Associate</h3>
                      <p className="mt-1 text-accent">B2B Padi by Telkom</p>
                    </div>
                    <div className="hidden md:block">
                    <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground text-justify">
                    Played a pivotal role in driving data-driven decision making through comprehensive analysis and visualization of key business metrics. Collaborated with cross-functional teams to deliver actionable insights that directly impacted business growth and operational efficiency.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground text-justify">
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Conducted in-depth analysis of purchasing patterns using Python, Google Sheets, and Tableau, leading to the identification of key market trends and opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Designed and implemented interactive dashboards using Tableau and Power BI, enabling stakeholders to make data-driven decisions with real-time insights</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Developed and deployed a K-means Clustering Analysis model in Python, resulting in the identification of distinct customer segments and a 25% improvement in targeted marketing effectiveness</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Leveraged SQL BigQuery to perform complex Data Analyst on product portfolios, delivering critical business insights that informed strategic decision-making</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Streamlined data processing workflows, reducing report generation time by 60% while maintaining data accuracy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">May 2021 - December 2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Founder</h3>
                      <p className="mt-1 text-accent">iNyx Store (Online shop focusing in Gadgets)</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground text-justify">
                    Founded and scaled a successful e-commerce platform specializing in consumer electronics, demonstrating strong business acumen and technical expertise in Data Analyst and digital marketing.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground text-justify">
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Implemented advanced data analytics and predictive modeling techniques to optimize pricing strategies, resulting in a consistent 10% monthly sales increase</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Developed and executed strategic supplier partnerships, expanding the product catalog by 200% while maintaining competitive pricing</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Created comprehensive data visualization dashboards that provided actionable insights for inventory management and sales optimization</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Established efficient inventory management systems, reducing stock-out incidents by 75% and improving overall operational efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Led a team of 5 employees, implementing data-driven decision-making processes that enhanced team productivity and customer satisfaction</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">August 2020 - December 2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Operations Specialist</h3>
                      <p className="mt-1 text-accent">GH Zoom (Rent and Upgrade ZOOM Meeting)</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground text-justify">
                    Managed operations for a growing Zoom meeting service platform, handling order processing, promotional activities, and inventory management while ensuring excellent customer service.
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground text-justify">
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Processed and fulfilled daily orders for over 100 customers, maintaining high standards of service quality and timely delivery</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Developed and executed promotional campaigns that increased customer acquisition by 25% and improved retention rates</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Managed inventory restocking processes, ensuring optimal product availability while minimizing excess inventory costs</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Utilized data analytics to track order patterns and customer preferences, contributing to a 40% improvement in operational efficiency</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Collaborated with a team of administrators to streamline customer service workflows and enhance overall user experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
            
         
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection>
            <h2 className="section-title">Education</h2>
          </AnimatedSection>
          
          <div className="mt-12 grid gap-8 max-w-3xl mx-auto">
            <AnimatedSection delay={100}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">February 2025 - May 2025</span>
                      <h3 className="mt-2 text-xl font-semibold">AI-Enabled Python Web Development Bootcamp</h3>
                      <p className="mt-1 text-accent">Devscale.id</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        In Progress
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Engaged in an intensive bootcamp focused on integrating artificial intelligence with modern web development. This program emphasizes hands-on experience in building intelligent web applications using Python, equipping participants with the skills to implement AI-driven features and solutions in real-world projects.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Python</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">AI/ML</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Web Development</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">December 2024 - January 2025</span>
                      <h3 className="mt-2 text-xl font-semibold">Fullstack Digital Marketing</h3>
                      <p className="mt-1 text-accent">BelajarLagi</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Completed a comprehensive program in digital marketing, mastering strategies and tools essential for online marketing success. The curriculum covered SEO, social media marketing, content strategy, and analytics, providing a robust foundation for driving digital growth and engagement.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">SEO</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Social Media</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Content Strategy</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Analytics</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={300}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">April 2024 - August 2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Fullstack MERN Bootcamp</h3>
                      <p className="mt-1 text-accent">Devscale.id</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Successfully completed an immersive bootcamp in the MERN stack, gaining expertise in MongoDB, Express.js, React, and Node.js. This program emphasized practical application, enabling the development of full-stack applications with modern JavaScript frameworks and industry best practices.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">MongoDB</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Express.js</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">React</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Node.js</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">September 2023 - March 2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Full Stack Data Analytics</h3>
                      <p className="mt-1 text-accent">RevoU</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Completed a rigorous training program in data analytics, focusing on data processing, visualization, and business intelligence. This course provided the skills necessary to transform raw data into actionable insights using tools like Python, SQL, and Tableau.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Data Analysis</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Python</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">SQL</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Tableau</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={500}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">August 2018 - February 2023</span>
                      <h3 className="mt-2 text-xl font-semibold">Bachelor of Sport Science</h3>
                      <p className="mt-1 text-accent">State University of Malang</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Completed
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Earned a Bachelor's degree in Sport Science, with a curriculum that included exercise physiology, sports psychology, and physical education. Developed strong analytical and research skills through both practical applications and theoretical studies, preparing for a career that bridges the gap between sports science and data analysis.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Exercise Physiology</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Sports Psychology</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Physical Education</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Research</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container px-4">
          <AnimatedSection>
            <h2 className="section-title">Certificates</h2>
          </AnimatedSection>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatedSection delay={100}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Full Stack Data Analytics</h3>
                      <p className="mt-1 text-accent">RevoU</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Professional certification in full stack data analytics, demonstrating expertise in 
                    data processing, analysis, and visualization.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Data Analysis</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Business Intelligence</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Data Visualization</span>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <a href="/certificates/revou-data-analytics.pdf" target="_blank" rel="noopener noreferrer">
                        View Certificate
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">2023 - 2024</span>
                      <h3 className="mt-2 text-xl font-semibold">Fullstack JavaScript Development</h3>
                      <p className="mt-1 text-accent">Devscale Academy</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Comprehensive training in modern web development using JavaScript, React, and Node.js.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">JavaScript</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">React</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Node.js</span>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <a href="/certificates/fullstack-js.pdf" target="_blank" rel="noopener noreferrer">
                        View Certificate
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={300}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">2023</span>
                      <h3 className="mt-2 text-xl font-semibold">Data Analyst with Python</h3>
                      <p className="mt-1 text-accent">DataCamp</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Mastered Data Analyst techniques using Python, pandas, and data visualization libraries.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Python</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Pandas</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Data Visualization</span>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <a href="/certificates/data-analysis.pdf" target="_blank" rel="noopener noreferrer">
                        View Certificate
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">2023</span>
                      <h3 className="mt-2 text-xl font-semibold">SQL for Data Analyst</h3>
                      <p className="mt-1 text-accent">DataCamp</p>
                    </div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verified
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    Advanced SQL skills for Data Analyst and database management.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">SQL</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Database</span>
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">Data Analyst</span>
                  </div>
                  <div className="mt-6">
                    <Button asChild variant="outline" size="sm" className="gap-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <a href="/certificates/sql-analysis.pdf" target="_blank" rel="noopener noreferrer">
                        View Certificate
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </div>
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
  proficiency: number;
  icon: string;
}

const SkillItem = ({ name, proficiency, icon }: SkillItemProps) => {
  return (
    <li className="group/item">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{icon}</span>
          <span className="text-sm group-hover/item:text-primary transition-colors">{name}</span>
        </div>
        <span className="text-xs text-muted-foreground group-hover/item:text-primary transition-colors">{proficiency}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted/50">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out group-hover/item:bg-primary/90" 
          style={{ 
            width: `${proficiency}%`,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            animation: 'skillProgress 1s ease-out forwards'
          }}
        />
      </div>
    </li>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes skillProgress {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
`;
document.head.appendChild(style);

export default AboutPage;
