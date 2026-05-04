"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { homeDifferentiators, serviceHighlights } from "@/lib/site-data";

export function ServicesSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollReveal(rootRef, { selector: "[data-reveal]" });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const cardGrid = root.querySelector<HTMLElement>("[data-service-grid]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);

        // ── Cards: staggered cascade from bottom ────────────────────────
        if (cardGrid && cards.length) {
          gsap.set(cards, {
            opacity: 0,
            y: 70,
            scale: 0.97,
            willChange: "transform, opacity",
          });

          gsap.to(cards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: {
              amount: 0.55,
              // Start from top-left, flow across then down
              grid: "auto",
              from: "start",
              ease: "power1.in",
            },
            ease: "power2.out",
            clearProps: "opacity,transform,willChange",
            scrollTrigger: {
              trigger: cardGrid,
              start: "top 82%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
        }

        // ── Icon circles: rotate in on card entrance ─────────────────────
        const icons = gsap.utils.toArray<HTMLElement>("[data-service-icon]", root);
        gsap.set(icons, { rotate: -20, scale: 0.8, opacity: 0 });
        gsap.to(icons, {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.4)",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: cardGrid,
            start: "top 80%",
            once: true,
          },
        });

        // ── Differentiator items: slide in from alternating sides ─────────
        const diffItems = gsap.utils.toArray<HTMLElement>("[data-diff-item]", root);
        diffItems.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                once: true,
              },
            },
          );
        });
      });

      // ── Hover lift (pointer devices) ────────────────────────────────────
      media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);

        const cleanups = cards.map((card) => {
          const icon = card.querySelector("[data-service-icon]");

          const handleEnter = () => {
            gsap.to(card, {
              y: -10,
              scale: 1.018,
              duration: 0.26,
              ease: "power2.out",
              overwrite: "auto",
            });
            if (icon) {
              gsap.to(icon, {
                rotate: 8,
                scale: 1.1,
                duration: 0.26,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          };

          const handleLeave = () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.inOut",
              overwrite: "auto",
            });
            if (icon) {
              gsap.to(icon, {
                rotate: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut",
                overwrite: "auto",
              });
            }
          };

          card.addEventListener("mouseenter", handleEnter);
          card.addEventListener("mouseleave", handleLeave);

          return () => {
            card.removeEventListener("mouseenter", handleEnter);
            card.removeEventListener("mouseleave", handleLeave);
          };
        });

        return () => cleanups.forEach((c) => c());
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);
        gsap.set(cards, { clearProps: "all" });
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>
      {/* ── Services grid ──────────────────────────────────────────────── */}
      <section className="section bg-secondary/40">
        <div className="container-x">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5" data-reveal>
              What We Do
            </p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl" data-reveal>
              A complete vertical from mine to market.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-service-grid>
            {serviceHighlights.map((service, index) => (
              <article
                key={service.title}
                className="group rounded-md border bg-card p-8 shadow-card transition-shadow duration-300 hover:shadow-elevated will-change-transform"
                data-service-card
              >
                <span
                  className="mb-7 grid h-14 w-14 place-items-center rounded-full bg-primary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground"
                  data-service-icon
                >
                  <service.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="text-2xl text-primary">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  0{index + 1} / 0{serviceHighlights.length}
                </span>
              </article>
            ))}

            {/* CTA card */}
            <Link
              href="/services"
              className="group flex min-h-[260px] flex-col justify-between rounded-md bg-primary p-8 text-primary-foreground transition-colors hover:bg-primary/90 will-change-transform"
              data-service-card
            >
              <p className="eyebrow !text-accent">Explore</p>
              <div>
                <p className="text-3xl leading-tight">View all services</p>
                <ArrowRight className="mt-6 h-6 w-6 text-accent transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Differentiators ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow mb-5" data-reveal>
              Why Choose Us
            </p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl" data-reveal>
              Standards that make the difference.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground" data-reveal>
              Every partnership we build rests on four uncompromising principles.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {homeDifferentiators.map((item) => (
              <div key={item.title} className="flex gap-5" data-diff-item>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-xl text-primary">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
