import React, { useEffect, useState, useRef } from "react";
import { fonts } from "../../lib/tokens";
import { CursorHalo } from "../../hooks/useCursorHalo";
import { NavBar } from "./NavBar";
import { HeroSection } from "./HeroSection";
import { ProofStrip } from "./ProofStrip";
import { ProjectsSection } from "./ProjectsSection";
import { IdentitySection } from "./IdentitySection";
import { TimelineSection } from "./TimelineSection";
import { SkillsSection } from "./SkillsSection";
import { PricingSection } from "./PricingSection";
import { ManifestoSection } from "./ManifestoSection";
import { CTASection } from "./CTASection";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Preloader } from "./Preloader";

export function PortfolioLayout() {
  const lenisRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(true);
  const [showPage, setShowPage] = useState(false);
  
  useEffect(() => {
    if (!showPage) return;

    function update(time: number) {
      // @ts-ignore
      lenisRef.current?.lenis?.raf(time * 1000);
    }
  
    gsap.ticker.add(update);
  
    return () => {
      gsap.ticker.remove(update);
    };
  }, [showPage]);

  // Liquid-smooth transition reveal when preloader sweeps up
  useGSAP(() => {
    if (!showPage) return;

    gsap.fromTo(
      ".main-layout-container",
      { opacity: 0, scale: 0.975, y: 15 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.15, // Blends perfectly with the Preloader slide-up timeline
      }
    );
  }, { dependencies: [showPage] });

  return (
    <>
      {showPreloader && (
        <Preloader
          onRevealStart={() => setShowPage(true)}
          onComplete={() => setShowPreloader(false)}
        />
      )}

      {showPage && (
        <ReactLenis
          root
          ref={lenisRef}
          autoRaf={false}
          options={{
            lerp: 0.045, // Softer damping for buttery-smooth liquid scrolling
            smoothWheel: true,
            wheelMultiplier: 0.9, // Elegant steady speed multiplier
            touchMultiplier: 1.2,
          }}
        >
          <div
            className="main-layout-container min-h-screen bg-background text-foreground overflow-hidden relative selection:bg-[#af50ff]/30 selection:text-white will-change-transform"
            style={{ fontFamily: fonts.body }}
          >
            <CursorHalo />
            <NavBar />
            <HeroSection />
            <ProofStrip />
            <ProjectsSection />
            <IdentitySection />
            <TimelineSection />
            <SkillsSection />
            <PricingSection />
            <ManifestoSection />
            <CTASection />
          </div>
        </ReactLenis>
      )}
    </>
  );
}
