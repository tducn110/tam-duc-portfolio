import { cn } from "@/shared/lib/cn";
import { fonts } from "@/shared/lib/tokens";
import type { ButtonProps } from "./Button.types";

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  loading,
  disabled,
  children,
  className,
  ...props
}: ButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 active:scale-[0.98] cursor-pointer select-none border",
        variant === "primary" && "bg-[#af50ff] text-[#f7f9fa] border-transparent hover:bg-[#af50ff]/90 violet-glow font-semibold",
        variant === "secondary" && "frost-strong text-[#f7f9fa] border-[#f7f9fa]/[0.08] hover:border-[#af50ff]/50 font-medium",
        variant === "ghost" && "text-[#f0f0f0]/70 border-transparent hover:text-[#af50ff] hover:bg-white/5 font-medium",
        variant === "link" && "text-[#af50ff] border-transparent hover:underline p-0 bg-transparent font-medium",
        variant === "danger" && "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 font-medium",
        size === "sm" && "px-3 py-2 text-xs",
        size === "md" && "px-5 py-3 text-[13px]",
        size === "lg" && "px-6 py-4 text-base",
        className
      )}
      style={{ fontFamily: fonts.body, letterSpacing: "0.02em" }}
      {...props}
    >
      {iconLeft}
      {loading ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : children}
      {iconRight}
    </button>
  );
}
