"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { trustSignals } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

type HeadlineWord = {
  label: string;
  accent?: boolean;
};

const headlineWords: HeadlineWord[] = [
  { label: "Tanzania's" },
  { label: "Finest" },
  { label: "Gemstones,", accent: true },
  { label: "Sourced" },
  { label: "with" },
  { label: "Integrity." },
];

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const trustSectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const headline = gsap.utils.toArray<HTMLElement>("[data-hero-word]", root);
        const trustCards = gsap.utils.toArray<HTMLElement>("[data-trust-card]", root);
        const trustNums = gsap.utils.toArray<HTMLElement>("[data-trust-num]", root);

        // ── Initial states ──────────────────────────────────────────────
        gsap.set("[data-hero-bg]", { scale: 1.12, willChange: "transform" });
        gsap.set("[data-hero-vignette]", { opacity: 0 });
        gsap.set(
          ["[data-hero-eyebrow]", "[data-hero-copy]", "[data-hero-actions] > *", ...headline, ...trustCards],
          { willChange: "transform, opacity" },
        );

        // ── Intro timeline ───────────────────────────────────────────────
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

        intro
          // Image zooms in and vignette fades
          .to("[data-hero-bg]", { scale: 1, duration: 2.0, clearProps: "willChange" }, 0)
          .to("[data-hero-vignette]", { opacity: 1, duration: 1.2 }, 0)

          // Eyebrow
          .fromTo(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 18, letterSpacing: "0.5em" },
            { opacity: 1, y: 0, letterSpacing: "inherit", duration: 0.8, clearProps: "opacity,transform,willChange" },
            0.3,
          )

          // Headline words — each word slides up from beneath a clip mask
          .fromTo(
            headline,
            { opacity: 0, y: 52, rotateX: -12 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: { amount: 0.6, ease: "power1.in" },
              clearProps: "opacity,transform,willChange",
            },
            0.45,
          )

          // Body copy
          .fromTo(
            "[data-hero-copy]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.75, clearProps: "opacity,transform,willChange" },
            0.85,
          )

          // CTA buttons — primary first, then secondary
          .fromTo(
            "[data-hero-actions] > *",
            { opacity: 0, y: 16, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.14,
              clearProps: "opacity,transform,willChange",
            },
            1.05,
          );

        // ── Parallax on scroll ───────────────────────────────────────────
        gsap.to("[data-hero-bg]", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        // Headline drifts upward slightly as you scroll away
        gsap.to("[data-hero-headline]", {
          yPercent: -8,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "60% top",
            end: "bottom top",
            scrub: true,
          },
        });

        // ── Trust cards: stagger in + animated numbers ───────────────────
        if (trustCards.length && trustSectionRef.current) {
          gsap.set(trustCards, { opacity: 0, y: 36, willChange: "transform, opacity" });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: trustSectionRef.current,
              start: "top 82%",
              once: true,
            },
          });

          tl.to(trustCards, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "opacity,transform,willChange",
          });

          // Animate numbers counting up
          trustNums.forEach((el) => {
            const raw = el.textContent ?? "";
            const numeric = parseFloat(raw.replace(/[^\d.]/g, ""));
            const suffix = raw.replace(/[\d.]/g, "");
            if (!isNaN(numeric)) {
              tl.fromTo(
                el,
                { innerText: 0 },
                {
                  innerText: numeric,
                  duration: 1.2,
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
        }
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ["[data-hero-bg]", "[data-hero-eyebrow]", "[data-hero-copy]", "[data-hero-actions] > *", "[data-hero-word]", "[data-trust-card]"],
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
        ref={heroSectionRef}
        className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden text-primary-foreground"
      >
        <Image
          src="/images/hero-tanzanite.jpg"
          alt="Raw blue tanzanite gemstone on dark slate"
          fill
          priority
          className="object-cover will-change-transform"
          data-hero-bg
        />

        {/* Layered gradient: bottom-heavy for text legibility + top glow */}
        <div className="absolute inset-0 bg-gradient-hero" />
        {/* Secondary vignette fades in during intro */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-primary/20"
          data-hero-vignette
          style={{ opacity: 0 }}
        />

        <div className="container-x relative z-10 py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-7" data-hero-eyebrow>
              Arusha · Tanzania · Est. 1994
            </p>

            <h1
              className="flex flex-wrap gap-x-[0.18em] gap-y-[0.08em] text-5xl leading-[1.02] sm:text-6xl lg:text-8xl"
              aria-label="Tanzania's Finest Gemstones, Sourced with Integrity."
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

            <p
              className="mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl"
              data-hero-copy
            >
              For over three decades, Top Maasai Mining Co. has supplied discerning buyers with rare
              Tanzanian minerals, ethically mined from the foothills of Mererani.
            </p>

            <div className="mt-10 flex flex-wrap gap-4" data-hero-actions>
              <Link href="/services" className={buttonClasses.gold}>
                Discover Our Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={buttonClasses.outlineLight}>
                Request a Quote
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 right-6 hidden items-end gap-4 md:flex lg:right-12 lg:gap-5">
          <div className="rotate-[-12deg] drop-shadow-[0_22px_40px_rgba(0,0,0,0.35)]">
            <Image
              src="/images/tanzanite-removebg-preview.png"
              alt=""
              width={180}
              height={180}
              className="h-28 w-28 object-contain opacity-80"
            />
          </div>
          <div className="translate-y-6 rotate-[11deg] drop-shadow-[0_28px_48px_rgba(0,0,0,0.42)]">
            <Image
              src="/images/tanzanite-removebg-preview.png"
              alt=""
              width={220}
              height={220}
              className="h-36 w-36 object-contain opacity-95"
            />
          </div>
        </div>

        <div className="maasai-border absolute inset-x-0 bottom-0" />
      </section>

      {/* ── Marquee transition band ───────────────────────────────────── */}
      <SectionMarquee
        items={["Tanzanite", "Tsavorite", "Rhodolite", "Spessartite", "Ruby", "Sapphire", "Demantoid"]}
      />

      {/* ── Trust signals ────────────────────────────────────────────── */}
      <section ref={trustSectionRef} className="border-b border-border bg-background py-14 md:py-20">
        <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="flex items-start gap-4" data-trust-card>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <signal.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-2xl leading-tight text-primary" data-trust-num>
                  {signal.label}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{signal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Internal marquee strip ───────────────────────────────────────────────────
function SectionMarquee({ items }: { items: string[] }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  return (
    <div
      className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground/40"
      aria-hidden="true"
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-[10px] uppercase tracking-[0.28em]">
            {item}
            <span className="mx-8 text-accent">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
