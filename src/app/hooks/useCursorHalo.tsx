import { useEffect, useState } from "react";
import { useIsTouch } from "./useIsTouch";

export function CursorHalo() {
  const isTouch = useIsTouch();
  const [pos, setPos] = useState({ x: -400, y: -400 });

  useEffect(() => {
    if (isTouch) return;
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      className="pointer-events-none fixed z-0 w-[520px] h-[520px] rounded-full opacity-[0.55] blur-[100px] will-change-transform hidden md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(175,80,255,0.22) 0%, rgba(108,75,214,0.14) 40%, transparent 70%)",
        transform: `translate(${pos.x - 250}px, ${pos.y - 250}px)`,
        transition: "transform 0.1s linear",
      }}
    />
  );
}
