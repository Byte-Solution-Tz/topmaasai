"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { serviceDetails } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

const PANEL_DURATION = 1;
const OVERLAP = 0.35;

export function ImmersiveServices() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const sticky = stickyRef.current;
    if (!wrap || !sticky) {
      return;
    }

    const panelCount = serviceDetails.length;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      gsap.set("[data-panel]", { opacity: 1, position: "relative", pointerEvents: "auto" });
      gsap.set("[data-panel-image]", { clearProps: "all" });
      gsap.set("[data-panel-text]", { clearProps: "all" });
      return;
    }

    const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", sticky);
    const images = gsap.utils.toArray<HTMLElement>("[data-panel-image]", sticky);
    const texts = gsap.utils.toArray<HTMLElement>("[data-panel-text]", sticky);
    const dots = gsap.utils.toArray<HTMLElement>("[data-gem-dot]", sticky);

    gsap.set(panels, { opacity: 0, pointerEvents: "none" });
    gsap.set(images, { scale: 1.08, filter: "brightness(0.28)" });
    gsap.set(texts, { opacity: 0, y: 44 });
    gsap.set(dots, { scale: 0.5, opacity: 0.3 });

    gsap.set(panels[0], { opacity: 1, pointerEvents: "auto" });
    gsap.set(images[0], { scale: 1, filter: "brightness(0.46)" });
    gsap.set(texts[0], { opacity: 1, y: 0 });
    gsap.set(dots[0], { scale: 1, opacity: 1 });

    const timeline = gsap.timeline({ paused: true });
    tlRef.current = timeline;

    for (let index = 1; index < panelCount; index += 1) {
      const position = (index - 1) * PANEL_DURATION;

      timeline
        .to(texts[index - 1], { opacity: 0, y: -36, duration: OVERLAP, ease: "power2.in" }, position)
        .to(images[index - 1], { scale: 1.1, filter: "brightness(0.18)", duration: PANEL_DURATION, ease: "none" }, position)
        .to(
          panels[index - 1],
          { opacity: 0, pointerEvents: "none", duration: OVERLAP * 0.8, ease: "power1.in" },
          position + OVERLAP * 0.6,
        )
        .set(panels[index], { opacity: 1, pointerEvents: "auto" }, position + OVERLAP * 0.35)
        .fromTo(
          images[index],
          { scale: 1.16, filter: "brightness(0.16)", clipPath: "inset(5% 5% 5% 5% round 6px)" },
          {
            scale: 1,
            filter: "brightness(0.46)",
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            duration: PANEL_DURATION - OVERLAP * 0.35,
            ease: "power2.out",
          },
          position + OVERLAP * 0.35,
        )
        .fromTo(
          texts[index],
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          position + OVERLAP * 0.85,
        )
        .to(dots[index - 1], { scale: 0.5, opacity: 0.3, duration: OVERLAP, ease: "power1.in" }, position)
        .to(dots[index], { scale: 1, opacity: 1, duration: OVERLAP, ease: "back.out(2)" }, position + OVERLAP * 0.6);
    }

    const tween = gsap.to(timeline, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => `+=${(panelCount - 1) * window.innerHeight}`,
        scrub: 0.85,
        pin: sticky,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      timeline.kill();
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ height: `${serviceDetails.length * 100}vh` }} className="relative">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden bg-primary">
        {serviceDetails.map((service, index) => (
          <div key={service.number} data-panel className="absolute inset-0" style={{ opacity: 0, pointerEvents: "none" }}>
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover will-change-transform"
              data-panel-image
            />

            <div className="absolute inset-0 bg-primary/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/78 to-primary/24" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/78 via-primary/34 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,hsl(var(--accent)/0.12),transparent_24%)]" />

            <div className="absolute inset-0 flex items-end" data-panel-text>
              <div className="container-x w-full pb-16 md:pb-24 lg:pb-28">
                <div className="max-w-2xl">
                  <h2
                    className="text-4xl font-semibold leading-[1.04] text-primary-foreground md:text-5xl lg:text-6xl"
                    style={{ textShadow: "0 10px 28px rgba(0,0,0,0.35)" }}
                  >
                    {service.title}
                  </h2>

                  <p
                    className="mt-5 text-lg leading-relaxed text-primary-foreground"
                    style={{ textShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
                  >
                    {service.description}
                  </p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-primary-foreground/90">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                        <span className="text-sm leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact" className={`${buttonClasses.gold} mt-8`}>
                    Inquire <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <nav
          className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-4 md:flex md:right-10"
          aria-label="Service navigation"
        >
          {serviceDetails.map((service, index) => (
            <button
              key={service.number}
              data-gem-dot
              onClick={() => {
                if (!wrapRef.current) {
                  return;
                }
                const top = wrapRef.current.offsetTop + index * window.innerHeight;
                window.scrollTo({ top, behavior: "smooth" });
              }}
              className="group relative flex h-4 w-4 items-center justify-center"
              aria-label={`Go to ${service.title}`}
              style={{ opacity: 0.3 }}
            >
              <span className="block h-3 w-3 rotate-45 rounded-[2px] bg-accent transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />
              <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded bg-primary/80 px-2.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-primary-foreground/80 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                {service.title}
              </span>
            </button>
          ))}
        </nav>

        <ScrollHint wrapRef={wrapRef} />
      </div>
    </div>
  );
}

function ScrollHint({ wrapRef }: { wrapRef: React.RefObject<HTMLDivElement> }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const wrap = wrapRef.current;
    if (!element || !wrap) {
      return;
    }

    const onScroll = () => {
      const sectionProgress = window.scrollY - wrap.offsetTop;
      const maxProgress = (serviceDetails.length - 1) * window.innerHeight;
      const isWithinServices = sectionProgress >= -window.innerHeight * 0.25 && sectionProgress < maxProgress - 80;

      gsap.to(element, {
        opacity: isWithinServices ? 1 : 0,
        y: isWithinServices ? 0 : 12,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [wrapRef]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-5 left-1/2 z-20 flex w-[min(88vw,22rem)] -translate-x-1/2 flex-col items-center gap-2 rounded-md border border-primary-foreground/15 bg-primary/70 px-4 py-3 text-center opacity-0 shadow-elevated backdrop-blur-md md:hidden"
      aria-hidden="true"
    >
      <span className="text-[10px] uppercase tracking-[0.22em] text-primary-foreground/80">
        Keep scrolling for more services
      </span>
      <ChevronDown className="h-5 w-5 animate-bounce text-accent" strokeWidth={2.2} />
    </div>
  );
}
