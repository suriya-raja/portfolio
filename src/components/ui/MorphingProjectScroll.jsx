import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

export const MorphingProjectScroll = ({ projects, setModalProject }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [projectIndex, setProjectIndex] = useState(0);
  const [stage, setStage] = useState('zoomed'); // 'zoomed' | 'details'

  useEffect(() => {
    return scrollYProgress.on("change", (p) => {
      const totalSteps = projects.length * 2;
      const step = Math.min(totalSteps - 1, Math.max(0, Math.floor(p * totalSteps)));
      const pIdx = Math.floor(step / 2);
      const isDetails = step % 2 === 1;

      setProjectIndex(pIdx);
      setStage(isDetails ? 'details' : 'zoomed');
    });
  }, [scrollYProgress, projects.length]);

  const currentProject = projects[projectIndex] || projects[0];

  return (
    <div ref={containerRef} style={{ minHeight: "440vh", position: "relative" }}>
      <div style={{ position: "sticky", top: "6.5rem", width: "100%", zIndex: 10 }}>
        {/* Morph Header Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7F011F', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Morphing Stage: {stage === 'zoomed' ? '🔍 Zoomed Image View (Scroll to Reveal Details)' : '📜 Full Technical Breakdown'} ({String(projectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')})
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {projects.map((proj, idx) => (
              <span
                key={proj.id}
                onClick={() => { setProjectIndex(idx); setStage('zoomed'); }}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  border: '2px solid #7F011F',
                  background: idx === projectIndex ? '#7F011F' : '#F5EBD0',
                  color: idx === projectIndex ? '#F5EBD0' : '#7F011F',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                {idx + 1}. {proj.title.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Morphing Project Card */}
        <div
          className="glass-card project-card"
          style={{
            background: "#F5EBD0",
            border: "3.5px solid #7F011F",
            borderRadius: "24px",
            padding: "2rem",
            boxShadow: "0 20px 45px rgba(127, 1, 31, 0.22)",
            minHeight: "480px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative"
          }}
          onClick={(e) => {
            if (!e.target.closest('a[target="_blank"]')) setModalProject(currentProject);
          }}
        >
          <AnimatePresence mode="wait">
            {stage === 'zoomed' ? (
              /* STAGE 1: ZOOMED IMAGE HERO VIEW */
              <motion.div
                key={`zoomed-${currentProject.id}`}
                initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '430px',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '3px solid #7F011F',
                  boxShadow: '0 15px 35px rgba(127,1,31,0.25)',
                  cursor: 'pointer'
                }}
              >
                <motion.img
                  src={currentProject.img}
                  alt={currentProject.title}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1.1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.3) 60%, rgba(0,0,0,0) 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2.5rem',
                    color: '#F5EBD0'
                  }}
                >
                  <span style={{ background: '#7F011F', color: '#F5EBD0', fontWeight: 800, padding: '0.35rem 0.9rem', borderRadius: '8px', width: 'fit-content', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.75rem', border: '1.5px solid #F5EBD0' }}>
                    {currentProject.badge}
                  </span>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: 900, fontFamily: 'var(--font-stone)', color: '#F5EBD0', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    {currentProject.title}
                  </h3>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: '#F5EBD0', opacity: 0.9 }}>
                    Scroll down to reveal full technical details & architecture →
                  </p>
                </div>
              </motion.div>
            ) : (
              /* STAGE 2: UNZOOMED DETAILS & PTRL BREAKDOWN VIEW */
              <motion.div
                key={`details-${currentProject.id}`}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.04, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}
              >
                <div style={{ height: '340px', borderRadius: '16px', border: '2.5px solid #7F011F', overflow: 'hidden', position: 'relative' }}>
                  <img src={currentProject.img} alt={currentProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="project-overlay-badge" style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#7F011F', color: '#F5EBD0', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem' }}>
                    {currentProject.badge}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0a0a0a', marginBottom: '1rem', fontFamily: 'var(--font-stone)' }}>
                      {currentProject.title}
                    </h3>
                    <div className="ptrl-summary-list" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {currentProject.ptrl.map((row) => (
                        <div key={row.label} className="ptrl-item" style={{ fontSize: '0.95rem', color: '#0a0a0a', fontWeight: 700 }}>
                          <strong style={{ color: '#7F011F', marginRight: '0.4rem' }}>{row.label}</strong>
                          {row.text}
                        </div>
                      ))}
                    </div>
                    <div className="project-tech-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
                      {currentProject.tags.map((t) => (
                        <span key={t} className="project-tech-tag" style={{ fontWeight: 800 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {currentProject.liveUrl ? (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary"
                        style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 800 }}
                      >
                        Visit Live App (nogirr.vercel.app) →
                      </a>
                    ) : null}
                    <button className="btn-link" style={{ fontWeight: 800 }}>P-T-R-L Details →</button>
                    <a href={currentProject.github} target="_blank" rel="noreferrer" className="btn-link" style={{ fontWeight: 800 }}>
                      GitHub →
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Progress Bar */}
        <div style={{ width: '100%', background: 'rgba(127, 1, 31, 0.15)', height: '6px', borderRadius: '10px', overflow: 'hidden', marginTop: '1.25rem' }}>
          <motion.div
            style={{
              height: '100%',
              background: '#7F011F',
              width: `${((projectIndex * 2 + (stage === 'details' ? 2 : 1)) / (projects.length * 2)) * 100}%`,
              transition: 'width 0.4s ease-out',
            }}
          />
        </div>
      </div>
    </div>
  );
};
