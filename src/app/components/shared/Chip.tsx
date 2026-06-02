import { motion } from "motion/react";
import { colorMap, fonts, type ColorKey } from "../../lib/tokens";

export function Chip({
  label,
  delay = 0,
  color = "violet",
  icon,
  className = "",
}: {
  label: string;
  delay?: number;
  color?: ColorKey;
  icon?: React.ReactNode;
  className?: string;
}) {
  const c = colorMap[color];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 22 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border ${c.border} ${c.bg} ${c.text} backdrop-blur-md ${className}`}
      style={{ fontFamily: fonts.mono, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" }}
    >
      {icon}
      {label}
    </motion.span>
  );
}

export function Eyebrow({
  children,
  color = "violet",
}: {
  children: React.ReactNode;
  color?: ColorKey;
}) {
  const c = colorMap[color];
  return (
    <div className="inline-flex items-center gap-2 mb-5">
      <span className={`w-1.5 h-1.5 rounded-full ${c.bar}`} style={{ boxShadow: `0 0 12px ${c.glow}` }} />
      <span
        className={`${c.text}`}
        style={{
          fontFamily: fonts.mono,
          fontSize: "12px",
          letterSpacing: "0.2em",
          fontWeight: 400,
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
    </div>
  );
}
