import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { fonts } from "../../lib/tokens";
import { useReveal } from "../../hooks/useReveal";

export function ManifestoSection() {
  const { ref, visible } = useReveal(0.15);

  return (
    <section className="py-28 md:py-40 relative overflow-hidden">
      {/* Slow nebula video — drop /public/videos/nebula-slow.mp4 (very slow drifting purple nebula, ~20s loop, 1080p) */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none"
        src="/videos/nebula-slow.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 25% 30%, rgba(108,75,214,0.45), transparent 55%), radial-gradient(ellipse at 75% 70%, rgba(175,80,255,0.35), transparent 55%), radial-gradient(ellipse at 50% 50%, rgba(64,24,96,0.5), transparent 70%), #090909",
        }}
      />

      {/* Starfield specks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="star absolute rounded-full bg-[#f7f9fa]"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              top: `${(i * 41) % 100}%`,
              left: `${(i * 59) % 100}%`,
              opacity: 0.4 + ((i * 17) % 50) / 100,
              animationDelay: `${(i % 9) * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-strong mb-10">
            <Sparkles size={11} className="text-[#af50ff]" />
            <span
              className="text-[10px] text-[#f0f0f0]/70"
              style={{ fontFamily: fonts.mono, letterSpacing: "0.24em", fontWeight: 400, textTransform: "uppercase" }}
            >
              The honest part
            </span>
          </div>

          <blockquote
            className="text-[#f7f9fa]"
            style={{
              fontFamily: fonts.display,
              fontWeight: 300,
              fontSize: "clamp(2rem, 6vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            &ldquo;I&apos;m not always passionate.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                fontFamily: fonts.display,
                fontStyle: "italic",
                fontWeight: 400,
                backgroundImage: "linear-gradient(90deg, #af50ff 0%, #6c4bd6 60%, #634e78 100%)",
              }}
            >
              But when something catches me,
            </span>
            <br />
            I give it everything.&rdquo;
          </blockquote>

          <p
            className="text-[#f0f0f0]/60 mt-10 max-w-md mx-auto"
            style={{ fontFamily: fonts.body, fontSize: "1rem", lineHeight: 1.6 }}
          >
            That&apos;s how I learn. That&apos;s how I build. That&apos;s how I changed.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
