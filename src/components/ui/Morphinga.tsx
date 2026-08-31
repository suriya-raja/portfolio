"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Project {
    id: string;
    title: string;
    badge: string;
    img: string;
    tags: string[];
    liveUrl: string | null;
    github: string;
    ptrl: { label: string; text: string }[];
}

interface MorphingaProjectsProps {
    projects: Project[];
    onProjectClick?: (project: Project) => void;
}

export function MorphingaProjects({ projects, onProjectClick }: MorphingaProjectsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Each project takes up 1/4 of the scroll range
    // Active project transitions every 25% scroll
    const activeIndex = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], [0, 1, 2, 3, 3]);

    return (
        <div
            ref={containerRef}
            style={{ position: "relative", height: `${projects.length * 100}vh` }}
        >
            <div style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "#F5EBD0",
            }}>
                {/* Left: Morphing Image Stack */}
                <div style={{
                    position: "relative",
                    width: "48%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    {projects.map((project, i) => (
                        <ProjectImageCard
                            key={project.id}
                            project={project}
                            index={i}
                            total={projects.length}
                            smoothProgress={smoothProgress}
                        />
                    ))}
                </div>

                {/* Right: Content Panel */}
                <div style={{
                    width: "48%",
                    padding: "2rem 2.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    position: "relative",
                }}>
                    {projects.map((project, i) => (
                        <ProjectContent
                            key={project.id}
                            project={project}
                            index={i}
                            total={projects.length}
                            smoothProgress={smoothProgress}
                            onProjectClick={onProjectClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProjectImageCard({
    project,
    index,
    total,
    smoothProgress,
}: {
    project: Project;
    index: number;
    total: number;
    smoothProgress: ReturnType<typeof useSpring>;
}) {
    const segStart = index / total;
    const segEnd = (index + 1) / total;

    const scale = useTransform(
        smoothProgress,
        [segStart, Math.min(segEnd, 1)],
        [1, 0.88]
    );
    const opacity = useTransform(
        smoothProgress,
        [
            Math.max(0, segStart - 0.05),
            segStart,
            Math.min(segEnd - 0.05, 0.99),
            Math.min(segEnd, 1)
        ],
        [0, 1, 1, index === total - 1 ? 1 : 0]
    );
    const y = useTransform(
        smoothProgress,
        [Math.max(0, segStart - 0.05), segStart],
        [40, 0]
    );
    const borderRadius = useTransform(
        smoothProgress,
        [segStart, Math.min(segEnd, 1)],
        ["16px", "28px"]
    );

    return (
        <motion.div
            style={{
                scale,
                opacity,
                y,
                borderRadius,
                position: "absolute",
                width: "90%",
                height: "70vh",
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
                border: "3px solid #7F011F",
                cursor: "pointer",
            }}
            onClick={() => {}}
        >
            <img
                src={project.img}
                alt={project.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.background = "linear-gradient(135deg, #7F011F 0%, #2a0008 100%)";
                    t.style.display = "block";
                }}
            />
            {/* Overlay gradient */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(127,1,31,0.7) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }} />
            {/* Badge */}
            <div style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                background: "#7F011F",
                color: "#F5EBD0",
                fontSize: "0.72rem",
                fontWeight: 800,
                padding: "0.3rem 0.85rem",
                borderRadius: "30px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
            }}>{project.badge}</div>
            {/* Project number */}
            <div style={{
                position: "absolute",
                bottom: "1.5rem",
                right: "1.5rem",
                fontSize: "3rem",
                fontWeight: 900,
                color: "rgba(245,235,208,0.15)",
                letterSpacing: "-0.05em",
                userSelect: "none",
            }}>0{index + 1}</div>
        </motion.div>
    );
}

function ProjectContent({
    project,
    index,
    total,
    smoothProgress,
    onProjectClick,
}: {
    project: Project;
    index: number;
    total: number;
    smoothProgress: ReturnType<typeof useSpring>;
    onProjectClick?: (project: Project) => void;
}) {
    const segStart = index / total;
    const segEnd = (index + 1) / total;

    const opacity = useTransform(
        smoothProgress,
        [
            Math.max(0, segStart - 0.05),
            segStart,
            Math.min(segEnd - 0.05, 0.99),
            Math.min(segEnd, 1)
        ],
        [0, 1, 1, index === total - 1 ? 1 : 0]
    );
    const x = useTransform(
        smoothProgress,
        [Math.max(0, segStart - 0.08), segStart],
        [60, 0]
    );

    return (
        <motion.div
            style={{
                opacity,
                x,
                position: "absolute",
                width: "100%",
                pointerEvents: opacity.get() > 0.5 ? "auto" : "none",
            }}
        >
            {/* Step indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
                {Array.from({ length: total }).map((_, i) => (
                    <div key={i} style={{
                        width: i === index ? "2rem" : "0.5rem",
                        height: "3px",
                        background: i === index ? "#7F011F" : "rgba(127,1,31,0.25)",
                        borderRadius: "2px",
                        transition: "width 0.3s ease",
                    }} />
                ))}
                <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "#7F011F", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {index + 1} / {total}
                </span>
            </div>

            {/* Title */}
            <h3 style={{
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 900,
                color: "#0a0a0a",
                lineHeight: 1.2,
                marginBottom: "1.2rem",
                letterSpacing: "-0.02em",
            }}>{project.title}</h3>

            {/* PTRL breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "1.5rem" }}>
                {project.ptrl.map((row) => (
                    <div key={row.label} style={{
                        display: "flex",
                        gap: "0.6rem",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        color: "#3a3a3a",
                    }}>
                        <strong style={{ color: "#7F011F", fontWeight: 800, minWidth: "70px", flexShrink: 0 }}>{row.label}</strong>
                        <span>{row.text}</span>
                    </div>
                ))}
            </div>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.8rem" }}>
                {project.tags.map((t) => (
                    <span key={t} style={{
                        fontSize: "0.72rem",
                        fontWeight: 800,
                        padding: "0.25rem 0.7rem",
                        borderRadius: "20px",
                        border: "1.5px solid #7F011F",
                        color: "#7F011F",
                        background: "transparent",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}>{t}</span>
                ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", alignItems: "center" }}>
                {project.liveUrl && (
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            padding: "0.55rem 1.2rem",
                            background: "#7F011F",
                            color: "#F5EBD0",
                            borderRadius: "8px",
                            fontSize: "0.8rem",
                            fontWeight: 800,
                            textDecoration: "none",
                            letterSpacing: "0.03em",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        Visit Live App →
                    </a>
                )}
                <button
                    style={{
                        padding: "0.55rem 1.2rem",
                        background: "transparent",
                        color: "#7F011F",
                        border: "2px solid #7F011F",
                        borderRadius: "8px",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        cursor: "pointer",
                        letterSpacing: "0.03em",
                    }}
                    onClick={() => onProjectClick?.(project)}
                >
                    P-T-R-L Details →
                </button>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "0.8rem", fontWeight: 800, color: "#7F011F", textDecoration: "none" }}
                    onClick={(e) => e.stopPropagation()}
                >
                    GitHub →
                </a>
            </div>
        </motion.div>
    );
}
