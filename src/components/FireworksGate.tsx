"use client";

import { useEffect, useRef, useState } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
  kind: "rocket" | "spark" | "cracker" | "glow";
  gravity: number;
  drag: number;
  targetY?: number;
};

const PALETTE = ["#ffd56a", "#ff5d24", "#ff4d6d", "#fff6e8", "#ff9f1c", "#e23e57", "#f3c96b"];

function burst(x: number, y: number, color: string, count = 90): Spark[] {
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.8 + Math.random() * 6.2;
    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      max: 55 + Math.random() * 45,
      color: Math.random() > 0.7 ? "#fff6e8" : color,
      size: 1.4 + Math.random() * 2.6,
      kind: "spark" as const,
      gravity: 0.035 + Math.random() * 0.03,
      drag: 0.984,
    };
  });
}

export function FireworksGate({
  guestName,
  onOpened,
  onIgnite,
}: {
  guestName?: string;
  onOpened: () => void;
  onIgnite?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparks = useRef<Spark[]>([]);
  const frame = useRef<number>(0);
  const [phase, setPhase] = useState<"idle" | "show" | "leaving">("idle");
  const opened = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const tick = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = "rgba(7, 4, 12, 0.18)";
      ctx.fillRect(0, 0, w, h);

      const keep: Spark[] = [];
      const born: Spark[] = [];

      for (const p of sparks.current) {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1 / p.max;

        if (p.kind === "rocket" && p.targetY !== undefined && p.y <= p.targetY) {
          const color = p.color;
          born.push(...burst(p.x, p.y, color, 96));
          born.push({
            x: p.x,
            y: p.y,
            vx: 0,
            vy: 0,
            life: 1,
            max: 16,
            color: "#fff6e8",
            size: 22,
            kind: "glow",
            gravity: 0,
            drag: 1,
          });
          continue;
        }

        if (p.life <= 0) continue;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.kind === "glow" ? p.size * p.life : p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.kind === "rocket" || p.kind === "cracker") {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
          ctx.stroke();
        }
        ctx.restore();
        keep.push(p);
      }

      sparks.current = keep.concat(born);
      frame.current = requestAnimationFrame(tick);
    };

    ctx.fillStyle = "#07040c";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    frame.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const launchRocket = (x?: number) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    sparks.current.push({
      x: x ?? w * (0.16 + Math.random() * 0.68),
      y: h + 10,
      vx: (Math.random() - 0.5) * 1.6,
      vy: -(8.6 + Math.random() * 3.8),
      life: 1,
      max: 90,
      color,
      size: 2.8,
      kind: "rocket",
      gravity: 0.082,
      drag: 0.995,
      targetY: h * (0.12 + Math.random() * 0.32),
    });
  };

  const groundCrackers = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let i = 0; i < 36; i += 1) {
      const side = i % 2 === 0 ? 0.1 : 0.9;
      sparks.current.push({
        x: w * (side + (Math.random() - 0.5) * 0.18),
        y: h - 18,
        vx: (Math.random() - 0.5) * 3.4,
        vy: -(4 + Math.random() * 7),
        life: 1,
        max: 32 + Math.random() * 22,
        color: PALETTE[i % PALETTE.length],
        size: 2,
        kind: "cracker",
        gravity: 0.13,
        drag: 0.98,
      });
    }
  };

  const ignite = () => {
    if (opened.current) return;
    opened.current = true;
    onIgnite?.();
    setPhase("show");
    groundCrackers();
    launchRocket(window.innerWidth * 0.5);
    const w = window.innerWidth;
    const h = window.innerHeight;
    sparks.current.push(
      ...burst(w * 0.28, h * 0.32, PALETTE[0], 80),
      ...burst(w * 0.72, h * 0.26, PALETTE[2], 80),
      ...burst(w * 0.5, h * 0.2, PALETTE[4], 100),
    );

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("leaving");
      window.setTimeout(onOpened, 400);
      return;
    }

    let n = 0;
    const salvo = window.setInterval(() => {
      launchRocket();
      if (n % 2 === 0) groundCrackers();
      n += 1;
      if (n >= 16) {
        window.clearInterval(salvo);
        for (let i = 0; i < 10; i += 1) {
          window.setTimeout(() => launchRocket(), i * 80);
        }
      }
    }, 150);

    window.setTimeout(() => setPhase("leaving"), 4200);
    window.setTimeout(onOpened, 5000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-700 ${
        phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(90,24,48,0.45),transparent_55%)]" />

      {phase === "idle" ? (
        <>
          <CrackerString side="left" />
          <CrackerString side="right" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            {guestName ? (
              <p className="rise-in mb-8 text-sm tracking-[0.18em] text-ivory/75 uppercase">
                For {guestName}
              </p>
            ) : null}

            <button
              type="button"
              onClick={ignite}
              className="ember-pulse group relative grid h-28 w-28 place-items-center rounded-full border border-gold/70 bg-[radial-gradient(circle_at_35%_30%,#ff8a3d,#9b1d2e_68%,#3b0d18)] text-ivory"
              aria-label="Light the firecrackers"
            >
              <span className="font-display text-2xl tracking-wide">H · N</span>
              <span className="pointer-events-none absolute -bottom-1 left-1/2 h-10 w-px origin-top bg-gradient-to-b from-ember to-transparent" />
            </button>

            <p className="rise-in mt-10 font-display text-3xl text-gold sm:text-4xl">
              Light the crackers
            </p>
            <p lang="ar" dir="rtl" className="mt-3 font-arabic text-xl text-gold/80">
              نكاح مبارك
            </p>
            <p className="mt-2 max-w-xs text-sm text-ivory/60">
              Touch the seal. The night opens with fire, and a shadi mubarak.
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

function CrackerString({ side }: { side: "left" | "right" }) {
  const offset = side === "left" ? "left-6 sm:left-14" : "right-6 sm:right-14";
  return (
    <div className={`pointer-events-none absolute top-0 ${offset} z-10 flex flex-col items-center`}>
      <span className="h-16 w-px bg-gradient-to-b from-gold/70 to-ember" />
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="mt-2 h-8 w-2.5 rounded-full bg-gradient-to-b from-ember via-spark to-wine shadow-[0_0_12px_rgba(255,93,36,0.65)]"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}
