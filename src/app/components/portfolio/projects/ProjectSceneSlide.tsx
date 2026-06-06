import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/features/portfolio/data/portfolio.data";
import { sectionsContent } from "@/app/data/sections";
import { colorMap } from "@/shared/lib/tokens";
import { Typography } from "@/shared/ui";

interface ProjectSceneSlideProps {
  project: Project;
  index: number;
  total: number;
  isActive?: boolean;
}

export function ProjectSceneSlide({ project, index, total, isActive = true }: ProjectSceneSlideProps) {
  const color = colorMap[project.color];

  return (
    <article
      className={`project-case-slide flex flex-col justify-center transition-all duration-500 ease-out md:absolute md:inset-0 ${
        isActive
          ? "md:visible md:translate-y-0 md:opacity-100 md:blur-0"
          : "md:invisible md:pointer-events-none md:-translate-y-5 md:opacity-0 md:blur-md"
      }`}
    >
      <div className="mb-7 flex items-center gap-3">
        <Typography
          variant="monoEyebrow"
          className="!text-[11px] !tracking-[0.22em] text-ghost/45 font-normal"
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </Typography>
        <span className="h-px w-12 bg-whisper/15" />
        <Typography
          variant="monoEyebrow"
          className={`!text-[10px] !tracking-[0.2em] ${color.text} font-normal`}
        >
          {project.role}
        </Typography>
      </div>

      <h3 className="max-w-[10ch] text-[clamp(2.5rem,7vw,5.7rem)] leading-[0.88] tracking-[-0.045em] text-whisper font-display font-light text-balance">
        {project.title}
      </h3>

      <div className="mt-8 grid gap-5 md:max-w-[560px]">
        <div className="grid gap-2 md:grid-cols-[5.25rem_1fr] md:gap-5">
          <Typography
            variant="monoEyebrow"
            className={`!text-[10px] !tracking-[0.2em] ${color.text} font-normal`}
          >
            {sectionsContent.projects.problemLabel}
          </Typography>
          <p className="max-w-[58ch] text-[0.98rem] leading-[1.65] text-ghost/62">
            {project.problem}
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-[5.25rem_1fr] md:gap-5">
          <Typography
            variant="monoEyebrow"
            className={`!text-[10px] !tracking-[0.2em] ${color.text} font-normal`}
          >
            {sectionsContent.projects.builtLabel}
          </Typography>
          <p className="max-w-[58ch] text-[0.98rem] leading-[1.65] text-ghost/78">
            {project.built}
          </p>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {project.tech.slice(0, 6).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-whisper/10 bg-whisper/[0.045] px-2.5 py-1 font-mono text-[10px] text-ghost/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-lg border border-whisper/12 bg-whisper/[0.045] px-4 py-3 text-[12px] font-semibold text-whisper transition-all duration-300 hover:border-violet/45 hover:bg-violet/10"
        >
          <Github size={14} className="transition-transform group-hover:-translate-y-0.5" />
          {sectionsContent.projects.sourceLabel}
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg bg-violet px-4 py-3 text-[12px] font-bold text-whisper shadow-[0_0_36px_rgba(175,80,255,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bf72ff]"
          >
            {sectionsContent.projects.demoLabel}
            <ExternalLink size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </div>
    </article>
  );
}
