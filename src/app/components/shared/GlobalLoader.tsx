import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";
import gsap from "gsap";

export function GlobalLoader() {
  const { active, progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    // Minimum 1.5s loading screen so it doesn't flash
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkReady = () => {
      if (!active && progress === 100 && minTimeElapsed && document.readyState === "complete") {
        setIsLoaded(true);
      }
    };

    checkReady();
    window.addEventListener("load", checkReady);
    
    // Fallback just in case ThreeJS doesn't trigger 100%
    const fallbackTimer = setTimeout(() => {
      if (minTimeElapsed) setIsLoaded(true);
    }, 4000);
    
    return () => {
      window.removeEventListener("load", checkReady);
      clearTimeout(fallbackTimer);
    };
  }, [active, progress, minTimeElapsed]);

  useEffect(() => {
    if (isLoaded) {
      gsap.to(".global-loader", {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          const el = document.querySelector(".global-loader");
          if (el) el.remove();
        }
      });
    }
  }, [isLoaded]);

  return (
    <div className="global-loader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-base text-ghost">
      <div className="relative mb-8 h-px w-64 overflow-hidden bg-whisper/10">
        <div 
          className="absolute inset-y-0 left-0 bg-violet transition-all duration-300 ease-out"
          style={{ width: `${Math.max(5, progress)}%` }}
        />
      </div>
      <div className="flex flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
        <span className="text-violet">INITIALIZING SCENE</span>
        <span className="text-ghost/40">{Math.round(progress)}% CACHED</span>
      </div>
    </div>
  );
}
