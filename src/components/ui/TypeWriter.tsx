"use client";

import React, { useState, useEffect } from "react";

export interface TypeWriterProps {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDelay?: number;
  loop?: boolean;
  className?: string;
  cursorChar?: string;
  cursorColor?: string;
  cursorClassName?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
  prefix?: string;
}

export const TypeWriter = ({
  words = ["Design.", "Build.", "Ship.", "Scale."],
  typingSpeed = 75,
  deletingSpeed = 35,
  pauseDelay = 2000,
  loop = true,
  className = "",
  cursorChar = "|",
  cursorColor = "#7F011F",
  cursorClassName = "",
  as: Component = "span",
  style = {},
  prefix = "",
}: TypeWriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const targetWord = words[currentWordIndex % words.length];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (!loop && currentWordIndex === words.length - 1) {
          return;
        }
        setIsDeleting(true);
      }, pauseDelay);
      return () => clearTimeout(pauseTimer);
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetWord.length) {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [
    currentText,
    isDeleting,
    isPaused,
    currentWordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
    loop,
  ]);

  return (
    <Component
      className={`uilora-typewriter-container ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "1.25em",
        ...style,
      }}
    >
      <style>{`
        @keyframes twBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .uilora-tw-cursor {
          animation: twBlink 0.9s step-end infinite;
          font-weight: 700;
          user-select: none;
          line-height: 1;
        }
      `}</style>
      {prefix && <span className="uilora-tw-prefix mr-2">{prefix}</span>}
      <span className="uilora-tw-text">{currentText}</span>
      <span
        className={`uilora-tw-cursor ${cursorClassName}`}
        style={{
          color: cursorColor,
          marginLeft: "3px",
        }}
        aria-hidden="true"
      >
        {cursorChar}
      </span>
    </Component>
  );
};

export default TypeWriter;
