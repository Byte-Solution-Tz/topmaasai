"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Gem } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

export function LoadingScreen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasLoaded = window.sessionStorage.getItem("tm-loading-screen") === "done";
    if (hasLoaded) {
      return;
    }

    window.sessionStorage.setItem("tm-loading-screen", "done");
    document.documentElement.style.overflow = "hidden";
    setVisible(true);
    setReady(true);

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      if (!ready || !rootRef.current) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setVisible(false);
        },
      });

      timeline
        .fromTo(
          "[data-loader-panel]",
          { opacity: 1 },
          { opacity: 1, duration: 0.01 },
        )
        .fromTo(
          "[data-loader-logo]",
          { opacity: 0, y: 28, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          0.06,
        )
        .fromTo(
          "[data-loader-copy]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.22,
        )
        .fromTo(
          "[data-loader-gem]",
          { opacity: 0, y: 16, scale: 0.8, rotate: -12 },
          { opacity: 1, y: 0, scale: 1, rotate: 0, duration: 0.45, stagger: 0.08 },
          0.26,
        )
        .to("[data-loader-panel]", {
          opacity: 0,
          duration: 0.55,
          delay: 0.35,
          ease: "power2.inOut",
        })
        .to(
          "[data-loader-card]",
          {
            y: -20,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
          },
          "<",
        );

      return () => {
        timeline.kill();
        document.documentElement.style.overflow = "";
      };
    },
    { scope: rootRef, dependencies: [ready] },
  );

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      data-loader-panel
      className="fixed inset-0 z-[10000] grid place-items-center bg-primary px-6 text-primary-foreground"
    >
      <div
        data-loader-card
        className="relative flex w-full max-w-sm flex-col items-center rounded-[2rem] border border-primary-foreground/10 bg-primary/80 px-8 py-12 text-center shadow-elevated backdrop-blur-xl"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        <div className="relative" data-loader-logo>
          <Image
            src="/images/top-maasai-logo.png"
            alt="Top Maasai"
            width={220}
            height={220}
            priority
            className="h-24 w-auto brightness-0 invert"
          />
        </div>
        <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-accent" data-loader-copy>
          Sourcing from earth to atelier
        </p>
        <div className="mt-6 flex items-center gap-3">
          {[0, 1, 2].map((gem) => (
            <span
              key={gem}
              data-loader-gem
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/12 bg-primary-foreground/5 text-accent"
            >
              <Gem className="h-4 w-4" strokeWidth={1.5} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
