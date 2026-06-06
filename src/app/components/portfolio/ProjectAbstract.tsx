interface AbstractProps {
  color: string;
}

function AbstractDots({ color }: AbstractProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-current"
          style={{
            width: 20 * i,
            height: 20 * i,
            color: color,
            animation: `concentric-pulse 3s ease-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
      <span className="w-2 h-2 rounded-full absolute" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
    </div>
  );
}

function AbstractBars({ color }: AbstractProps) {
  return (
    <div className="flex items-center justify-center w-full h-full gap-2">
      {[0.2, 0.5, 0.8, 0.4, 0.7, 0.3].map((delay, i) => (
        <span
          key={i}
          className="rounded-sm w-2"
          style={{
            background: color,
            animation: `eq-bar 1.5s ease-in-out infinite`,
            animationDelay: `${delay}s`,
            boxShadow: `0 0 8px ${color}`
          }}
        />
      ))}
    </div>
  );
}

function AbstractGrid({ color }: AbstractProps) {
  return (
    <div className="flex items-center justify-center w-full h-full" style={{ perspective: '400px' }}>
      <div 
        className="grid grid-cols-4 grid-rows-4 gap-1 p-4"
        style={{ 
          width: '100px', 
          height: '100px',
          animation: 'wire-rotate 10s linear infinite',
          transformStyle: 'preserve-3d'
        }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="rounded-sm border"
            style={{
              borderColor: color,
              opacity: [0.2, 0.4, 0.6, 0.8][i % 4],
              boxShadow: `inset 0 0 4px ${color}`
            }}
          />
        ))}
      </div>
    </div>
  );
}

function AbstractRune({ color }: AbstractProps) {
  return (
    <div className="flex items-center justify-center w-full h-full animate-float-slow">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="animate-flicker" style={{ filter: `drop-shadow(0 0 8px ${color})` }}>
        <path d="M40 8 L72 40 L40 72 L8 40 Z" stroke={color} strokeWidth="1.5" className="draw-path" style={{ animation: 'draw 4s ease-in-out infinite alternate', strokeDasharray: 200, strokeDashoffset: 200 }} />
        <path d="M40 22 L58 40 L40 58 L22 40 Z" stroke={color} strokeWidth="1" opacity="0.6" className="draw-path" style={{ animation: 'draw 3s ease-in-out infinite alternate-reverse', strokeDasharray: 100, strokeDashoffset: 100 }} />
        <circle cx="40" cy="40" r="4" fill={color} className="animate-pulse" />
      </svg>
      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
      `}</style>
    </div>
  );
}

const abstractMap = {
  dots: AbstractDots,
  bars: AbstractBars,
  grid: AbstractGrid,
  rune: AbstractRune,
} as const;

export type AbstractVariant = keyof typeof abstractMap;

export function ProjectAbstract({ variant, color }: { variant: AbstractVariant; color: string }) {
  const Component = abstractMap[variant];
  return <Component color={color} />;
}
