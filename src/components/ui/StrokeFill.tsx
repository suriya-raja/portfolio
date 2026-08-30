"use client";

import React from "react";
import { motion } from "framer-motion";

interface StrokeFillHeadingProps {
    text: string;
    strokeColor?: string;
    fillColor?: string;
    duration?: number;
    className?: string;
    viewBox?: string;
    fontSize?: string;
}

export const StrokeFillHeading = ({
    text,
    strokeColor = "#7F011F",
    fillColor = "#0a0a0a",
    duration = 2.2,
    className = "",
    viewBox = "0 0 800 120",
    fontSize = "5.5rem",
}: StrokeFillHeadingProps) => {
    return (
        <div className={`w-full overflow-hidden flex items-center justify-center ${className}`}>
            <svg viewBox={viewBox} className="w-full h-auto max-h-[160px]">
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="2.5"
                    stroke={strokeColor}
                    style={{ fontFamily: "var(--font-stone)", fontSize }}
                    className="font-[900] uppercase tracking-wider fill-transparent"
                    initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                    whileInView={{ strokeDashoffset: 0, fill: fillColor }}
                    viewport={{ once: false }}
                    transition={{
                        duration,
                        ease: "easeInOut",
                        fill: { delay: duration * 0.5, duration: duration * 0.4, ease: "easeIn" },
                    }}
                >
                    {text}
                </motion.text>
            </svg>
        </div>
    );
};

export const StrokeFill = ({
    text = "Elegance",
    duration = 2.5,
    fillColor = "#0a0a0a",
    strokeColor = "#7F011F",
}: {
    text?: string;
    duration?: number;
    fillColor?: string;
    strokeColor?: string;
}) => {
    return (
        <StrokeFillHeading text={text} duration={duration} fillColor={fillColor} strokeColor={strokeColor} />
    );
};
