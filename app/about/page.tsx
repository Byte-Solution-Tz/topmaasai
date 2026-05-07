"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Globe2 } from "lucide-react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap, useGSAP } from "@/lib/gsap";
import { PageHeader } from "@/components/sections/PageHeader";
import { aboutPillars, globalReachStats } from "@/lib/site-data";

// ─────────────────────────────────────────────────────────────────────────────
// Heritage
// ─────────────────────────────────────────────────────────────────────────────

function Counter({ to, inView }: { to: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, to]);

  return <>{value}+</>;
}

function HeritageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(imageWrapRef, { once: true, margin: "-15%" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--gold))] opacity-10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[hsl(var(--emerald-deep))] opacity-10 blur-3xl"
      />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.35] mix-blend-multiply" />

      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="heritage-blob-clip" clipPathUnits="objectBoundingBox">
            <path
              transform="scale(0.01, 0.01)"
              d="M50,4 C70,2 92,8 96,28 C100,48 98,68 95,82 C91,96 78,100 60,98 C42,96 18,94 8,78 C-2,62 2,40 6,22 C10,6 30,6 50,4Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div className="container-x relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative mx-auto w-full max-w-[520px]">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute -left-6 bottom-10 right-10 -top-6 rounded-[2rem] border border-[hsl(var(--gold)/0.3)]"
            style={{ y: cardY, background: "hsl(var(--primary))" }}
            aria-hidden="true"
          />

          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="absolute -inset-4 rounded-full border border-dashed border-[hsl(var(--gold)/0.4)] animate-[spin_60s_linear_infinite]"
          />

          <motion.div
            ref={imageWrapRef}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full"
            style={{ filter: "drop-shadow(var(--shadow-deep))" }}
          >
            <div
              className="relative h-full w-full overflow-hidden bg-primary"
              style={{ clipPath: "url(#heritage-blob-clip)" }}
            >
              <motion.img
                src="/images/founder.png"
                alt="Founder Joram Meagie Lukumay, known as Balozi"
                width={896}
                height={1152}
                loading="lazy"
                style={{ y: imageY }}
                className="h-full w-full scale-110 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-primary/20"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 mix-blend-soft-light"
                style={{ background: "hsl(var(--primary) / 0.45)" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: -4 } : {}}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -bottom-6 -left-4 flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] md:h-36 md:w-36"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <span className="font-heading text-4xl font-semibold leading-none md:text-5xl">
              <Counter to={30} inView={inView} />
            </span>
            <span className="mt-1 px-3 text-center font-body text-[0.68rem] font-semibold uppercase tracking-[0.15em]">
              Years of Heritage
            </span>
          </motion.div>
        </div>

        <div className="relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold))]"
          >
            <span className="h-px w-10 bg-[hsl(var(--earth))]" />
            Our Heritage
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground md:text-6xl lg:text-[4.25rem]"
          >
            From the Heart of Mererani
            <br />
            <span className="italic text-[hsl(var(--gold))]">to the World</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-[600px] font-body text-lg leading-[1.8] text-foreground/76 md:text-xl"
          >
            Our work goes beyond gemstones.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 max-w-[600px] font-body text-base leading-[1.85] text-foreground/68"
          >
            In 1993, in the mineral-rich lands of Mererani, Arusha, a passionate gemstone trader
            named Joram Meagie Lukumay (Balozi) began a humble journey.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="mt-5 max-w-[600px] font-body text-base leading-[1.85] text-foreground/68"
          >
            What started as a brokerage among colleagues in the gemstone trade gradually grew into
            something greater: a trusted network connecting miners, craftsmen, and global buyers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.52 }}
            className="mt-5 max-w-[600px] font-body text-base leading-[1.85] text-foreground/68"
          >
            Top Maasai Mining Co. is a Tanzania-based gemstone sourcing, mining investment and
            jewelry production company specializing in rare and precious colored stones.
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="mt-9 max-w-[600px] border-l-2 border-accent pl-5 font-heading text-2xl leading-[1.22] tracking-[-0.01em] text-primary md:text-3xl"
          >
            "Everyone in the business chain should eat, each person deserves the value of their work."
            <footer className="mt-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Founder, Joram Meagie Lukumay (Balozi)
            </footer>
          </motion.blockquote>

          <motion.dl
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20%" }}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } } }}
            className="mt-12 grid grid-cols-3 gap-6 border-y border-border/60 py-8"
          >
            {[
              { key: "30+", value: "Years of trust" },
              { key: "1993", value: "Mererani origin" },
              { key: "Source", value: "To market" },
            ].map((stat) => (
              <motion.div
                key={stat.value}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                <dt className="font-heading text-3xl font-semibold tracking-[-0.01em] text-foreground md:text-4xl">{stat.key}</dt>
                <dd className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-foreground/55">{stat.value}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pillars
// ─────────────────────────────────────────────────────────────────────────────

function PillarsSection() {
  const ref = useRef<HTMLElement>(null);
  const featuredPillars = aboutPillars.filter((pillar) => pillar.title === "Vision" || pillar.title === "Mission");
  const values = aboutPillars
    .find((pillar) => pillar.title === "Our Values")
    ?.description.replace(/\.$/, "")
    .split(", ")
    .filter(Boolean) ?? [];

  const valuePositions = [
    "left-1/2 top-0 -translate-x-1/2",
    "right-0 top-[26%]",
    "right-[14%] bottom-0",
    "left-[14%] bottom-0",
    "left-0 top-[26%]",
  ];

  useGSAP(() => {
    const section = ref.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-pillar-reveal]", section);
      gsap.set(elements, { opacity: 0, y: 28, willChange: "transform, opacity" });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,transform,willChange",
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.10] mix-blend-luminosity"
        style={{ backgroundImage: "url('/images/top-maasai-service-section-bg.png')" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-repeat mix-blend-overlay"
        style={{
          backgroundImage: "url('/images/grain.png')",
          backgroundSize: "420px 236px",
          opacity: 0.28,
        }}
      />

      <div className="container-x relative">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16" data-pillar-reveal>
          <p className="eyebrow mb-5 !text-accent/80">What Guides Us</p>
          <h2 className="font-heading text-4xl leading-[1.1] tracking-[-0.02em] md:text-5xl lg:text-[3.2rem]">
            Vision, mission,
            <br />
            <em className="text-accent not-italic">and values.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-base leading-[1.7] text-primary-foreground/62">
            Three foundations that guide ethical trade, exceptional craftsmanship, and trusted
            partnerships.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          {featuredPillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                data-pillar-reveal
                className="relative min-h-[300px] rounded-[2rem] border border-accent/25 bg-primary/70 p-8 shadow-elevated backdrop-blur-sm md:p-10"
              >
                <span
                  className="absolute right-8 top-8 font-heading text-6xl leading-none text-primary-foreground/8"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>
                <div className="relative">
                  <span className="mb-8 grid h-14 w-14 place-items-center rounded-full border border-accent/45 text-accent">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-heading text-3xl leading-[1.12] tracking-[-0.02em] text-primary-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-5 font-body text-base leading-[1.7] text-primary-foreground/68">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-16 max-w-[34rem]" data-pillar-reveal>
          <div className="relative aspect-square">
            <div className="absolute inset-16 rounded-full border border-accent/25 md:inset-20" />
            <div className="absolute inset-24 rounded-full border border-primary-foreground/10 md:inset-28" />
            <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/50 bg-primary/75 text-center shadow-elevated backdrop-blur-sm md:h-40 md:w-40">
              <span className="font-heading text-3xl tracking-[-0.02em] text-accent md:text-4xl">Values</span>
            </div>

            {values.map((value, index) => (
              <div
                key={value}
                className={`absolute ${valuePositions[index]} grid h-24 w-24 place-items-center rounded-full border border-accent/60 bg-primary/80 p-3 text-center shadow-card backdrop-blur-sm md:h-28 md:w-28`}
              >
                <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/82 md:text-sm">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Global Reach
// ─────────────────────────────────────────────────────────────────────────────

function GlobalReachSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = ref.current;
    if (!section) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Parallax
      gsap.to("[data-gr-img]", {
        yPercent: -8, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });

      // Floating panel content
      const els = gsap.utils.toArray<HTMLElement>("[data-gr-el]", section);
      gsap.set(els, { opacity: 0, y: 24 });
      gsap.to(els, {
        opacity: 1, y: 0,
        duration: 0.7, stagger: 0.1, ease: "power2.out",
        clearProps: "opacity,transform",
        scrollTrigger: { trigger: "[data-gr-panel]", start: "top 80%", once: true },
      });

      // Stat numbers count up
      const nums = gsap.utils.toArray<HTMLElement>("[data-gr-num]", section);
      nums.forEach((el) => {
        const raw = el.textContent ?? "";
        const numeric = parseFloat(raw.replace(/[^\d.]/g, ""));
        const suffix  = raw.replace(/[\d.]/g, "");
        if (!isNaN(numeric)) {
          gsap.fromTo(el, { innerText: 0 }, {
            innerText: numeric, duration: 1.4, ease: "power1.out",
            snap: { innerText: numeric < 10 ? 0.1 : 1 },
            onUpdate() {
              el.textContent =
                (numeric < 10
                  ? parseFloat(gsap.getProperty(el, "innerText") as string).toFixed(1)
                  : Math.round(parseFloat(gsap.getProperty(el, "innerText") as string))) + suffix;
            },
            scrollTrigger: { trigger: "[data-gr-panel]", start: "top 80%", once: true },
          });
        }
      });

      // Stat accent lines draw in
      const lines = gsap.utils.toArray<HTMLElement>("[data-gr-stat-line]", section);
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(lines, {
        scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: { trigger: "[data-gr-panel]", start: "top 80%", once: true },
      });
    });
    return () => media.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="relative overflow-hidden">

      {/* Full-bleed image */}
      <div className="relative h-[65vh] min-h-[480px]">
        <Image
          src="/images/ethical-landscape.jpg"
          alt="Tanzanian highland landscape near Arusha"
          fill
          sizes="100vw"
          className="object-cover will-change-transform"
          data-gr-img
        />
        <div className="absolute inset-0 bg-primary/35" />
        <div className="maasai-border absolute inset-x-0 bottom-0 opacity-50" />
      </div>

      {/* Floating two-column panel overlapping image */}
      <div className="relative z-10 -mt-28 pb-24 md:-mt-36">
        <div className="container-x">
          <div
            data-gr-panel
            className="grid overflow-hidden rounded-[3px] shadow-elevated md:grid-cols-[1.3fr_1fr]"
          >
            {/* Left: text */}
            <div className="bg-background px-8 py-12 md:px-12 md:py-16">
              <p className="eyebrow mb-5" data-gr-el>Global Reach</p>
              <h2 className="text-4xl leading-[1.06] text-primary md:text-5xl" data-gr-el>
                Rooted in Tanzania.
                <br />
                <em className="text-accent not-italic">Connected to the world.</em>
              </h2>
              <p className="mt-6 text-sm leading-[1.9] text-muted-foreground" data-gr-el>
                We connect people to the natural beauty of Tanzania, to the communities that mine
                these treasures, and to the stories held within every stone.
              </p>
              <div className="mt-8 flex items-center gap-3" data-gr-el>
                <Globe2 className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span className="text-xs tracking-wide text-muted-foreground">
                  East Africa · Europe · Thailand · Singapore · China · and beyond
                </span>
              </div>
            </div>

            {/* Right: dark stat panel */}
            <div className="flex flex-col justify-between bg-primary px-8 py-12 text-primary-foreground md:px-12 md:py-16">
              <p className="eyebrow !text-accent/70 mb-10" data-gr-el>By the numbers</p>
              <div className="space-y-8">
                {globalReachStats.map((stat) => (
                  <div key={stat.label} data-gr-el>
                    <p
                      className="text-5xl font-light leading-none tracking-tight text-primary-foreground"
                      data-gr-num
                    >
                      {stat.value}
                    </p>
                    <div className="mt-2.5 h-px w-8 bg-accent/50" data-gr-stat-line />
                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-primary-foreground/50">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="About Us"
          title="From the Heart of Mererani to the World"
          description="What started as a brokerage among colleagues in the gemstone trade gradually grew into a trusted network connecting miners, craftsmen, and global buyers."
        />
      </div>

      <HeritageSection />
      <PillarsSection />
      <GlobalReachSection />
    </>
  );
}
