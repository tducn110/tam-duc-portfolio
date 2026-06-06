import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { colorMap } from "@/shared/lib/tokens";
import { proofItems } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "../../data/sections";
import { Typography } from "@/shared/ui";
import { iconMap } from "../../lib/iconMap";
import { isLighthouseEnv } from "../../lib/env";

export function ProofStrip() {
  const container = useRef<HTMLDivElement>(null);
  
  // Duplicate more for smooth infinite scroll
  const duplicatedItems = [...proofItems, ...proofItems, ...proofItems, ...proofItems];
  // Split items for two rows
  const half = Math.ceil(proofItems.length / 2);
  const row1Items = proofItems.slice(0, half);
  const row2Items = proofItems.slice(half);
  const duplicatedRow1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const duplicatedRow2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items, ...row2Items];

  useGSAP(() => {
    if (isLighthouseEnv) return;
    // Row 1: left to right
    gsap.to(".marquee-row-1", {
      xPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });
    
    // Row 2: right to left
    gsap.to(".marquee-row-2", {
      xPercent: 50,
      ease: "none",
      duration: 40,
      repeat: -1,
    });
  }, { scope: container });

  const renderItem = (item: any, index: number) => {
    const c = colorMap[item.color as keyof typeof colorMap];
    const Icon = iconMap[item.iconName as keyof typeof iconMap];
    if (!Icon) return null;
    return (
      <div
        key={`${item.label}-${index}`}
        className={`group inline-flex items-center gap-2.5 px-4 py-2 rounded-full border ${c.border} ${c.bg} whitespace-nowrap flex-shrink-0 cursor-default hover:scale-105 transition-transform duration-300 ease-out ${!isLighthouseEnv ? 'backdrop-blur-md' : ''}`}
        style={{ boxShadow: `0 4px 12px ${c.bg.replace('bg-[', '').replace(']', '')}` }}
      >
        <Icon size={14} className={`${c.text} group-hover:animate-pulse`} />
        <Typography
          as="span"
          variant="monoEyebrow"
          className={`!text-[11px] ${c.text} !tracking-[0.1em] uppercase font-bold`}
        >
          {item.label}
        </Typography>
      </div>
    );
  };

  return (
    <section ref={container} className={`relative z-10 overflow-hidden bg-midnight/80 border-y border-whisper/10 ${!isLighthouseEnv ? 'backdrop-blur-xl' : ''}`}>
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-midnight to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-midnight to-transparent z-20 pointer-events-none" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 scanlines opacity-50 z-20 pointer-events-none" />
      
      <div className="relative py-6 flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex items-center gap-6 w-max marquee-row-1">
          {duplicatedRow1.map((item, index) => renderItem(item, index))}
        </div>
        
        {/* Row 2 (Starts offset to left so it can animate right) */}
        <div className="flex items-center gap-6 w-max marquee-row-2" style={{ transform: "translateX(-50%)" }}>
          {duplicatedRow2.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </section>
  );
}
