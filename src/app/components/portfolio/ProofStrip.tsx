import { fonts, colorMap } from "../../lib/tokens";
import { proofItems } from "../../data/portfolio";

export function ProofStrip() {
  // Duplicate items 3 times for seamless infinite scroll
  const duplicatedItems = [...proofItems, ...proofItems, ...proofItems];

  return (
    <section className="border-y border-[#f7f9fa]/[0.06] bg-[#090909]/60 backdrop-blur-md relative z-10 overflow-hidden">
      <div className="relative py-5">
        <div className="flex items-center gap-4 animate-marquee">
          <span
            className="hidden md:inline text-[10px] text-[#6b6b6b] uppercase whitespace-nowrap pr-3 border-r border-[#f7f9fa]/[0.08] flex-shrink-0"
            style={{ fontFamily: fonts.mono, letterSpacing: "0.24em", fontWeight: 400 }}
          >
            /// PROOF
          </span>
          {duplicatedItems.map((item, index) => {
            const c = colorMap[item.color];
            const Icon = item.icon;
            return (
              <div
                key={`${item.label}-${index}`}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${c.border} ${c.bg} whitespace-nowrap flex-shrink-0 backdrop-blur-md`}
              >
                <Icon size={13} className={c.text} />
                <span
                  className={`text-[11px] ${c.text}`}
                  style={{ fontFamily: fonts.mono, fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase" }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
