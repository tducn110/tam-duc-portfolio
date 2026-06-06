import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Gamepad2, Brain, Terminal, Trophy, Cpu, Star, Code2, Zap } from 'lucide-react';

import { Container, Surface, Typography, Section } from '@/shared/ui';
import { SplitText } from '../components/shared/SplitText';
import { ThreeBackground } from '../components/portfolio/ThreeBackground';
import { CursorHalo } from '../hooks/useCursorHalo';
import { useTilt } from '../hooks/useTilt';
import { fonts } from '@/shared/lib/tokens';

gsap.registerPlugin(ScrollTrigger);

const philosophies = [
  { icon: Terminal, title: "Build First, Perfect Later", desc: "Action generates information. Waiting for the perfect plan is the enemy of progress. I ship early to learn faster." },
  { icon: Brain, title: "AI as Cognitive Leverage", desc: "AI is not a replacement; it's a multiplier. Using LLMs properly elevates an engineer into a system architect." },
  { icon: Cpu, title: "Systems Over Features", desc: "Features break. Systems scale. I focus on building robust atomic components and resilient data architectures." },
  { icon: Gamepad2, title: "Game Sense = Life Sense", desc: "Pattern recognition from high-level gaming translates directly to debugging and navigating complex codebases." }
];

const achievements = [
  { title: "TFT Master Tier", desc: "Top 0.5% - Adapting to chaos and optimizing economy under pressure.", rarity: "legendary", icon: Trophy },
  { title: "Hackathon Winner", desc: "Built a fully functional SaaS MVP in 48 hours with autonomous AI agents.", rarity: "epic", icon: Star },
  { title: "Open Source Contributor", desc: "Merged PRs into major frameworks and tools.", rarity: "epic", icon: Code2 },
  { title: "Clean Code Evangelist", desc: "Refactored 10k+ lines of legacy code into maintainable modern TS.", rarity: "legendary", icon: Zap },
];

export default function AboutPage() {
  const container = useRef<HTMLDivElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // 1. Hero Parallax Shapes
    gsap.to(".hero-shape", {
      y: (i) => -100 * (i + 1),
      rotate: (i) => 45 * (i % 2 === 0 ? 1 : -1),
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      }
    });

    // 2. Horizontal Scroll Section
    if (trackRef.current && scrollWrapper.current) {
      const getScrollAmount = () => -(trackRef.current!.scrollWidth - window.innerWidth);
      
      gsap.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapper.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // 3. SVG Path Draw
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      gsap.set(pathRef.current, { 
        strokeDasharray: length,
        strokeDashoffset: length 
      });

      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }

    // 4. Stats Counter
    gsap.utils.toArray(".stat-counter").forEach((counter: any) => {
      const target = parseInt(counter.getAttribute("data-target") || "0");
      gsap.fromTo(counter, 
        { innerHTML: "0" }, 
        { 
          innerHTML: target,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: counter,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });

  }, { scope: container });

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div 
        ref={container} 
        className="min-h-screen bg-background text-foreground overflow-x-hidden relative selection:bg-violet/30"
        style={{ fontFamily: fonts.body }}
      >
        <ThreeBackground />
        <CursorHalo />

        {/* Back button */}
        <Link 
          to="/" 
          className="fixed top-8 left-8 z-50 p-3 rounded-full frost-strong border border-whisper/10 hover:border-violet transition-colors group"
        >
          <ArrowLeft size={20} className="text-whisper group-hover:text-violet transition-colors group-hover:-translate-x-1" />
        </Link>

        {/* 1. Cinematic Hero Banner */}
        <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Blobs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet rounded-full blur-[150px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal rounded-full blur-[150px] opacity-10 pointer-events-none" />
          
          {/* Floating Shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="hero-shape absolute top-20 left-20 opacity-30" width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-violet)" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
            <svg className="hero-shape absolute top-40 right-40 opacity-20" width="80" height="80" viewBox="0 0 100 100">
              <polygon points="50,10 90,90 10,90" fill="none" stroke="var(--color-teal)" strokeWidth="2" />
            </svg>
            <svg className="hero-shape absolute bottom-40 left-1/3 opacity-40" width="120" height="120" viewBox="0 0 100 100">
              <rect x="20" y="20" width="60" height="60" fill="none" stroke="var(--color-cosmic-violet-a)" strokeWidth="1" transform="rotate(45 50 50)" />
            </svg>
          </div>

          <Container className="relative z-10 text-center">
            <Typography variant="monoEyebrow" className="text-violet tracking-[0.3em] uppercase mb-6 block animate-flicker">
              01 // The Architect
            </Typography>
            <Typography variant="display" className="text-whisper !text-[clamp(3rem,8vw,8rem)] !leading-[1] tracking-tighter mb-8">
              <SplitText variant="interactive" duration={1} stagger={0.05}>
                Tôi là Tâm Đức
              </SplitText>
            </Typography>
            
            <div className="flex justify-center items-center gap-3 mt-8">
              <div className="h-px w-12 bg-violet/50" />
              <Typography variant="body" className="text-ghost/80 text-xl font-light tracking-wide">
                CSE Student <span className="text-violet mx-2">×</span> Da Nang, Vietnam
              </Typography>
              <div className="h-px w-12 bg-violet/50" />
            </div>
          </Container>
        </section>

        {/* 2. Philosophy Section (Horizontal Scroll) */}
        <section ref={scrollWrapper} className="horizontal-scroll-wrapper bg-midnight/80 border-y border-whisper/5 relative">
          <div className="h-screen flex items-center">
            <div className="absolute top-20 left-12 md:left-24">
              <Typography variant="display" className="text-whisper/20 !text-6xl md:!text-8xl absolute top-0 left-0 -z-10 whitespace-nowrap">
                CORE PHILOSOPHY
              </Typography>
            </div>
            
            <div ref={trackRef} className="horizontal-scroll-track px-12 md:px-32 items-center h-full pt-20">
              {philosophies.map((phil, i) => (
                <div key={i} className="w-[85vw] md:w-[500px] flex-shrink-0">
                  <PhilosophyCard phil={phil} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Stats Dashboard */}
        <section className="py-32 relative bg-[#050505]">
          <div className="absolute inset-0 scanlines opacity-30" />
          <Container>
            <Typography variant="display" className="text-whisper mb-16 text-center">Metrics.</Typography>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard value="20" label="Years Old" suffix="" />
              <StatCard value="48" label="Repos Created" suffix="+" />
              <StatCard value="12" label="Projects Shipped" suffix="+" />
              <StatCard value="100" label="Dedication" suffix="%" />
            </div>
          </Container>
        </section>

        {/* 4. Journey Timeline with SVG Path */}
        <section className="timeline-section py-40 relative">
          <Container className="relative">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[4px] opacity-20">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
                <path 
                  ref={pathRef}
                  d="M50 0 C 150 200, -50 400, 50 600 C 150 800, -50 900, 50 1000" 
                  fill="none" 
                  stroke="url(#gradient)" 
                  strokeWidth="4"
                  vectorEffect="non-scaling-stroke"
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-violet)" />
                    <stop offset="50%" stopColor="var(--color-teal)" />
                    <stop offset="100%" stopColor="var(--color-deep-violet)" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            
            <div className="space-y-40">
              <JourneyNode year="2022" title="The Beginning" desc="Started the journey into computer science. First lines of code written." align="left" />
              <JourneyNode year="2024" title="Deep Dive" desc="Mastered modern web stack. Began architecting complex systems and diving into AI." align="right" />
              <JourneyNode year="2026" title="The Present" desc="Building autonomous agents, award-winning interfaces, and scaling solutions." align="left" />
            </div>
          </Container>
        </section>

        {/* 5. Music/Gaming Taste */}
        <section className="py-32 relative bg-midnight border-t border-whisper/10">
          <Container>
            <div className="mb-20 text-center">
              <Typography variant="display" className="text-whisper mb-4">Loot Box</Typography>
              <Typography variant="body" className="text-ghost/60">Achievements outside the IDE.</Typography>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((ach, i) => (
                <div key={i} className={`p-6 rounded-2xl bg-[#090909] relative overflow-hidden group ${ach.rarity === 'legendary' ? 'rarity-legendary' : 'rarity-epic'}`}>
                  <div className="absolute inset-0 shimmer-sweep opacity-50" />
                  <div className="relative z-10 flex flex-col h-full">
                    <ach.icon size={28} className={ach.rarity === 'legendary' ? 'text-amber-500 mb-6' : 'text-violet mb-6'} />
                    <Typography as="h3" variant="heading" className="text-whisper text-xl mb-3">{ach.title}</Typography>
                    <Typography variant="body" className="text-ghost/70 text-sm mt-auto">{ach.desc}</Typography>
                    
                    <div className="mt-6 inline-block">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded border ${ach.rarity === 'legendary' ? 'border-amber-500/50 text-amber-500' : 'border-violet/50 text-violet'}`}>
                        {ach.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </ReactLenis>
  );
}

// Subcomponents
function PhilosophyCard({ phil, index }: { phil: any, index: number }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(10);
  
  return (
    <div ref={ref as any} onMouseMove={onMouseMove as any} onMouseLeave={onMouseLeave as any} className="will-change-transform">
      <Surface variant="frost" className="p-10 md:p-14 h-[400px] flex flex-col justify-between spotlight-border-card relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-violet/10 rounded-full blur-[60px] group-hover:bg-violet/20 transition-colors duration-700" />
        <div>
          <Typography variant="monoEyebrow" className="text-violet mb-8 block">0{index + 1}</Typography>
          <phil.icon size={48} strokeWidth={1} className="text-whisper mb-8 opacity-80" />
          <Typography as="h3" variant="display" className="text-whisper text-3xl md:text-4xl leading-tight mb-6">{phil.title}</Typography>
        </div>
        <Typography variant="body" className="text-ghost/70 text-lg leading-relaxed max-w-sm">
          {phil.desc}
        </Typography>
      </Surface>
    </div>
  );
}

function StatCard({ value, label, suffix }: { value: string, label: string, suffix: string }) {
  return (
    <div className="p-8 text-center relative group">
      <div className="text-6xl md:text-8xl font-display italic text-whisper counter-glow mb-4 flex items-center justify-center">
        <span className="stat-counter" data-target={value}>0</span>
        <span className="text-violet text-4xl">{suffix}</span>
      </div>
      <Typography variant="monoEyebrow" className="text-slate tracking-widest">{label}</Typography>
      
      {/* Sparkline */}
      <div className="h-8 mt-6 flex items-end justify-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
        {[0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 1].map((h, i) => (
          <div 
            key={i} 
            className="w-1.5 bg-violet rounded-t-sm animate-pulse" 
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function JourneyNode({ year, title, desc, align }: { year: string, title: string, desc: string, align: 'left' | 'right' }) {
  return (
    <div className={`flex w-full ${align === 'left' ? 'justify-start' : 'justify-end'} relative z-10`}>
      <div className={`w-[calc(50%-40px)] ${align === 'left' ? 'pr-12 text-right' : 'pl-12 text-left'} group`}>
        <div className="p-8 rounded-2xl bg-[#090909]/80 backdrop-blur-md border border-whisper/10 hover:border-violet/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(175,80,255,0.15)] hover:-translate-y-2">
          <Typography variant="monoEyebrow" className="text-violet mb-3 inline-block">{year}</Typography>
          <Typography as="h3" variant="heading" className="text-whisper text-2xl mb-4">{title}</Typography>
          <Typography variant="body" className="text-ghost/70">{desc}</Typography>
        </div>
      </div>
      
      {/* Center Node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-midnight border-2 border-violet z-20 flex items-center justify-center group-hover:scale-150 group-hover:bg-violet transition-all duration-500 shadow-[0_0_15px_rgba(175,80,255,0.5)]">
        <div className="w-2 h-2 rounded-full bg-whisper animate-ping" />
      </div>
    </div>
  );
}
