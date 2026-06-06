import { flightCheckpoints } from "./sceneData";

interface SceneTextOverlayProps {
  staticMode?: boolean;
}

export function SceneTextOverlay({ staticMode = false }: SceneTextOverlayProps) {
  if (staticMode) {
    return (
      <div className="relative z-10 mx-auto grid min-h-[100dvh] w-full max-w-[1200px] content-center gap-5 px-5 py-24 md:px-8">
        {flightCheckpoints.map((checkpoint) => (
          <article key={checkpoint.title} className="rounded-xl border border-whisper/10 bg-whisper/[0.045] p-5 backdrop-blur-md">
            <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.2em] text-violet/75">
              {checkpoint.eyebrow}
            </span>
            <h2 className="text-[clamp(2rem,7vw,4rem)] font-display font-light leading-[0.92] tracking-[-0.04em] text-whisper">
              {checkpoint.title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-[1.65] text-ghost/66">
              {checkpoint.body}
            </p>
          </article>
        ))}
      </div>
    );
  }

  return (
    <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1200px] items-center px-5 md:px-8">
      <div className="relative h-[420px] w-full max-w-[560px]">
        {flightCheckpoints.map((checkpoint, index) => (
          <article
            key={checkpoint.title}
            className="flight-copy absolute left-0 top-1/2 w-full -translate-y-1/2"
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <span className="mb-5 block font-mono text-[11px] uppercase tracking-[0.22em] text-violet/80">
              {checkpoint.eyebrow}
            </span>
            <h2 className="max-w-[9ch] text-[clamp(3rem,8vw,6.6rem)] font-display font-light leading-[0.86] tracking-[-0.045em] text-whisper text-balance">
              {checkpoint.title}
            </h2>
            <p className="mt-7 max-w-[46ch] text-[1rem] leading-[1.7] text-ghost/66">
              {checkpoint.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
