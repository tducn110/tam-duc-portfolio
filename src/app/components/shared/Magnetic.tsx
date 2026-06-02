import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  speed?: number;
  className?: string;
}

export function Magnetic({ children, range = 35, speed = 0.35, className = "" }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = el.getBoundingClientRect();
      const x = clientX - (rect.left + rect.width / 2);
      const y = clientY - (rect.top + rect.height / 2);

      // Check if cursor is within range
      const distance = Math.sqrt(x * x + y * y);
      if (distance < range + 40) {
        // Calculate custom ease/damping pull
        const pullX = x * (range / (range + 20));
        const pullY = y * (range / (range + 20));
        
        gsap.to(el, {
          x: pullX,
          y: pullY,
          duration: speed,
          ease: "power2.out",
        });
      } else {
        // Snap back if mouse drifted far
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef });

  // Clone the single child and attach ref + styling
  return (
    <div
      ref={containerRef}
      className={`inline-block will-change-transform ${className}`}
      style={{ position: "relative" }}
    >
      {children}
    </div>
  );
}
