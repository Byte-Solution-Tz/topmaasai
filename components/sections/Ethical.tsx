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
      if (!section) {
        return;
      }

      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const bullets = gsap.utils.toArray<HTMLElement>("[data-ethical-bullet]", section);

        gsap.set(
          [
            "[data-ethical-kicker]",
            "[data-ethical-title]",
            "[data-ethical-copy]",
            "[data-ethical-cta]",
            "[data-ethical-image]",
            ...bullets,
          ],
          { willChange: "transform, opacity" },
        );
        gsap.set("[data-ethical-progress]", {
          scaleX: 0,
          transformOrigin: "left center",
          willChange: "transform",
        });

        gsap
          .timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: section,
              pin: pinRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo("[data-ethical-image]", { scale: 1.12, opacity: 0.82 }, { scale: 1, opacity: 1 }, 0)
          .fromTo("[data-ethical-kicker]", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.06)
          .fromTo("[data-ethical-title]", { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, 0.12)
          .fromTo("[data-ethical-copy]", { opacity: 0, y: 32 }, { opacity: 1, y: 0 }, 0.22)
          .to("[data-ethical-progress]", { scaleX: 1 }, 0.28)
          .fromTo(
            bullets,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.14,
            },
            0.32,
          )
          .fromTo("[data-ethical-cta]", { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 0.72)
          .to("[data-ethical-image]", { yPercent: -6 }, 0);
      });

      media.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        const elements = gsap.utils.toArray<HTMLElement>("[data-ethical-reveal]", section);
        if (!elements.length) {
          return;
        }

        gsap.set(elements, {
          opacity: 0,
          y: 30,
          willChange: "transform, opacity",
        });

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

  return (
    <section ref={sectionRef} className="relative overflow-clip bg-primary text-primary-foreground lg:min-h-[220svh]">
      <div ref={pinRef} className="flex min-h-screen items-center py-20 lg:py-0">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div className="max-w-xl">
            <p className="eyebrow mb-6" data-ethical-kicker data-ethical-reveal>
              Ethical Mining
            </p>
            <h2 className="text-4xl leading-tight md:text-5xl" data-ethical-title data-ethical-reveal>
              The right way is the <span className="italic text-accent">only</span> way.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75" data-ethical-copy data-ethical-reveal>
              We believe Tanzania&apos;s mineral wealth must benefit the people who call this land home and
              the environment that sustains it.
            </p>
            <div className="mt-8 h-px w-24 overflow-hidden bg-primary-foreground/15" data-ethical-reveal>
              <span className="block h-full bg-accent" data-ethical-progress />
            </div>
            <ul className="mt-10 space-y-4">
              {ethicalHighlights.map((item, index) => (
                <li
                  key={item}
                  className="rounded-md border border-primary-foreground/10 bg-primary-foreground/5 p-5 text-primary-foreground/85 backdrop-blur-sm"
                  data-ethical-bullet
                  data-ethical-reveal
                >
                  <span className="text-[10px] uppercase tracking-[0.24em] text-accent">0{index + 1}</span>
                  <p className="mt-3 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
            <Link href="/ethical-mining" className={`${buttonClasses.gold} mt-10`} data-ethical-cta data-ethical-reveal>
              Read Our Commitment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] border border-primary-foreground/10 bg-primary-foreground/[0.03]" />
            <Image
              src="/images/ethical-landscape.jpg"
              alt="Ethical mining operations in the Tanzanian highlands"
              width={1280}
              height={960}
              className="aspect-[4/5] w-full rounded-md object-cover shadow-elevated will-change-transform"
              data-ethical-image
              data-ethical-reveal
            />
            <div className="maasai-border absolute -top-3 left-8 right-8 opacity-90" />
            <div className="absolute bottom-6 left-6 max-w-[220px] rounded-md border border-primary-foreground/10 bg-primary/80 p-5 shadow-card backdrop-blur-md">
              <p className="text-3xl text-accent">100%</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
                Audited supply chain
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
