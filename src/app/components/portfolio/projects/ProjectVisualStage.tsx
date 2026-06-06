import type { Project } from "@/features/portfolio/data/portfolio.data";
import { colorMap } from "@/shared/lib/tokens";
import { renderIcon } from "@/app/lib/iconMap";
import { ProjectAbstract } from "../ProjectAbstract";

interface ProjectVisualStageProps {
  projects: Project[];
  activeIndex: number;
}

function VisualDetails({ project }: { project: Project }) {
  if (project.abstractVariant === "bars") {
    return (
      <div className="absolute bottom-8 left-8 right-8 grid grid-cols-4 gap-2">
        {[58, 76, 42, 88].map((height, index) => (
          <span
            key={height}
            className="rounded-t-md bg-whisper/12"
            style={{
              height,
              boxShadow: index === 3 ? `0 0 26px ${project.abstractColor}66` : undefined,
              background: index === 3 ? project.abstractColor : undefined,
            }}
          />
        ))}
      </div>
    );
  }

  if (project.abstractVariant === "dots") {
    return (
      <div className="absolute inset-x-8 bottom-9 grid grid-cols-3 gap-3">
        {["RSVP", "BRACKET", "CTA"].map((label) => (
          <span key={label} className="rounded-lg border border-whisper/10 bg-midnight/40 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-ghost/60">
            {label}
          </span>
        ))}
      </div>
    );
  }

  if (project.abstractVariant === "grid") {
    return (
      <div className="absolute inset-x-8 bottom-8 grid gap-2">
        {["unsent draft", "private reply", "quiet archive"].map((label, index) => (
          <span
            key={label}
            className="rounded-lg border border-whisper/10 bg-whisper/[0.045] px-3 py-2 font-mono text-[10px] text-ghost/62"
            style={{ transform: `translateX(${index * 18}px)` }}
          >
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-violet/25 bg-violet/10 px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-violet">
      SHADER / INPUT / FEEL
    </div>
  );
}

export function ProjectVisualStage({ projects, activeIndex }: ProjectVisualStageProps) {
  const activeProject = projects[activeIndex] || projects[0];

  return (
    <div className="relative min-h-[390px] overflow-hidden rounded-[28px] border border-whisper/10 bg-[linear-gradient(145deg,rgba(247,249,250,0.08),rgba(247,249,250,0.025)_42%,rgba(175,80,255,0.06))] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_40px_120px_-48px_rgba(175,80,255,0.55)] md:min-h-[610px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(175,80,255,0.18),transparent_34%),radial-gradient(circle_at_82%_76%,rgba(108,75,214,0.17),transparent_34%)]" />
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(247,249,250,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(247,249,250,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      
      {/* SINGLE BACKGROUND CANVAS FOR PERFORMANCE */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-56 w-56 md:h-80 md:w-80">
          <ProjectAbstract variant={activeProject.abstractVariant} color={activeProject.abstractColor} />
        </div>
      </div>

      {projects.map((project, index) => {
        const color = colorMap[project.color];

        return (
          <div
            key={project.title}
            className={`project-visual-panel absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ease-out md:p-10 ${
              index === activeIndex
                ? "visible scale-100 opacity-100 blur-0"
                : "invisible pointer-events-none scale-95 opacity-0 blur-md"
            }`}
          >
            <div
              className="absolute left-7 top-7 inline-flex items-center gap-2 rounded-lg border bg-midnight/40 px-3 py-2 backdrop-blur-xl"
              style={{ borderColor: `${color.solid}55` }}
            >
              <span className={`inline-flex h-8 w-8 items-center justify-center rounded-md ${color.bg} ${color.text}`}>
                {renderIcon(project.iconName, 16)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ghost/58">
                scene {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div
              className="relative flex h-56 w-56 items-center justify-center rounded-full border border-whisper/10 bg-midnight/35 backdrop-blur-md md:h-80 md:w-80"
              style={{
                boxShadow: `0 0 90px -22px ${project.abstractColor}, inset 0 0 60px rgba(247,249,250,0.04)`,
              }}
            >
              <div className="absolute inset-8 rounded-full border border-whisper/10" />
              <div className="absolute inset-16 rounded-full border border-whisper/10" />
            </div>

            <VisualDetails project={project} />
          </div>
        );
      })}
    </div>
  );
}
