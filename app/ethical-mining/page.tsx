import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/sections/PageHeader";
import { ethicalPillars } from "@/lib/site-data";

const pillarStyles = [
  {
    badge: "left-4 top-4 border-accent bg-accent/10",
    icon: "bg-accent text-accent-foreground",
    drop: "rounded-br-none",
    card: "md:rounded-br-none",
  },
  {
    badge: "right-4 top-4 border-accent bg-maasai-earth/10",
    icon: "bg-maasai-earth text-primary-foreground",
    drop: "rounded-bl-none",
    card: "md:rounded-bl-none",
  },
  {
    badge: "left-4 bottom-4 border-accent bg-maasai-red/10",
    icon: "bg-maasai-red text-primary-foreground",
    drop: "rounded-tr-none",
    card: "md:rounded-tr-none",
  },
  {
    badge: "right-4 bottom-4 border-accent bg-primary/10",
    icon: "bg-primary text-primary-foreground",
    drop: "rounded-tl-none",
    card: "md:rounded-tl-none",
  },
];

const centerIconPositions = ["-translate-x-full -translate-y-full", "-translate-y-full", "-translate-x-full", ""];

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

          <div className="relative mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-4">
            {ethicalPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`relative min-h-[18rem] overflow-hidden rounded-[2rem] border-2 border-accent bg-white px-8 py-12 text-center shadow-card md:min-h-[19rem] md:px-12 md:py-16 ${pillarStyles[index].card}`}
              >
                <div
                  className={`absolute grid h-16 w-16 place-items-center rounded-full border-[7px] text-2xl text-primary shadow-sm md:h-20 md:w-20 md:text-3xl ${pillarStyles[index].badge}`}
                >
                  0{index + 1}
                </div>

                <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full md:hidden">
                  <span
                    className={`grid h-16 w-16 place-items-center rounded-full border-2 border-primary-foreground ${pillarStyles[index].icon}`}
                  >
                    <pillar.icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                </div>

                <h3 className="mx-auto max-w-xs text-3xl leading-tight text-primary md:text-4xl">{pillar.title}</h3>
                <p className="mx-auto mt-8 max-w-sm text-base leading-relaxed text-muted-foreground md:text-lg">
                  {pillar.description}
                </p>
              </article>
            ))}

            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 md:block"
              aria-hidden="true"
            >
              {ethicalPillars.map((pillar, index) => (
                <span
                  key={pillar.title}
                  className={`absolute left-1/2 top-1/2 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-2 border-primary-foreground ${pillarStyles[index].drop} ${centerIconPositions[index]} ${pillarStyles[index].icon}`}
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
