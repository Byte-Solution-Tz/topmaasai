"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const elements = gsap.utils.toArray<HTMLElement>("[data-ph-reveal]", section);

        gsap.set(elements, {
          opacity: 0,
          y: 32,
          willChange: "transform, opacity",
        });

        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: "power3.out",
          delay: 0.1,
          clearProps: "opacity,transform,willChange",
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-primary pb-16 pt-24 text-primary-foreground md:pb-24 md:pt-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, hsl(var(--accent)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--accent)) 0, transparent 40%)",
        }}
      />
      <div className="container-x relative">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6" data-ph-reveal>
            {eyebrow}
          </p>
          <h1 className="text-5xl leading-[1.05] md:text-6xl lg:text-7xl" data-ph-reveal>
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/70" data-ph-reveal>
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="maasai-border absolute inset-x-0 bottom-0 opacity-90" />
    </section>
  );
}
