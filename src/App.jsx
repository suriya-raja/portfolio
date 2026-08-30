import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lanyard from './components/Lanyard/Lanyard';
import { ScrollZoomSection } from './components/ui/ScrollZoom';
import suriyaPhoto from './assets/suriya-photo.jpg';
import lanyardCustom from './assets/lanyard/lanyard-custom.jpg';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const projects = [
  {
    id: 'food',
    category: 'web',
    title: 'Food Waste Management Platform (NOGIRR)',
    badge: 'Web App & Live Platform',
    img: '/assets/images/project-food.png',
    liveUrl: 'https://nogirr.vercel.app/',
    demo: 'https://nogirr.vercel.app/',
    problem: 'Organizations and individuals find it difficult to track surplus food resources efficiently, leading to food waste.',
    technology: 'Next.js, React, JavaScript, Node.js, REST API, Vercel',
    result: 'Developed NOGIRR, a live web platform allowing users to log surplus food items, track inventory in real time, run search queries, and manage donor-recipient transactions seamlessly.',
    learning: 'Mastered full-stack web architecture, live deployment on Vercel, geolocation search, and inventory state management.',
    tags: ['Next.js', 'React', 'JavaScript', 'Node.js', 'REST API'],
    github: 'https://github.com/suriya-raja',
    ptrl: [
      { label: 'Problem:', text: 'Tracking surplus food records manually leads to food waste.' },
      { label: 'Tech:', text: 'Next.js, React, Node.js, Vercel, REST API' },
      { label: 'Result:', text: 'Live NOGIRR portal for real-time surplus food tracking.' },
      { label: 'Learning:', text: 'Full-stack web deployment & inventory state API.' },
    ],
  },
  {
    id: 'game',
    category: 'game',
    title: 'Kingdom of Thrones Game',
    badge: 'Game Dev & OOP',
    img: '/assets/images/project-game.png',
    liveUrl: null,
    demo: '#',
    problem: 'Designing an engaging strategy game mechanics with smooth unit pathfinding, interactive UI, and resource management systems.',
    technology: 'Unity Engine, C#, Game Design, Object-Oriented Programming (OOP), Physics Engine',
    result: 'Developed an interactive strategy kingdom game featuring resource collection, kingdom expansion, unit spawning, and tactical battle mechanics.',
    learning: 'Mastered Unity game loop architecture, C# object-oriented design patterns, state machines, game physics, and interactive UI scripting.',
    tags: ['Unity', 'C#', 'Game Dev', 'OOP'],
    github: 'https://github.com/suriya-raja',
    ptrl: [
      { label: 'Problem:', text: 'Designing engaging strategy mechanics & resource balance.' },
      { label: 'Tech:', text: 'Unity Engine, C#, Game Design, OOP' },
      { label: 'Result:', text: 'Interactive strategy game with kingdom expansion & resource systems.' },
      { label: 'Learning:', text: 'Unity event loops, C# state machines & game physics.' },
    ],
  },
  {
    id: 'tikki',
    category: 'game',
    title: 'Tikki Topple Game',
    badge: 'Game Dev & 3D Strategy',
    img: '/assets/images/project-tikki.png',
    liveUrl: 'https://tikki-topple.vercel.app/',
    demo: 'https://tikki-topple.vercel.app/',
    problem: 'Designing a strategic Tiki totem placement game with dynamic player action cards, opponent positioning, and tactical round scoring.',
    technology: 'Unity Engine, C#, 3D Rendering, Game State Logic',
    result: 'Developed Tikki Topple, a strategy game featuring 3D totem aesthetics, action cards, opponent placement, and round-based scoring loops.',
    learning: 'Gained hands-on experience in turn-based game state management, 3D camera controls, card-driven game loops, and UI turn feedback.',
    tags: ['Unity', 'C#', '3D Game', 'Strategy'],
    github: 'https://github.com/suriya-raja',
    ptrl: [
      { label: 'Problem:', text: 'Tactical totem strategy & card-driven game mechanics.' },
      { label: 'Tech:', text: 'Unity Engine, C#, 3D Game Loop' },
      { label: 'Result:', text: 'Strategic 3D Tikki Topple game with card play.' },
      { label: 'Learning:', text: 'Turn-based state architecture & 3D camera logic.' },
    ],
  },
  {
    id: 'cloth',
    category: 'iot',
    title: 'Smart Cloth Management System',
    badge: 'IoT & Hardware',
    img: '/assets/images/project-cloth.png',
    liveUrl: null,
    demo: '#',
    problem: 'Managing fabric storage manually is time-consuming and risks textile damage due to undetected humidity and gas buildup.',
    technology: 'ESP32 Microcontroller, Arduino, Embedded C++, DHT Sensors, Gas Sensors, Web Dashboard',
    result: 'Developed an automated IoT hardware system that continuously acquires sensor telemetry, triggers automated ventilation control, and visualizes real-time storage status on a responsive web portal.',
    learning: 'Gained hands-on experience in microcontroller sensor interfacing, real-time feedback loops, embedded C++, and IoT-to-web telemetry data flow.',
    tags: ['ESP32', 'Arduino', 'C++', 'IoT'],
    github: 'https://github.com/suriya-raja',
    ptrl: [
      { label: 'Problem:', text: 'Manual garment storage risks fabric damage from humidity.' },
      { label: 'Tech:', text: 'ESP32, Arduino, Embedded C++, Sensors' },
      { label: 'Result:', text: 'Automated IoT system with live web telemetry dashboard.' },
      { label: 'Learning:', text: 'Embedded sensor connectivity & feedback loops.' },
    ],
  },
];

/* ─────────────────────────────────────────────
   EDUCATION DATA
───────────────────────────────────────────── */
const educationList = [
  {
    id: 'lpu',
    institution: 'Lovely Professional University (LPU)',
    degree: 'B.Tech in Computer Science & Engineering (CSE)',
    timeline: '2025 – 2029',
    badge: 'Higher Education · 2nd Year CSE Student',
    status: 'Currently Pursuing (Focus on Machine Learning & Software Engineering)',
    description: 'Specializing in Machine Learning, Data Structures & Algorithms, Artificial Intelligence, and Software Engineering. Building practical projects across Web Platforms, IoT Hardware Telemetry, and Game Systems.',
    highlights: ['Machine Learning & AI Principles', 'Python & C++ Data Structures', 'Full-Stack Web Architecture', 'Object-Oriented Design (OOP)']
  },
  {
    id: 'velammal',
    institution: 'Velammal School',
    degree: 'Class 12 (Higher Secondary Senior Certificate)',
    timeline: 'Graduated 2024',
    badge: 'Class 12 · Higher Secondary',
    status: 'Completed with Specialization in PCMB (Physics, Chemistry, Mathematics & Biology)',
    description: 'Developed a solid foundation in Advanced Mathematics, Physics, Chemistry, and Biology Principles, fostering strong analytical logic, scientific reasoning, and problem-solving skills.',
    highlights: ['Higher Mathematics & Calculus', 'Physics & Analytical Reasoning', 'Biology & Scientific Methodology', 'Algorithmic Problem Solving']
  },
  {
    id: 'vikaasa',
    institution: 'Vikaasa School',
    degree: 'Class 10 (Secondary School Leaving Certificate)',
    timeline: 'Graduated 2022',
    badge: 'Class 10 · Secondary School',
    status: 'Completed with Distinction in Core Sciences & Mathematics',
    description: 'Established fundamental academic excellence, mathematical reasoning, and scientific methodology that paved the way for advanced computer science studies.',
    highlights: ['Core Mathematics & Geometry', 'General Science & Physics', 'Logical Reasoning', 'Academic Excellence']
  }
];

/* ─────────────────────────────────────────────
   CERTIFICATIONS & ACHIEVEMENTS DATA
───────────────────────────────────────────── */
const achievementsList = [
  {
    id: 'cert-saylor-python',
    title: 'CS105: Introduction to Python',
    issuer: 'Saylor Academy (saylor.org)',
    date: 'February 9, 2026',
    category: 'Official Certification',
    img: '/assets/images/cert-saylor-python.png',
    verifyUrl: 'https://www.saylor.org',
    description: 'Certificate of Achievement awarded to Suriya Raja for successfully completing CS105: Introduction to Python with a distinction grade of 98.42% (36 Hours). Certificate ID: 1897066869SR.',
    tags: ['Saylor Academy', 'Python', 'Grade: 98.42%', 'ID: 1897066869SR', 'Feb 2026']
  },
  {
    id: 'cert-infosys-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    date: 'April 2, 2026',
    category: 'Official Certification',
    img: '/assets/images/cert-infosys-ai-1.png',
    verifyUrl: 'https://verify.onwingspan.com',
    description: 'Course Completion Certificate awarded to Suriya Raja for successfully completing Introduction to Artificial Intelligence issued by Infosys Springboard on April 2, 2026.',
    tags: ['Infosys Springboard', 'Artificial Intelligence', 'Machine Learning', 'April 2026']
  }
];

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function Modal({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop active" id="project-modal" onClick={(e) => { if (e.target.classList.contains('modal-backdrop')) onClose(); }}>
      <div className="modal-card">
        <button className="modal-close-btn" id="modal-close" aria-label="Close Modal" onClick={onClose}>✕</button>
        <div className="modal-body">
          <h3 className="modal-title" id="modal-title">{project.title}</h3>
          <img src={project.img} alt={project.title} className="modal-image" id="modal-img" />
          <div className="ptrl-detail-box">
            <div className="ptrl-detail-row"><h4>P — Problem Statement</h4><p id="modal-problem">{project.problem}</p></div>
            <div className="ptrl-detail-row"><h4>T — Technology Stack</h4><p id="modal-technology">{project.technology}</p></div>
            <div className="ptrl-detail-row"><h4>R — Result & Solution</h4><p id="modal-result">{project.result}</p></div>
            <div className="ptrl-detail-row"><h4>L — Key Learnings</h4><p id="modal-learning">{project.learning}</p></div>
          </div>
          <div id="modal-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map(t => <span key={t} className="skill-tag project-tech-tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a href={project.github} target="_blank" rel="noreferrer" id="modal-github" className="btn-primary">View GitHub Repository 🐙</a>
            <a href={project.demo} id="modal-demo" className="btn-secondary">Live Demo ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function showToast(message) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `<span style="color:#7F011F;font-weight:700;">✓</span><span>${message}</span>`;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', alignItems: 'center',
    gap: '0.75rem', padding: '1rem 1.75rem', borderRadius: '12px',
    fontFamily: "'Manrope', sans-serif", fontSize: '0.9rem', color: '#F5EBD0',
    background: 'rgba(15, 15, 20, 0.95)', border: '1px solid rgba(127, 1, 31, 0.4)',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)', zIndex: '10000',
    transform: 'translateY(20px)', opacity: '0', transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.transform = 'translateY(0)'; toast.style.opacity = '1'; });
  setTimeout(() => { toast.style.transform = 'translateY(20px)'; toast.style.opacity = '0'; setTimeout(() => toast.remove(), 400); }, 4000);
}

/* ─────────────────────────────────────────────
   APP
───────────────────────────────────────────── */
export default function App() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalProject, setModalProject] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  /* ── Scroll effects ── */
  useEffect(() => {
    const onScroll = () => {
      setNavScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const pos = window.scrollY + 220;
      let current = 'hero';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Scroll observer for .animate-up ── */
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-up');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animated'); observer.unobserve(entry.target); } });
    }, { threshold: 0.1 });
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });

  /* ── Contact form ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.innerHTML = 'Transmitting...';
    btn.disabled = true;
    setTimeout(() => { showToast('Transmission received! Suriya will respond promptly.'); e.target.reset(); btn.innerHTML = orig; btn.disabled = false; }, 1200);
  };

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* NAVBAR */}
      <header>
        <nav className={`navbar fade-up${navScrolled ? ' scrolled' : ''}`}>
          <div className="container nav-container">
            <a href="#" className="logo">PORTFOLIO<span>.</span></a>
            <ul className={`nav-links${navOpen ? ' active' : ''}`}>
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'education', label: 'Education' },
                { id: 'achievements', label: 'Achievements' },
                { id: 'contact', label: 'Connect' },
              ].map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? 'active' : ''}
                    onClick={() => setNavOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button className="nav-toggle" aria-label="Toggle Navigation" onClick={() => setNavOpen(o => !o)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="8" x2="20" y2="8"></line>
                <line x1="4" y1="16" x2="20" y2="16"></line>
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ═══ 1. HERO ═══ */}
        <section id="hero" className="hero">

          {/* Grid Lines */}
          <div className="grid-line-top"><div className="grid-line origin-left" style={{ transform: 'scaleX(1)' }}></div></div>
          <div className="grid-line-bottom"><div className="grid-line origin-right" style={{ transform: 'scaleX(1)' }}></div></div>

          {/* Hero layout: text left, Lanyard right */}
          <div className="hero-inner">
            {/* Text Column */}
            <div className="hero-headline-wrap">
              <span className="hero-greeting fade-up">HELLO, I'M SURIYA RAJA</span>
              <h1 className="hero-title">
                <motion.span
                  initial={{ WebkitTextStroke: "3.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["3.5px #7F011F", "3.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1.6, times: [0, 0.45, 1], ease: "easeInOut" }}
                  style={{ display: "inline-block" }}
                >
                  SURIYA
                </motion.span>
                <br />
                <motion.span
                  initial={{ WebkitTextStroke: "3.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["3.5px #7F011F", "3.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#7F011F"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 1.6, times: [0, 0.45, 1], ease: "easeInOut", delay: 0.15 }}
                  style={{ display: "inline-block" }}
                >
                  RAJA
                </motion.span>
              </h1>
              <h2 className="hero-subtitle fade-up">B.Tech CSE 2nd Year Student | Python Enthusiast | Aspiring ML Engineer</h2>
              <p className="hero-description fade-up">
                I am a second-year Computer Science student at Lovely Professional University passionate about machine learning, artificial intelligence, and software development. I enjoy building practical projects and continuously improving my technical skills.
              </p>
              <div className="hero-buttons fade-up">
                <a href="#projects" className="btn-primary">View My Projects →</a>
                <a href="#contact" className="btn-secondary">Download Resume →</a>
              </div>
            </div>

            {/* Lanyard Column */}
            <div className="hero-lanyard-col">
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                fov={20}
                transparent={true}
                frontImage={suriyaPhoto}
                imageFit="cover"
                lanyardImage={lanyardCustom}
                lanyardWidth={1.2}
              />
            </div>
          </div>

          {/* Hero Footer Bar */}
          <div className="container hero-footer-bar fade-up">
            <div className="hero-info-left">
              <span className="label" style={{ fontWeight: 800, color: '#7F011F', fontSize: '0.8rem' }}>ACADEMIC STATUS & UNIVERSITY</span>
              <p className="desc" style={{ fontWeight: 800, color: '#0a0a0a', fontSize: '0.95rem' }}>2nd Year B.Tech CSE Student at Lovely Professional University focused on Machine Learning & Software Engineering.</p>
            </div>
            <div className="hero-info-right">
              <span className="year" style={{ fontWeight: 900, color: '#0a0a0a' }}>2nd Yr</span>
              <span className="label" style={{ fontWeight: 800, color: '#7F011F', fontSize: '0.8rem' }}>Lovely Professional University</span>
            </div>
          </div>
        </section>

        {/* ═══ 2. ABOUT (WITH SCROLL ZOOM TRANSITION FROM LANDING) ═══ */}
        <ScrollZoomSection id="about" className="py-12">
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
              <div className="section-header animate-up">
                <span className="section-tag">01 / Introduction</span>
                <motion.h2
                  className="section-title"
                  initial={{ WebkitTextStroke: "2.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["2.5px #7F011F", "2.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  About Me
                </motion.h2>
                <p className="section-subtitle">A concise professional overview of my academic journey and technical aspirations.</p>
              </div>
              <div className="about-grid">
                <div className="about-text-box animate-up">
                  <p>I am a <strong>second-year B.Tech Computer Science and Engineering student at Lovely Professional University</strong> with a strong passion for artificial intelligence, machine learning, and software development. I have developed solid foundational skills in <strong>Python, C++, SQL, web development, and IoT hardware</strong>.</p>
                  <p>I enjoy solving complex technical problems, analyzing algorithms, and transforming ideas into practical applications. My goal is to become a skilled <strong>Machine Learning Engineer</strong> working on cutting-edge AI systems.</p>
                  <div className="about-details-list">
                    {[['Name','Suriya Raja'],['Degree & Year','B.Tech CSE (2nd Year)'],['University','Lovely Professional University'],['Area of Interest','Machine Learning & AI'],['Career Goal','ML Engineer']].map(([label,val]) => (
                      <div key={label} className="about-detail-item">
                        <span className="label">{label}</span>
                        <span className="val">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="stats-grid animate-up">
                  {[['2nd','Year B.Tech CSE'],['2+','Projects Built'],['LPU','University'],['ML','Engineering Focus']].map(([num,lbl]) => (
                    <div key={lbl} className="stat-card">
                      <span className="stat-number">{num}</span>
                      <span className="stat-label">{lbl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollZoomSection>

        {/* ═══ 3. SKILLS (WITH SCROLL ZOOM) ═══ */}
        <ScrollZoomSection id="skills" className="py-12">
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
              <div className="section-header animate-up">
                <span className="section-tag">02 / Technical Stack</span>
                <motion.h2
                  className="section-title"
                  initial={{ WebkitTextStroke: "2.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["2.5px #7F011F", "2.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  Skills & Technologies
                </motion.h2>
                <p className="section-subtitle">Core technical proficiencies and development tools across AI, software, and systems.</p>
              </div>
              <div className="skills-grid">
                {[
                  {
                    code: 'DEV',
                    title: 'Programming',
                    skills: [
                      { name: 'Python', tier: 'Advanced' },
                      { name: 'C++', tier: 'Proficient' },
                      { name: 'C', tier: 'Proficient' },
                      { name: 'SQL', tier: 'Proficient' },
                    ]
                  },
                  {
                    code: 'WEB',
                    title: 'Web Development',
                    skills: [
                      { name: 'React', tier: 'Advanced' },
                      { name: 'HTML5', tier: 'Advanced' },
                      { name: 'CSS3', tier: 'Advanced' },
                      { name: 'JavaScript', tier: 'Advanced' },
                    ]
                  },
                  {
                    code: 'DATA',
                    title: 'Database & Cloud',
                    skills: [
                      { name: 'MySQL', tier: 'Proficient' },
                      { name: 'MongoDB', tier: 'Intermediate' },
                    ]
                  },
                  {
                    code: 'TOOL',
                    title: 'Tools & Ecosystem',
                    skills: [
                      { name: 'VS Code', tier: 'Advanced' },
                      { name: 'Git & GitHub', tier: 'Advanced' },
                      { name: 'Linux', tier: 'Proficient' },
                      { name: 'Unity Engine', tier: 'Intermediate' },
                    ]
                  },
                ].map(({ code, title, skills }) => (
                  <div key={title} className="skill-category-card animate-up">
                    <div className="skill-category-header">
                      <div className="skill-category-header-left">
                        <div className="skill-icon-wrap">{code}</div>
                        <h3 className="skill-category-title">{title}</h3>
                      </div>
                      <span className="skill-category-count">{skills.length} Skills</span>
                    </div>
                    <div className="skill-badges-grid">
                      {skills.map(s => (
                        <div key={s.name} className="skill-badge-item">
                          <div className="skill-badge-info">
                            <span className="skill-badge-name">{s.name}</span>
                            <span className="skill-badge-tier">{s.tier}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollZoomSection>

        {/* ═══ 4. PROJECTS (WITH SCROLL ZOOM) ═══ */}
        <ScrollZoomSection id="projects" className="py-12">
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
              <div className="section-header animate-up">
                <span className="section-tag">03 / Core Showcase</span>
                <motion.h2
                  className="section-title"
                  initial={{ WebkitTextStroke: "2.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["2.5px #7F011F", "2.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  Projects (P → T → R → L)
                </motion.h2>
                <p className="section-subtitle">Structured technical breakdown demonstrating Problem, Technology, Result, and Learning.</p>
              </div>
              <div className="projects-filter animate-up">
                {[['all','All Projects'],['iot','IoT & Hardware'],['web','Web Dev'],['game','Game Dev']].map(([f,lbl]) => (
                  <button key={f} className={`filter-btn${activeFilter===f?' active':''}`} data-filter={f} onClick={() => setActiveFilter(f)}>{lbl}</button>
                ))}
              </div>
              <div className="projects-grid">
                {filteredProjects.map(p => (
                  <div key={p.id} className="glass-card project-card animate-up" onClick={(e) => { if (!e.target.closest('a[target="_blank"]')) setModalProject(p); }}>
                    <div className="project-img-wrapper">
                      <img src={p.img} alt={p.title} />
                      <span className="project-overlay-badge">{p.badge}</span>
                    </div>
                    <div className="project-content">
                      <div>
                        <h3 className="project-title">{p.title}</h3>
                        <div className="ptrl-summary-list">
                          {p.ptrl.map(row => <div key={row.label} className="ptrl-item"><strong>{row.label}</strong>{row.text}</div>)}
                        </div>
                        <div className="project-tech-tags">
                          {p.tags.map(t => <span key={t} className="project-tech-tag">{t}</span>)}
                        </div>
                      </div>
                      <div className="project-actions">
                        {p.liveUrl ? (
                          <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', fontWeight: 800 }}>Visit Live App →</a>
                        ) : null}
                        <a href={`projects.html#${p.id}`} className="btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', fontWeight: 800 }}>P-T-R-L Details →</a>
                        <a href={p.github} target="_blank" rel="noreferrer" className="btn-link" style={{ fontWeight: 800 }}>GitHub →</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                <a href="projects.html" className="btn-secondary">View Projects Archive →</a>
              </div>
            </div>
          </section>
        </ScrollZoomSection>

        {/* ═══ 4.5 EDUCATION (WITH SCROLL ZOOM) ═══ */}
        <ScrollZoomSection id="education" className="py-12">
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
              <div className="section-header animate-up">
                <span className="section-tag">04 / Academic Journey</span>
                <motion.h2
                  className="section-title"
                  initial={{ WebkitTextStroke: "2.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["2.5px #7F011F", "2.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  Education
                </motion.h2>
                <p className="section-subtitle">Academic milestones from secondary education to undergraduate computer science engineering.</p>
              </div>

              <div className="education-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                {educationList.map((edu) => (
                  <div key={edu.id} className="glass-card animate-up" style={{ padding: '2rem', background: '#F5EBD0', border: '3.5px solid #7F011F', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <span className="section-tag" style={{ margin: 0, fontWeight: 800, color: '#7F011F' }}>{edu.badge}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#F5EBD0', background: '#7F011F', padding: '0.25rem 0.75rem', borderRadius: '20px', border: '1.5px solid #7F011F' }}>{edu.timeline}</span>
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0a0a0a', fontFamily: 'var(--font-stone)', marginBottom: '0.5rem' }}>{edu.institution}</h3>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7F011F', marginBottom: '1rem' }}>{edu.degree}</h4>
                      <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.6, marginBottom: '1.25rem' }}>{edu.description}</p>
                    </div>

                    <div style={{ background: 'rgba(127,1,31,0.06)', border: '2px solid #7F011F', borderRadius: '12px', padding: '1rem' }}>
                      <strong style={{ display: 'block', fontSize: '0.85rem', color: '#7F011F', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Highlights:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {edu.highlights.map((item) => (
                          <span key={item} style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0a0a0a', background: '#F5EBD0', border: '1.5px solid #7F011F', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollZoomSection>

        {/* ═══ 4.5 ACHIEVEMENTS & CERTIFICATIONS (WITH SCROLL ZOOM) ═══ */}
        <ScrollZoomSection id="achievements" className="py-12">
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
              <div className="section-header animate-up">
                <span className="section-tag">05 / Accomplishments</span>
                <motion.h2
                  className="section-title"
                  initial={{ WebkitTextStroke: "2.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["2.5px #7F011F", "2.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  Certifications & Achievements
                </motion.h2>
                <p className="section-subtitle">Technical certifications, project distinctions, and engineering milestones.</p>
              </div>

              <div className="achievements-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {achievementsList.map((item) => (
                  <div key={item.id} className="glass-card animate-up" style={{ padding: '2rem', background: '#F5EBD0', border: '3.5px solid #7F011F', borderRadius: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F5EBD0', background: '#7F011F', padding: '0.25rem 0.75rem', borderRadius: '12px' }}>{item.category}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7F011F' }}>{item.date}</span>
                      </div>

                      {item.img ? (
                        <div style={{ borderRadius: '12px', border: '2px solid #7F011F', overflow: 'hidden', marginBottom: '1.25rem', height: '180px', background: '#ffffff' }}>
                          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>
                      ) : null}

                      <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0a0a0a', fontFamily: 'var(--font-stone)', marginBottom: '0.4rem' }}>{item.title}</h3>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#7F011F', marginBottom: '1rem' }}>{item.issuer}</h4>
                      <p style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.6, marginBottom: '1.25rem' }}>{item.description}</p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: item.verifyUrl ? '1rem' : 0 }}>
                        {item.tags.map((t) => (
                          <span key={t} style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0a0a0a', background: 'rgba(127,1,31,0.08)', border: '1.5px solid #7F011F', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      {item.verifyUrl ? (
                        <a href={item.verifyUrl} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 800, display: 'inline-block' }}>
                          Verify Certificate →
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollZoomSection>

        {/* ═══ 6. CONTACT (WITH SCROLL ZOOM) ═══ */}
        <ScrollZoomSection id="contact" className="py-12">
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="container">
              <div className="section-header animate-up">
                <span className="section-tag">06 / Connect With Me</span>
                <motion.h2
                  className="section-title"
                  initial={{ WebkitTextStroke: "2.5px #7F011F", color: "rgba(0,0,0,0)", opacity: 0, y: 10 }}
                  whileInView={{
                    WebkitTextStroke: ["2.5px #7F011F", "2.5px #7F011F", "1.5px #7F011F"],
                    color: ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "#0a0a0a"],
                    opacity: [0, 1, 1],
                    y: [10, 0, 0]
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1.5, times: [0, 0.45, 1], ease: "easeInOut" }}
                >
                  Get In Touch
                </motion.h2>
                <p className="section-subtitle">Let's connect for machine learning opportunities, tech discussions, or project collaborations.</p>
              </div>
              <div className="contact-grid">
                <div className="contact-info animate-up">
                  <h3>Connect With Me</h3>
                  <p>I am actively seeking machine learning and software engineering opportunities. Feel free to reach out via GitHub, LinkedIn, or Email!</p>
                  <div className="contact-list">
                    <a href="https://github.com/suriya-raja" target="_blank" rel="noreferrer" className="contact-item">
                      <div><strong style={{ display:'block',fontSize:'0.85rem',color:'#7F011F' }}>GITHUB</strong><span style={{ color: '#0a0a0a' }}>github.com/suriya-raja</span></div>
                    </a>
                    <a href="https://www.linkedin.com/in/suriya-raja-8bb15737a" target="_blank" rel="noreferrer" className="contact-item">
                      <div><strong style={{ display:'block',fontSize:'0.85rem',color:'#7F011F' }}>LINKEDIN</strong><span style={{ color: '#0a0a0a' }}>linkedin.com/in/suriya-raja-8bb15737a</span></div>
                    </a>
                    <a href="mailto:suriyaraja565@gmail.com" className="contact-item">
                      <div><strong style={{ display:'block',fontSize:'0.85rem',color:'#7F011F' }}>EMAIL</strong><span style={{ color: '#0a0a0a' }}>suriyaraja565@gmail.com</span></div>
                    </a>
                    <div className="contact-item" style={{ cursor:'default' }}>
                      <div style={{ display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center' }}>
                        <div><strong style={{ display:'block',fontSize:'0.85rem',color:'#7F011F' }}>RESUME PDF</strong><span style={{ color: '#0a0a0a' }}>Suriya_Raja_Resume.pdf</span></div>
                        <a href="#" download="Suriya_Raja_Resume.pdf" className="btn-primary" style={{ padding:'0.4rem 1rem',fontSize:'0.75rem' }}>Download</a>
                      </div>
                    </div>
                  </div>
                </div>
                <form className="glass-card contact-form animate-up" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group"><input type="text" name="name" className="form-control" placeholder="Your Name" required /></div>
                    <div className="form-group"><input type="email" name="email" className="form-control" placeholder="Your Email" required /></div>
                  </div>
                  <div className="form-group"><input type="text" name="subject" className="form-control" placeholder="Subject" required /></div>
                  <div className="form-group"><textarea name="message" className="form-control" placeholder="Your Message" required></textarea></div>
                  <button type="submit" className="btn-primary">Send Message →</button>
                </form>
              </div>
            </div>
          </section>
        </ScrollZoomSection>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content" style={{ justifyContent: 'center' }}>
            <div className="footer-socials">
              <a href="https://github.com/suriya-raja" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://www.linkedin.com/in/suriya-raja-8bb15737a" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="mailto:suriyaraja565@gmail.com" className="footer-social-link" aria-label="Email">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Suriya Raja — 2nd Year B.Tech CSE (Lovely Professional University).</p>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      {modalProject && <Modal project={modalProject} onClose={() => setModalProject(null)} />}
    </>
  );
}
