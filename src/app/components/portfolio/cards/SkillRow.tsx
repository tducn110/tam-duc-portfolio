import { useRef } from "react";
import { colorMap, type ColorKey } from "@/shared/lib/tokens";
import { tierDots, type Tier } from "@/features/portfolio/data/portfolio.data";
import { fadeUp } from "@/shared/lib/motion";
import { Typography, StaggerItem } from "@/shared/ui";
import { LiquidShaderBar } from "./LiquidShaderBar";

export function SkillRow({
  label,
  tier,
  color,
  evidence,
}: {
  label: string;
  tier: Tier;
  color: ColorKey;
  evidence: string;
}) {
  const c = colorMap[color];
  const dots = tierDots[tier];
  const rowRef = useRef<HTMLDivElement>(null);
  const isExploring = tier === "Exploring";

  return (
    <StaggerItem variants={fadeUp}>
      <div ref={rowRef} className="group/row p-2.5 -mx-2.5 rounded-lg hover:bg-whisper/[0.02] border border-transparent hover:border-whisper/5 transition-all duration-300">
        <div className="flex justify-between items-baseline mb-2">
          <Typography variant="bodySm" className="font-medium !text-[0.92rem] group-hover/row:text-whisper transition-colors">
            {label}
          </Typography>
          <Typography
            variant="monoEyebrow"
            className={`!text-[10px] ${c.text} px-2 py-0.5 rounded-full ${c.bg} border ${c.border} font-normal transition-all duration-300 group-hover/row:scale-105`}
          >
            {tier}
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-[160px]">
            <LiquidShaderBar dots={dots} color={color} isExploring={isExploring} />
          </div>
          <Typography variant="monoEyebrow" className="flex-1 !text-[10px] text-slate group-hover/row:text-slate-300 transition-colors !tracking-[0.06em] truncate normal-case">
            {evidence}
          </Typography>
        </div>
      </div>
    </StaggerItem>
  );
}
