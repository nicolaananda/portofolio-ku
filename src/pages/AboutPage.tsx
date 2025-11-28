import { Button } from '@/components/ui/button';
import { Download, Mail, Database, Layout, Terminal, Calendar, MapPin, Award, BookOpen, Coffee, Heart, Zap, Github, Linkedin, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const AboutPage = () => {
  // Using the content we have, structured for Bento Grid
  const socialLinks = [
    { icon: <Github className="w-6 h-6" />, url: "https://github.com/nicolaananda", label: "GitHub", bg: "bg-black text-white" },
    { icon: <Linkedin className="w-6 h-6" />, url: "https://linkedin.com/in/nicolaananda", label: "LinkedIn", bg: "bg-[#0077b5] text-white" },
    { icon: <Mail className="w-6 h-6" />, url: "mailto:gmail@nicola.id", label: "Email", bg: "bg-red-500 text-white" }
  ];

  const skills = [
    "Python", "SQL", "React", "TypeScript", "Node.js", "Next.js", "Tailwind", "Docker", "Tableau", "Pandas"
  ];

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden pb-20">
      <SEOHead
        title="About Nicola Ananda"
        description="Data Analyst & Full Stack Developer. Discover my journey, skills, and experience."
        keywords="About, Nicola Ananda, Bio, Skills, Experience"
        url="https://nicola.id/about"
        image="/about-og.webp"
      />

      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="blob bg-orange-500/10 w-[600px] h-[600px] top-[-100px] left-[-100px] mix-blend-multiply filter blur-[100px] animate-blob"></div>
        <div className="blob bg-cyan-500/10 w-[600px] h-[600px] bottom-[-100px] right-[-100px] mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 pt-24">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 text-center animate-reveal">
          Beyond the Code.
        </h1>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

          {/* 1. PROFILE TILE (Large) */}
          <div className="md:col-span-2 md:row-span-2 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group animate-fadeInUp">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-6 text-3xl font-black">
                N.
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-tight">
                I'm Nicola Ananda.
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                A Data Analyst & Full Stack Developer based in Malang, ID. I bridge the gap between complex data and intuitive user experiences.
              </p>
              <div className="flex gap-3">
                <Button asChild className="rounded-full font-bold">
                  <a href="/resume.pdf" download>Download CV</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full font-bold border-2">
                  <a href="/contact">Contact Me</a>
                </Button>
              </div>
            </div>
          </div>

          {/* 2. STATS TILE */}
          <div className="md:col-span-1 md:row-span-1 glass-panel p-6 rounded-[2.5rem] flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">4+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">Years Experience</div>
          </div>

          {/* 3. LOCATION TILE */}
          <div className="md:col-span-1 md:row-span-1 glass-panel p-6 rounded-[2.5rem] flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="font-bold">Malang, ID</div>
            <div className="text-xs text-gray-500">Open to Remote</div>
          </div>

          {/* 4. SKILLS TILE (Wide) */}
          <div className="md:col-span-2 md:row-span-1 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-bold border border-black/5 dark:border-white/5">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 5. EXPERIENCE TILE (Left Side) */}
          <div className="md:col-span-2 md:row-span-2 glass-panel p-8 rounded-[2.5rem] overflow-y-auto no-scrollbar animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 z-10">Career Journey</h3>
            <div className="space-y-8">
              {[
                {
                  role: "Production Support – Final Blend Section",
                  company: "PT. Gudang Garam Tbk",
                  year: "June 2025 - Present",
                  desc: "Assisting in one of the most vital stages of the cigarette production process. Organizing tobacco materials, monitoring flow to prevent supply delays, and supporting day-to-day operational tasks."
                },
                {
                  role: "Engineering On Site (EOS)",
                  company: "PT. Jalin Mayantara",
                  year: "April 2025 - July 2025",
                  desc: "Specialized in school data management and QA for the PPDB system. Improved data integrity by 85% and identified 30+ critical bugs before public release."
                },
                {
                  role: "Data Analyst Associate",
                  company: "B2B Padi by Telkom",
                  year: "Feb 2024 - May 2024",
                  desc: "Drove data-driven decision making through comprehensive analysis. Developed K-means Clustering Analysis, improving marketing effectiveness by 25%."
                },
                {
                  role: "Founder",
                  company: "iNyx Store",
                  year: "May 2021 - Dec 2024",
                  desc: "Founded and scaled a successful e-commerce platform. Implemented data analytics for pricing optimization, achieving 10% monthly sales growth."
                }
              ].map((job, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg group-hover:text-blue-500 transition-colors">{job.role}</div>
                      <div className="text-gray-500 text-sm font-bold">{job.company}</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold whitespace-nowrap border border-black/5 dark:border-white/5">
                      {job.year}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {job.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. EDUCATION TILE (Right Side) */}
          <div className="md:col-span-2 md:row-span-2 glass-panel p-8 rounded-[2.5rem] overflow-y-auto no-scrollbar animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 z-10">Education & Certifications</h3>
            <div className="space-y-8">
              {[
                {
                  degree: "AI-Enabled Python Web Development",
                  school: "Devscale.id",
                  year: "2025",
                  desc: "Advanced bootcamp specializing in AI-enabled Python web development. Mastered TensorFlow, PyTorch, Django/Flask, and intelligent API development."
                },
                {
                  degree: "Fullstack MERN Development",
                  school: "Devscale.id",
                  year: "2024",
                  desc: "Intensive certification focusing on MongoDB, Express.js, React, and Node.js. Built complex applications including real-time chat systems."
                },
                {
                  degree: "Full Stack Data Analytics",
                  school: "RevoU",
                  year: "2024",
                  desc: "Comprehensive program covering the data science lifecycle. Mastered Python (Pandas/NumPy), SQL, Tableau, Power BI, and Machine Learning algorithms."
                },
                {
                  degree: "Bachelor of Sport Science",
                  school: "State University of Malang",
                  year: "2023",
                  desc: "Strong foundation in scientific research methodology and statistical analysis. Expertise in data collection and systematic problem-solving."
                }
              ].map((edu, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg group-hover:text-blue-500 transition-colors">{edu.degree}</div>
                      <div className="text-gray-500 text-sm font-bold">{edu.school}</div>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold whitespace-nowrap border border-black/5 dark:border-white/5">
                      {edu.year}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 7. SOCIAL TILES */}
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`md:col-span-1 md:row-span-1 rounded-[2.5rem] p-6 flex flex-col justify-center items-center gap-3 hover:scale-105 transition-transform shadow-lg ${social.bg} animate-fadeInUp`}
              style={{ animationDelay: `${0.5 + (i * 0.1)}s` }}
            >
              {social.icon}
              <span className="font-bold text-sm">{social.label}</span>
            </a>
          ))}

          {/* 7. PHILOSOPHY TILE */}
          <div className="md:col-span-1 md:row-span-1 glass-panel p-6 rounded-[2.5rem] flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <Heart className="w-8 h-8 text-pink-500 mb-3" />
            <div className="font-bold text-sm">User Centric</div>
            <div className="text-xs text-gray-500 mt-1">Design for humans</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
