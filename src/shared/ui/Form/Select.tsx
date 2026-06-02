import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";
import { fonts } from "@/shared/lib/tokens";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, children, ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={cn(
        "flex w-full rounded-lg border border-white/[0.08] bg-[#090909]/40 backdrop-blur-md px-4 py-3 text-sm text-[#f7f9fa] placeholder-[#6b6b6b] transition-all outline-none appearance-none cursor-pointer",
        "focus:border-[#af50ff] focus:ring-1 focus:ring-[#af50ff] focus:shadow-[0_0_15px_rgba(175,80,255,0.15)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{
        fontFamily: fonts.body,
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23f7f9fa' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
        backgroundPosition: "right 1rem center",
        backgroundSize: "1.25rem",
        backgroundRepeat: "no-repeat"
      }}
      {...props}
    >
      {children}
    </select>
  );
});
