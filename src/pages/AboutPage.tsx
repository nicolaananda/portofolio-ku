import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Award, Users, Code, Calendar, Mail, CheckCircle, MapPin, Sparkles, Star, Trophy, Target, Eye, ExternalLink } from 'lucide-react';
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

  const skills = [
    { name: "Python", level: 95, category: "Data & AI", icon: "🐍", color: "from-green-400 to-emerald-600" },
    { name: "React", level: 90, category: "Frontend", icon: "⚛️", color: "from-blue-400 to-cyan-600" },
    { name: "TypeScript", level: 88, category: "Frontend", icon: "📘", color: "from-blue-600 to-indigo-600" },
    { name: "Node.js", level: 85, category: "Backend", icon: "🟢", color: "from-green-500 to-lime-600" },
    { name: "SQL", level: 92, category: "Database", icon: "🗄️", color: "from-orange-400 to-red-500" },
    { name: "Tableau", level: 94, category: "Analytics", icon: "📊", color: "from-purple-400 to-pink-600" }
  ];

  return (
    <div className="min-h-screen pt-20 overflow-hidden">
      <SEOHead
        title="About Me - Nicola Ananda | Data Analyst & Web Developer"
        description="Learn more about Nicola Ananda, a professional Data Analyst and Full Stack Web Developer with expertise in Python, React, TypeScript, and business intelligence. Based in Malang, Indonesia."
        keywords="About Nicola Ananda, Data Analyst Profile, Web Developer Background, Python Expert, React Developer, TypeScript, Business Intelligence, Malang Indonesia"
        url="https://nicola.id/about"
        image="/about.webp"
        structuredData={structuredData}
      />

      {/* Modern Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/30 via-transparent to-pink-50/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(120,119,198,0.1),transparent),radial-gradient(ellipse_at_bottom_right,rgba(255,154,158,0.1),transparent)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-16 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-blue-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="relative container px-4 z-10">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <AnimatedSection className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 text-sm font-semibold text-green-700 border border-green-200/50 backdrop-blur-sm mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                About Me
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-8 tracking-tight leading-tight">
                <span className="block mb-2">Meet</span>
                <span className="bg-gradient-to-r from-primary via-purple-600 to-accent bg-clip-text text-transparent">Nicola Ananda</span>
              </h1>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-8">
                <p className="text-xl">
                  I am a passionate <strong className="text-gray-900 font-semibold">Data Scientist</strong> dedicated to transforming raw data into valuable business insights. My analytical skills include data interpretation, trend identification, and creating comprehensive reports that support informed decision-making.
                </p>
                
                <p>
                  In addition to my data analysis expertise, I possess a <strong className="text-gray-900 font-semibold">versatile skill set</strong> in web development, gained through intensive training programs. This unique combination allows me to create user-friendly dashboards and interactive data visualizations.
                </p>
                
                <p>
                  As a <strong className="text-gray-900 font-semibold">cross-functional team member</strong>, I bring both analytical and technical skills to any organization. My methodical approach bridges the gap between data insights and practical business applications.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:-translate-y-1">
                  <a href="/resume.pdf" download>
                    <span className="relative z-10 flex items-center">
                      <Download size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Download Resume
                    </span>
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group rounded-2xl px-8 py-4 text-base font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                  <a href="/contact">
                    <Mail size={18} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Let's Connect
                  </a>
                </Button>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="lg:col-span-5">
              <div className="relative group">
                <div className="relative h-80 w-80 lg:h-96 lg:w-96 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-purple-300/20 to-accent/30 rounded-3xl blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-700 animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-tl from-accent/20 via-transparent to-primary/20 rounded-3xl blur-2xl opacity-40"></div>
                  
                  <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-white/80 shadow-2xl shadow-gray-900/20 group-hover:shadow-3xl group-hover:shadow-primary/20 transition-all duration-700 backdrop-blur-sm">
                    <img 
                      src="/about.webp" 
                      alt="Nicola Ananda" 
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-3xl ring-1 ring-white/30 ring-inset"></div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Enhanced Skills Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,1)_1px,transparent_0)] bg-[size:24px_24px]"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                <Code className="w-4 h-4" />
                Technical Stack
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Skills & <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Expertise</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                A comprehensive toolkit for modern data analysis and web development
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto mb-16">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={200 + index * 50}>
                <div className="group p-6 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-xl flex items-center justify-center text-white text-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{skill.name}</h3>
                        <p className="text-sm text-gray-500">{skill.category}</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-gray-800">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Additional Skills */}
          <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
            {[
              {
                title: "Data Analytics & BI",
                description: "Transform complex datasets into actionable business insights with advanced analytics, machine learning, and interactive dashboards.",
                features: ["Predictive Analytics", "Business Intelligence", "Data Visualization", "Statistical Modeling"],
                gradient: "from-blue-500 to-purple-600",
                bgGradient: "from-blue-50 to-purple-50",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              },
              {
                title: "Full Stack Development",
                description: "Build scalable, modern web applications with cutting-edge technologies and exceptional user experiences.",
                features: ["React & Next.js", "Node.js APIs", "Database Design", "Cloud Deployment"],
                gradient: "from-purple-500 to-pink-600",
                bgGradient: "from-purple-50 to-pink-50",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              },
              {
                title: "AI & Machine Learning",
                description: "Integrate intelligent features and automation into applications using modern AI technologies and frameworks.",
                features: ["ML Model Development", "AI Integration", "Automation Scripts", "NLP Solutions"],
                gradient: "from-green-500 to-teal-600",
                bgGradient: "from-green-50 to-teal-50",
                icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
              }
            ].map((service, index) => (
              <AnimatedSection key={service.title} delay={300 + index * 100} className="group">
                <div className={`relative p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-2xl transition-all duration-500 bg-gradient-to-br ${service.bgGradient} backdrop-blur-sm h-full transform hover:-translate-y-2`}>
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700 text-sm">
                          <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Experience Section */}
      <section className="py-24 bg-white">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                <Award className="w-4 h-4" />
                Professional Experience
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Career <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Key roles and achievements in data analysis and technical operations
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-5xl mx-auto space-y-8">
            {[
              {
                title: "Production Support – Final Blend Section",
                company: "PT. Gudang Garam Tbk, Unit V Processing",
                period: "June 2025 - Present (Contract)",
                status: "Current Role",
                statusColor: "bg-green-100 text-green-800 border-green-200",
                description: "Currently part of the production support team at PT. Gudang Garam Tbk, based in Unit 5 Processing. Assigned to the Final Blend section, assisting in one of the most vital stages of the cigarette production process.",
                achievements: [
                  "Help organize and load tobacco materials into designated storage bins according to daily production needs",
                  "Monitor the flow and quantity of tobacco to ensure consistency and prevent supply delays",
                  "Support day-to-day operational tasks including material handling, area organization, and team coordination",
                  "Maintain clean and orderly workspaces in line with company standards",
                  "Actively contribute to ensuring efficient final blend process that meets quality expectations"
                ],
                icon: <Trophy className="w-7 h-7" />,
                gradient: "from-orange-500 to-red-600",
                bgGradient: "from-orange-50/30 to-transparent"
              },
              {
                title: "Engineering On Site (EOS)",
                company: "PT. Jalin Mayantara",
                period: "April 2025 - July 2025",
                status: "Completed",
                statusColor: "bg-blue-100 text-blue-800 border-blue-200",
                description: "Specialized in school data management and quality assurance for the PPDB (Student Admission) web application system.",
                achievements: [
                  "Organized complex student datasets from multiple schools, improving data integrity by 85%",
                  "Conducted comprehensive testing, identifying 30+ critical bugs before public release",
                  "Configured system parameters to align with specific school requirements"
                ],
                icon: <Award className="w-7 h-7" />,
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50/30 to-transparent"
              },
              {
                title: "Data Analyst Associate",
                company: "B2B Padi by Telkom",
                period: "February 2024 - May 2024",
                status: "Completed",
                statusColor: "bg-green-100 text-green-800 border-green-200",
                description: "Drove data-driven decision making through comprehensive analysis and visualization of key business metrics.",
                achievements: [
                  "Analyzed purchasing patterns using Python, Tableau, and SQL for market insights",
                  "Designed interactive dashboards enabling real-time decision-making",
                  "Developed K-means Clustering Analysis, improving marketing effectiveness by 25%"
                ],
                icon: <Target className="w-7 h-7" />,
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50/30 to-transparent"
              },
              {
                title: "Founder",
                company: "iNyx Store (Online Gadgets Shop)",
                period: "May 2021 - December 2024",
                status: "Entrepreneurial",
                statusColor: "bg-purple-100 text-purple-800 border-purple-200",
                description: "Founded and scaled a successful e-commerce platform, demonstrating strong business acumen and technical expertise.",
                achievements: [
                  "Implemented data analytics for pricing optimization, achieving 10% monthly sales growth",
                  "Expanded product catalog by 200% while maintaining competitive pricing",
                  "Led team of 5 employees with data-driven decision-making processes"
                ],
                icon: <Trophy className="w-7 h-7" />,
                gradient: "from-green-500 to-green-600",
                bgGradient: "from-green-50/30 to-transparent"
              }
            ].map((exp, index) => (
              <AnimatedSection key={exp.title} delay={100 + index * 100}>
                <div className="group relative bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.bgGradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${exp.gradient} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          {exp.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-900 mb-2">{exp.title}</h3>
                          <p className="text-primary font-semibold mb-2">{exp.company}</p>
                          <p className="text-gray-600 font-medium">{exp.period}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${exp.statusColor} border mt-4 lg:mt-0`}>
                        {exp.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {exp.description}
                    </p>
                    <ul className="space-y-3 text-gray-600">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-6 h-6 text-green-500 mr-4 mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Education Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50/30 to-white">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-6">
                <Calendar className="w-4 h-4" />
                Education & Certifications
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Learning <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Journey</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Continuous learning and professional development in data analysis and web technologies
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
            {[
              {
                title: "AI-Enabled Python Web Development",
                institution: "Devscale.id",
                period: "2025",
                description: "Advanced bootcamp specializing in AI-enabled Python web development, combining artificial intelligence capabilities with robust web application frameworks. Mastered Python-based AI libraries (TensorFlow, PyTorch), Django/Flask frameworks, and intelligent API development. Developed AI-powered web applications featuring machine learning models, natural language processing interfaces, and computer vision integration. Built automated systems using Python scripts, chatbots, recommendation engines, and predictive analytics dashboards, preparing me to create intelligent web solutions that transform business operations.",
                gradient: "from-blue-500 to-blue-600",
                bgGradient: "from-blue-50 to-indigo-50",
                borderColor: "border-blue-100",
                certificateUrl: "/certificates/ai-python-web-dev.pdf"
              },
              {
                title: "Fullstack MERN Development",
                institution: "Devscale.id",
                period: "2024",
                description: "Intensive full-stack MERN development certification focusing exclusively on MongoDB, Express.js, React, and Node.js ecosystem. Mastered complete MERN stack workflow from database modeling with MongoDB, backend API development using Express.js, dynamic frontend interfaces with React hooks and components, to server-side logic with Node.js. Built complex applications including real-time chat systems, e-commerce platforms with payment integration, social media feeds with authentication, and content management systems. Gained expertise in React state management, RESTful APIs, database optimization, and cloud deployment strategies.",
                gradient: "from-purple-500 to-purple-600",
                bgGradient: "from-purple-50 to-violet-50",
                borderColor: "border-purple-100",
                certificateUrl: "/certificates/fullstack-mern.pdf"
              },
              {
                title: "Full Stack Data Analytics",
                institution: "RevoU",
                period: "2024",
                description: "Comprehensive full-stack data analytics program covering the complete data science lifecycle from collection to business intelligence delivery. Mastered Python data manipulation with Pandas/NumPy, statistical analysis, SQL database querying, and advanced data visualization using Tableau and Power BI. Developed expertise in machine learning algorithms, predictive modeling, A/B testing methodologies, and ETL processes. Built end-to-end analytics solutions including customer segmentation models, sales forecasting dashboards, and automated reporting systems. Specialized in transforming raw data into strategic business insights and actionable recommendations for data-driven organizational growth.",
                gradient: "from-green-500 to-green-600",
                bgGradient: "from-green-50 to-emerald-50",
                borderColor: "border-green-100",
                certificateUrl: "/certificates/fullstack-data-analytics.pdf"
              },
              {
                title: "Bachelor of Sport Science",
                institution: "State University of Malang",
                period: "2023",
                description: "Bachelor's degree in Sport Science from State University of Malang, developing strong foundation in scientific research methodology, statistical analysis, and evidence-based problem solving. Gained expertise in human performance data collection, biomechanical analysis, physiological measurements, and sports analytics. Conducted research projects involving experimental design, hypothesis testing, data interpretation, and scientific reporting. Developed critical thinking, project management, and analytical skills through laboratory work, field studies, and collaborative research initiatives. This scientific background provides excellent foundation for data analysis, research methodology, and systematic approach to complex problem-solving in any professional environment.",
                gradient: "from-orange-500 to-orange-600",
                bgGradient: "from-orange-50 to-amber-50",
                borderColor: "border-orange-100",
                certificateUrl: "/certificates/bachelor-sport-science.pdf"
              }
            ].map((edu, index) => (
              <AnimatedSection key={edu.title} delay={100 + index * 50}>
                <div className={`group relative bg-gradient-to-br ${edu.bgGradient} rounded-3xl border ${edu.borderColor} p-6 hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-1`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${edu.gradient} rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{edu.title}</h3>
                      <p className="text-sm font-medium" style={{color: edu.gradient.includes('blue') ? '#2563eb' : edu.gradient.includes('purple') ? '#7c3aed' : edu.gradient.includes('green') ? '#059669' : '#ea580c'}}>{edu.institution} • {edu.period}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                    {edu.description}
                  </p>
                  <Button 
                    asChild 
                    size="sm" 
                    className={`group/cert bg-gradient-to-r ${edu.gradient} hover:shadow-lg hover:shadow-current/25 text-white border-0 transition-all duration-300 transform hover:-translate-y-0.5 font-medium px-4 py-2 text-sm`}
                  >
                    <a href={edu.certificateUrl} download className="flex items-center">
                      <Download className="w-3.5 h-3.5 mr-1.5 group-hover/cert:scale-110 transition-transform duration-300" />
                      Certificate
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-purple-50/50 to-accent/5 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection>
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                  <Mail className="w-4 h-4" />
                  Ready to Collaborate
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                  Let's Build Something <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Amazing</span>
                </h2>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  Ready to discuss how my data analysis and web development skills can help drive your project forward? Let's create something extraordinary together.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button asChild size="lg" className="group relative overflow-hidden rounded-2xl px-10 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1">
                    <a href="/contact">
                      <span className="relative z-10 flex items-center">
                        <Mail size={20} className="mr-3 group-hover:scale-110 transition-transform duration-300" />
                        Start a Project
                      </span>
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group rounded-2xl px-10 py-6 text-lg font-semibold border-2 border-gray-200 hover:border-primary/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm">
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
