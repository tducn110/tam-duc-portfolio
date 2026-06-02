import { cn } from "@/shared/lib/cn";
import { colorMap, type ColorKey } from "@/shared/lib/tokens";

export interface IconBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: ColorKey;
  size?: "sm" | "md" | "lg";
}

export function IconBox({
  color = "violet",
  size = "md",
  children,
  className,
  ...props
}: IconBoxProps) {
  const c = colorMap[color];
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-lg border transition-all duration-300",
        c.bg,
        c.border,
        c.text,
        size === "sm" && "w-7 h-7 p-1",
        size === "md" && "w-9 h-9 p-1.5",
        size === "lg" && "w-12 h-12 p-2.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
