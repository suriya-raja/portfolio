import { useEffect, useRef, useState } from 'react';
import Lanyard from './components/Lanyard/Lanyard';
import suriyaPhoto from './assets/suriya-photo.jpg';
import lanyardCustom from './assets/lanyard/lanyard-custom.jpg';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const projects = [
  {
    id: 'cloth',
    category: 'iot',
    title: 'Smart Cloth Management System',
    badge: 'IoT & Hardware',
    img: '/assets/images/project-cloth.png',
    problem: 'Managing fabric storage manually is time-consuming and risks textile damage due to undetected humidity and gas buildup.',
    technology: 'ESP32 Microcontroller, Arduino, Embedded C++, DHT Sensors, Gas Sensors, Web Dashboard',
    result: 'Developed an automated IoT hardware system that continuously acquires sensor telemetry, triggers automated ventilation control, and visualizes real-time storage status on a responsive web portal.',
    learning: 'Gained hands-on experience in microcontroller sensor interfacing, real-time feedback loops, embedded C++, and IoT-to-web telemetry data flow.',
    tags: ['ESP32', 'Arduino', 'C++', 'IoT'],
    github: 'https://github.com/suriya-raja',
    demo: '#',
    ptrl: [
      { label: 'Problem:', text: 'Manual garment storage risks fabric damage from humidity.' },
      { label: 'Tech:', text: 'ESP32, Arduino, Embedded C++, Sensors' },
      { label: 'Result:', text: 'Automated IoT system with live web telemetry dashboard.' },
      { label: 'Learning:', text: 'Embedded sensor connectivity & feedback loops.' },
    ],
  },
  {
    id: 'food',
    category: 'web',
    title: 'Food Waste Management Platform',
    badge: 'Web Development',
    img: '/assets/images/project-food.png',
    problem: 'Organizations and individuals find it difficult to track surplus food resources efficiently, leading to food waste.',
    technology: 'HTML5, CSS3, JavaScript, Python, MySQL, REST API',
    result: 'Developed a responsive web platform that allows users to log surplus food items, track inventory in real time, run search queries, and manage donor-recipient transactions seamlessly.',
    learning: 'Significantly improved understanding of JavaScript DOM manipulation, MySQL database connectivity, CRUD operations, and responsive web design.',
    tags: ['HTML/CSS', 'JavaScript', 'Python', 'MySQL'],
    github: 'https://github.com/suriya-raja',
    demo: '#',
    ptrl: [
      { label: 'Problem:', text: 'Tracking surplus food records manually leads to waste.' },
      { label: 'Tech:', text: 'HTML, CSS, JavaScript, Python, MySQL' },
      { label: 'Result:', text: 'Web application with live inventory tracking & CRUD management.' },
      { label: 'Learning:', text: 'JS DOM manipulation, MySQL queries & REST architecture.' },
    ],
  },
  {
    id: 'game',
    category: 'game',
    title: 'Throne of Kingdom Game',
    badge: 'Game Development',
    img: '/assets/images/project-game.png',
    problem: 'Designing an engaging strategy game mechanics with smooth unit pathfinding, interactive UI, and resource management systems.',
    technology: 'Unity Engine, C#, Game Design, Object-Oriented Programming (OOP), Physics Engine',
    result: 'Developed an interactive 2D/3D strategy kingdom game featuring resource collection, kingdom expansion, unit spawning, and tactical battle mechanics.',
    learning: 'Mastered Unity game loop architecture, C# object-oriented design patterns, state machines, game physics, and interactive UI scripting.',
    tags: ['Unity', 'C#', 'Game Dev'],
    github: 'https://github.com/suriya-raja',
    demo: '#',
    ptrl: [
      { label: 'Problem:', text: 'Designing engaging strategy mechanics & resource balance.' },
      { label: 'Tech:', text: 'Unity Engine, C#, Game Design, OOP' },
      { label: 'Result:', text: 'Interactive strategy game with kingdom expansion & resource systems.' },
      { label: 'Learning:', text: 'Unity event loops, C# state machines & game physics.' },
    ],
  },
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
            <a href="#" className="logo">SURIYA<span>.</span></a>
            <ul className={`nav-links${navOpen ? ' active' : ''}`}>
              {['hero', 'about', 'skills', 'projects', 'contact'].map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={activeSection === id ? 'active' : ''}
                    onClick={() => setNavOpen(false)}
                  >
                    {['Home', 'About', 'Skills', 'Projects', 'Connect'][i]}
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
              <span className="hero-greeting fade-up">👋 Hello, I'm Suriya Raja</span>
              <h1 className="hero-title">
                <div className="hero-char-wrap">
                  {'SURIYA'.split('').map((c, i) => <span key={i} className="hero-char" style={{ transform: 'translateY(0)', opacity: 1 }}>{c}</span>)}
                </div>
                <br />
                <div className="hero-char-wrap">
                  {'RAJA'.split('').map((c, i) => <span key={i} className="hero-char hero-char-outline" style={{ transform: 'translateY(0)', opacity: 1 }}>{c}</span>)}
                </div>
              </h1>
              <h2 className="hero-subtitle fade-up">B.Tech CSE 2nd Year Student | Python Enthusiast | Aspiring ML Engineer</h2>
              <p className="hero-description fade-up">
                I am a second-year Computer Science student at Lovely Professional University passionate about machine learning, artificial intelligence, and software development. I enjoy building practical projects and continuously improving my technical skills.
              </p>
              <div className="hero-buttons fade-up">
                <a href="#projects" className="btn-primary">View My Projects →</a>
                <a href="#contact" className="btn-secondary">Download Resume 📄</a>
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
              <span className="label">Academic Status & University</span>
              <p className="desc">2nd Year B.Tech CSE Student at Lovely Professional University focused on Machine Learning & Software Engineering.</p>
            </div>
            <div className="hero-info-right">
              <span className="year">2nd Yr</span>
              <span className="label">Lovely Professional University</span>
            </div>
          </div>
        </section>

        {/* ═══ 2. ABOUT ═══ */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header animate-up">
              <span className="section-tag">01 / Introduction</span>
              <h2 className="section-title">About Me</h2>
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

        {/* ═══ 3. SKILLS ═══ */}
        <section id="skills" className="section">
          <div className="container">
            <div className="section-header animate-up">
              <span className="section-tag">02 / Technical Skills</span>
              <h2 className="section-title">Skills & Technologies</h2>
              <p className="section-subtitle">Core technical skills categorized in structured bullet points.</p>
            </div>
            <div className="skills-grid">
              {[
                { icon: '💻', title: 'Programming', items: ['Python','C++','C','SQL'] },
                { icon: '🌐', title: 'Web Development', items: ['HTML5','CSS3','JavaScript','React'] },
                { icon: '🗄️', title: 'Database', items: ['MySQL','MongoDB'] },
                { icon: '🛠️', title: 'Tools & Environment', items: ['VS Code','Git & GitHub','Linux','Unity Engine'] },
              ].map(({ icon, title, items }) => (
                <div key={title} className="glass-card skill-category-card animate-up">
                  <div>
                    <div className="skill-category-header">
                      <div className="skill-icon-wrap">{icon}</div>
                      <h3 className="skill-category-title">{title}</h3>
                    </div>
                    <ul className="skill-bullets-list">
                      {items.map(item => <li key={item} className="skill-bullet-item"><span className="bullet-dot">•</span>{item}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 4. PROJECTS ═══ */}
        <section id="projects" className="section">
          <div className="container">
            <div className="section-header animate-up">
              <span className="section-tag">03 / Core Showcase</span>
              <h2 className="section-title">Projects (P → T → R → L)</h2>
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
                      <button className="btn-link">P-T-R-L Details 🔍</button>
                      <a href={p.github} target="_blank" rel="noreferrer" className="btn-link">GitHub 🐙</a>
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

        {/* ═══ 5. CONTACT ═══ */}
        <section id="contact" className="section">
          <div className="container">
            <div className="section-header animate-up">
              <span className="section-tag">04 / Connect With Me</span>
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">Let's connect for machine learning opportunities, tech discussions, or project collaborations.</p>
            </div>
            <div className="contact-grid">
              <div className="contact-info animate-up">
                <h3>Connect With Me</h3>
                <p>I am actively seeking machine learning and software engineering opportunities. Feel free to reach out via GitHub, LinkedIn, or Email!</p>
                <div className="contact-list">
                  <a href="https://github.com/suriya-raja" target="_blank" rel="noreferrer" className="contact-item">
                    <div className="contact-item-icon">🐙</div>
                    <div><strong style={{ display:'block',fontSize:'0.85rem',color:'var(--text-dim)' }}>GitHub</strong><span>github.com/suriya-raja</span></div>
                  </a>
                  <a href="https://www.linkedin.com/in/suriya-raja-8bb15737a" target="_blank" rel="noreferrer" className="contact-item">
                    <div className="contact-item-icon">💼</div>
                    <div><strong style={{ display:'block',fontSize:'0.85rem',color:'var(--text-dim)' }}>LinkedIn</strong><span>linkedin.com/in/suriya-raja-8bb15737a</span></div>
                  </a>
                  <a href="mailto:suriyaraja565@gmail.com" className="contact-item">
                    <div className="contact-item-icon">✉</div>
                    <div><strong style={{ display:'block',fontSize:'0.85rem',color:'var(--text-dim)' }}>Email</strong><span>suriyaraja565@gmail.com</span></div>
                  </a>
                  <div className="contact-item" style={{ cursor:'default' }}>
                    <div className="contact-item-icon">📄</div>
                    <div style={{ display:'flex',justifyContent:'space-between',width:'100%',alignItems:'center' }}>
                      <div><strong style={{ display:'block',fontSize:'0.85rem',color:'var(--text-dim)' }}>Resume PDF</strong><span>Suriya_Raja_Resume.pdf</span></div>
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
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <a href="#" className="footer-logo">SURIYA<span>.</span></a>
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
