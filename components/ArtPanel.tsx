/**
 * Decorative illustrations used where no photograph has been chosen yet.
 * They are plainly artwork (not documentary images) and are hidden from
 * assistive technology.
 */

type Variant = "cherries" | "green" | "roasted" | "highlands";

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function Beans({ seed, fill, crease, count, w, h }: { seed: number; fill: string[]; crease: string; count: number; w: number; h: number }) {
  const r = rng(seed);
  const beans = Array.from({ length: count }, (_, i) => {
    const x = r() * w;
    const y = r() * h;
    const s = 0.75 + r() * 0.6;
    const rot = r() * 180;
    const c = fill[i % fill.length];
    return (
      <g key={i} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot.toFixed(0)}) scale(${s.toFixed(2)})`}>
        <ellipse rx="15" ry="21" fill={c} />
        <path d="M-2 -19 C 6 -8, -6 6, 2 19" stroke={crease} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    );
  });
  return <>{beans}</>;
}

export function ArtPanel({ variant, className }: { variant: Variant; className?: string }) {
  const W = 800;
  const H = 1000;
  return (
    <div className={`art-panel art-${variant} ${className ?? ""}`} aria-hidden="true">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" focusable="false">
        {variant === "cherries" && (
          <>
            <rect width={W} height={H} fill="#234840" />
            <g fill="none" stroke="#FAF7F2" strokeOpacity="0.08" strokeWidth="1.5">
              {Array.from({ length: 14 }, (_, i) => (
                <ellipse key={i} cx="620" cy="160" rx={60 + i * 55} ry={45 + i * 42} />
              ))}
            </g>
            <path d="M-40 760 C 180 640, 360 560, 860 330" stroke="#6b4f2a" strokeWidth="10" fill="none" strokeLinecap="round" />
            {[
              [120, 690, -30],
              [260, 610, 20],
              [400, 540, -25],
              [540, 470, 25],
              [680, 400, -20],
            ].map(([x, y, rot], i) => (
              <g key={i}>
                <path
                  d={`M${x} ${y} q 60 -120 180 -130 q -40 110 -180 130z`}
                  fill="#3f7a5e"
                  transform={`rotate(${rot} ${x} ${y})`}
                />
                <path
                  d={`M${x} ${y} q 40 120 160 150 q -10 -110 -160 -150z`}
                  fill="#2f6a50"
                  transform={`rotate(${-rot} ${x} ${y})`}
                />
                {[0, 1, 2, 3].map((k) => (
                  <circle
                    key={k}
                    cx={x + 10 + (k % 2) * 26}
                    cy={y + 8 + Math.floor(k / 2) * 24}
                    r={15}
                    fill={k === 3 && i % 2 ? "#c8913a" : "#b03a2e"}
                    stroke="#7d231b"
                    strokeWidth="2"
                  />
                ))}
              </g>
            ))}
          </>
        )}
        {variant === "green" && (
          <>
            <rect width={W} height={H} fill="#e4ede8" />
            <Beans seed={11} fill={["#b9c29a", "#a7b287", "#c6cda8", "#9fae86"]} crease="#7d8a62" count={120} w={W} h={H} />
          </>
        )}
        {variant === "roasted" && (
          <>
            <rect width={W} height={H} fill="#3a2317" />
            <Beans seed={7} fill={["#5f2f1b", "#6e3a22", "#4f2716", "#7a4428"]} crease="#2a140b" count={130} w={W} h={H} />
          </>
        )}
        {variant === "highlands" && (
          <>
            <rect width={W} height={H} fill="#f2e6de" />
            <circle cx="590" cy="260" r="90" fill="#e7b872" opacity="0.8" />
            <path d="M0 520 C 140 430, 260 470, 380 410 S 640 330, 800 380 L800 1000 L0 1000Z" fill="#a9bfa9" />
            <path d="M0 620 C 160 540, 300 600, 440 540 S 680 470, 800 520 L800 1000 L0 1000Z" fill="#6f957f" />
            <path d="M0 740 C 180 660, 320 720, 480 660 S 700 610, 800 650 L800 1000 L0 1000Z" fill="#3f6f5b" />
            <path d="M0 860 C 200 800, 360 850, 520 800 S 720 760, 800 790 L800 1000 L0 1000Z" fill="#234840" />
            <g stroke="#FAF7F2" strokeOpacity="0.18" strokeWidth="2" fill="none">
              {[680, 700, 720, 800, 820, 840].map((y, i) => (
                <path key={i} d={`M0 ${y} C 200 ${y - 70}, 360 ${y - 20}, 520 ${y - 70} S 720 ${y - 110}, 800 ${y - 80}`} />
              ))}
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
