"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const bar = barRef.current;
    if (!bar) {
      return;
    }

    gsap.set(bar, {
      scaleX: 0,
      transformOrigin: "left center",
      willChange: "transform",
    });

    gsap.to(bar, {
      scaleX: 1,
      ease: "none",
      clearProps: "willChange",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  });

  return (
    <div
      ref={barRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-accent"
      aria-hidden="true"
    />
  );
}
