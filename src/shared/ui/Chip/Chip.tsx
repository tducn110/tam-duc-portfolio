import { motion } from "motion/react";
import { colorMap, fonts, type ColorKey } from "@/shared/lib/tokens";
import { cn } from "@/shared/lib/cn";

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  label: string;
  delay?: number;
  color?: ColorKey;
  icon?: React.ReactNode;
}

export function Chip({
  label,
  delay = 0,
  color = "violet",
  icon,
  className,
  ...props
}: ChipProps) {
  const c = colorMap[color];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 220, damping: 22 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] border backdrop-blur-md",
        c.border,
        c.bg,
        c.text,
        className
      )}
      style={{ fontFamily: fonts.mono, fontWeight: 400, letterSpacing: "0.08em", textTransform: "uppercase" }}
      {...(props as object)}
    >
      {icon}
      {label}
    </motion.span>
  );
}

export interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ColorKey;
}

export function Eyebrow({
  children,
  color = "violet",
  className,
  ...props
}: EyebrowProps) {
  const c = colorMap[color];
  return (
    <div className={cn("inline-flex items-center gap-2 mb-5", className)} {...props}>
      <span className={cn("w-1.5 h-1.5 rounded-full", c.bar)} style={{ boxShadow: `0 0 12px ${c.glow}` }} />
      <span
        className={cn(c.text)}
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
