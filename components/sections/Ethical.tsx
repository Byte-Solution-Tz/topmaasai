"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ethicalHighlights } from "@/lib/site-data";

const toRoman = (n: number) =>
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] ?? String(n);

export function EthicalSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-ethical-rule]",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: { trigger: "[data-ethical-header]", start: "top 82%", once: true },
          },
        );

        const cards = gsap.utils.toArray<HTMLElement>("[data-ethical-card]", root);
        gsap.set(cards, { opacity: 0, y: 60, willChange: "transform, opacity" });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: { amount: 0.4, from: "start" },
          ease: "power2.out",
          clearProps: "opacity,transform,willChange",
          scrollTrigger: { trigger: "[data-ethical-grid]", start: "top 82%", once: true },
        });
      });

      media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-ethical-card]", root);

        const cleanups = cards.map((card) => {
          const img = card.querySelector<HTMLElement>("[data-card-img]");
          const overlay = card.querySelector<HTMLElement>("[data-card-overlay]");
          const arrow = card.querySelector<HTMLElement>("[data-card-arrow]");

          const enter = () => {
            if (img) gsap.to(img, { scale: 1.07, duration: 0.55, ease: "power2.out", overwrite: "auto" });
            if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power1.out", overwrite: "auto" });
            if (arrow) gsap.to(arrow, { x: 2, y: -2, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          };
          const leave = () => {
            if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.inOut", overwrite: "auto" });
            if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.35, ease: "power1.out", overwrite: "auto" });
            if (arrow) gsap.to(arrow, { x: 0, y: 0, opacity: 0.4, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          };

          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          return () => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          };
        });

        return () => cleanups.forEach((cleanup) => cleanup());
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(gsap.utils.toArray("[data-ethical-card]", root), { clearProps: "all" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.10] mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/top-maasai-service-section-bg.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-repeat mix-blend-overlay"
        style={{
          backgroundImage:
            "url('/images/grain.png'), radial-gradient(circle at 18% 28%, hsl(var(--gold) / 0.22) 0 1px, transparent 1.6px), radial-gradient(circle at 72% 64%, hsl(var(--earth) / 0.28) 0 1px, transparent 1.8px)",
          backgroundSize: "420px 236px, 18px 18px, 27px 27px",
          opacity: 0.28,
        }}
      />

      <div className="container-x relative">
        <div
          data-ethical-header
          className="mb-14 grid items-end gap-8 border-b border-primary-foreground/10 pb-12 md:grid-cols-[1fr_auto] md:mb-16"
        >
          <div>
            <p className="eyebrow mb-5 !text-accent/80">Ethical Mining</p>
            <h2 className="font-heading text-4xl leading-[1.1] tracking-[-0.02em] md:text-5xl">
              Fairness, dignity,
              <br />
              <em className="text-accent not-italic">and responsibility.</em>
            </h2>
          </div>
          <div className="mb-1 max-w-[300px]">
            <div className="mb-4 h-px bg-accent" data-ethical-rule />
            <p className="font-body text-sm leading-[1.7] text-primary-foreground/62">
              Ethical mining is not just a statement. It is our operating philosophy.
            </p>
          </div>
        </div>

        <div data-ethical-grid className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ethicalHighlights.map((item, index) => (
            <Link
              key={item}
              href="/ethical-mining"
              data-ethical-card
              className="group relative overflow-hidden rounded-[2px]"
              style={{ minHeight: "320px" }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/images/ethical-landscape.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover will-change-transform"
                  data-card-img
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/78 to-primary/18" />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                <div data-card-overlay className="absolute inset-0 bg-primary/25" style={{ opacity: 0 }} />
              </div>

              <div className="absolute inset-0 rounded-[2px] border border-accent/25 transition-colors duration-500 group-hover:border-accent/55" />

              <div className="absolute left-5 top-5 z-10" aria-hidden="true">
                <div className="absolute left-0 top-0 h-4 w-px bg-accent/60" />
                <div className="absolute left-0 top-0 h-px w-4 bg-accent/60" />
              </div>

              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-light tracking-[0.45em] text-accent/70">
                    {toRoman(index + 1)}
                  </span>
                  <ArrowUpRight
                    data-card-arrow
                    className="h-3.5 w-3.5 text-primary-foreground/40"
                    style={{ opacity: 0.4 }}
                  />
                </div>

                <div style={{ textShadow: "0 2px 14px rgb(0 0 0 / 0.85)" }}>
                  <div className="mb-4 h-px w-full bg-primary-foreground/35" />
                  <h3 className="font-heading text-lg font-medium leading-[1.18] tracking-[-0.01em] text-primary-foreground md:text-xl">
                    {item}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/ethical-mining"
            className="group inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-3.5 font-body text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 transition-colors hover:border-accent/50 hover:text-accent"
          >
            <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
            Read our commitment
          </Link>
        </div>
      </div>
    </section>
  );
}
