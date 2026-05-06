"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonClasses } from "@/lib/styles";

type HeadlineWord = { label: string; accent?: boolean };

const headlineWords: HeadlineWord[] = [
  // { label: "Authentic" },
  { label: "Tanzanian" },
  { label: "Minerals," },
  { label: "From" },
  { label: "Source" },
  { label: "to" },
  { label: "Market.", accent: true },
];

export function Hero() {
  const rootRef       = useRef<HTMLDivElement>(null);
  const heroRef       = useRef<HTMLElement>(null);
  const trustRef      = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const headline   = gsap.utils.toArray<HTMLElement>("[data-hero-word]", root);
        const trustCards = gsap.utils.toArray<HTMLElement>("[data-trust-card]", root);
        const trustNums  = gsap.utils.toArray<HTMLElement>("[data-trust-num]", root);

        gsap.set("[data-hero-bg]", { scale: 1.12, willChange: "transform" });
        gsap.set("[data-hero-vignette]", { opacity: 0 });
        gsap.set(
          ["[data-hero-eyebrow]", "[data-hero-copy]", "[data-hero-actions] > *", ...headline, ...trustCards],
          { willChange: "transform, opacity" },
        );

        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          .to("[data-hero-bg]",      { scale: 1, duration: 2.0, clearProps: "willChange" }, 0)
          .to("[data-hero-vignette]", { opacity: 1, duration: 1.2 }, 0)
          .fromTo("[data-hero-eyebrow]",
            { opacity: 0, y: 18, letterSpacing: "0.5em" },
            { opacity: 1, y: 0, letterSpacing: "inherit", duration: 0.8, clearProps: "opacity,transform,willChange" },
            0.3,
          )
          .fromTo(headline,
            { opacity: 0, y: 52, rotateX: -12 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: { amount: 0.6, ease: "power1.in" }, clearProps: "opacity,transform,willChange" },
            0.45,
          )
          .fromTo("[data-hero-copy]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.75, clearProps: "opacity,transform,willChange" },
            0.85,
          )
          .fromTo("[data-hero-actions] > *",
            { opacity: 0, y: 16, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.14, clearProps: "opacity,transform,willChange" },
            1.05,
          );

        gsap.to("[data-hero-bg]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 },
        });

        gsap.to("[data-hero-headline]", {
          yPercent: -8, opacity: 0.4, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "60% top", end: "bottom top", scrub: true },
        });

        // ── Trust cards ───────────────────────────────────────────────────
        if (trustCards.length && trustRef.current) {
          // Cards enter from below with stagger
          gsap.set(trustCards, { opacity: 0, y: 40, willChange: "transform, opacity" });

          const tl = gsap.timeline({
            scrollTrigger: { trigger: trustRef.current, start: "top 84%", once: true },
          });

          tl.to(trustCards, {
            opacity: 1, y: 0,
            duration: 0.7,
            stagger: 0.10,
            ease: "power2.out",
            clearProps: "opacity,transform,willChange",
          });

          // Animate the stat numbers
          trustNums.forEach((el) => {
            const raw     = el.textContent ?? "";
            const numeric = parseFloat(raw.replace(/[^\d.]/g, ""));
            const suffix  = raw.replace(/[\d.]/g, "");
            if (!isNaN(numeric)) {
              tl.fromTo(el,
                { innerText: 0 },
                {
                  innerText: numeric,
                  duration: 1.4,
                  ease: "power1.out",
                  snap: { innerText: numeric < 10 ? 0.1 : 1 },
                  onUpdate() {
                    const v = parseFloat(gsap.getProperty(el, "innerText") as string);
                    el.textContent = (numeric < 10 ? v.toFixed(1) : Math.round(v)) + suffix;
                  },
                },
                "<0.1",
              );
            }
          });

          // Accent line grows in under each number
          const lines = gsap.utils.toArray<HTMLElement>("[data-trust-line]", root);
          gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
          tl.to(lines, {
            scaleX: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "transform",
          }, "<0.2");
        }
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ["[data-hero-bg]", "[data-hero-eyebrow]", "[data-hero-copy]", "[data-hero-actions] > *",
            "[data-hero-word]", "[data-trust-card]", "[data-trust-line]"],
          { clearProps: "all" },
        );
        gsap.set("[data-hero-vignette]", { opacity: 1 });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative -mt-36 flex min-h-[calc(100svh+4rem)] items-center overflow-hidden pt-36 text-primary-foreground"
      >
        <Image
          src="/images/hero-tanzanite.jpg"
          alt="Raw blue tanzanite gemstone on dark slate"
          fill priority
          className="object-cover will-change-transform"
          data-hero-bg
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20"
          data-hero-vignette
          style={{ opacity: 0 }}
        />

        <div className="container-x relative z-10 py-20">
          <div className="max-w-4xl">
              <p className="eyebrow mb-7" data-hero-eyebrow>
                From the Heart of Mererani to the World
              </p>
              <h1
                className="flex flex-wrap gap-x-[0.18em] gap-y-[0.08em] font-heading text-5xl leading-[1.08] tracking-[-0.02em] sm:text-6xl lg:text-8xl"
                aria-label="Authentic Earth's Rare Minerals, From Source to Market."
                data-hero-headline
                style={{ perspective: "600px" }}
              >
              {headlineWords.map((word) => (
                <span
                  key={word.label}
                  data-hero-word
                  className={word.accent ? "inline-block italic text-accent" : "inline-block"}
                  style={{ transformOrigin: "50% 100%" }}
                >
                  {word.label}
                </span>
              ))}
            </h1>
            <p className="mt-7 max-w-2xl font-body text-base leading-[1.7] text-primary-foreground/78 md:text-xl" data-hero-copy>
              For over 30 years, Top Maasai Mining Co. has built its reputation on trust and respect
              for the people behind every stone.
            </p>
            <div className="mt-10 flex flex-wrap gap-4" data-hero-actions>
              <Link href="/services" className={buttonClasses.gold}>
                Our Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={buttonClasses.outlineLight}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Floating gem pair */}
        <div className="pointer-events-none absolute bottom-10 right-6 hidden items-end gap-4 md:flex lg:right-12 lg:gap-5">
          <div className="rotate-[-12deg] drop-shadow-[0_22px_40px_rgba(0,0,0,0.35)]">
            <Image src="/images/tanzanite-removebg-preview.png" alt="" width={180} height={180}
              className="h-28 w-28 object-contain opacity-80" />
          </div>
          <div className="translate-y-6 rotate-[11deg] drop-shadow-[0_28px_48px_rgba(0,0,0,0.42)]">
            <Image src="/images/tanzanite-removebg-preview.png" alt="" width={220} height={220}
              className="h-36 w-36 object-contain opacity-95" />
          </div>
        </div>
      </section>

      
    </div>
  );
}
