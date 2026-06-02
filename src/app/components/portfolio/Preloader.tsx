import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fonts } from "../../lib/tokens";

interface PreloaderProps {
  onComplete: () => void;
  onRevealStart?: () => void;
}

export function Preloader({ onComplete, onRevealStart }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  const progressBgRef = useRef<HTMLDivElement>(null);

  const logs = [
    "[ OK ] INITIALIZING CORE CONFIG...",
    "[ OK ] ESTABLISHING SUPABASE CHANNEL...",
    "[ OK ] MOUNTING GSAP PHYSICS ENGINE...",
    "[ OK ] CYBER-DECK TERMINAL READIED...",
    "[ OK ] SYSTEM BOOT COMPLETED SUCCESSFULLY.",
  ];

  // Percentage counter animation
  useEffect(() => {
    const duration = 2.4; // seconds
    const intervalTime = 30; // ms
    const totalSteps = (duration * 1000) / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(
        Math.round((currentStep / totalSteps) * 100),
        100
      );
      setProgress(nextProgress);

      // Stagger log lines printing relative to progress directly
      if (nextProgress >= 88) {
        setLogIndex(4);
      } else if (nextProgress >= 65) {
        setLogIndex(3);
      } else if (nextProgress >= 40) {
        setLogIndex(2);
      } else if (nextProgress >= 15) {
        setLogIndex(1);
      } else {
        setLogIndex(0);
      }

      if (nextProgress === 100) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (progress !== 100) return;

    const tl = gsap.timeline({
      delay: 0.35,
      onStart: onRevealStart,
      onComplete: onComplete,
    });

    // Outro animations
    tl.to(progressTextRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .to(
        ".preloader-log",
        {
          opacity: 0,
          y: -10,
          stagger: 0.05,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      .to(
        containerRef.current,
        {
          yPercent: -100,
          skewY: -3,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      // reset skew in viewport
      .to(
        containerRef.current,
        {
          skewY: 0,
          duration: 0.35,
        },
        "-=0.45"
      );
  }, { scope: containerRef, dependencies: [progress] });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#090909] z-[100] flex flex-col justify-between p-8 md:p-12 select-none overflow-hidden"
      style={{ fontFamily: fonts.mono }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-[10px] text-[#6b6b6b] tracking-[0.25em] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#af50ff] animate-ping" />
          <span>SYSTEM: BOOTING</span>
        </div>
        <span>TDU._CN Node // 2026</span>
      </div>

      {/* Centered Percentage */}
      <div className="flex-1 flex flex-col justify-center items-center relative py-12">
        {/* Glow blobs in background */}
        <div className="absolute w-80 h-80 rounded-full bg-[#af50ff]/5 blur-[120px] pointer-events-none" />
        <div className="absolute w-60 h-60 rounded-full bg-[#6c4bd6]/5 blur-[100px] pointer-events-none" />

        <div ref={progressTextRef} className="text-center relative z-10">
          <div
            className="text-[clamp(4.5rem,14vw,11rem)] text-[#f7f9fa] font-light leading-none tracking-tighter cursor-default"
            style={{
              fontVariantNumeric: "stacked-fractions",
              letterSpacing: "-0.05em",
            }}
          >
            {String(progress).padStart(3, "0")}
            <span className="text-[#af50ff] font-medium text-[clamp(1.5rem,5vw,3rem)] ml-1">
              %
            </span>
          </div>
          <div className="h-1.5 w-64 md:w-80 bg-white/5 rounded-full mt-6 overflow-hidden mx-auto border border-white/[0.04]">
            <div
              className="h-full bg-gradient-to-r from-[#6c4bd6] to-[#af50ff] rounded-full shadow-[0_0_15px_rgba(175,80,255,0.7)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom boot logs */}
      <div className="text-left space-y-1.5 h-36 max-w-lg">
        {logs.slice(0, logIndex + 1).map((log, index) => (
          <div
            key={index}
            className={`preloader-log text-[11px] font-medium tracking-wide flex items-center gap-2 ${
              index === logs.length - 1 ? "text-[#af50ff]" : "text-[#8b8b8b]"
            }`}
          >
            <span className="text-[#af50ff]/80">❯</span>
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
