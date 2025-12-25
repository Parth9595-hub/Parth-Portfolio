
import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Award, 
  Languages, 
  Heart,
  ChevronRight,
  ExternalLink,
  Download,
  Menu,
  X,
  FileText,
  Rocket
} from 'lucide-react';

// --- Types ---

interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date?: string;
}

interface Skill {
  category: string;
  items: string[];
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
}

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navLinks.map(link => link.href.substring(1));
      for (const sectionId of [...sections].reverse()) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav 
        aria-label="Main navigation"
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Parth
              </a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    activeSection === link.href ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full animate-in fade-in slide-in-from-bottom-1 duration-300" />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="text-slate-600 focus:outline-none"
                aria-expanded={isOpen}
                aria-label="Toggle menu"
              >
                {isOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${
                    activeSection === link.href ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode; icon: any; subtitle?: string }> = ({ children, icon: Icon, subtitle }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
        <Icon size={24} aria-hidden="true" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
    </div>
    {subtitle && <p className="text-slate-500 max-w-2xl">{subtitle}</p>}
  </div>
);

const ExperienceCard: React.FC<{ experience: Experience }> = ({ experience }) => (
  <article className="relative pl-8 pb-12 last:pb-0">
    <div className="absolute left-0 top-0 h-full w-px bg-slate-200"></div>
    <div className="absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full bg-blue-600 border-4 border-white ring-1 ring-blue-100"></div>
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{experience.role}</h3>
          <p className="text-blue-600 font-medium">{experience.company}</p>
        </div>
        <span className="inline-block px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full font-medium whitespace-nowrap">
          {experience.period}
        </span>
      </div>
      <ul className="space-y-3">
        {experience.points.map((point, idx) => (
          <li key={idx} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
            <ChevronRight className="flex-shrink-0 text-blue-400 mt-1" size={16} aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  </article>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
    <div className="h-48 overflow-hidden relative">
      <img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
        <div className="flex gap-3">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg text-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
              <ExternalLink size={18} />
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-lg text-slate-900 hover:bg-blue-600 hover:text-white transition-colors">
              <Github size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tags.map((tag, i) => (
          <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded">
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{project.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1">
        {project.description}
      </p>
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-medium text-slate-400">
        <span className="flex items-center gap-1">
          <Rocket size={12} className="text-blue-500" /> Professional Project
        </span>
        <button className="text-blue-600 hover:underline flex items-center gap-1">
          View Case <ChevronRight size={14} />
        </button>
      </div>
    </div>
  </div>
);

const CertificationItem: React.FC<{ cert: Certification }> = ({ cert }) => (
  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
    <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
      <Award size={20} aria-hidden="true" />
    </div>
    <div>
      <h4 className="font-semibold text-slate-900">{cert.name}</h4>
      <p className="text-sm text-slate-500">{cert.issuer}</p>
      {cert.date && <p className="text-xs text-slate-400 mt-1">{cert.date}</p>}
    </div>
  </div>
);

const App = () => {
  const experiences: Experience[] = [
    {
      role: "Project Coordinator",
      company: "Network Community",
      period: "May 2025 - Present",
      points: [
        "Cape projects on schedule by managing deadlines and adjusting workflows",
        "Lead the team to build engineering projects at gate, experienced in leading a team",
        "Lead team to build electrical and electronic projects to get rare experience on components"
      ]
    },
    {
      role: "Engineering Intern",
      company: "CIIIT Centre by TATA Technologies",
      period: "Jan 2025 - Apr 2025",
      points: [
        "Specialized in Product Lifecycle Management (PLM)",
        "Learnt how startups build products from scratch",
        "Gained insights into how companies manage their manufacturing units",
        "Collaborated with teammates on various projects and presentations"
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: "Smart Energy Monitoring System",
      description: "Developed a real-time IoT energy monitoring solution using Arduino and custom sensors to track power consumption in household appliances, helping reduce waste by 15%.",
      tags: ["Electrical", "IoT", "Arduino"],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      github: "https://github.com/parthpahanpate"
    },
    {
      title: "PLM Optimization Strategy",
      description: "Conducted an in-depth analysis of Product Lifecycle Management workflows during internship at CIIIT, proposing a streamlined data migration path for manufacturing units.",
      tags: ["PLM", "Engineering", "Analysis"],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      link: "#"
    },
    {
      title: "Digital Marketing Growth Campaign",
      description: "Designed and executed a full-funnel digital marketing strategy for a local startup, resulting in a 25% increase in lead generation over 3 months.",
      tags: ["Marketing", "Strategy", "Social Media"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      link: "#"
    }
  ];

  const skills: Skill[] = [
    {
      category: "Engineering & Data Tools",
      items: ["Microsoft Excel", "Power Pivot", "SQL", "Windchill", "Certified in MS Excel"]
    },
    {
      category: "Professional & Creative",
      items: ["Digital Marketing Strategy", "Effective Team Collaboration", "PowerPoint Design", "Leadership", "Management"]
    }
  ];

  const certifications: Certification[] = [
    { name: "Product Lifecycle Management", issuer: "CIIIT Centre by Tata Technologies", date: "01/2025-04/2025" },
    { name: "Financial Management", issuer: "Yale University (Coursera)" },
    { name: "Digital Marketing", issuer: "Udemy" },
    { name: "McKinsey Forward Program", issuer: "Cohort 2025" },
    { name: "Strategy Consulting Job Simulation", issuer: "BCG via Forage" }
  ];

  const languages = [
    { name: "English", level: 90 },
    { name: "Hindi", level: 95 },
    { name: "Marathi", level: 100 },
    { name: "Spanish", level: 30 }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Available for New Opportunities
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                  Hi, I'm <span className="text-blue-600">Parth Pahanpate</span>
                </h1>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Dynamic B.Tech Electrical Engineering student & McKinsey Forward Alumni. 
                  Integrating technology, creativity, and leadership to drive business success.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                  <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
                    <MapPin size={18} aria-hidden="true" />
                    <span>Maharashtra, India</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
                    <Briefcase size={18} aria-hidden="true" />
                    <span>Open to Internships</span>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <a href="#contact" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center gap-2">
                    Contact Me <ChevronRight size={20} aria-hidden="true" />
                  </a>
                  <a 
                     href="https://www.linkedin.com/in/parth-pahanpate-7b1054280" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="px-8 py-3 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-2"
                     aria-label="Visit Parth Pahanpate's LinkedIn profile"
                  >
                    <Linkedin size={20} className="text-blue-600" aria-hidden="true" /> LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto relative z-10">
                  <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-6 -z-10 opacity-10"></div>
                  <div className="absolute inset-0 bg-indigo-600 rounded-3xl -rotate-6 -z-10 opacity-10"></div>
                  <img 
                    src="https://picsum.photos/seed/parth/600/600" 
                    alt="Professional portrait of Parth Pahanpate" 
                    className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white"
                    loading="eager"
                  />
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 sm:right-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3 animate-bounce">
                  <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                    <Award size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">CGPA</div>
                    <div className="font-bold">8.3 / 10</div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-4 sm:left-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-50 flex items-center gap-3">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <Code2 size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Expertise</div>
                    <div className="font-bold">Electrical Eng.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading icon={FileText} subtitle="A brief overview of my professional identity and goals.">
              About Me
            </SectionHeading>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  Dynamic and results-driven, I am currently pursuing a B.Tech in Electrical Engineering. I'm an activist seeking opportunities that integrate technology, creativity, and leadership.
                </p>
                <p>
                  Demonstrating strong organizational skills and a dedicated work ethic, I am currently gaining practical experience in Digital Marketing. I possess exceptional communication and time management abilities, ready to leverage these strengths to drive business success.
                </p>
                <blockquote className="font-medium text-slate-900 border-l-4 border-blue-600 pl-4 py-2 italic">
                  "Committed to making meaningful contributions that positively impact organizational goals and foster innovation."
                </blockquote>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-2xl">
                  <h3 className="font-bold text-slate-900 mb-2">Education</h3>
                  <p className="text-sm text-slate-500">B.Tech (Electrical)</p>
                  <p className="text-sm text-slate-500">2023 - 2027</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl">
                  <h3 className="font-bold text-blue-600 mb-2">Experience</h3>
                  <p className="text-sm text-slate-500">TATA Tech Intern</p>
                  <p className="text-sm text-slate-500">Project Coordinator</p>
                </div>
                <div className="p-6 bg-indigo-50 rounded-2xl">
                  <h3 className="font-bold text-indigo-600 mb-2">Certification</h3>
                  <p className="text-sm text-slate-500">McKinsey Forward</p>
                  <p className="text-sm text-slate-500">BCG Forage</p>
                </div>
                <div className="p-6 bg-green-50 rounded-2xl">
                  <h3 className="font-bold text-green-600 mb-2">Languages</h3>
                  <p className="text-sm text-slate-500">English, Hindi,</p>
                  <p className="text-sm text-slate-500">Marathi, Spanish</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <SectionHeading icon={Briefcase} subtitle="My journey in engineering and leadership roles.">
              Work Experience
            </SectionHeading>
            <div className="mt-12">
              {experiences.map((exp, idx) => (
                <ExperienceCard key={idx} experience={exp} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeading icon={Rocket} subtitle="Showcasing my technical implementations and marketing initiatives.">
              Featured Projects
            </SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <SectionHeading icon={Code2} subtitle="The tools and methodologies I've mastered.">
              Technical & Soft Skills
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm font-medium border border-slate-100 hover:border-blue-200 hover:text-blue-600 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, idx) => (
                <CertificationItem key={idx} cert={cert} />
              ))}
            </div>
          </div>
        </section>

        {/* Education & Achievements */}
        <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[100px]"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                <GraduationCap size={24} aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Education & Achievements</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">Bachelor of Technology (B.Tech)</h3>
                      <p className="text-blue-400 text-lg">Electrical Engineering</p>
                    </div>
                    <div className="text-right">
                      <span className="px-4 py-1 bg-white/10 rounded-full text-sm font-medium">2023 - 2027</span>
                      <p className="text-slate-400 text-sm mt-1">Expected completion: Jan 2027</p>
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white/80">Key Activities</h4>
                      <ul className="space-y-3">
                        {[
                          "Participated in ISA and EESA Programs",
                          "College Event Coordinator",
                          "Organized tree plantation drives",
                          "Organized technical activities"
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white/80">Academic Merit</h4>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-2xl font-bold text-blue-400">8.3</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Current CGPA<br/>#1 in Sem 2nd & 4th</div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                        <Award className="text-yellow-400" size={20} aria-hidden="true" />
                        <div className="text-sm font-medium">#1 Award for Essay Competition (Sem 4th)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm h-full">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Languages size={20} className="text-indigo-400" aria-hidden="true" /> Languages
                  </h3>
                  <div className="space-y-6">
                    {languages.map((lang, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{lang.name}</span>
                          <span className="text-slate-400">{lang.level === 100 ? 'Native' : 'Fluent'}</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden" role="progressbar" aria-valuenow={lang.level} aria-valuemin={0} aria-valuemax={100}>
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                            style={{ width: `${lang.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mt-12 mb-6 flex items-center gap-2">
                    <Heart size={20} className="text-pink-400" aria-hidden="true" /> Personal Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-lg text-sm">Writing Fantasy Stories</span>
                    <span className="px-3 py-1 bg-white/10 rounded-lg text-sm">Tech & Innovation Talks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-blue-600 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 blur-[80px] translate-x-1/2 translate-y-1/2"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-4xl font-bold mb-6">Let's build something amazing together</h2>
                  <p className="text-blue-100 text-lg mb-8 max-w-xl">
                    I'm always open to discussing engineering projects, digital marketing opportunities, or potential internships.
                  </p>
                  <div className="flex flex-col gap-4">
                    <a href="mailto:parthpahanpate9977@gmail.com" className="flex items-center justify-center lg:justify-start gap-4 hover:translate-x-2 transition-transform">
                      <div className="p-3 bg-white/10 rounded-xl"><Mail aria-hidden="true" /></div>
                      <span className="text-xl font-medium">parthpahanpate9977@gmail.com</span>
                    </a>
                    <div className="flex items-center justify-center lg:justify-start gap-4">
                      <div className="p-3 bg-white/10 rounded-xl"><Phone aria-hidden="true" /></div>
                      <span className="text-xl font-medium">+91 9561048299</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 w-full max-w-md">
                  <div className="bg-white p-8 rounded-2xl text-slate-900 shadow-xl">
                    <div className="flex flex-col gap-4">
                      <a 
                        href="https://www.linkedin.com/in/parth-pahanpate-7b1054280" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors"
                      >
                        <Linkedin size={20} aria-hidden="true" /> Connect on LinkedIn
                      </a>
                      <button 
                        onClick={() => window.print()} 
                        className="w-full py-4 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-blue-100 transition-colors"
                      >
                        <Download size={20} aria-hidden="true" /> Save Portfolio as PDF
                      </button>
                      <p className="text-center text-xs text-slate-400 mt-2">
                        Ready for immediate hire and impactful contributions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Parth Pahanpate. Designed for Impact & Innovation.
          </p>
          <nav className="flex justify-center gap-6 mt-6" aria-label="Social links">
            <a 
              href="https://www.linkedin.com/in/parth-pahanpate-7b1054280" 
              className="text-slate-400 hover:text-blue-600 transition-colors"
              aria-label="LinkedIn profile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a 
              href="mailto:parthpahanpate9977@gmail.com" 
              className="text-slate-400 hover:text-blue-600 transition-colors"
              aria-label="Send email"
            >
              <Mail size={20} aria-hidden="true" />
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default App;
