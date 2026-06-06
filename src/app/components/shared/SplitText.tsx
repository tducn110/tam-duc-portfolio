import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  variant?: "reveal-up" | "blur-reveal" | "stagger-bounce" | "interactive";
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number;
}

export function SplitText({
  children,
  className = "",
  style = {},
  variant = "reveal-up",
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".split-char");
    if (!chars.length) return;

    if (variant === "reveal-up" || variant === "interactive") {
      // Set initial styles
      gsap.set(chars, { y: "100%", opacity: 0 });
      
      gsap.to(chars, {
        y: "0%",
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "power4.out",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    } else if (variant === "blur-reveal") {
      gsap.set(chars, { filter: "blur(12px)", opacity: 0, scale: 0.8, y: 10 });

      gsap.to(chars, {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        y: 0,
        duration: duration * 1.2,
        stagger: stagger * 1.5,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    } else if (variant === "stagger-bounce") {
      gsap.set(chars, { y: 30, opacity: 0 });

      gsap.to(chars, {
        y: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: "back.out(1.7)",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }
  }, { scope: containerRef, dependencies: [variant, delay, duration, stagger] });

  // Handle letter hover for the interactive variant
  const handleCharMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (variant !== "interactive") return;
    const char = e.currentTarget;
    gsap.to(char, {
      y: -8,
      scale: 1.25,
      color: "#af50ff",
      textShadow: "0 0 10px rgba(175, 80, 255, 0.6)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCharMouseLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (variant !== "interactive") return;
    const char = e.currentTarget;
    gsap.to(char, {
      y: 0,
      scale: 1,
      color: "inherit",
      textShadow: "none",
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const words = children.split(" ");

  return (
    <span
      ref={containerRef}
      className={`inline-block ${className}`}
      style={{
        ...style,
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {words.map((word, wordIdx) => (
        <span
          key={wordIdx}
          className="inline-block whitespace-nowrap overflow-hidden"
          style={{ marginRight: "0.25em", verticalAlign: "bottom" }}
        >
          {word.split("").map((char, charIdx) => (
            <span
              key={charIdx}
              className="split-char inline-block will-change-transform select-none"
              style={{
                display: "inline-block",
                transformOrigin: "bottom center",
              }}
              onMouseEnter={handleCharMouseEnter}
              onMouseLeave={handleCharMouseLeave}
            >
              {char}
            </span>
          ))}
          {/* Keep space between words */}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}
