import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { manifestoContent } from "../../data/manifesto";
import { Typography } from "@/shared/ui";

gsap.registerPlugin(ScrollTrigger);

export function ManifestoSection() {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

    // Animate glowing line
    tl.fromTo(".manifesto-line", 
      { height: "0%" },
      { height: "100%", duration: 1 }
    );

    // Parallax floating orbs
    gsap.to(".parallax-orb", {
      y: (i) => -150 * (i + 1),
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });
    
    // Grid lines parallax
    gsap.to(".parallax-grid", {
      y: 100,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      }
    });

  }, { scope: container });

  return (
    <section ref={container} className="py-28 md:py-40 relative overflow-hidden bg-midnight">
      {/* Background Layers */}
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="absolute inset-0 noise-overlay opacity-40" />
      
      {/* Layer 1: Parallax Grid */}
      <div 
        className="parallax-grid absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(var(--color-cosmic-violet-a) 1px, transparent 1px), linear-gradient(90deg, var(--color-cosmic-violet-a) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: "perspective(500px) rotateX(60deg) scale(2)",
          transformOrigin: "top"
        }}
      />

      {/* Layer 2: Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="parallax-orb absolute rounded-full bg-violet blur-[60px] opacity-20"
            style={{
              width: `${150 + (i * 20)}px`,
              height: `${150 + (i * 20)}px`,
              left: `${10 + (i * 15)}%`,
              top: `${50 + (i * 5)}%`,
            }}
          />
        ))}
      </div>

      {/* Interactive Element: Glowing Line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-whisper/10 z-20">
        <div className="manifesto-line absolute top-0 w-full bg-gradient-to-b from-transparent via-violet to-deep-violet box-glow-violet origin-top" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-12 md:px-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-strong mb-10">
          <Sparkles size={11} className="text-violet animate-flicker" />
          <Typography
            as="span"
            variant="monoEyebrow"
            className="!text-[10px] text-ghost/70 !tracking-[0.24em] uppercase"
          >
            {manifestoContent.eyebrow}
          </Typography>
        </div>

        <Typography
          as="blockquote"
          variant="display"
          className="text-whisper !text-[clamp(2rem,5.6vw,4.35rem)] !leading-[1.16] !tracking-[-0.035em] font-light overflow-visible text-balance"
        >
          <span className="block pb-1">{manifestoContent.quotePart1}</span>
          <span className="block pb-2 gradient-text-violet italic font-normal overflow-visible">
            {manifestoContent.quoteItalic}
          </span>
          <span className="block pb-1">{manifestoContent.quotePart2}</span>
        </Typography>

        <Typography
          variant="body"
          color="ghost"
          className="mt-12 max-w-md mx-auto opacity-70 !text-[1.1rem] !leading-[1.6]"
        >
          {manifestoContent.paragraph}
        </Typography>
        
        <div className="mt-16 pt-8 border-t border-whisper/10 max-w-xs mx-auto">
          <p className="font-display italic text-violet opacity-80 text-xl tracking-wider">
            — Tam Duc, 2026
          </p>
        </div>
      </div>
    </section>
  );
}
