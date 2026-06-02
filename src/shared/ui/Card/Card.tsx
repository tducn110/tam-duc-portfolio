import { cn } from "@/shared/lib/cn";
import { surface } from "@/shared/lib/tokens";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "frost" | "frostStrong" | "cosmic";
  hoverable?: boolean;
}

export function Card({
  variant = "frost",
  hoverable = true,
  className,
  children,
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative p-6 overflow-hidden transition-all duration-300 border text-[#f7f9fa]",
        variant === "frost" && "frost border-[#f7f9fa]/[0.08]",
        variant === "frostStrong" && "frost-strong border-[#f7f9fa]/[0.08]",
        variant === "cosmic" && "bg-cosmic-gradient border-[#af50ff]/25",
        hoverable && "hover:-translate-y-1.5 hover:shadow-2xl",
        className
      )}
      style={{
        borderRadius: "19.2px",
        boxShadow: surface.card,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
