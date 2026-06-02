import { fonts, type ColorKey } from "../../lib/tokens";
import { Eyebrow } from "./Chip";
import { SplitText } from "./SplitText";

export function SectionHeading({
  eyebrow,
  eyebrowColor,
  title,
  italicWord,
  align = "left",
  description,
}: {
  eyebrow: string;
  eyebrowColor?: ColorKey;
  title: string;
  italicWord: string;
  align?: "left" | "center";
  description?: string;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Eyebrow color={eyebrowColor}>{eyebrow}</Eyebrow>
      <h2
        className="text-[#f7f9fa] mt-2 block"
        style={{
          fontFamily: fonts.display,
          fontWeight: 300,
          fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
        }}
      >
        <SplitText variant="reveal-up" duration={0.7} stagger={0.025}>
          {title}
        </SplitText>{" "}
        <span
          className="text-[#af50ff] inline-block"
          style={{
            fontFamily: fonts.display,
            fontStyle: "italic",
            fontWeight: 400,
          }}
        >
          <SplitText variant="blur-reveal" duration={0.9} stagger={0.03}>
            {italicWord}
          </SplitText>
        </span>
      </h2>
      {description && (
        <p
          className={`text-[#f0f0f0]/65 mt-6 ${align === "center" ? "mx-auto" : ""}`}
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
