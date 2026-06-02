import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Github, Mail, ChevronDown, Zap } from "lucide-react";
import { fonts, colorMap, gradients } from "../../lib/tokens";
import { links } from "../../lib/links";
import { heroBadges } from "../../data/portfolio";
import { Chip } from "../shared/Chip";
import { SplitText } from "../shared/SplitText";
import { Magnetic } from "../shared/Magnetic";

export function HeroSection() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial reveals
    tl.fromTo(".hero-badge", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
      .fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .fromTo(".hero-actions", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(".identity-panel", { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1, ease: "power4.out" }, "-=0.8");

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
      {/* Ambient video — drop /public/videos/hero-cosmic.mp4 (loopable nebula / particle drift, ~10s, 1080p) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-[0.35] mix-blend-screen pointer-events-none"
        src="/videos/hero-cosmic.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Starfield specks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-[#f7f9fa]"
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

      {/* Cosmic glow blobs */}
      <div className="cosmic-blob-1 absolute top-20 -left-32 w-[520px] h-[520px] rounded-full bg-[#6c4bd6]/25 blur-[140px] pointer-events-none" />
      <div className="cosmic-blob-2 absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-[#af50ff]/20 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-8 grid md:grid-cols-[1.15fr_1fr] gap-12 md:gap-16 items-center w-full">
        {/* Left */}
        <div className="hero-left-content">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-strong mb-7 shadow-[0_0_20px_rgba(175,80,255,0.2)] border border-[#af50ff]/20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#af50ff] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#af50ff]" />
            </span>
            <span
              className="text-[11px] text-[#f0f0f0]/90 font-medium"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              Da Nang · Vietnam — open to builds
            </span>
          </div>

          <h1
            className="hero-title mb-6 text-[#f7f9fa] block"
            style={{
              fontFamily: fonts.display,
              fontWeight: 300,
              fontSize: "clamp(2.75rem, 7.5vw, 5.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.045em",
            }}
          >
            <SplitText variant="interactive" stagger={0.025} duration={0.8}>
              AI-native developer
            </SplitText>
            <br />
            <span className="inline-block mt-1">
              <span className="text-[#f0f0f0]/75 mr-4 font-light select-none">with a</span>
              <span
                className="relative inline-block"
                style={{ fontFamily: fonts.display, fontStyle: "italic", fontWeight: 400 }}
              >
                <span className="text-[#af50ff] drop-shadow-[0_0_15px_rgba(175,80,255,0.45)]">
                  <SplitText variant="interactive" stagger={0.03} duration={0.8} delay={0.25}>
                    gamer&apos;s brain.
                  </SplitText>
                </span>
              </span>
            </span>
          </h1>

          <p
            className="hero-desc text-[#f0f0f0]/65 mb-10 text-shadow-sm"
            style={{
              fontFamily: fonts.body,
              fontSize: "1.05rem",
              lineHeight: 1.6,
              maxWidth: "50ch",
            }}
          >
            I build web apps, game prototypes, and emotional digital experiences
            by combining code, design, AI, and system thinking. 20-year-old CSE
            student from Da Nang — currently shipping{" "}
            <span style={{ fontFamily: fonts.display, fontStyle: "italic", fontWeight: 400 }} className="text-[#af50ff] drop-shadow-md">
              Finance Tracker V3
            </span>
            .
          </p>

          <div className="hero-actions flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#projects"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#af50ff] text-[#f7f9fa] text-[13px] hover:scale-[1.02] transition-all duration-300 violet-glow"
                style={{ fontFamily: fonts.body, fontWeight: 700, letterSpacing: "0.02em" }}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
                <span className="relative z-10 flex items-center gap-2">
                  View projects
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl frost-strong text-[#f7f9fa] text-[13px] hover:bg-white/5 border border-white/10 hover:border-[#af50ff]/50 transition-all duration-300 hover:scale-[1.02]"
                style={{ fontFamily: fonts.body, fontWeight: 500 }}
              >
                <Github size={14} className="group-hover:text-[#af50ff] transition-colors" /> GitHub
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-[#f0f0f0]/70 hover:text-[#af50ff] text-[13px] transition-colors hover:bg-white/5"
                style={{ fontFamily: fonts.body, fontWeight: 500 }}
              >
                <Mail size={14} /> Contact me
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right: command-center identity panel */}
        <div className="relative h-[480px] hidden md:block perspective-[1000px]">
          <div
            className="identity-panel absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 frost-strong p-6 z-10 violet-glow shadow-2xl border border-white/10 backdrop-blur-2xl"
            style={{ borderRadius: "24px", transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[#f7f9fa]/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#af50ff] shadow-[0_0_8px_#af50ff]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#6c4bd6]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#475467]" />
              </div>
              <span
                className="text-[10px] text-[#8b8b8b] font-medium"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.25em" }}
              >
                IDENTITY.JSON
              </span>
            </div>

            <div className="flex items-center gap-4 mb-5">
              <div className="relative group">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-[#f7f9fa] text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #af50ff 0%, #6c4bd6 60%, #401860 100%)",
                    fontFamily: fonts.display,
                    fontWeight: 400,
                    fontStyle: "italic",
                    letterSpacing: "-0.04em",
                  }}
                >
                  TD
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#af50ff] flex items-center justify-center ring-4 ring-[#090909] shadow-md animate-pulse">
                  <Zap size={12} className="text-[#f7f9fa]" fill="currentColor" />
                </div>
              </div>
              <div>
                <div
                  className="text-[#f7f9fa] text-lg mb-0.5"
                  style={{ fontFamily: fonts.display, fontWeight: 500, fontStyle: "italic", letterSpacing: "-0.02em" }}
                >
                  Tam Duc
                </div>
                <div
                  className="text-[11px] text-[#8b8b8b]"
                  style={{ fontFamily: fonts.mono, letterSpacing: "0.1em" }}
                >
                  @tducn110 · CSE · Da Nang
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { l: "GPA", v: "3.8", c: "violet" as const },
                { l: "TFT", v: "MSTR", c: "cosmic" as const },
                { l: "REPOS", v: "14", c: "mauve" as const },
              ].map((s) => {
                const c = colorMap[s.c];
                return (
                  <div
                    key={s.l}
                    className={`rounded-xl ${c.bg} border ${c.border} p-3 text-center backdrop-blur-md shadow-sm hover:translate-y-[-2px] transition-transform`}
                  >
                    <div
                      className={`text-[9px] text-[#8b8b8b] mb-1.5`}
                      style={{ fontFamily: fonts.mono, letterSpacing: "0.2em" }}
                    >
                      {s.l}
                    </div>
                    <div
                      className={`text-base ${c.text}`}
                      style={{ fontFamily: fonts.display, fontWeight: 500, fontStyle: "italic" }}
                    >
                      {s.v}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="rounded-xl p-4 border border-[#af50ff]/40 shadow-[inset_0_0_20px_rgba(175,80,255,0.1)]"
              style={{ background: gradients.cosmicB }}
            >
              <div
                className="text-[10px] text-[#f0f0f0]/80 mb-2 font-medium"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.22em" }}
              >
                CLASS
              </div>
              <div
                className="text-[16px] mb-3 text-[#f7f9fa] drop-shadow-md"
                style={{ fontFamily: fonts.display, fontStyle: "italic", fontWeight: 500 }}
              >
                AI-era Builder
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 flex-1 rounded-full shadow-sm"
                    style={{
                      background:
                        i <= 4
                          ? "linear-gradient(90deg, #af50ff, #f7f9fa)"
                          : "rgba(247,249,250,0.12)",
                    }}
                  />
                ))}
              </div>
              <div
                className="text-[10px] text-[#f0f0f0]/60 mt-3 flex items-center gap-1.5"
                style={{ fontFamily: fonts.mono, letterSpacing: "0.1em" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#af50ff] animate-ping"></span>
                LVL 4 · still leveling
              </div>
            </div>
          </div>

          {/* Orbit rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] rounded-full border border-[#af50ff]/20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full border border-[#6c4bd6]/15 pointer-events-none border-dashed" />

          {heroBadges.map((b, i) => (
            <div key={b.label} className={`absolute ${b.pos} z-20`}>
              <Chip label={b.label} delay={0.6 + i * 0.07} color={b.color} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8b8b8b] z-20">
        <span
          className="text-[10px] font-medium"
          style={{ fontFamily: fonts.mono, letterSpacing: "0.3em" }}
        >
          SCROLL
        </span>
        <div className="scroll-icon text-[#af50ff]">
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}
