import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export const MorphingProjectScroll = ({ projects, setModalProject }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rawIdx = useTransform(
    scrollYProgress,
    [0, 0.28, 0.58, 0.88],
    [0, 1, 2, 3]
  );

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    return rawIdx.on("change", (latest) => {
      const clamped = Math.min(projects.length - 1, Math.max(0, Math.round(latest)));
      setActiveIdx(clamped);
    });
  }, [rawIdx, projects.length]);

  const p = projects[activeIdx] || projects[0];

  return (
    <div ref={containerRef} className="relative w-full" style={{ minHeight: "260vh" }}>
      <div className="sticky top-24 w-full">
        {/* Scroll Morph Header Indicator */}
        <div className="flex items-center justify-between mb-4 px-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-extrabold tracking-widest text-[#7F011F] uppercase" style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7F011F', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Morphing Scroll ({String(activeIdx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")})
            </span>
          </div>

          {/* Morphing Project Title Indicator Pills */}
          <div className="hidden sm:flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
            {projects.map((proj, idx) => (
              <span
                key={proj.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: idx === activeIdx ? '#7F011F' : '#F5EBD0',
                  color: idx === activeIdx ? '#F5EBD0' : '#7F011F',
                  border: '2px solid #7F011F',
                }}
              >
                {idx + 1}. {proj.title.split(" ")[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Morphing Card Wrapper */}
        <div
          className="glass-card project-card relative overflow-hidden"
          style={{
            background: "#F5EBD0",
            border: "3.5px solid #7F011F",
            borderRadius: "24px",
            padding: "2.5rem",
            boxShadow: "0 20px 45px rgba(127, 1, 31, 0.22)",
          }}
          onClick={(e) => {
            if (!e.target.closest('a[target="_blank"]')) setModalProject(p);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)", y: 15 }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
              exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)", y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}
            >
              {/* Morphing Image Frame */}
              <motion.div
                layoutId={`img-${p.id}`}
                className="relative overflow-hidden rounded-2xl border-2 border-[#7F011F]"
                style={{ height: "340px", position: 'relative', borderRadius: '16px', border: '2.5px solid #7F011F', overflow: 'hidden' }}
              >
                <motion.img
                  src={p.img}
                  alt={p.title}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <span
                  className="project-overlay-badge"
                  style={{ position: 'absolute', top: '1rem', left: '1rem', background: "#7F011F", color: "#F5EBD0", fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem' }}
                >
                  {p.badge}
                </span>
              </motion.div>

              {/* Morphing Content Details */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <motion.h3
                    layoutId={`title-${p.id}`}
                    style={{ fontSize: "1.8rem", fontWeight: 900, color: "#0a0a0a", marginBottom: "1rem", fontFamily: "var(--font-stone)" }}
                  >
                    {p.title}
                  </motion.h3>

                  <div className="ptrl-summary-list" style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {p.ptrl.map((row) => (
                      <div key={row.label} className="ptrl-item" style={{ fontSize: "0.95rem", color: "#0a0a0a", fontWeight: 700 }}>
                        <strong style={{ color: "#7F011F", marginRight: "0.4rem" }}>{row.label}</strong>
                        {row.text}
                      </div>
                    ))}
                  </div>

                  <div className="project-tech-tags" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
                    {p.tags.map((t) => (
                      <span key={t} className="project-tech-tag" style={{ fontWeight: 800 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="project-actions" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  {p.liveUrl ? (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-primary"
                      style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem", fontWeight: 800 }}
                    >
                      Visit Live App (nogirr.vercel.app) →
                    </a>
                  ) : null}
                  <button className="btn-link" style={{ fontWeight: 800 }}>P-T-R-L Details →</button>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-link"
                    style={{ fontWeight: 800 }}
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Morph Visual Progress Bar */}
        <div style={{ width: "100%", background: "rgba(127, 1, 31, 0.15)", height: "6px", borderRadius: "10px", overflow: "hidden", marginTop: "1.25rem" }}>
          <motion.div
            style={{
              height: "100%",
              background: "#7F011F",
              width: `${((activeIdx + 1) / projects.length) * 100}%`,
              transition: "width 0.4s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};
