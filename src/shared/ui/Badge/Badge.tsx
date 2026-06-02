import { cn } from "@/shared/lib/cn";
import { colorMap, fonts, type ColorKey } from "@/shared/lib/tokens";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: ColorKey;
  variant?: "outline" | "solid" | "subtle";
}

export function Badge({
  children,
  color = "violet",
  variant = "outline",
  className,
  ...props
}: BadgeProps) {
  const c = colorMap[color];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[10px] font-medium w-fit whitespace-nowrap shrink-0 border transition-all",
        variant === "outline" && `${c.border} ${c.text} bg-transparent`,
        variant === "solid" && `border-transparent ${c.bar} text-white`,
        variant === "subtle" && `${c.border} ${c.text} ${c.bg}`,
        className
      )}
      style={{ fontFamily: fonts.mono, letterSpacing: "0.05em", textTransform: "uppercase" }}
      {...props}
    >
      {children}
    </span>
  );
}
