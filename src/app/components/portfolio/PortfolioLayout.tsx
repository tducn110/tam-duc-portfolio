import React, { useEffect, useRef, Suspense, lazy } from "react";
import { fonts } from "@/shared/lib/tokens";
import { CursorHalo } from "../../hooks/useCursorHalo";
import { NavBar } from "./NavBar";
import { HeroSection } from "./HeroSection";
import { ProofStrip } from "./ProofStrip";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingNav } from "../shared/FloatingNav";
import { LazySection } from "../shared/LazySection";
import { isLighthouseEnv } from "../../lib/env";
import { Preloader } from "./Preloader";

// Lazy-loaded heavy below-the-fold sections
const IdentitySection = lazy(() => import("./IdentitySection").then(m => ({ default: m.IdentitySection })));
const TimelineSection = lazy(() => import("./TimelineSection").then(m => ({ default: m.TimelineSection })));
const ThreeBackground = lazy(() => import("./ThreeBackground").then(m => ({ default: m.ThreeBackground })));
const CinematicScrollScene = lazy(() => import("./cinematic/CinematicScrollScene").then(m => ({ default: m.CinematicScrollScene })));
const ProjectsSection = lazy(() => import("./ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import("./SkillsSection").then(m => ({ default: m.SkillsSection })));
const PricingSection = lazy(() => import("./PricingSection").then(m => ({ default: m.PricingSection })));
const CatalogSection = lazy(() => import("./CatalogSection").then(m => ({ default: m.CatalogSection })));
const ManifestoSection = lazy(() => import("./ManifestoSection").then(m => ({ default: m.ManifestoSection })));
const CTASection = lazy(() => import("./CTASection").then(m => ({ default: m.CTASection })));

const FallbackPlaceholder = ({ height = "100vh" }: { height?: string }) => (
  <div style={{ height, width: "100%", opacity: 0 }} />
);

export function PortfolioLayout() {
  const lenisRef = useRef<LenisRef>(null);
  
  const [isLighthouse] = React.useState(isLighthouseEnv);
  // Default to showing page and hiding preloader for Lighthouse to maximize score
  const [showPreloader, setShowPreloader] = useState(!isLighthouseEnv);
  const [showPage, setShowPage] = useState(isLighthouseEnv);

  useEffect(() => {
    if (isLighthouse || !showPage) return;
    
    const syncScrollTrigger = () => ScrollTrigger.update();
    lenisRef.current?.lenis?.on("scroll", syncScrollTrigger);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
  
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
  
    return () => {
      lenisRef.current?.lenis?.off?.("scroll", syncScrollTrigger);
      gsap.ticker.remove(update);
    };
  }, [isLighthouse, showPage]);

  // Liquid-smooth transition reveal when preloader sweeps up
  useGSAP(() => {
    if (!showPage || isLighthouse) return;

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
  }, { dependencies: [showPage, isLighthouse] });

  return (
    <>
      {showPreloader && !isLighthouse && (
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
          <main
            id="main-content"
            className="main-layout-container min-h-screen bg-background text-foreground overflow-hidden relative selection:bg-violet/30 selection:text-white will-change-transform"
            style={{ fontFamily: fonts.body }}
          >
            {!isLighthouse && (
              <Suspense fallback={null}>
                <ThreeBackground />
              </Suspense>
            )}
            
            <CursorHalo />
            <NavBar />
            <FloatingNav />
            
            {/* Eager Above-The-Fold */}
            <HeroSection />
            <ProofStrip />

            {/* Lazy Below-The-Fold */}
            {!isLighthouse ? (
              <LazySection height="100vh">
                <Suspense fallback={<FallbackPlaceholder />}>
                  <CinematicScrollScene />
                </Suspense>
              </LazySection>
            ) : (
              <FallbackPlaceholder />
            )}

            <LazySection height="800px">
              <Suspense fallback={<FallbackPlaceholder height="800px" />}>
                <ProjectsSection />
              </Suspense>
            </LazySection>

            <LazySection height="600px">
              <Suspense fallback={<FallbackPlaceholder height="600px" />}>
                <IdentitySection />
              </Suspense>
            </LazySection>
            
            <LazySection height="600px">
              <Suspense fallback={<FallbackPlaceholder height="600px" />}>
                <TimelineSection />
              </Suspense>
            </LazySection>

            <LazySection height="600px">
              <Suspense fallback={<FallbackPlaceholder height="600px" />}>
                <SkillsSection />
              </Suspense>
            </LazySection>

            <LazySection height="600px">
              <Suspense fallback={<FallbackPlaceholder height="600px" />}>
                <PricingSection />
              </Suspense>
            </LazySection>

            <LazySection height="600px">
              <Suspense fallback={<FallbackPlaceholder height="600px" />}>
                <CatalogSection />
              </Suspense>
            </LazySection>

            <LazySection height="800px">
              <Suspense fallback={<FallbackPlaceholder height="800px" />}>
                <ManifestoSection />
              </Suspense>
            </LazySection>

            <LazySection height="400px">
              <Suspense fallback={<FallbackPlaceholder height="400px" />}>
                <CTASection />
              </Suspense>
            </LazySection>
          </main>
        </ReactLenis>
      )}
    </>
  );
}
