import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollZoomSection:
 * Wraps any section (e.g. About Me or Featured Showcase) so that as the user scrolls
 * down from the landing page, the section smoothly zooms in from a framed card (scale ~0.65)
 * into a full-screen view (scale 1.0) with border-radius transition.
 */
export const ScrollZoomSection = ({ children, id, className = "" }) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.72, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.9], [32, 0]);
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.9], [0.25, 0]);

  return (
    <div ref={containerRef} id={id} className={`relative w-full overflow-hidden ${className}`} style={{ background: "#F5EBD0" }}>
      <motion.div
        style={{
          scale,
          borderRadius,
          boxShadow: "0 20px 40px rgba(127, 1, 31, 0.2)",
          borderColor: "#7F011F",
          background: "#F5EBD0",
        }}
        className="w-full h-full overflow-hidden border-2"
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * ScrollZoomCard:
 * A scroll-driven zoom card designed specifically for high-impact transitions.
 * As the user scrolls, the card zooms into full screen with a headline and byline.
 */
export const ScrollZoomCard = ({
  headline = "ABOUT SURIYA RAJA",
  subhead = "01 / INTRODUCTION",
  byline = "2nd Year B.Tech CSE · Lovely Professional University",
  children,
}) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const scale = useTransform(scrollYProgress, [0, 0.65], [0.65, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.65], [28, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh]" style={{ background: "#F5EBD0" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Zooming content frame */}
        <motion.div
          style={{ scale, borderRadius }}
          className="absolute inset-0 overflow-hidden border-2 shadow-2xl bg-[#F5EBD0]"
          style={{ scale, borderRadius, borderColor: "#7F011F" }}
        >
          <div className="w-full h-full flex flex-col justify-center items-center p-6 md:p-12">
            {children}
          </div>
        </motion.div>

        {/* Scroll hint overlay before zoom */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center pointer-events-none px-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#7F011F" }} />
            <span className="text-xs font-mono tracking-[0.3em] uppercase font-bold" style={{ color: "#7F011F" }}>
              {subhead}
            </span>
            <div className="h-px w-8" style={{ background: "#7F011F" }} />
          </div>
          <h2
            className="font-black tracking-tighter uppercase text-black"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "#0a0a0a" }}
          >
            {headline}
          </h2>
          <p className="mt-4 text-xs font-mono tracking-widest uppercase font-bold" style={{ color: "#7F011F" }}>
            {byline}
          </p>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 text-[11px] font-mono tracking-[0.3em] uppercase z-30 font-bold pointer-events-none"
          style={{ color: "#7F011F" }}
        >
          Scroll to zoom into profile ↓
        </motion.p>
      </div>
    </div>
  );
};
