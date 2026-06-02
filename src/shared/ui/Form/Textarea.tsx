import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";
import { fonts } from "@/shared/lib/tokens";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-lg border border-white/[0.08] bg-[#090909]/40 backdrop-blur-md px-4 py-3 text-sm text-[#f7f9fa] placeholder-[#6b6b6b] transition-all outline-none min-h-[100px] resize-y",
        "focus:border-[#af50ff] focus:ring-1 focus:ring-[#af50ff] focus:shadow-[0_0_15px_rgba(175,80,255,0.15)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ fontFamily: fonts.body }}
      {...props}
    />
  );
});
