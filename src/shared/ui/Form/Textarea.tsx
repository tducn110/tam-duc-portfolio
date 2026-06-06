import { forwardRef } from "react";
import { cn } from "@/shared/lib/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex w-full rounded-lg border border-whisper/10 bg-midnight/40 backdrop-blur-md px-4 py-3 text-sm text-whisper placeholder-slate transition-all outline-none min-h-[100px] resize-y font-sans",
        "focus:border-violet focus:ring-1 focus:ring-violet focus:shadow-[0_0_15px_rgba(175,80,255,0.15)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
