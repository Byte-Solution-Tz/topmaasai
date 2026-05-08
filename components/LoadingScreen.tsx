"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const interval = window.setInterval(() => {
      setPct((current) => Math.min(current + 1, 100));
    }, 30);

    return () => {
      window.clearInterval(interval);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || pct < 100) {
      return;
    }

    const timeout = window.setTimeout(() => {
      document.documentElement.style.overflow = "";
      setVisible(false);
    }, 450);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [pct, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[10000] flex min-h-screen w-full items-center justify-center overflow-hidden bg-primary text-primary-foreground">
      <div className="grain pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light" />

      <CornerMark className="left-6 top-6 md:left-8 md:top-8" />
      <CornerMark className="right-6 top-6 md:right-8 md:top-8" rotate={90} />
      <CornerMark className="bottom-6 left-6 md:bottom-8 md:left-8" rotate={-90} />
      <CornerMark className="bottom-6 right-6 md:bottom-8 md:right-8" rotate={180} />

      <div className="tm-fade-up absolute left-1/2 top-8 -translate-x-1/2 text-center text-[10px] uppercase tracking-[0.48em] text-primary-foreground/55 md:top-10">
        Est. Arusha · Tanzania
      </div>

      <div className="relative flex -translate-y-4 flex-col items-center px-6 sm:-translate-y-2">
        <div className="relative mb-7 h-40 w-40 sm:mb-8 sm:h-48 sm:w-48">
          <span className="tm-pulse-ring absolute inset-0 rounded-full border border-accent/55" />
          <span className="tm-pulse-ring absolute inset-0 rounded-full border border-accent/55 [animation-delay:1.2s]" />

          <svg viewBox="0 0 200 200" className="tm-rotate-slow absolute inset-0" aria-hidden="true">
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeOpacity="0.45"
              strokeWidth="0.6"
              strokeDasharray="2 6"
            />
          </svg>

          <svg viewBox="0 0 200 200" className="tm-rotate-rev absolute inset-2" aria-hidden="true">
            <g stroke="hsl(var(--accent))" strokeWidth="0.8">
              {Array.from({ length: 60 }).map((_, index) => {
                const isLong = index % 5 === 0;
                return (
                  <line
                    key={index}
                    x1="100"
                    y1="6"
                    x2="100"
                    y2={isLong ? 14 : 10}
                    opacity={isLong ? 0.9 : 0.35}
                    transform={`rotate(${index * 6} 100 100)`}
                  />
                );
              })}
            </g>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="tm-gem-float relative flex h-28 w-28 items-center justify-center rounded-full border border-accent/45 bg-primary shadow-[inset_0_0_24px_hsl(var(--accent)/0.14),0_0_60px_hsl(var(--accent)/0.14)] sm:h-32 sm:w-32">
              <Image
                src="/images/tanzanite-removebg-preview.png"
                alt="Tanzanite gemstone"
                width={220}
                height={220}
                priority
                className="h-24 w-24 object-contain sm:h-28 sm:w-28"
              />
            </div>
          </div>
        </div>

        <div className="tm-fade-up text-center [animation-delay:0.2s]">
          <div className="text-[10px] uppercase tracking-[0.55em] text-accent/75">Top Maasai</div>
          <h1 className="mt-3 max-w-3xl text-center font-heading text-4xl font-light leading-[1.05] text-accent sm:text-6xl">
            Tanzanian Minerals,
            <br />
            From Source to Market.
          </h1>
        </div>

        <p className="tm-fade-up mt-6 max-w-md text-center text-xs uppercase tracking-[0.3em] text-primary-foreground/50 [animation-delay:0.5s]">
          From the Heart of Mererani to the World
        </p>

        <div className="tm-fade-up mt-9 flex w-72 flex-col items-center sm:w-96 [animation-delay:0.8s]">
          <div className="relative h-px w-full overflow-hidden bg-primary-foreground/15">
            <div
              className="absolute inset-y-0 left-0 bg-accent"
              style={{ width: `${pct}%`, transition: "width 80ms linear" }}
            />
          </div>
          <div className="mt-4 flex w-full items-center justify-between text-[10px] uppercase tracking-[0.4em]">
            <span className="text-primary-foreground/50">Loading</span>
            <span className="tabular-nums text-accent">{String(pct).padStart(3, "0")}%</span>
          </div>
        </div>
      </div>

      <div className="tm-fade-up absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.45em] text-primary-foreground/40 [animation-delay:1s]">
        Gold · Tanzanite · Heritage
      </div>
    </div>
  );
}

function CornerMark({
  className = "",
  rotate = 0,
}: {
  className?: string;
  rotate?: number;
}) {
  return (
    <div className={`absolute h-10 w-10 ${className}`} style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="absolute left-0 top-0 h-px w-10 bg-accent/60" />
      <span className="absolute left-0 top-0 h-10 w-px bg-accent/60" />
    </div>
  );
}
