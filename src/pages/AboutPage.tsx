import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Award, Users, Code, Calendar, Mail, CheckCircle, MapPin, Sparkles, Star, Trophy, Target, Eye, ExternalLink, Zap, TrendingUp, Briefcase, Rocket } from 'lucide-react';
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
      "image": "https://nicola.id/about.webp"
    }
  };

  const skills = [
    { name: "Python", level: 95, category: "Data & AI", icon: "🐍" },
    { name: "React", level: 90, category: "Frontend", icon: "⚛️" },
    { name: "TypeScript", level: 88, category: "Frontend", icon: "📘" },
    { name: "Node.js", level: 85, category: "Backend", icon: "🟢" },
    { name: "SQL", level: 92, category: "Database", icon: "🗄️" },
    { name: "Tableau", level: 94, category: "Analytics", icon: "📊" }
  ];

  const stats = [
    { label: "Years Experience", value: "5+", icon: <Star className="w-8 h-8" /> },
    { label: "Projects Completed", value: "50+", icon: <Rocket className="w-8 h-8" /> },
    { label: "Happy Clients", value: "30+", icon: <Trophy className="w-8 h-8" /> },
    { label: "Technologies", value: "20+", icon: <Code className="w-8 h-8" /> }
  ];

  return (
    <div className="min-h-screen pt-20 overflow-hidden bg-white dark:bg-black">
      <SEOHead
        title="About Me - Nicola Ananda | Data Analyst & Web Developer"
        description="Learn more about Nicola Ananda, a professional Data Analyst and Full Stack Web Developer with expertise in Python, React, TypeScript, and business intelligence."
        keywords="About Nicola Ananda, Data Analyst Profile, Web Developer Background, Python Expert, React Developer"
        url="https://nicola.id/about"
        image="/about.webp"
        structuredData={structuredData}
      />

      {/* Enhanced Liquid Glass Background */}
      <div className="dark:opacity-100 opacity-30 liquid-bg"></div>
      <div className="fixed inset-0 -z-10 gradient-mesh"></div>
      <div className="noise-texture dark:opacity-100 opacity-50"></div>

      {/* BENTO GRID HERO */}
      <section className="relative py-32">
        <div className="container px-4">
          {/* Header */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-cyan-400 font-bold mb-8">
                <Sparkles className="w-5 h-5" />
                About Me
              </div>
              <h1 className="text-6xl lg:text-7xl font-black dark:text-white text-gray-900 mb-6">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Nicola</span>
              </h1>
              <p className="text-xl dark:text-slate-400 text-gray-600 max-w-3xl mx-auto">
                Passionate about transforming data into insights and code into experiences
              </p>
            </div>
          </AnimatedSection>

          {/* Bento Grid */}
          <div className="grid md:grid-cols-6 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
            {/* Large card - Profile Image */}
            <AnimatedSection delay={100} className="md:col-span-6 lg:col-span-5 md:row-span-2">
              <div className="group relative h-full liquid-glass-strong rounded-3xl p-8 transition-glass overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-xl"></div>
                      <img 
                        src="/about.webp" 
                        alt="Nicola Ananda" 
                        className="relative w-full h-full object-cover rounded-3xl border-2 border-cyan-500/20"
                      />
                    </div>
                  </div>
                  <div className="text-center mt-6">
                    <h2 className="text-3xl font-black dark:text-white text-gray-900 mb-2">Nicola Ananda</h2>
                    <p className="text-cyan-400 font-bold mb-4">Data Scientist & Full Stack Developer</p>
                    <div className="flex justify-center gap-2">
                      <span className="px-4 py-2 liquid-glass rounded-xl text-cyan-400 text-sm font-bold">🇮🇩 Malang, Indonesia</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Stats Cards */}
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={200 + index * 50} className="md:col-span-3 lg:col-span-3">
                <div className="liquid-glass-strong rounded-3xl p-6 transition-glass hover:-translate-y-1 h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center text-cyan-400">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-4xl font-black dark:text-white text-gray-900 mb-1">{stat.value}</div>
                      <div className="dark:text-slate-400 text-gray-600 font-medium">{stat.label}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}

            {/* Bio Card */}
            <AnimatedSection delay={300} className="md:col-span-6 lg:col-span-7">
              <div className="liquid-glass-strong rounded-3xl p-8 transition-glass h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white text-gray-900 mb-2">Who I Am</h3>
                    <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4 dark:text-slate-300 text-gray-600 leading-relaxed">
                  <p>
                    I am a passionate <span className="text-cyan-400 font-bold">Data Scientist</span> dedicated to transforming raw data into valuable business insights. My analytical skills include data interpretation, trend identification, and creating comprehensive reports that support informed decision-making.
                  </p>
                  <p>
                    In addition to my data analysis expertise, I possess a <span className="text-purple-400 font-bold">versatile skill set</span> in web development. This unique combination allows me to create user-friendly dashboards and interactive data visualizations that bridge the gap between data insights and practical business applications.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* CTA Card */}
            <AnimatedSection delay={400} className="md:col-span-6 lg:col-span-5">
              <div className="relative liquid-glass-strong rounded-3xl p-8 transition-glass h-full overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative">
                  <h3 className="text-2xl font-black dark:text-white text-gray-900 mb-4">Let's Work Together</h3>
                  <p className="dark:text-slate-400 text-gray-600 mb-6">Ready to bring your ideas to life? Let's collaborate!</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 font-bold text-white">
                      <a href="/resume.pdf" download>
                        <Download size={18} className="mr-2" />
                        Download CV
                      </a>
                    </Button>
                    <Button asChild className="rounded-2xl liquid-glass-button font-bold dark:text-white text-gray-900">
                      <a href="/contact">
                        <Mail size={18} className="mr-2" />
                        Contact Me
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - Card Grid */}
      <section className="relative py-32">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-purple-400 font-bold mb-8">
                <Code className="w-5 h-5" />
                Technical Skills
              </div>
              <h2 className="text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Arsenal</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <AnimatedSection key={skill.name} delay={100 + index * 50}>
                <div className="liquid-glass-strong rounded-3xl p-8 transition-glass hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <span className="text-5xl">{skill.icon}</span>
                      <div>
                        <h3 className="text-xl font-black dark:text-white text-gray-900">{skill.name}</h3>
                        <p className="text-sm dark:text-slate-400 text-gray-600">{skill.category}</p>
                      </div>
                    </div>
                    <span className="text-3xl font-black text-cyan-400">{skill.level}%</span>
                  </div>
                  <div className="relative w-full h-3 dark:bg-slate-800 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE - Timeline */}
      <section className="relative py-32">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-cyan-400 font-bold mb-8">
                <Briefcase className="w-5 h-5" />
                Work Experience
              </div>
              <h2 className="text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6">
                Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Journey</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto space-y-8">
            {[
              {
                title: "Production Support – Final Blend Section",
                company: "PT. Gudang Garam Tbk, Unit V Processing",
                period: "June 2025 - Present (Contract)",
                type: "Current Role",
                description: "Currently part of the production support team at PT. Gudang Garam Tbk, based in Unit 5 Processing. Assigned to the Final Blend section, assisting in one of the most vital stages of the cigarette production process.",
                achievements: [
                  "Help organize and load tobacco materials into designated storage bins according to daily production needs",
                  "Monitor the flow and quantity of tobacco to ensure consistency and prevent supply delays",
                  "Support day-to-day operational tasks including material handling, area organization, and team coordination",
                  "Maintain clean and orderly workspaces in line with company standards",
                  "Actively contribute to ensuring efficient final blend process that meets quality expectations"
                ],
                gradient: "from-orange-500 to-red-600"
              },
              {
                title: "Engineering On Site (EOS)",
                company: "PT. Jalin Mayantara",
                period: "April 2025 - July 2025",
                type: "Completed",
                description: "Specialized in school data management and quality assurance for the PPDB (Student Admission) web application system.",
                achievements: [
                  "Organized complex student datasets from multiple schools, improving data integrity by 85%",
                  "Conducted comprehensive testing, identifying 30+ critical bugs before public release",
                  "Configured system parameters to align with specific school requirements"
                ],
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                title: "Data Analyst Associate",
                company: "B2B Padi by Telkom",
                period: "February 2024 - May 2024",
                type: "Completed",
                description: "Drove data-driven decision making through comprehensive analysis and visualization of key business metrics.",
                achievements: [
                  "Analyzed purchasing patterns using Python, Tableau, and SQL for market insights",
                  "Designed interactive dashboards enabling real-time decision-making",
                  "Developed K-means Clustering Analysis, improving marketing effectiveness by 25%"
                ],
                gradient: "from-purple-500 to-fuchsia-600"
              },
              {
                title: "Founder",
                company: "iNyx Store (Online Gadgets Shop)",
                period: "May 2021 - December 2024",
                type: "Entrepreneurial",
                description: "Founded and scaled a successful e-commerce platform, demonstrating strong business acumen and technical expertise.",
                achievements: [
                  "Implemented data analytics for pricing optimization, achieving 10% monthly sales growth",
                  "Expanded product catalog by 200% while maintaining competitive pricing",
                  "Led team of 5 employees with data-driven decision-making processes"
                ],
                gradient: "from-emerald-500 to-teal-600"
              }
            ].map((exp, index) => (
              <AnimatedSection key={exp.title} delay={100 + index * 100}>
                <div className="relative liquid-glass-strong rounded-3xl p-8 transition-glass group">
                  {/* Timeline dot */}
                  <div className="absolute -left-4 top-8 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 border-4 dark:border-black border-white"></div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-2xl font-black dark:text-white text-gray-900">{exp.title}</h3>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-black bg-gradient-to-r ${exp.gradient} text-white`}>
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-cyan-400 font-bold text-lg">{exp.company}</p>
                    </div>
                    <span className="dark:text-slate-400 text-gray-600 font-bold mt-3 lg:mt-0">{exp.period}</span>
                  </div>
                  
                  <p className="dark:text-slate-300 text-gray-600 leading-relaxed text-lg mb-6">{exp.description}</p>
                  
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-start gap-3 group/item">
                        <div className="mt-1.5">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                        </div>
                        <p className="dark:text-slate-300 text-gray-600 leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION - Grid */}
      <section className="relative py-32">
        <div className="container px-4">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full liquid-glass text-purple-400 font-bold mb-8">
                <Award className="w-5 h-5" />
                Education & Certifications
              </div>
              <h2 className="text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6">
                Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Path</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "AI-Enabled Python Web Development",
                institution: "Devscale.id",
                year: "2025",
                description: "Advanced bootcamp specializing in AI-enabled Python web development, combining artificial intelligence capabilities with robust web application frameworks. Mastered Python-based AI libraries (TensorFlow, PyTorch), Django/Flask frameworks, and intelligent API development. Developed AI-powered web applications featuring machine learning models, natural language processing interfaces, and computer vision integration.",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                title: "Fullstack MERN Development",
                institution: "Devscale.id",
                year: "2024",
                description: "Intensive full-stack MERN development certification focusing exclusively on MongoDB, Express.js, React, and Node.js ecosystem. Mastered complete MERN stack workflow from database modeling with MongoDB, backend API development using Express.js, dynamic frontend interfaces with React hooks and components, to server-side logic with Node.js. Built complex applications including real-time chat systems and e-commerce platforms.",
                gradient: "from-purple-500 to-fuchsia-600"
              },
              {
                title: "Full Stack Data Analytics",
                institution: "RevoU",
                year: "2024",
                description: "Comprehensive full-stack data analytics program covering the complete data science lifecycle from collection to business intelligence delivery. Mastered Python data manipulation with Pandas/NumPy, statistical analysis, SQL database querying, and advanced data visualization using Tableau and Power BI. Developed expertise in machine learning algorithms, predictive modeling, A/B testing methodologies, and ETL processes.",
                gradient: "from-emerald-500 to-teal-600"
              },
              {
                title: "Bachelor of Sport Science",
                institution: "State University of Malang",
                year: "2023",
                description: "Bachelor's degree in Sport Science from State University of Malang, developing strong foundation in scientific research methodology, statistical analysis, and evidence-based problem solving. Gained expertise in human performance data collection, biomechanical analysis, physiological measurements, and sports analytics. This scientific background provides excellent foundation for data analysis and systematic approach to complex problem-solving.",
                gradient: "from-orange-500 to-red-600"
              }
            ].map((edu, index) => (
              <AnimatedSection key={edu.title} delay={100 + index * 50}>
                <div className="liquid-glass-strong rounded-3xl p-8 transition-glass hover:-translate-y-2 h-full flex flex-col">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${edu.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black dark:text-white text-gray-900 mb-2 leading-tight">{edu.title}</h3>
                      <p className="text-cyan-400 font-bold">{edu.institution}</p>
                      <p className="dark:text-slate-500 text-gray-500 text-sm font-bold mt-1">{edu.year}</p>
                    </div>
                  </div>
                  
                  <p className="dark:text-slate-300 text-gray-600 leading-relaxed mb-6 flex-1 text-justify">
                    {edu.description}
                  </p>
                  
                  <Button size="sm" className={`w-full rounded-xl bg-gradient-to-r ${edu.gradient} font-bold h-12 text-white`}>
                    <Download className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32">
        <div className="container px-4 relative">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl lg:text-6xl font-black dark:text-white text-gray-900 mb-6 leading-tight">
                Ready to Collaborate?
              </h2>
              <p className="text-xl dark:text-slate-400 text-gray-600 mb-12">
                Let's discuss how my skills can help bring your project to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button asChild size="lg" className="rounded-2xl px-10 py-8 text-xl font-black bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 shadow-lg text-white">
                  <a href="/contact">
                    <Mail size={24} className="mr-3" />
                    Get in Touch
                    <ArrowRight size={24} className="ml-3" />
                  </a>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
