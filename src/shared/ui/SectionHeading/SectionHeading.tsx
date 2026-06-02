import { fonts, type ColorKey } from "@/shared/lib/tokens";
import { Eyebrow } from "../Chip/Chip";
import { cn } from "@/shared/lib/cn";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow: string;
  eyebrowColor?: ColorKey;
  title: string;
  italicWord: string;
  align?: "left" | "center";
  description?: string;
}

export function SectionHeading({
  eyebrow,
  eyebrowColor,
  title,
  italicWord,
  align = "left",
  description,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "", className)} {...props}>
      <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      <h2
        className="text-[#f7f9fa]"
        style={{
          fontFamily: fonts.display,
          fontWeight: 300,
          fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
        }}
      >
        {title}{" "}
        <span
          className="text-[#af50ff]"
          style={{
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          {italicWord}
        </span>
      </h2>
      {description && (
        <p
          className={cn(
            "text-[#f0f0f0]/65 mt-6",
            align === "center" ? "mx-auto" : ""
          )}
          style={{
            fontFamily: fonts.body,
            fontSize: "1rem",
            lineHeight: 1.6,
            maxWidth: "58ch",
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
