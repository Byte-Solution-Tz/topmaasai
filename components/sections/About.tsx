"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { buttonClasses } from "@/lib/styles";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        // ── Image: clip-path curtain reveal ─────────────────────────────
        // The image is initially hidden behind a clip from the bottom,
        // then the clip slides upward to unveil as you scroll it into view.
        gsap.set("[data-about-image-wrap]", {
          clipPath: "inset(100% 0% 0% 0%)",
          willChange: "clip-path",
        });

        gsap.to("[data-about-image-wrap]", {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power3.inOut",
          clearProps: "clip-path,willChange",
          scrollTrigger: {
            trigger: "[data-about-image-wrap]",
            start: "top 78%",
            once: true,
          },
        });

        // ── Subtle scale on the image itself ────────────────────────────
        gsap.fromTo(
          "[data-about-image]",
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: "[data-about-image-wrap]",
              start: "top 78%",
              once: true,
            },
          },
        );

        // ── Stat badge pops in with a spring ────────────────────────────
        gsap.fromTo(
          "[data-about-badge]",
          { opacity: 0, scale: 0.7, rotate: -6 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
            delay: 0.55,
            clearProps: "opacity,transform",
            scrollTrigger: {
              trigger: "[data-about-image-wrap]",
              start: "top 78%",
              once: true,
            },
          },
        );

        // Animate the "30+" counter in the badge
        const badgeNum = section.querySelector<HTMLElement>("[data-about-counter]");
        if (badgeNum) {
          const target = 30;
          gsap.fromTo(
            badgeNum,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1.4,
              ease: "power1.out",
              snap: { innerText: 1 },
              onUpdate() {
                badgeNum.textContent = Math.round(parseFloat(gsap.getProperty(badgeNum, "innerText") as string)) + "+";
              },
              scrollTrigger: {
                trigger: "[data-about-image-wrap]",
                start: "top 78%",
                once: true,
              },
            },
          );
        }

        // ── Text side: staggered reveals ────────────────────────────────
        const textEls = gsap.utils.toArray<HTMLElement>("[data-about-reveal]", section);
        gsap.set(textEls, { opacity: 0, y: 28, willChange: "transform, opacity" });
        gsap.to(textEls, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.11,
          ease: "power2.out",
          clearProps: "opacity,transform,willChange",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });

        // ── Slow parallax on image as you scroll past ────────────────────
        gsap.to("[data-about-image]", {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          ["[data-about-image-wrap]", "[data-about-badge]", "[data-about-reveal]"],
          { clearProps: "all" },
        );
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="section overflow-hidden">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* ── Image column ─────────────────────────────────────────────── */}
        <div className="relative">
          {/* Clip-path wrapper — this is what we animate */}
          <div data-about-image-wrap>
            <Image
              src="/images/about-hands.jpg"
              alt="Artisan miner holding rough gemstones"
              width={1024}
              height={1024}
              className="aspect-[4/5] w-full rounded-md object-cover shadow-elevated will-change-transform"
              data-about-image
            />
          </div>

          {/* Stat badge */}
          <div
            className="absolute -bottom-6 -right-6 hidden max-w-[200px] rounded-md bg-accent p-6 text-accent-foreground shadow-elevated md:block"
            data-about-badge
          >
            <p className="text-4xl leading-none" data-about-counter>
              30+
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em]">Years of Heritage</p>
          </div>
        </div>

        {/* ── Text column ──────────────────────────────────────────────── */}
        <div>
          <p className="eyebrow mb-6" data-about-reveal>
            About Us
          </p>
          <h2 className="text-4xl leading-tight text-primary md:text-5xl" data-about-reveal>
            Rooted in the land.
            <br />
            Trusted across the world.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground" data-about-reveal>
            Founded in 1994 in the heart of Maasai country, our company combines generations of mining
            knowledge with modern standards of ethics, certification, and craftsmanship.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground" data-about-reveal>
            We work alongside local artisans and international partners to deliver gemstones and minerals
            of exceptional integrity, each piece carrying the spirit of its origin.
          </p>
          <Link href="/about" className={`${buttonClasses.navy} mt-9`} data-about-reveal>
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
