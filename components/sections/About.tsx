"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { animate, motion, useInView, useScroll, useTransform } from "framer-motion";

function Counter({ to, inView }: { to: number; inView: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    const controls = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (latest) => setValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, to]);

  return <>{value}+</>;
}

export function AboutSection() {
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
    <section ref={sectionRef} id="about" className="relative overflow-hidden bg-background py-24 md:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.5), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--emerald-deep) / 0.55), transparent 70%)" }}
      />
      <div aria-hidden="true" className="grain absolute inset-0 opacity-[0.35] mix-blend-multiply" />

      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="about-blob-clip" clipPathUnits="objectBoundingBox">
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
              style={{ clipPath: "url(#about-blob-clip)" }}
            >
              <motion.img
                src="/images/founder.png"
                alt="Founder of Top Maasai"
                width={896}
                height={1152}
                loading="lazy"
                style={{ y: imageY }}
                className="h-full w-full scale-110 object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 50%, hsl(var(--heritage) / 0.55) 100%)",
                }}
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
            <span className="font-serif text-4xl font-semibold leading-none md:text-5xl">
              <Counter to={30} inView={inView} />
            </span>
            <span className="mt-1 px-3 text-center text-[0.68rem] font-medium uppercase tracking-[0.15em]">
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
            className="mb-6 inline-flex items-center gap-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--gold))]"
          >
            <span className="h-px w-10 bg-[hsl(var(--earth))]" />
            About Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl font-medium leading-[1.1] tracking-[-0.02em] text-foreground md:text-6xl lg:text-[4.25rem]"
          >
            From the heart of Mererani
            <br />
            <span className="italic text-[hsl(var(--emerald-deep))]">to the world.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 max-w-xl font-body text-base leading-[1.7] text-foreground/72 md:text-lg"
          >
            In 1993, in the mineral-rich lands of Mererani, Arusha, Joram Meagie Lukumay (Balozi)
            began a humble journey as a passionate gemstone trader.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-5 max-w-xl font-body text-base leading-[1.7] text-foreground/65"
          >
            What started as a brokerage among colleagues in the gemstone trade grew into a trusted
            network connecting miners, craftsmen, and global buyers.
          </motion.p>

          <motion.blockquote
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 max-w-xl border-l-2 border-accent pl-5 font-heading text-2xl leading-[1.2] tracking-[-0.01em] text-primary md:text-3xl"
          >
            "Everyone in the business chain should eat — each person deserves the value of their work."
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ x: 4 }}
            className="mt-10 inline-flex"
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-foreground"
            >
              <span className="relative">
                Our Story
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-foreground transition-transform duration-500 group-hover:scale-x-0" />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-[-45deg]">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
