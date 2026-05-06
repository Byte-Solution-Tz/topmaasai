"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { homeDifferentiators, serviceDetails } from "@/lib/site-data";

const toRoman = (n: number) =>
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] ?? String(n);

export function ServicesSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useScrollReveal(rootRef, { selector: "[data-reveal]" });

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Header line draws in ─────────────────────────────────────────
        gsap.fromTo("[data-svc-rule]",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1, duration: 1.0, ease: "power3.inOut",
            scrollTrigger: { trigger: "[data-svc-header]", start: "top 82%", once: true },
          },
        );

        // ── Cards cascade in ─────────────────────────────────────────────
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);
        gsap.set(cards, { opacity: 0, y: 60, willChange: "transform, opacity" });
        gsap.to(cards, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          stagger: { amount: 0.45, from: "start" },
          ease: "power2.out",
          clearProps: "opacity,transform,willChange",
          scrollTrigger: { trigger: "[data-service-grid]", start: "top 82%", once: true },
        });

      });

      // ── Hover: image scales, overlay deepens ─────────────────────────────
      media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-service-card]", root);

        const cleanups = cards.map((card) => {
          const img     = card.querySelector<HTMLElement>("[data-card-img]");
          const overlay = card.querySelector<HTMLElement>("[data-card-overlay]");
          const arrow   = card.querySelector<HTMLElement>("[data-card-arrow]");

          const enter = () => {
            if (img)     gsap.to(img,     { scale: 1.07, duration: 0.55, ease: "power2.out", overwrite: "auto" });
            if (overlay) gsap.to(overlay, { opacity: 1,  duration: 0.35, ease: "power1.out", overwrite: "auto" });
            if (arrow)   gsap.to(arrow,   { x: 2, y: -2, opacity: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          };
          const leave = () => {
            if (img)     gsap.to(img,     { scale: 1,    duration: 0.5,  ease: "power2.inOut", overwrite: "auto" });
            if (overlay) gsap.to(overlay, { opacity: 0,  duration: 0.35, ease: "power1.out", overwrite: "auto" });
            if (arrow)   gsap.to(arrow,   { x: 0, y: 0,  opacity: 0.4, duration: 0.25, ease: "power2.out", overwrite: "auto" });
          };

          card.addEventListener("mouseenter", enter);
          card.addEventListener("mouseleave", leave);
          return () => {
            card.removeEventListener("mouseenter", enter);
            card.removeEventListener("mouseleave", leave);
          };
        });

        return () => cleanups.forEach((c) => c());
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          gsap.utils.toArray("[data-service-card]", root),
          { clearProps: "all" },
        );
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef}>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">

        {/* Background texture image */}
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

          {/* Header */}
          <div
            data-svc-header
            className="mb-14 grid items-end gap-8 border-b border-primary-foreground/10 pb-12 md:grid-cols-[1fr_auto] md:mb-16"
          >
            <div data-reveal>
              <p className="eyebrow mb-5 !text-accent/80">Our Services</p>
              <h2 className="font-heading text-4xl leading-[1.1] tracking-[-0.02em] md:text-5xl">
                From source
                <br />
                <em className="text-accent not-italic">to final product.</em>
              </h2>
            </div>
            <div className="mb-1 max-w-[260px]" data-reveal>
              <div className="mb-4 h-px bg-accent" data-svc-rule />
              <p className="font-body text-sm leading-[1.7] text-primary-foreground/62">
                An integrated model for traceability, quality assurance, and transparency from the
                mine to the final product.
              </p>
            </div>
          </div>

          {/* Card grid — all services */}
          <div
            data-service-grid
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {serviceDetails.map((service, i) => (
              <Link
                key={service.number}
                href="/services"
                data-service-card
                className="group relative overflow-hidden rounded-[2px]"
                style={{ minHeight: "320px" }}
              >
                {/* Photo */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover will-change-transform"
                    data-card-img
                  />
                  {/* Permanent gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/78 to-primary/18" />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
                  {/* Hover deepener */}
                  <div
                    data-card-overlay
                    className="absolute inset-0 bg-primary/25"
                    style={{ opacity: 0 }}
                  />
                </div>

                {/* Accent border — shows on hover via CSS transition */}
                <div className="absolute inset-0 rounded-[2px] border border-accent/25 transition-colors duration-500 group-hover:border-accent/55" />

                {/* Top-left corner bracket */}
                <div className="absolute left-5 top-5 z-10" aria-hidden="true">
                  <div className="absolute left-0 top-0 h-4 w-px bg-accent/60" />
                  <div className="absolute left-0 top-0 h-px w-4 bg-accent/60" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-7">
                  {/* Roman + arrow */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.45em] text-accent/70 font-light">
                      {toRoman(i + 1)}
                    </span>
                    <ArrowUpRight
                      data-card-arrow
                      className="h-3.5 w-3.5 text-primary-foreground/40"
                      style={{ opacity: 0.4 }}
                    />
                  </div>

                  {/* Bottom text */}
                  <div style={{ textShadow: "0 2px 14px rgb(0 0 0 / 0.85)" }}>
                    {/* Rule */}
                    <div className="mb-4 h-px w-full bg-primary-foreground/35" />
                    <h3 className="font-heading text-lg font-medium leading-[1.18] tracking-[-0.01em] text-primary-foreground md:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 font-body text-xs font-medium leading-[1.7] text-primary-foreground/82">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer link */}
          <div className="mt-10 flex justify-center" data-reveal>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 border border-primary-foreground/20 px-8 py-3.5 font-body text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60 transition-colors hover:border-accent/50 hover:text-accent"
            >
              <span className="h-px w-6 bg-current transition-all group-hover:w-10" />
              View all services
            </Link>
          </div>
        </div>
      </section>

      <DifferentiatorsSection />

    </div>
  );
}

function DifferentiatorsSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const headerEls = gsap.utils.toArray<HTMLElement>("[data-diff-header]", section);
        gsap.set(headerEls, { opacity: 0, y: 22 });
        gsap.to(headerEls, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: "power2.out",
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: section, start: "top 80%", once: true },
        });

        const cards = gsap.utils.toArray<HTMLElement>("[data-diff-card]", section);
        gsap.set(cards, { opacity: 0, y: 32, willChange: "transform, opacity" });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "opacity,transform,willChange",
          scrollTrigger: { trigger: "[data-diff-grid]", start: "top 82%", once: true },
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          gsap.utils.toArray("[data-diff-card],[data-diff-header]", section),
          { clearProps: "all" },
        );
      });

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-24 text-foreground md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.45), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--emerald-deep) / 0.5), transparent 70%)" }}
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.32] mix-blend-multiply" />

      <div className="container-x relative">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <p className="eyebrow mb-5 justify-center text-[hsl(var(--earth))]" data-diff-header>
            Why Work With Us
          </p>
          <h2
            className="font-heading text-4xl leading-[1.1] tracking-[-0.02em] text-primary md:text-5xl lg:text-[3.25rem]"
            data-diff-header
          >
            Trusted relationships, transparent sourcing.
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl font-body text-base leading-[1.7] text-foreground/62"
            data-diff-header
          >
            Three decades in the gemstone trade, direct producer-to-buyer connections, and
            end-to-end services from mineral sourcing to jewelry creation.
          </p>
        </div>

        <div data-diff-grid className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {homeDifferentiators.map((item, index) => (
            <article
              key={item.title}
              data-diff-card
              className="group relative min-h-[340px] rounded-sm border border-[hsl(var(--gold)/0.35)] bg-transparent p-9 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute right-6 top-6 h-14 w-14 border-r-4 border-t-4 border-[hsl(var(--gold))] transition-colors duration-300" />
              <div className="pointer-events-none absolute bottom-6 left-6 h-14 w-14 border-b-4 border-l-4 border-[hsl(var(--gold))] transition-colors duration-300" />

              <span className="mb-9 grid h-16 w-16 place-items-center rounded-full border-2 border-[hsl(var(--gold))] text-xl font-semibold text-[hsl(var(--gold))] transition-colors duration-300 group-hover:bg-[hsl(var(--gold))] group-hover:text-[hsl(var(--gold-foreground))]">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-heading text-2xl leading-[1.18] tracking-[-0.01em] text-primary">{item.title}</h3>
              <p className="mt-4 font-body text-base leading-[1.7] text-muted-foreground">
                {item.description}
              </p>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
