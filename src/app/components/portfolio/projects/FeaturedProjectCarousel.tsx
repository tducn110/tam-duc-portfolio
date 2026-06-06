import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/features/portfolio/data/portfolio.data";
import { motionQueries } from "@/app/lib/gsap/revealPresets";
import { parallaxPresets } from "@/app/lib/parallax";
import { ProjectSceneSlide } from "./ProjectSceneSlide";
import { ProjectVisualStage } from "./ProjectVisualStage";

interface FeaturedProjectCarouselProps {
  projects: Project[];
}

export function FeaturedProjectCarousel({ projects }: FeaturedProjectCarouselProps) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current || projects.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(motionQueries.desktopMotion, () => {
        gsap.to(".featured-project-glow", {
          y: parallaxPresets.background.y,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "bottom top",
            scrub: parallaxPresets.background.scrub,
          },
        });

        gsap.fromTo(
          ".featured-project-row",
          { opacity: 0, y: 72, filter: "blur(14px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: container, dependencies: [projects.length] }
  );

  return (
    <div
      ref={container}
      className="relative overflow-hidden py-10 md:py-20"
    >
      <div className="featured-project-glow pointer-events-none absolute left-[8%] top-[12%] h-[520px] w-[520px] rounded-full bg-violet/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[5%] right-[-10%] h-[440px] w-[440px] rounded-full bg-cosmic-a/12 blur-[140px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] gap-20 px-5 md:gap-28 md:px-8">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="featured-project-row grid min-h-[calc(100dvh-8rem)] items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] md:gap-12"
          >
            <div className="relative md:h-[690px]">
              <ProjectSceneSlide
                project={project}
                index={index}
                total={projects.length}
                isActive
              />
            </div>
            <div className="relative md:[perspective:1200px]">
              <ProjectVisualStage projects={[project]} activeIndex={0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
