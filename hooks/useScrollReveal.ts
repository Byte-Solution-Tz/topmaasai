"use client";

import type { RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type ScrollRevealOptions = {
  selector?: string;
  start?: string;
  y?: number;
  duration?: number;
  stagger?: number;
};

export function useScrollReveal(
  scope: RefObject<HTMLElement>,
  {
    selector = "[data-reveal]",
    start = "top 80%",
    y = 40,
    duration = 0.8,
    stagger = 0.12,
  }: ScrollRevealOptions = {},
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, root);
        if (!elements.length) {
          return;
        }

        gsap.set(elements, {
          opacity: 0,
          y,
          willChange: "transform, opacity",
        });

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          clearProps: "opacity,transform,willChange",
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const elements = gsap.utils.toArray<HTMLElement>(selector, root);
        gsap.set(elements, { clearProps: "all" });
      });

      return () => media.revert();
    },
    { scope },
  );
}
