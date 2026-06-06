import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Github, Mail, ChevronDown, Zap } from "lucide-react";
import { colorMap, gradients } from "@/shared/lib/tokens";
import { links } from "../../lib/links";
import { heroBadges } from "@/features/portfolio/data/portfolio.data";
import { heroContent } from "../../data/hero";
import { Chip } from "@/shared/ui";
import { SplitText } from "../shared/SplitText";
import { Magnetic } from "../shared/Magnetic";
import { Container, Surface, Typography } from "@/shared/ui";
import { isLighthouseEnv } from "../../lib/env";

const roles = ["AI-native developer", "Full-stack engineer", "Creative technologist", "UI/UX hacker"];

export function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    if (isLighthouseEnv) return;
    
    let timer: NodeJS.Timeout;
    const activeRole = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setTypingSpeed(35);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(activeRole.slice(0, currentText.length + 1));
        setTypingSpeed(75);
      }, typingSpeed);
    }

    if (!isDeleting && currentText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      setTypingSpeed(180);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  useGSAP(() => {
    if (isLighthouseEnv) return;
    
    const tl = gsap.timeline();
    
    // Initial reveals
    tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".identity-panel", { opacity: 0, scale: 0.94, xPercent: -50, yPercent: -50 }, { opacity: 1, scale: 1, xPercent: -50, yPercent: -50, duration: 1, ease: "power4.out" }, "-=0.8");

    // Parallax on scroll
    gsap.to(".cosmic-blob-1", {
      y: 150,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
      }
    });

    gsap.to(".cosmic-blob-2", {
      y: -100,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    gsap.to(".hero-left-content", {
      y: -50,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.2,
      }
    });

    gsap.to(".identity-panel", {
      y: 80,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      }
    });
    
    // Floating animation for the scroll icon
    gsap.to(".scroll-icon", {
      y: 8,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power1.inOut"
    });

  }, { scope: container });

  return (
    <section
      ref={container}
      className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-16 md:pb-12"
      style={{ background: gradients.hero }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-whisper"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              opacity: 0.3 + ((i * 13) % 60) / 100,
              animationDelay: `${(i % 7) * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className={`cosmic-blob-1 absolute top-20 -left-32 w-[520px] h-[520px] rounded-full bg-cosmic-a/25 pointer-events-none ${!isLighthouseEnv ? 'blur-[140px]' : ''}`} />
      <div className={`cosmic-blob-2 absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-violet/20 pointer-events-none ${!isLighthouseEnv ? 'blur-[130px]' : ''}`} />

      <Container className="relative z-10 grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-16 items-center">
        <div className="hero-left-content">
          <Surface variant="frostStrong" padding="none" className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 shadow-[0_0_20px_rgba(175,80,255,0.2)] border-violet/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet" />
            </span>
            <Typography variant="monoEyebrow" className="!text-[11px] text-ghost/90">
              {heroContent.badge}
            </Typography>
          </Surface>

          <Typography
            as="h1"
            variant="display"
            className="hero-title mb-6 block !text-[clamp(2.2rem,6.8vw,4.8rem)] !leading-[1.0] !tracking-[-0.04em]"
          >
            <span className="font-mono text-neon-glow-violet text-[0.85em] font-normal text-violet tracking-[-0.02em]">
              {isLighthouseEnv ? roles[0] : currentText}
              {!isLighthouseEnv && <span className="animate-pulse duration-75 text-violet">|</span>}
            </span>
            <br />
            <span className="inline-block mt-1">
              <span className="text-ghost/75 mr-4 font-light select-none font-sans">{heroContent.titleWith}</span>
              <span className="relative inline-block font-display italic font-regular">
                <span className="text-violet drop-shadow-[0_0_15px_rgba(175,80,255,0.45)]">
                  {isLighthouseEnv ? (
                    heroContent.titlePart2
                  ) : (
                    <SplitText variant="interactive" stagger={0.03} duration={0.8} delay={0.25}>
                      {heroContent.titlePart2}
                    </SplitText>
                  )}
                </span>
              </span>
            </span>
          </Typography>

          <Typography
            variant="body"
            color="ghost"
            className="hero-desc mb-10 opacity-65 text-shadow-sm max-w-[50ch] !text-[1.05rem] !leading-[1.6]"
          >
            {heroContent.descPart1}
            <span className="font-display italic font-regular text-violet drop-shadow-md">
              {heroContent.descHighlight}
            </span>
            {heroContent.descPart2}
          </Typography>

          <div className="hero-actions flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-violet text-midnight text-[13px] font-bold hover:scale-[1.02] transition-all duration-300 violet-glow"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2 font-sans tracking-[0.02em]">
                  {heroContent.ctaProjects}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub Profile"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl frost-strong text-whisper text-[13px] hover:bg-white/5 border border-white/20 hover:border-violet/50 transition-all duration-300 hover:scale-[1.02] font-sans font-medium"
              >
                <Github size={14} className="group-hover:text-violet transition-colors" /> {heroContent.ctaGithub}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-ghost hover:text-violet text-[13px] transition-colors hover:bg-white/5 font-sans font-medium"
              >
                <Mail size={14} /> {heroContent.ctaContact}
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="relative hidden md:block min-h-[540px] perspective-[1000px] overflow-visible">
          <Surface
            variant="glow"
            className={`identity-panel absolute top-1/2 left-1/2 w-80 z-10 shadow-2xl ${!isLighthouseEnv ? 'backdrop-blur-2xl' : ''}`}
            style={{ borderRadius: "24px", transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-whisper/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet shadow-[0_0_8px_#af50ff]" />
                <span className="w-2.5 h-2.5 rounded-full bg-cosmic-a" />
                <span className="w-2.5 h-2.5 rounded-full bg-steel" />
              </div>
              <Typography variant="monoEyebrow" className="!text-[10px] text-[#8b8b8b] !tracking-[0.25em]">
                {heroContent.panelHeader}
              </Typography>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative group">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-whisper text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110 font-display italic tracking-[-0.04em]"
                  style={{
                    background: "linear-gradient(135deg, #af50ff 0%, #6c4bd6 60%, #401860 100%)",
                  }}
                >
                  TD
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-violet flex items-center justify-center ring-4 ring-midnight shadow-md animate-pulse">
                  <Zap size={12} className="text-whisper" fill="currentColor" />
                </div>
              </div>
              <div>
                <div className="text-whisper text-lg mb-0.5 font-display italic font-medium tracking-[-0.02em]">
                  {heroContent.panelName}
                </div>
                <Typography variant="monoEyebrow" className="!text-[11px] text-[#8b8b8b] !tracking-[0.1em] lowercase">
                  {heroContent.panelHandle}
                </Typography>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {heroContent.panelStats.map((s) => {
                const c = colorMap[s.c as keyof typeof colorMap];
                return (
                  <div
                    key={s.l}
                    className={`rounded-xl ${c.bg} border ${c.border} p-3 text-center backdrop-blur-md shadow-sm hover:translate-y-[-2px] transition-transform`}
                  >
                    <Typography variant="monoEyebrow" className="!text-[9px] text-[#8b8b8b] mb-1.5 !tracking-[0.2em]">
                      {s.l}
                    </Typography>
                    <div className={`text-base ${c.text} font-display italic font-medium`}>
                      {s.v}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-xl p-4 border border-violet/40 shadow-[inset_0_0_20px_rgba(175,80,255,0.1)]"
              style={{ background: gradients.cosmicB }}
            >
              <Typography variant="monoEyebrow" className="!text-[10px] text-ghost/80 mb-2 !tracking-[0.22em] font-medium normal-case">
                {heroContent.panelClassLabel}
              </Typography>
              <div className="text-[16px] mb-3 text-whisper drop-shadow-md font-display italic font-medium">
                {heroContent.panelClassVal}
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full shadow-sm"
                    style={{
                      background:
                        i <= 4
                          ? "linear-gradient(90deg, var(--color-deep-violet), var(--color-cloud-whisper))"
                          : "rgba(247,249,250,0.12)",
                    }}
                  />
                ))}
              </div>
              <Typography variant="monoEyebrow" className="!text-[10px] text-ghost/60 mt-3 flex items-center gap-1.5 !tracking-[0.1em]">
                <span className="w-1.5 h-1.5 rounded-full bg-violet animate-ping"></span>
                {heroContent.panelLvl}
              </Typography>
            </div>
          </Surface>

          {/* Cybernetic HUD Radar System */}
          {!isLighthouseEnv && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] pointer-events-none select-none z-[1]">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-55">
                {/* Outer Spin Ring */}
                <g className="animate-spin-slow origin-center">
                  <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(175, 80, 255, 0.15)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(175, 80, 255, 0.35)" strokeWidth="1.2" strokeDasharray="10 40 30 20" />
                  <path d="M 100 4 L 100 8 M 100 192 L 100 196 M 4 100 L 8 100 M 192 100 L 196 100" stroke="rgba(175, 80, 255, 0.4)" strokeWidth="0.8" />
                </g>
                {/* Middle Reverse Spin Ring */}
                <g className="animate-spin-reverse-slow origin-center">
                  <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(13, 148, 136, 0.08)" strokeWidth="0.8" />
                  <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(13, 148, 136, 0.4)" strokeWidth="1.2" strokeDasharray="60 15 5 15 25 10" />
                  <path d="M 100 22 L 98 25 L 102 25 Z" fill="rgba(13, 148, 136, 0.5)" />
                  <path d="M 100 178 L 98 175 L 102 175 Z" fill="rgba(13, 148, 136, 0.5)" />
                </g>
                {/* Inner Pulsing Radar Grid */}
                <g className="animate-pulse-slow origin-center">
                  <circle cx="100" cy="100" r="64" fill="none" stroke="rgba(175, 80, 255, 0.06)" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="50" fill="none" stroke="rgba(13, 148, 136, 0.06)" strokeWidth="0.5" />
                  <line x1="32" y1="100" x2="168" y2="100" stroke="rgba(175, 80, 255, 0.08)" strokeWidth="0.5" />
                  <line x1="100" y1="32" x2="100" y2="168" stroke="rgba(175, 80, 255, 0.08)" strokeWidth="0.5" />
                  <line x1="52" y1="52" x2="148" y2="148" stroke="rgba(175, 80, 255, 0.04)" strokeWidth="0.5" />
                  <line x1="148" y1="52" x2="52" y2="148" stroke="rgba(175, 80, 255, 0.04)" strokeWidth="0.5" />
                </g>
                {/* Glowing radar sweep effect */}
                <g className="animate-spin-slow origin-center" style={{ animationDuration: "12s" }}>
                  <path d="M 100 100 L 165 65 A 92 92 0 0 0 100 8 Z" fill="url(#radarSweep)" opacity="0.12" />
                </g>
                <defs>
                  <radialGradient id="radarSweep" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(13, 148, 136, 0)" />
                    <stop offset="100%" stopColor="rgba(13, 148, 136, 0.6)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          )}

          {heroBadges.map((b, i) => (
            <div key={b.label} className={`absolute ${b.pos} z-20`}>
              <Chip label={b.label} delay={0.6 + i * 0.07} color={b.color} />
            </div>
          ))}
        </div>
      </Container>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8b8b8b] z-20">
        <Typography variant="monoEyebrow" className="!text-[10px] !tracking-[0.3em]">
          {heroContent.scrollLabel}
        </Typography>
        <div className="scroll-icon text-violet">
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}
