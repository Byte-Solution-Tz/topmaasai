import type { Metadata } from "next";
import Image from "next/image";
import { CtaSection } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { commitmentStats, ethicalPillars } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Ethical Mining",
  description:
    "See the labor, environmental, and traceability standards that guide Top Maasai Mining Co. across every mining and sourcing operation.",
};

export default function EthicalMiningPage() {
  return (
    <>
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="Ethical Mining"
          title="A standard worth keeping."
          description="The history of African mining holds difficult chapters. We exist to write a different one and to prove that integrity and excellence are inseparable."
        />
      </div>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-7">
            <p className="eyebrow mb-2">Our Promise</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              Every stone carries a story.
              <br />
              We make sure it is one we can tell.
            </h2>
            <p>
              For thirty years, we have operated on the belief that the people of Tanzania and the land
              itself deserve better than extractive mining practices.
            </p>
            <p>
              That belief shapes who we hire, how we pay them, where we invest, and which buyers we
              choose to work with. It is slower, harder, and the only way we are willing to operate.
            </p>
          </div>
          <div className="lg:col-span-5">
            <Image
              src="/images/ethical-landscape.jpg"
              alt="Tanzanian highlands at sunset"
              width={1920}
              height={1080}
              className="w-full rounded-md object-cover shadow-elevated"
            />
          </div>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground">
        <div className="container-x">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-5">Four Pillars</p>
            <h2 className="text-4xl leading-tight md:text-5xl">
              How we mine.
              <br />
              How we live.
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {ethicalPillars.map((pillar, index) => (
              <article key={pillar.title} className="flex gap-6 border-t border-primary-foreground/15 pt-8">
                <div className="shrink-0">
                  <span className="mb-3 block text-xs uppercase tracking-[0.22em] text-accent">
                    0{index + 1}
                  </span>
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">
                    <pillar.icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-primary-foreground/75">{pillar.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 text-center md:grid-cols-3">
          {commitmentStats.map((stat) => (
            <div key={stat.label} className="rounded-md border bg-card p-10 shadow-card">
              <p className="text-6xl text-accent">{stat.value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
