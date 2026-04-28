import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader, CtaBanner } from "@/components/site/Sections";
import { Compass, Eye, Heart, Globe2 } from "lucide-react";
import aboutImg from "@/assets/about-hands.jpg";
import landscape from "@/assets/ethical-landscape.jpg";

const pillars = [
  {
    icon: Compass,
    title: "Our Mission",
    desc: "To responsibly bring Tanzania's rare minerals to the world while uplifting the communities and lands from which they come.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be Africa's most trusted name in ethical gemstone sourcing — recognized for craftsmanship, transparency, and heritage.",
  },
  {
    icon: Heart,
    title: "Our Values",
    desc: "Integrity in every transaction. Respect for people and place. Excellence in every stone we touch.",
  },
];

const About = () => (
  <SiteLayout>
    <PageHeader
      eyebrow="About Us"
      title="Three decades. One unwavering standard."
      description="From a single mining concession in Mererani to a global supplier of fine gemstones, our story is one of patience, partnership, and pride in our heritage."
    />

    {/* STORY */}
    <section className="section">
      <div className="container-x grid lg:grid-cols-12 gap-14">
        <aside className="lg:col-span-4">
          <p className="eyebrow mb-5">Our Heritage</p>
          <h2 className="font-serif text-4xl text-primary leading-tight">
            A family business, <br />
            forged in the highlands.
          </h2>
        </aside>
        <div className="lg:col-span-8 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Top Maasai Mining Co. was founded in 1994 by a group of Maasai elders and their sons, on a single tanzanite concession in the Mererani Hills — the only place on earth where this rare blue gem is found.
          </p>
          <p>
            What began as a small artisanal operation has grown, over thirty years, into a vertically integrated company exporting tanzanite, ruby, sapphire, garnet and rare earth minerals to refiners, jewelers and institutional buyers across four continents.
          </p>
          <p>
            Through every chapter, we have held true to the principles instilled by our founders: that the wealth of the earth must serve those who live closest to it, and that a single dishonest stone can undo decades of trust.
          </p>
          <img
            src={aboutImg}
            alt="Artisan miner holding rough Tanzanian gemstones"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full aspect-[16/10] object-cover rounded-md mt-8 shadow-card"
          />
        </div>
      </div>
    </section>

    {/* MISSION VISION VALUES */}
    <section className="section bg-secondary/40">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow mb-5 justify-center">What Guides Us</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
            Mission, vision, values.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="bg-card p-10 rounded-md border border-border shadow-card">
              <span className="grid place-items-center w-14 h-14 rounded-full bg-primary text-accent mb-7">
                <p.icon className="w-6 h-6" strokeWidth={1.5} />
              </span>
              <h3 className="font-serif text-2xl text-primary">{p.title}</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* GLOBAL REACH */}
    <section className="section">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative order-2 lg:order-1">
          <img
            src={landscape}
            alt="Tanzanian highland landscape near Arusha"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full aspect-[5/4] object-cover rounded-md shadow-elevated"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-5">Global Reach</p>
          <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
            Local roots. <br />
            International standards.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Our stones travel from the Mererani Hills to ateliers in Geneva, New York, Mumbai, Hong Kong and Dubai. Every shipment is accompanied by complete documentation and origin certification.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { v: "25+", l: "Countries" },
              { v: "120+", l: "Partners" },
              { v: "1994", l: "Founded" },
            ].map((s) => (
              <div key={s.l} className="border-l-2 border-accent pl-4">
                <p className="font-serif text-3xl text-primary">{s.v}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{s.l}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-10 text-muted-foreground">
            <Globe2 className="w-5 h-5 text-accent" />
            <span className="text-sm">Operating across four continents</span>
          </div>
        </div>
      </div>
    </section>

    <CtaBanner />
  </SiteLayout>
);

export default About;
