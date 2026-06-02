import { forwardRef } from "react";
import { colorMap, surface, type ColorKey } from "../../lib/tokens";

type Props = {
  color?: ColorKey;
  className?: string;
  children: React.ReactNode;
  onMouseMove?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  stripe?: boolean;
};

export const GlowCard = forwardRef<HTMLDivElement, Props>(function GlowCard(
  { color, className = "", children, onMouseMove, onMouseLeave, stripe = false },
  ref
) {
  const c = color ? colorMap[color] : undefined;

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative overflow-hidden cursor-default frost ${className}`}
      style={{
        borderRadius: "19.2px",
        transition: "transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        boxShadow: surface.card,
      }}
    >
      {stripe && c && (
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${c.solid}, transparent)`,
          }}
        />
      )}
      {c && (
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 pointer-events-none"
          style={{ background: c.glow }}
        />
      )}
      {children}
    </div>
  );
});
