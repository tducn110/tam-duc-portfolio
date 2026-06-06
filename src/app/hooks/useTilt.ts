import { useRef } from "react";
import { useIsTouch } from "./useIsTouch";

export function useTilt(strength = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -strength;
    el.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    
    // Set local CSS variables for spotlight borders
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0) translateY(0)";
    }
  };

  return { ref, onMouseMove, onMouseLeave, disabled: isTouch };
}
