import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Mail, CheckCircle, Briefcase, Award, GraduationCap, Code, Database, Layout, Terminal } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const AboutPage = () => {
  const skills = [
    {
      category: "Data Science & AI",
      icon: <Database className="w-6 h-6" />,
      items: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 92 },
        { name: "Pandas/NumPy", level: 90 },
        { name: "Scikit-learn", level: 85 },
        { name: "TensorFlow", level: 80 },
        { name: "Tableau", level: 94 }
      ]
    },
    {
      category: "Frontend Development",
      icon: <Layout className="w-6 h-6" />,
      items: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 88 },
        { name: "Tailwind CSS", level: 95 },
        { name: "Next.js", level: 85 },
        { name: "Framer Motion", level: 82 }
      ]
    },
    {
      category: "Backend & Tools",
      icon: <Terminal className="w-6 h-6" />,
      items: [
        { name: "Node.js", level: 85 },
        { name: "Express", level: 85 },
        { name: "PostgreSQL", level: 88 },
        { name: "Git/GitHub", level: 92 },
        { name: "Docker", level: 75 }
      ]
    }
  ];

  const experience = [
    {
      title: "Production Support – Final Blend Section",
      company: "PT. Gudang Garam Tbk",
      period: "June 2025 - Present",
      description: "Currently part of the production support team at PT. Gudang Garam Tbk, based in Unit 5 Processing. Assigned to the Final Blend section, assisting in one of the most vital stages of the cigarette production process."
    },
    {
      title: "Engineering On Site (EOS)",
      company: "PT. Jalin Mayantara",
      period: "April 2025 - July 2025",
      description: "Specialized in school data management and quality assurance for the PPDB (Student Admission) web application system."
    },
    {
      title: "Data Analyst Associate",
      company: "B2B Padi by Telkom",
      period: "Feb 2024 - May 2024",
      description: "Drove data-driven decision making through comprehensive analysis and visualization of key business metrics."
    },
    {
      title: "Founder",
      company: "iNyx Store",
      period: "May 2021 - Dec 2024",
      description: "Founded and scaled a successful e-commerce platform, demonstrating strong business acumen and technical expertise."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Computer Science",
      school: "Universitas Brawijaya",
      period: "2020 - 2024",
      description: "Focused on Data Science and Software Engineering. Graduated with honors."
    },
    {
      degree: "Data Science Bootcamp",
      school: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
      period: "2023",
      description: "Intensive training in Machine Learning, Cloud Computing, and Mobile Development."
    }
  ];

  return (
    <div className="bg-background text-foreground pt-24 pb-20">
      <SEOHead
        title="About Me - Nicola Ananda"
        description="Learn more about Nicola Ananda, a professional Data Analyst and Full Stack Web Developer."
        keywords="About Nicola Ananda, Data Analyst Profile, Web Developer Background"
        url="https://nicola.id/about"
        image="/about.webp"
      />

      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-24">
          <h1 className="text-[10vw] leading-[0.8] font-black tracking-tighter mb-8">
            ABOUT<br />ME
          </h1>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-xl md:text-2xl font-medium leading-relaxed">
              I'm a Data Scientist who loves turning messy data into useful insights, and a Full Stack Developer who builds things for the web.
            </div>
            <div className="text-gray-500 dark:text-gray-400 leading-relaxed">
              <p className="mb-6">
                My journey started with a curiosity for how things work. Over the years, I've honed my skills in data analysis, machine learning, and web development to solve complex problems and create meaningful digital experiences.
              </p>
              <div className="flex gap-4">
                <Button asChild className="rounded-full">
                  <a href="/resume.pdf" download>
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <a href="/contact">
                    <Mail className="mr-2 h-4 w-4" /> Contact Me
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="mb-24 aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900">
          <img
            src="/about.webp"
            alt="Nicola Ananda working"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Experience */}
        <div className="mb-24">
          <h2 className="text-4xl font-black tracking-tighter mb-12 flex items-center gap-4">
            <Briefcase className="h-8 w-8" /> EXPERIENCE
          </h2>
          <div className="space-y-12 border-l-2 border-black/10 dark:border-white/10 ml-4 pl-8 md:pl-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[41px] md:-left-[57px] top-2 h-4 w-4 rounded-full bg-black dark:bg-white border-4 border-white dark:border-black group-hover:scale-125 transition-transform"></div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 text-sm font-bold text-gray-400 uppercase tracking-wider pt-1">
                    {exp.period}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                    <div className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-4">{exp.company}</div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-24">
          <h2 className="text-4xl font-black tracking-tighter mb-12 flex items-center gap-4">
            <GraduationCap className="h-8 w-8" /> EDUCATION
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all">
                <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                  {edu.period}
                </div>
                <h3 className="text-2xl font-bold mb-2">{edu.school}</h3>
                <div className="text-lg font-medium text-cyan-600 dark:text-cyan-400 mb-4">{edu.degree}</div>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills - Upgraded */}
        <div className="mb-24">
          <h2 className="text-4xl font-black tracking-tighter mb-12 flex items-center gap-4">
            <Award className="h-8 w-8" /> SKILLS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((category, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-black text-white dark:bg-white dark:text-black">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold">{category.category}</h3>
                </div>
                <div className="space-y-4">
                  {category.items.map((skill, sIdx) => (
                    <div key={sIdx} className="group">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-black dark:bg-white rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"
                          style={{ width: `${skill.level}%`, transform: 'scaleX(1)' }} // Force animation on mount/view
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
