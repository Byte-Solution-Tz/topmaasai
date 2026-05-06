import type { Metadata } from "next";
import Image from "next/image";
import { Globe2 } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { aboutPillars, globalReachStats } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Top Maasai Mining Co. grew from a Mererani gemstone brokerage into a trusted network connecting miners, craftsmen, and global buyers.",
};

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

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <p className="eyebrow mb-5">Our Heritage</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              A second-generation
              <br />
              family business.
            </h2>
          </aside>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:col-span-8">
            <p>
              In 1993, in the mineral-rich lands of Mererani, Arusha, a passionate gemstone trader
              named Joram Meagie Lukumay (Balozi) began a humble journey.
            </p>
            <p>
              What started as a brokerage among colleagues in the gemstone trade gradually grew into
              something greater: a trusted network connecting miners, craftsmen, and global buyers.
            </p>
            <p>
              Today, the company continues as a second-generation family business, expanding its reach
              across East Africa, Europe, Thailand, Singapore, China and beyond, while staying rooted in
              the values that started it all.
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
              Rooted in Tanzania.
              <br />
              Connected to the world.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              We connect people to the natural beauty of Tanzania, to the communities that mine these
              treasures, and to the stories held within every stone.
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
              <span className="text-sm">East Africa, Europe, Thailand, Singapore, China and beyond</span>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
