import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: "root", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Journey" },
  { id: "pricing", label: "Pricing" },
  { id: "catalog", label: "Catalog" },
  { id: "contact", label: "Contact" }
];

export function FloatingNav() {
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("root");

  useGSAP(() => {
    // Show/hide based on scroll
    gsap.fromTo(container.current, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "body",
          start: "top -300px",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Track active section
    navItems.forEach((item) => {
      // The hero section doesn't have an ID, we'll use body/root as fallback or check if top is near 0
      const triggerId = item.id === "root" ? "body" : `#${item.id}`;
      ScrollTrigger.create({
        trigger: triggerId,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActive(item.id);
        }
      });
    });
  }, { scope: container });

  const scrollTo = (id: string) => {
    if (id === "root") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={container} className="floating-nav">
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`floating-nav-dot ${active === item.id ? "active" : ""}`}
          onClick={() => scrollTo(item.id)}
          title={item.label}
        />
      ))}
    </div>
  );
}
