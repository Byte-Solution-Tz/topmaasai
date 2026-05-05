import type { Metadata } from "next";
import Image from "next/image";
import { Globe2 } from "lucide-react";
import { CtaSection } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { aboutPillars, globalReachStats } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Top Maasai Mining Co. grew from a Mererani mining concession into a trusted Tanzanian gemstone and mineral partner.",
};

export default function AboutPage() {
  return (
    <>
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="About Us"
          title="Three decades. One unwavering standard."
          description="From a single mining concession in Mererani to a global supplier of fine gemstones, our story is one of patience, partnership, and pride in our heritage."
        />
      </div>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow mb-5">Our Heritage</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              A family business,
              <br />
              forged in the highlands.
            </h2>
          </aside>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-8">
            <p>
              Top Maasai Mining Co. was founded in 1994 by Maasai elders and their sons on a single
              tanzanite concession in the Mererani Hills, the only place on earth where this rare blue gem
              is found.
            </p>
            <p>
              What began as a small artisanal operation has grown into a vertically integrated company
              supplying tanzanite, ruby, sapphire, garnet, and rare earth minerals to buyers across four
              continents.
            </p>
            <p>
              Through every chapter, we have held to the principle that the wealth of the earth should
              benefit the people and places closest to it, and that long-term trust matters more than any
              single transaction.
            </p>
            <Image
              src="/images/about-hands.jpg"
              alt="Artisan miner holding rough Tanzanian gemstones"
              width={1024}
              height={1024}
              className="mt-8 w-full rounded-md object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="container-x">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="eyebrow mb-5 justify-center">What Guides Us</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">Mission, vision, values.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {aboutPillars.map((pillar) => (
              <article key={pillar.title} className="rounded-md border bg-card p-10 shadow-card">
                <span className="mb-7 grid h-14 w-14 place-items-center rounded-full bg-primary text-accent">
                  <pillar.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="text-2xl text-primary">{pillar.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <Image
              src="/images/ethical-landscape.jpg"
              alt="Tanzanian highland landscape near Arusha"
              width={1920}
              height={1080}
              className="w-full rounded-md object-cover shadow-elevated"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-5">Global Reach</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              Local roots.
              <br />
              International standards.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Our stones travel from the Mererani Hills to ateliers in Geneva, New York, Mumbai, Hong
              Kong, and Dubai. Every shipment is accompanied by documented provenance and export
              certification.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {globalReachStats.map((stat) => (
                <div key={stat.label} className="border-l-2 border-accent pl-4">
                  <p className="text-3xl text-primary">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-3 text-muted-foreground">
              <Globe2 className="h-5 w-5 text-accent" />
              <span className="text-sm">Operating across four continents</span>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
