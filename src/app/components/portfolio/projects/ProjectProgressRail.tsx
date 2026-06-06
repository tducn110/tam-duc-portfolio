import type { RefObject } from "react";
import type { Project } from "@/features/portfolio/data/portfolio.data";
import { colorMap } from "@/shared/lib/tokens";

interface ProjectProgressRailProps {
  projects: Project[];
  activeIndex: number;
  fillRef: RefObject<HTMLDivElement>;
  onSelect?: (index: number) => void;
}

export function ProjectProgressRail({
  projects,
  activeIndex,
  fillRef,
  onSelect,
}: ProjectProgressRailProps) {
  return (
    <div className="flex items-stretch gap-4 md:flex-col">
      <div className="relative hidden w-px flex-1 overflow-hidden bg-whisper/10 md:block">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 h-full w-px origin-top bg-violet shadow-[0_0_18px_rgba(175,80,255,0.72)]"
          style={{ transform: "scaleY(0)" }}
        />
      </div>

      <div className="flex flex-1 gap-2 md:flex-none md:flex-col md:gap-3">
        {projects.map((project, index) => {
          const color = colorMap[project.color];
          const isActive = index === activeIndex;

          return (
            <button
              key={project.title}
              type="button"
              onClick={() => onSelect?.(index)}
              className="group min-w-0 flex-1 rounded-lg border border-whisper/10 bg-whisper/[0.035] px-3 py-2 text-left transition-all duration-300 hover:border-violet/35 hover:bg-whisper/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet/70 md:w-36 md:flex-none"
              aria-current={isActive ? "step" : undefined}
            >
              <span className="mb-1 flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: isActive ? color.solid : "rgba(247,249,250,0.28)",
                    boxShadow: isActive ? `0 0 14px ${color.solid}` : undefined,
                  }}
                />
                <span className="font-mono text-[9px] tracking-[0.18em] text-ghost/42">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className={`block truncate text-[11px] font-semibold transition-colors ${isActive ? "text-whisper" : "text-ghost/42 group-hover:text-ghost/70"}`}>
                {project.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
