import { cn } from "@/shared/lib/cn";
import { fonts } from "@/shared/lib/tokens";

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  error?: string;
}

export function FormItem({
  label,
  error,
  children,
  className,
  ...props
}: FormItemProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} {...props}>
      {label && (
        <label
          className="text-xs text-[#f0f0f0]/75 font-medium"
          style={{ fontFamily: fonts.mono, letterSpacing: "0.05em", textTransform: "uppercase" }}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span
          className="text-xs text-red-400 mt-1"
          style={{ fontFamily: fonts.body }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
