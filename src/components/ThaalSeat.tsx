import type { ReactNode } from "react";

const SEATS = 8;
const RING = 146;

function seats() {
  return Array.from({ length: SEATS }, (_, index) => {
    const turn = (index / SEATS) * Math.PI * 2;
    return {
      index,
      saved: index === 0,
      x: Number((Math.sin(turn) * RING).toFixed(2)),
      y: Number((-Math.cos(turn) * RING).toFixed(2)),
      rotate: Number(((index / SEATS) * 360).toFixed(2)),
    };
  });
}

function Bowl({
  x,
  y,
  r,
  children,
}: {
  x: number;
  y: number;
  r: number;
  children: ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} className="thaal-bowl" fill="url(#hn-bowl-metal)" />
      <circle r={r * 0.74} className="thaal-bowl__inner" />
      {children}
    </g>
  );
}

export function ThaalSeat({ name }: { name: string }) {
  return (
    <div className="thaal-seat">
      <svg className="thaal-svg" viewBox="-172 -172 344 344" role="img" aria-label="A thaal laid for the wedding">
        <defs>
          <radialGradient id="hn-thaal-metal" cx="38%" cy="32%" r="78%">
            <stop offset="0" stopColor="#f8e7c0" />
            <stop offset="0.42" stopColor="#d4a85a" />
            <stop offset="1" stopColor="#8d6230" />
          </radialGradient>
          <radialGradient id="hn-bowl-metal" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#fff6dd" />
            <stop offset="1" stopColor="#c99a50" />
          </radialGradient>
          <radialGradient id="hn-seat-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#ffd98a" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {seats().map((seat) => (
          <g
            key={seat.index}
            className={seat.saved ? "guest-mark guest-mark--saved" : "guest-mark"}
            transform={`translate(${seat.x} ${seat.y}) rotate(${seat.rotate})`}
          >
            {seat.saved ? <circle className="guest-mark__glow" r="28" fill="url(#hn-seat-glow)" /> : null}
            <g className="guest-mark__figure">
              <circle className="guest-mark__head" cy="-10" r="7" />
              <path className="guest-mark__body" d="M-13 14C-13 2-7-2 0-2s13 4 13 16z" />
            </g>
          </g>
        ))}

        <g className="thaal-plate">
          <circle className="thaal-rim" r="112" fill="url(#hn-thaal-metal)" />
          <circle className="thaal-bed" r="100" />
          <circle className="thaal-engrave" r="94" />
          <circle className="thaal-engrave thaal-engrave--dots" r="88" />

          <Bowl x={-24} y={-6} r={28}>
            <circle r="16" fill="#f4ead4" />
            <ellipse cx="-7" cy="-5" rx="3.4" ry="1.7" fill="#fffaf0" />
            <ellipse cx="5" cy="-3" rx="3" ry="1.5" fill="#f7f1e4" />
            <ellipse cx="-2" cy="4" rx="3.2" ry="1.6" fill="#efe2c8" />
            <ellipse cx="7" cy="6" rx="2.4" ry="1.3" fill="#fffaf0" />
            <ellipse cx="-8" cy="6" rx="2.2" ry="1.2" fill="#f7f1e4" />
          </Bowl>

          <Bowl x={32} y={18} r={24}>
            <circle r="14" fill="#c45a28" />
            <path d="M-8 1c4-6 12-6 16 0" fill="none" stroke="#f6d7b0" strokeWidth="1.4" />
          </Bowl>

          <Bowl x={14} y={-44} r={20}>
            <circle r="11" fill="#f3d48a" />
            <ellipse cx="0" cy="-1" rx="5" ry="3" fill="#c9843a" transform="rotate(-18)" />
          </Bowl>

          <Bowl x={-16} y={44} r={20}>
            <circle r="11" fill="#e7f0d4" />
            <ellipse cx="-3" cy="-1" rx="4" ry="2" fill="#5f8f3e" />
            <circle cx="4" cy="2" r="2.2" fill="#d24b3e" />
          </Bowl>

          <Bowl x={-58} y={18} r={15}>
            <ellipse cx="-1" cy="-1" rx="6" ry="3.2" fill="#e7c99a" transform="rotate(-16)" />
            <ellipse cx="2" cy="3" rx="5.5" ry="2.8" fill="#d7b483" transform="rotate(12)" />
          </Bowl>

          <Bowl x={58} y={-16} r={16}>
            <circle r="8" fill="#6b341c" />
            <circle cx="2" cy="-1" r="1.6" fill="#e2a04a" />
          </Bowl>

          <Bowl x={22} y={58} r={15}>
            <circle r="8" fill="#fbf7ef" />
            <circle r="2.4" fill="#c23b3b" />
          </Bowl>

          <Bowl x={-46} y={-46} r={14}>
            <circle cx="-3" cy="-1" r="2.4" fill="#e39a3a" />
            <circle cx="2" cy="-2" r="2.2" fill="#d4872c" />
            <circle cx="0" cy="3" r="2.2" fill="#c9843a" />
          </Bowl>
        </g>
      </svg>

      <div className="thaal-seat__tag">
        <p lang="ar" dir="rtl" className="font-arabic text-lg text-gold/80">
          محفوظ لـ
        </p>
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-ivory/55">Kept for</p>
        <p className="thaal-seat__name">{name || "You"}</p>
      </div>
    </div>
  );
}
