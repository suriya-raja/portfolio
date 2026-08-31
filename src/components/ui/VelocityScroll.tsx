"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useScroll, useVelocity, useSpring, useTransform, useAnimationFrame } from "framer-motion";

interface VelocityScrollProps {
    texts?: [string, string];
    baseVelocity?: number;
    backgroundColor?: string;
    textColor?: string;
    /** Compact mode reduces vertical padding */
    compact?: boolean;
    /** Color for the second row (optional, defaults to textColor) */
    textColor2?: string;
}

const ParallaxText = ({
    children,
    baseVelocity = 3,
    textColor = "#7F011F",
    compact = false,
}: {
    children: string;
    baseVelocity: number;
    textColor?: string;
    compact?: boolean;
}) => {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
    const x = useTransform(baseX, (v) => `${((v % 100) + 100) % 100 - 50}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((_, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        if (velocityFactor.get() < 0) directionFactor.current = -1;
        else if (velocityFactor.get() > 0) directionFactor.current = 1;
        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div style={{
            overflow: "hidden",
            margin: 0,
            whiteSpace: "nowrap",
            display: "flex",
            flexWrap: "nowrap",
            width: "100%",
        }}>
            <motion.div
                style={{
                    x,
                    fontWeight: 900,
                    fontSize: compact ? "clamp(1.8rem, 4vw, 3.2rem)" : "clamp(2.5rem, 6vw, 5rem)",
                    letterSpacing: "-0.03em",
                    textTransform: "uppercase",
                    display: "flex",
                    whiteSpace: "nowrap",
                    color: textColor,
                    WebkitTextStroke: `1px ${textColor}`,
                }}
            >
                {[0, 1, 2, 3, 4].map((k) => (
                    <span key={k} style={{ display: "block", marginRight: "2.5rem" }}>{children}&nbsp;</span>
                ))}
            </motion.div>
        </div>
    );
};

export const VelocityScroll = ({
    texts = ["Suriya Raja", "BTech CSE AI & ML"],
    baseVelocity = 3,
    backgroundColor = "#F5EBD0",
    textColor = "#7F011F",
    compact = false,
    textColor2,
}: VelocityScrollProps) => {
    const row2Color = textColor2 ?? textColor;
    return (
        <div style={{
            width: "100%",
            padding: compact ? "2rem 0" : "3.5rem 0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor,
            gap: compact ? "0.75rem" : "1.25rem",
            overflow: "hidden",
            borderTop: "1.5px solid #7F011F",
            borderBottom: "1.5px solid #7F011F",
        }}>
            <ParallaxText baseVelocity={-baseVelocity} textColor={textColor} compact={compact}>{texts[0]}</ParallaxText>
            <ParallaxText baseVelocity={baseVelocity} textColor={row2Color} compact={compact}>{texts[1]}</ParallaxText>
        </div>
    );
};
