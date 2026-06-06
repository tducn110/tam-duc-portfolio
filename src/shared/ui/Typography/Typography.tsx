import { ElementType, HTMLAttributes, forwardRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

export const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      display: "font-display text-[88px] leading-[0.8] tracking-[-6.16px] font-light",
      headingLg: "font-display text-[74px] leading-[0.9] tracking-[1.48px] font-light",
      heading: "font-display text-[50px] leading-[0.9] tracking-[-1.5px] font-light",
      headingSm: "font-sans text-[32px] leading-[1.25] tracking-[-0.96px] font-bold",
      subheading: "font-sans text-[24px] leading-[1.5] tracking-[-0.24px] font-medium",
      body: "font-sans text-[16px] leading-[1.5] font-regular",
      bodySm: "font-sans text-[14px] leading-[1.5]",
      caption: "font-sans text-[10px] leading-[1.5]",
      monoEyebrow: "mono-eyebrow",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-accent",
      ghost: "text-ghost",
      whisper: "text-whisper",
      violet: "text-violet",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
    align: "left",
  },
});

export interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  children?: ReactNode;
  as?: ElementType;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, color, align, as, children, ...props }, ref) => {
    // Determine default element based on variant
    const Component =
      as ||
      (variant === "display"
        ? "h1"
        : variant === "headingLg" || variant === "heading"
        ? "h2"
        : variant === "headingSm"
        ? "h3"
        : variant === "subheading"
        ? "h4"
        : variant === "monoEyebrow"
        ? "span"
        : "p");

    return (
      <Component
        ref={ref}
        className={cn(typographyVariants({ variant, color: color as any, align, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = "Typography";
