import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function AnimatedSection({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  variants?: unknown; // kept for backwards compatibility but unused
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      container.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: container });

  return (
    <section id={id} className={className} ref={container}>
      {children}
    </section>
  );
}
