import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

export const surfaceVariants = cva(
  "rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-card border border-border/10",
        frost: "frost",
        frostStrong: "frost-strong",
        glow: "frost violet-glow border-violet/20",
        ghost: "bg-transparent hover:bg-white/5",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6 md:p-8",
        lg: "p-8 md:p-12",
      },
      interactive: {
        true: "hover:translate-y-[-2px] hover:shadow-lg cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "frost",
      padding: "md",
      interactive: false,
    },
  }
);

export interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceVariants> {
  children?: ReactNode;
}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, variant, padding, interactive, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(surfaceVariants({ variant, padding, interactive, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = "Surface";
