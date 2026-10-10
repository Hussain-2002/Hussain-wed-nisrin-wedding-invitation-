"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

type Left = { days: number; hours: number; mins: number; secs: number };

function remaining(): Left {
  const diff = Math.max(0, wedding.start.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    mins: Math.floor((diff / 60000) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    setLeft(remaining());
    const id = window.setInterval(() => setLeft(remaining()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const tiles = [
    { label: "Days", value: left?.days ?? "—" },
    { label: "Hours", value: left?.hours ?? "—" },
    { label: "Mins", value: left?.mins ?? "—" },
    { label: "Secs", value: left?.secs ?? "—" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="rounded-2xl border border-wine/40 bg-night-soft/80 px-1 py-4 text-center shadow-[inset_0_0_24px_rgba(255,93,36,0.08)]"
        >
          <div className="font-display text-3xl text-gold sm:text-4xl">
            {typeof tile.value === "number"
              ? String(tile.value).padStart(2, "0")
              : tile.value}
          </div>
          <div className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/50">
            {tile.label}
          </div>
        </div>
      ))}
    </div>
  );
}
