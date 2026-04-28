import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader, CtaBanner } from "@/components/site/Sections";
import { ShieldOff, Coins, Trees, FileSearch } from "lucide-react";
import landscape from "@/assets/ethical-landscape.jpg";

const pillars = [
  {
    icon: ShieldOff,
    title: "No Child Labor",
    desc: "Our concessions are strictly adult-only. Every worker is verified by ID, and we partner with local schools to keep children in classrooms — not in mines.",
  },
  {
    icon: Coins,
    title: "Fair Compensation",
    desc: "Miners receive wages well above regional averages, plus profit-sharing on premium parcels. Health coverage and safety equipment are provided as standard.",
  },
  {
    icon: Trees,
    title: "Environmental Responsibility",
    desc: "We rehabilitate every site we work. Water recycling, controlled extraction and active reforestation are part of our daily operations — not afterthoughts.",
  },
  {
    icon: FileSearch,
    title: "Radical Transparency",
    desc: "Independent third-party audits. Open chain-of-custody records. Buyers can trace every gem we sell back to the day it left the earth.",
  },
];

const EthicalMining = () => (
  <SiteLayout>
    <PageHeader
      eyebrow="Ethical Mining"
      title="A standard worth keeping."
      description="The history of African mining holds difficult chapters. We exist to write a different one — and to prove that integrity and excellence are inseparable."
    />

    {/* STORY */}
    <section className="section">
      <div className="container-x grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p className="eyebrow mb-2">Our Promise</p>
          <h2 className="font-serif text-4xl text-primary leading-tight">
            Every stone carries a story. <br />
            We make sure it is one we can tell.
          </h2>
          <p>
            For thirty years, we have built our company on the belief that the people of Tanzania — and the land itself — deserve better than the extractive practices that have shadowed African mining for generations.
          </p>
          <p>
            That belief has shaped every decision we make: who we hire, how we pay them, where we invest, and which buyers we choose to work with. It is slower. It is harder. And it is the only way we are willing to operate.
          </p>
        </div>
        <div className="lg:col-span-5">
          <img
            src={landscape}
            alt="Tanzanian highlands at sunset"
            loading="lazy"
            width={1920}
            height={1080}
            className="w-full aspect-[4/5] object-cover rounded-md shadow-elevated"
          />
        </div>
      </div>
    </section>

    {/* PILLARS */}
    <section className="section bg-primary text-primary-foreground">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow mb-5">Four Pillars</p>
          <h2 className="text-4xl md:text-5xl font-serif leading-tight">
            How we mine. <br />
            How we live.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex gap-6 border-t border-primary-foreground/15 pt-8">
              <div className="shrink-0">
                <span className="text-xs uppercase tracking-[0.22em] text-accent block mb-3">0{i + 1}</span>
                <span className="grid place-items-center w-14 h-14 rounded-full bg-accent text-accent-foreground">
                  <p.icon className="w-6 h-6" strokeWidth={1.5} />
                </span>
              </div>
              <div>
                <h3 className="font-serif text-2xl">{p.title}</h3>
                <p className="mt-3 text-primary-foreground/75 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* COMMITMENT NUMBERS */}
    <section className="section">
      <div className="container-x grid md:grid-cols-3 gap-10 text-center">
        {[
          { v: "0", l: "Cases of child labor — ever" },
          { v: "100%", l: "Audited supply chain" },
          { v: "1.2M+", l: "USD reinvested in communities" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-md p-10 shadow-card">
            <p className="font-serif text-6xl text-accent">{s.v}</p>
            <p className="text-sm text-muted-foreground mt-3 uppercase tracking-[0.18em]">{s.l}</p>
          </div>
        ))}
      </div>
    </section>

    <CtaBanner />
  </SiteLayout>
);

export default EthicalMining;
