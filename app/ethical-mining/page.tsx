import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { ethicalPillars } from "@/lib/site-data";

const toRoman = (n: number) =>
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"][n - 1] ?? String(n);

const pillarIconStyles = [
  "bg-primary text-primary-foreground rounded-br-none",
  "bg-primary text-primary-foreground rounded-bl-none",
  "bg-primary text-primary-foreground rounded-tr-none",
  "bg-primary text-primary-foreground rounded-tl-none",
];

const centerIconPositions = ["-translate-x-full -translate-y-full", "-translate-y-full", "-translate-x-full", ""];

const pillarContentSpacing = ["sm:pr-16", "sm:pl-16", "sm:pr-16", "sm:pl-16"];

export const metadata: Metadata = {
  title: "Ethical Mining",
  description:
    "See Top Maasai Mining Co.'s ethical mining philosophy: no child labor, responsible environmental practices, fair compensation, traceability, and compliance with government regulations.",
};

export default function EthicalMiningPage() {
  return (
    <>
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="Ethical Mining"
          title="Ethical mining is our operating philosophy."
          description="Every gemstone should carry a story of fairness, dignity, and responsibility."
        />
      </div>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-6">
            <p className="eyebrow mb-2">Our Promise</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              Every gemstone carries a story.
              <br />
              Fairness, dignity, and responsibility.
            </h2>
            <p>
              At Top Maasai Mining Co., ethical mining is not just a statement. It is our operating
              philosophy.
            </p>
            <p>
              We work closely with registered miners and community partners to ensure the gemstone
              trade creates real value for the people behind it.
            </p>
          </div>
          <div className="lg:col-span-6">
            <Image
              src="/images/ethical-miners.png"
              alt="Ethical miners working with gemstones in Tanzania"
              width={1080}
              height={1080}
              className="w-full rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-primary text-primary-foreground">
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
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="eyebrow mb-5 text-accent">Our Pillars</p>
            <h2 className="text-4xl leading-tight md:text-5xl">
              How we mine.
              <br />
              How we live.
            </h2>
          </div>

          <div className="relative mx-auto grid max-w-5xl gap-16 sm:grid-cols-2" data-ethical-pillar-grid>
            {ethicalPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="group relative min-h-[320px] overflow-hidden rounded-[2px] bg-primary/78"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-[0.14] mix-blend-luminosity transition duration-500 group-hover:opacity-[0.2]"
                  style={{ backgroundImage: "url('/images/top-maasai-service-section-bg.png')" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-primary via-primary/78 to-primary/24"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/25 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-primary/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="absolute inset-0 rounded-[2px] border border-accent/25 transition-colors duration-500 group-hover:border-accent/55" />

                <div className="absolute left-5 top-5 z-10" aria-hidden="true">
                  <div className="absolute left-0 top-0 h-4 w-px bg-accent/60" />
                  <div className="absolute left-0 top-0 h-px w-4 bg-accent/60" />
                </div>

                <div
                  className={`absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-7 ${pillarContentSpacing[index]}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[10px] font-light tracking-[0.45em] text-accent/70">
                      {toRoman(index + 1)}
                    </span>
                  </div>

                  <div style={{ textShadow: "0 2px 14px rgb(0 0 0 / 0.85)" }}>
                    <div className="mb-4 h-px w-full bg-primary-foreground/35" />
                    <h3 className="font-heading text-2xl font-medium leading-[1.12] tracking-[-0.01em] text-primary-foreground md:text-3xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 font-body text-sm font-medium  leading-[1.7] text-primary-foreground/78">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 sm:block"
              aria-hidden="true"
            >
              {ethicalPillars.map((pillar, index) => (
                <span
                  key={pillar.title}
                  className={`absolute left-1/2 top-1/2 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-2 border-accent ${centerIconPositions[index]} ${pillarIconStyles[index]}`}
                >
                  <pillar.icon className="h-8 w-8" strokeWidth={1.5} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      

    </>
  );
}
