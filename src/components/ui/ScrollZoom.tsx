import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const ScrollZoom = ({
  accentColor = "#7F011F",
  image = "/assets/images/project-cloth.png",
  headline = "Every line of code, intentional.",
  byline = "SURIYA RAJA — PORTFOLIO 2026",
}) => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const scale = useTransform(scrollYProgress, [0, 0.7], [0.6, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.65], [24, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.72, 0.92], [30, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh]" style={{ background: "#F5EBD0" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* Zooming image */}
        <motion.div
          style={{ scale, borderRadius }}
          className="absolute inset-0 overflow-hidden shadow-2xl border-2"
          style={{ scale, borderRadius, borderColor: "#7F011F" }}
        >
          <img
            src={image}
            alt="Showcase Preview"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.9) contrast(1.05)" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(245,235,208,0.55) 0%, transparent 40%, rgba(245,235,208,0.75) 100%)",
            }}
          />
        </motion.div>

        {/* Headline — fades out as zoom progresses */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: "#7F011F" }} />
            <span
              className="text-xs font-mono tracking-[0.32em] uppercase font-bold"
              style={{ color: "#7F011F" }}
            >
              Interactive Showcase
            </span>
            <div className="h-px w-10" style={{ background: "#7F011F" }} />
          </div>
          <h2
            className="font-black tracking-[-0.03em] leading-[0.92] uppercase"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: "#0a0a0a" }}
          >
            {headline.split(", ").map((part, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <br />}
                <span style={{ color: idx % 2 === 1 ? "#7F011F" : "#0a0a0a" }}>
                  {part}
                </span>
              </React.Fragment>
            ))}
          </h2>
        </motion.div>

        {/* Byline — fades in after zoom completes */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="absolute bottom-14 flex flex-col items-center z-10"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase font-bold" style={{ color: "#0a0a0a" }}>
            {byline}
          </p>
          <div className="mt-3 h-px w-20" style={{ background: "#7F011F" }} />
        </motion.div>

        {/* Scroll hint */}
        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 text-[11px] font-mono tracking-[0.3em] uppercase z-20 font-bold"
          style={{ color: "#7F011F" }}
        >
          Scroll to zoom inside project →
        </motion.p>
      </div>
    </div>
  );
};
