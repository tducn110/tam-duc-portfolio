import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/app/hooks/useIsTouch";
import { SceneTextOverlay } from "./SceneTextOverlay";
import { ScrollSceneCanvas } from "./ScrollSceneCanvas";

function useReducedMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

export function CinematicScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const isTouch = useIsTouch();
  const prefersReducedMotion = useReducedMotionPreference();
  const disableWebGL = isTouch || prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-[100dvh] overflow-hidden border-y border-whisper/10 bg-midnight/90"
      aria-label="Cinematic portfolio flight"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(175,80,255,0.24),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(108,75,214,0.18),transparent_34%)]" />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,249,250,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(247,249,250,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)",
        }}
      />

      {!disableWebGL && <ScrollSceneCanvas triggerRef={sectionRef} />}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[62%] bg-gradient-to-r from-midnight via-midnight/78 to-transparent" />

      {disableWebGL && (
        <div className="absolute right-6 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-violet/25 bg-violet/10 shadow-[0_0_90px_rgba(175,80,255,0.24)] md:block">
          <div className="absolute inset-8 rounded-full border border-whisper/10" />
          <div className="absolute left-1/2 top-1/2 h-20 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-violet/40 bg-midnight/70 shadow-[0_0_36px_rgba(175,80,255,0.28)]" />
        </div>
      )}

      <SceneTextOverlay staticMode={disableWebGL} />
    </section>
  );
}
