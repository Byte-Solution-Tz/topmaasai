"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ethicalHighlights } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export function EthicalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const bullets = gsap.utils.toArray<HTMLElement>(
            "[data-ethical-bullet]",
            section,
          );

          // Initial states — everything hidden, image zoomed-in like we're inside it
          gsap.set("[data-ethical-image]", {
            scale: 1.35,
            opacity: 0.4,
            filter: "blur(14px) brightness(0.55)",
            willChange: "transform, opacity, filter",
          });
          gsap.set("[data-ethical-vignette]", { opacity: 1 });
          gsap.set("[data-ethical-grain]", { opacity: 0 });
          gsap.set("[data-ethical-kicker]", { opacity: 0, y: 30, letterSpacing: "0.4em" });
          gsap.set("[data-ethical-title-line]", { opacity: 0, yPercent: 110, rotate: 2 });
          gsap.set("[data-ethical-copy]", { opacity: 0, y: 40, filter: "blur(8px)" });
          gsap.set("[data-ethical-progress]", { scaleX: 0, transformOrigin: "left center" });
          gsap.set(bullets, { opacity: 0, x: -60, filter: "blur(6px)" });
          gsap.set("[data-ethical-bullet-num]", { opacity: 0, scale: 0.4 });
          gsap.set("[data-ethical-cta]", { opacity: 0, y: 30, scale: 0.92 });
          gsap.set("[data-ethical-stat-num]", { opacity: 0, scale: 0.6, y: 40 });
          gsap.set("[data-ethical-stat-label]", { opacity: 0, y: 16 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              pin: pinRef.current,
              start: "top top",
              end: "+=320%",
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // ACT 1 — Dive in: lens pulls focus, image surfaces from the depths
          tl.to(
            "[data-ethical-image]",
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px) brightness(1)",
              duration: 1,
              ease: "power2.out",
            },
            0,
          )
            .to("[data-ethical-vignette]", { opacity: 0.55, duration: 1 }, 0)
            .to("[data-ethical-grain]", { opacity: 0.18, duration: 0.6 }, 0.2)

            // ACT 2 — Voice arrives: kicker tightens, title rises in lines
            .to(
              "[data-ethical-kicker]",
              { opacity: 1, y: 0, letterSpacing: "0.25em", duration: 0.5, ease: "power3.out" },
              0.55,
            )
            .to(
              "[data-ethical-title-line]",
              {
                opacity: 1,
                yPercent: 0,
                rotate: 0,
                duration: 0.7,
                stagger: 0.12,
                ease: "expo.out",
              },
              0.7,
            )
            .to(
              "[data-ethical-copy]",
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
              1.05,
            )
            .to("[data-ethical-progress]", { scaleX: 1, duration: 0.8, ease: "power1.inOut" }, 1.2)

            // ACT 3 — Pillars surface one by one, each with a beat
            .to(
              bullets,
              {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.55,
                stagger: 0.28,
                ease: "power3.out",
              },
              1.4,
            )
            .to(
              "[data-ethical-bullet-num]",
              {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                stagger: 0.28,
                ease: "back.out(2)",
              },
              1.45,
            )

            // ACT 4 — Proof point lands, then the call
            .to(
              "[data-ethical-stat-num]",
              { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "expo.out" },
              2.55,
            )
            .to(
              "[data-ethical-stat-label]",
              { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
              2.75,
            )
            .to(
              "[data-ethical-cta]",
              { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
              2.9,
            )

            // Continuous parallax — image breathes throughout the journey
            .to("[data-ethical-image]", { yPercent: -10 }, 0)
            .to("[data-ethical-grain]", { backgroundPosition: "200px 200px" }, 0);
        },
      );

      media.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const elements = gsap.utils.toArray<HTMLElement>(
          "[data-ethical-reveal]",
          section,
        );
        if (!elements.length) return;

        gsap.set(elements, { opacity: 0, y: 30, willChange: "transform, opacity" });
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "opacity,transform,willChange",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  // Split the title into lines for staggered reveal
  const titleLines = ["The right way", "is the only way."];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0b0b0b] text-white"
      style={{ height: "420vh" }}
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        {/* Cinematic backdrop */}
        <div className="absolute inset-0">
          <div data-ethical-image className="absolute inset-0">
            <Image
              src="/images/ethical-mining.jpg"
              alt="Tanzanian miners working ethically at sunrise"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Vignette gradient — keeps text readable, deepens immersion */}
          <div
            data-ethical-vignette
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_85%)]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          {/* Subtle film grain for tactile depth */}
          <div
            data-ethical-grain
            className="pointer-events-none absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
            }}
          />
        </div>

        {/* Content grid */}
        <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12 lg:px-10">
          {/* LEFT — narrative */}
          <div className="col-span-1 flex flex-col justify-center lg:col-span-7">
            <span
              data-ethical-kicker
              data-ethical-reveal
              className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.4em] text-amber-300/90"
            >
              — Ethical Mining
            </span>

            <h2
              data-ethical-reveal
              className="mb-8 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <span data-ethical-title-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-ethical-copy
              data-ethical-reveal
              className="mb-10 max-w-xl text-lg leading-relaxed text-white/75 md:text-xl"
            >
              We believe Tanzania&apos;s mineral wealth must benefit the people who
              call this land home — and the environment that sustains it.
            </p>

            {/* Progress line — visual narrator */}
            <div
              data-ethical-reveal
              className="mb-10 h-px w-full max-w-md overflow-hidden bg-white/10"
            >
              <div data-ethical-progress className="h-full w-full bg-amber-300" />
            </div>

            {/* Pillars */}
            <ul className="mb-12 space-y-6">
              {ethicalHighlights.map((item, index) => (
                <li
                  key={index}
                  data-ethical-bullet
                  data-ethical-reveal
                  className="group flex items-start gap-5 border-l border-white/10 pl-5 transition-colors hover:border-amber-300/60"
                >
                  <span
                    data-ethical-bullet-num
                    className="mt-1 font-mono text-sm tracking-widest text-amber-300/80"
                  >
                    0{index + 1}
                  </span>
                  <p className="text-base leading-relaxed text-white/85 md:text-lg">
                    {item}
                  </p>
                </li>
              ))}
            </ul>

            <div data-ethical-cta data-ethical-reveal>
              <Link
                href="/about#commitment"
                className={`${buttonClasses.gold} group inline-flex items-center gap-2`}
              >
                Read Our Commitment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT — proof point */}
          <div className="col-span-1 hidden flex-col justify-end lg:col-span-5 lg:flex">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <div
                data-ethical-stat-num
                data-ethical-reveal
                className="font-serif text-7xl leading-none text-amber-300"
              >
                100%
              </div>
              <div
                data-ethical-stat-label
                data-ethical-reveal
                className="mt-3 text-sm uppercase tracking-[0.3em] text-white/70"
              >
                Audited supply chain
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
