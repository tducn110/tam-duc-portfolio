import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Github, ArrowUpRight } from "lucide-react";
import { fonts } from "../../lib/tokens";
import { links } from "../../lib/links";
import { projects } from "../../data/portfolio";
import { SectionHeading } from "../shared/SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { AnimatedSection } from "../shared/AnimatedSection";

export function ProjectsSection() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax atmospheric glow
    gsap.to(".project-glow", {
      y: 250,
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Staggered reveal for project cards
    gsap.fromTo(
      ".project-card-wrapper",
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid",
          start: "top 80%",
          toggleActions: "play none none none",
        }
      }
    );
  }, { scope: container });

  return (
    <AnimatedSection id="projects" className="py-24 md:py-32 relative">
      <div ref={container} className="relative w-full">
        {/* atmospheric glow */}
        <div className="project-glow absolute top-10 left-1/4 w-[600px] h-[600px] rounded-full bg-[#6c4bd6]/15 blur-[160px] pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 relative z-10">
          <div className="mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <SectionHeading
              eyebrow="Things I've shipped"
              eyebrowColor="cosmic"
              title="Project"
              italicWord="showcase."
              description="Four projects, four sides of me — finance, events, feelings, and games. Each is a real repo on GitHub."
            />
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-[12px] text-[#f0f0f0]/70 hover:text-[#af50ff] self-start whitespace-nowrap transition-all duration-300 hover:tracking-widest"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.18em", fontWeight: 400, textTransform: "uppercase" }}
            >
              <Github size={14} className="group-hover:scale-110 transition-transform" /> ALL REPOS
              <ArrowUpRight size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div key={p.title} className="project-card-wrapper will-change-transform">
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
