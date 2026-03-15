import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Mail, MapPin, Github, Linkedin, Briefcase, GraduationCap, Code2, Sparkles, Trophy, Zap, Target } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useMousePosition } from '../hooks/useMousePosition';
import { useScrollParallax } from '../hooks/useScrollParallax';

interface TimelineItem {
  role?: string;
  degree?: string;
  company?: string;
  school?: string;
  year: string;
  desc: string;
}

const AboutPage = () => {
  const { slow } = useScrollParallax();

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: "https://github.com/nicolaananda", label: "GitHub", bg: "bg-black text-white hover:bg-gray-900" },
    { icon: <Linkedin className="w-5 h-5" />, url: "https://linkedin.com/in/nicolaananda", label: "LinkedIn", bg: "bg-[#0a66c2] text-white hover:bg-[#004182]" },
    { icon: <Mail className="w-5 h-5" />, url: "mailto:hello@nicola.id", label: "Email", bg: "bg-red-600 text-white hover:bg-red-700" }
  ];

  const skills = [
    "Python", "SQL", "React", "TypeScript", "Node.js", "Next.js", "Tailwind", "Docker", "Tableau", "Pandas"
  ];

  const experiences: TimelineItem[] = [
    {
      role: "Production Support – Final Blend Section",
      company: "PT. Gudang Garam Tbk",
      year: "June 2025 - Present",
      desc: "Currently entrusted with maintaining operational stability in the Final Blend section. My role involves meticulous monitoring of tobacco material flows and proactive coordination to prevent supply chain bottlenecks. It's a high-precision environment where attention to detail directly impacts production targets."
    },
    {
      role: "Engineering On Site (EOS)",
      company: "PT. Jalin Mayantara",
      year: "April 2025 - July 2025",
      desc: "Served as the technical lead for the national PPDB (school admission) system. I focused on data integrity and quality assurance, successfully identifying critical logic errors before deployment. By implementing stricter data validation protocols, we improved data accuracy by 85%, ensuring a fairer admission process for thousands of students."
    },
    {
      role: "Data Analyst Associate",
      company: "B2B Padi by Telkom",
      year: "Feb 2024 - May 2024",
      desc: "Worked on extracting actionable insights from complex B2B datasets. I developed a K-means clustering model to segment customers more effectively, which helped the marketing team tailor their campaigns. This data-driven approach led to a measurable 25% increase in campaign engagement and ROI."
    },
    {
      role: "Founder",
      company: "iNyx Store",
      year: "May 2021 - Dec 2024",
      desc: "Started and scaled a digital commerce business from the ground up. Beyond just sales, I applied data analytics to optimize pricing strategies dynamically. This experience taught me the business side of tech—how to read market data, pivot strategies quickly, and maintain consistent monthly growth through customer satisfaction."
    }
  ];

  const education: TimelineItem[] = [
    {
      degree: "AI-Enabled Python Web Development",
      school: "Devscale.id",
      year: "2025",
      desc: "A deep dive into integrating AI capabilities with modern web backends. Focused on building intelligent APIs using Django and Flask, and understanding how to implement TensorFlow models in production environments."
    },
    {
      degree: "Fullstack MERN Development",
      school: "Devscale.id",
      year: "2024",
      desc: "Intensive training on the complete JavaScript stack. Built robust applications with React, Node.js, and MongoDB, focusing on clean architecture, RESTful API design, and real-time state management."
    },
    {
      degree: "Full Stack Data Analytics",
      school: "RevoU",
      year: "2024",
      desc: "Comprehensive curriculum covering the entire data pipeline—from cleaning raw data with Python/Pandas to visualizing stories in Tableau. Gained strong foundations in statistical modeling and machine learning."
    },
    {
      degree: "Bachelor of Sport Science",
      school: "State University of Malang",
      year: "2023",
      desc: "While distinct from tech, this degree honed my scientific methodology. It taught me how to design experiments, collect data systematically, and approach problems with structured, analytical thinking."
    }
  ];

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-x-hidden pb-20">
      <SEOHead
        title="About Nicola Ananda - Data Analyst & Full Stack Developer"
        description="Data Analyst & Full Stack Developer based in Malang. Exploring the intersection of data science and software engineering."
        keywords="About, Nicola Ananda, Data Analyst, Full Stack Developer, React, Python, Portfolio, Malang"
        url="https://nicola.id/about"
        image="/about-og.webp"
      />

      {/* Vibrant Gradient Mesh */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 noise-overlay">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(at 40% 20%, hsla(265, 85%, 65%, 0.12) 0px, transparent 50%),
              radial-gradient(at 90% 10%, hsla(190, 90%, 60%, 0.12) 0px, transparent 50%),
              radial-gradient(at 10% 90%, hsla(330, 80%, 65%, 0.1) 0px, transparent 50%),
              radial-gradient(at 50% 50%, hsla(220, 80%, 70%, 0.05) 0px, transparent 50%)
            `,
            transform: `translateY(${slow}px)`,
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-[minmax(160px,auto)]">

          {/* 1. HERO SECTION */}
          <div className="col-span-1 md:col-span-4 lg:col-span-4 row-span-2 glass-panel p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-center animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 relative z-10">
              Beyond the <span className="gradient-text-blue">Code.</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl text-balance relative z-10">
              I bridge the gap between data insights and scalable software solutions.
              My approach combines analytical rigor with engineering excellence—transforming complex problems
              into elegant, maintainable systems that deliver measurable business value.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 relative z-10">
              <div className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 flex items-center gap-2 text-sm font-medium">
                <Code2 className="w-4 h-4" />
                <span>Full Stack Dev</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 flex items-center gap-2 text-sm font-medium">
                <Target className="w-4 h-4" />
                <span>Data Analyst</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 flex items-center gap-2 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>UI Enthusiast</span>
              </div>
            </div>
            <div className="absolute right-[-20px] bottom-[-40px] text-[10rem] font-black opacity-[0.03] select-none pointer-events-none hidden md:block">
              BUILD
            </div>
          </div>

          {/* 2. PROFILE CARD */}
          <ProfileCard />

          {/* 3. STATS TILES */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 glass-panel p-6 rounded-[2.5rem] flex flex-col justify-center gap-2 transition-colors duration-300 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-500">Output</span>
            </div>
            <div className="text-3xl font-black">50+</div>
            <div className="text-sm text-gray-400">Projects Shipped to Production</div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2 glass-panel p-6 rounded-[2.5rem] flex flex-col justify-center gap-2 transition-colors duration-300 animate-fadeInUp" style={{ animationDelay: '0.15s' }}>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                <Trophy className="w-6 h-6" />
              </div>
              <span className="font-bold text-gray-500">Impact</span>
            </div>
            <div className="text-3xl font-black">85%</div>
            <div className="text-sm text-gray-400">Average Process Optimization</div>
          </div>

          {/* 4. LOCATION TILE */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center transition-colors animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-900 dark:text-white mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="font-bold text-lg">Malang</div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Indonesia</div>
          </div>

          {/* 5. RESUME */}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="col-span-1 md:col-span-2 lg:col-span-1 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-center items-center text-center transition-colors animate-fadeInUp cursor-pointer hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black group" style={{ animationDelay: '0.25s' }}>
            <Download className="w-8 h-8 mb-3 text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
            <div className="font-bold text-lg">Resume</div>
            <div className="text-xs font-medium opacity-60 uppercase tracking-wide mt-1">Download PDF</div>
          </a>

          {/* 6. SKILLS */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              Technical Arsenal
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs font-bold hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* 7. SOCIAL LINKS */}
          {socialLinks.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 glass-panel rounded-[2.5rem] p-6 flex flex-col justify-center items-center gap-4 hover:scale-[1.05] transition-transform group"
              style={{ animationDelay: `${0.35 + (i * 0.05)}s` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${social.bg} shadow-lg`}>
                {social.icon}
              </div>
              <span className="text-xs font-bold text-gray-500">{social.label}</span>
            </a>
          ))}

          {/* 8. EXPERIENCE TIMELINE */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 glass-panel p-8 rounded-[2.5rem] overflow-hidden flex flex-col animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <TimelineSection
              title="Professional Journey"
              icon={<Briefcase className="w-4 h-4" />}
              items={experiences}
            />
          </div>

          {/* 9. EDUCATION TIMELINE */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 row-span-2 glass-panel p-8 rounded-[2.5rem] overflow-hidden flex flex-col animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <TimelineSection
              title="Academic Path"
              icon={<GraduationCap className="w-4 h-4" />}
              items={education}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

// Profile Card with foto profil
const ProfileCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { position, isHovering } = useMousePosition(cardRef);

  return (
    <div
      ref={cardRef}
      className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 glass-panel p-8 rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group animate-fadeInUp"
      style={{
        transform: isHovering
          ? `perspective(1000px) rotateX(${position.y * -1}deg) rotateY(${position.x * 1}deg)`
          : 'none',
        transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        {/* Profile Photo */}
        <div className="w-20 h-20 rounded-3xl overflow-hidden mb-6 shadow-xl ring-2 ring-black/10 dark:ring-white/10">
          <img
            src="/profile.jpg"
            alt="Nicola Ananda"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-bold mb-3 tracking-tight">
          Nicola Ananda
        </h2>
        <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-6 uppercase tracking-wide">
          Available for Hire
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          I transform data complexity into actionable insights and robust applications.
          Whether it's optimizing workflows, building full-stack solutions, or uncovering patterns in data—I bring structure to chaos.
        </p>
      </div>

      <div className="relative z-10 mt-auto pt-8">
        <Button
          asChild
          variant="default"
          className="w-full rounded-full font-bold h-12"
        >
          <a href="/contact">Let's Collaborate <Zap className="w-4 h-4 ml-2 fill-current" /></a>
        </Button>
      </div>
    </div>
  );
};

const TimelineSection = ({ title, icon, items }: {
  title: string;
  icon: React.ReactNode;
  items: TimelineItem[];
}) => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="space-y-8 overflow-y-auto pr-2 no-scrollbar flex-1">
        {items.map((item, i) => (
          <div key={i} className="group">
            <div className="flex justify-between items-start mb-1 flex-wrap gap-2">
              <div className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {item.role || item.degree}
              </div>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-full border border-gray-100 dark:border-gray-800">
                {item.year}
              </span>
            </div>
            <div className="text-xs font-semibold text-gray-500 mb-2">
              {item.company || item.school}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-balance opacity-80 group-hover:opacity-100 transition-opacity">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
