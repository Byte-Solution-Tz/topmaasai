"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonClasses } from "@/lib/styles";

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Section entrance: text slides in from left, actions from right ──
        gsap.set("[data-cta-text]", { opacity: 0, x: -40, willChange: "transform, opacity" });
        gsap.set("[data-cta-actions]", { opacity: 0, x: 40, willChange: "transform, opacity" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
          defaults: { ease: "power3.out", duration: 0.8 },
        });

        tl.to("[data-cta-text]", { opacity: 1, x: 0, clearProps: "opacity,transform,willChange" })
          .to("[data-cta-actions]", { opacity: 1, x: 0, clearProps: "opacity,transform,willChange" }, "<0.15");

        // ── Scroll-driven: section slides up to meet the viewport ────────
        // Creates a "lifting curtain" effect as CTA approaches
        gsap.fromTo(
          section,
          { yPercent: 4 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 60%",
              scrub: true,
            },
          },
        );

        // ── Orb parallax ────────────────────────────────────────────────
        gsap.to("[data-cta-orb]", {
          yPercent: -30,
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // ── Stagger the text children ────────────────────────────────────
        const revealEls = gsap.utils.toArray<HTMLElement>("[data-cta-reveal]", section);
        if (revealEls.length) {
          gsap.set(revealEls, { opacity: 0, y: 22, willChange: "transform, opacity" });
          gsap.to(revealEls, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: "power2.out",
            clearProps: "opacity,transform,willChange",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              once: true,
            },
          });
        }
      });

      // ── Magnetic button effect (pointer devices only) ───────────────────
      media.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const buttons = gsap.utils.toArray<HTMLElement>("[data-cta-magnetic]", section);

        const cleanups = buttons.map((btn) => {
          const onMove = (e: MouseEvent) => {
            const rect = btn.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) * 0.28;
            const dy = (e.clientY - cy) * 0.28;
            gsap.to(btn, { x: dx, y: dy, duration: 0.35, ease: "power2.out", overwrite: "auto" });
          };

          const onLeave = () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
          };

          btn.addEventListener("mousemove", onMove);
          btn.addEventListener("mouseleave", onLeave);

          return () => {
            btn.removeEventListener("mousemove", onMove);
            btn.removeEventListener("mouseleave", onLeave);
          };
        });

        return () => cleanups.forEach((c) => c());
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(["[data-cta-text]", "[data-cta-actions]", "[data-cta-reveal]"], { clearProps: "all" });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-primary py-20 md:py-28">
      {/* Ambient orb — parallaxed independently */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
        data-cta-orb
        aria-hidden="true"
      />
      {/* Secondary smaller orb on bottom-left for depth */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-64 w-64 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
        {/* Text block */}
        <div className="max-w-2xl" data-cta-text>
          <p className="eyebrow mb-5" data-cta-reveal>
            Begin a Conversation
          </p>
          <h2 className="text-4xl leading-tight text-primary-foreground md:text-5xl" data-cta-reveal>
            Source Tanzania&apos;s finest gemstones with confidence.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/70" data-cta-reveal>
            Speak with our team about wholesale supply, custom cuts, or investment partnerships.
          </p>
        </div>

        {/* Actions — magnetic buttons */}
        <div className="flex flex-wrap gap-4" data-cta-actions>
          {/* Wrapper div is the magnetic target so the ripple area is generous */}
          <div data-cta-magnetic>
            <Link href="/contact" className={buttonClasses.gold}>
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div data-cta-magnetic>
            <Link href="/services" className={buttonClasses.outlineLight}>
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
