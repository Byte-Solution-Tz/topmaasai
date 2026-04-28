import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CtaBanner } from "@/components/site/Sections";
import {
  ArrowRight,
  Award,
  Globe2,
  Leaf,
  ShieldCheck,
  Gem,
  Mountain,
  Hammer,
  Sparkles,
  TrendingUp,
  Handshake,
  Eye,
  HeartHandshake,
} from "lucide-react";
import hero from "@/assets/hero-tanzanite.jpg";
import aboutImg from "@/assets/about-hands.jpg";

const trust = [
  { icon: Award, label: "30+ Years", desc: "Of trusted expertise" },
  { icon: Leaf, label: "Ethical Mining", desc: "Responsible sourcing" },
  { icon: Globe2, label: "Global Reach", desc: "Clients in 25+ countries" },
  { icon: ShieldCheck, label: "Certified Quality", desc: "Internationally graded" },
];

const services = [
  { icon: Gem, title: "Gemstone Sourcing", desc: "Tanzanite, ruby, sapphire, garnet & more — directly from origin." },
  { icon: Mountain, title: "Rare Earth Minerals", desc: "Industrial and strategic minerals for global markets." },
  { icon: Hammer, title: "Lapidary Services", desc: "Precision gem cutting and polishing by master artisans." },
  { icon: Sparkles, title: "Jewelry Production", desc: "Bespoke fine jewelry crafted to international standards." },
  { icon: TrendingUp, title: "Mining Investment", desc: "Partnership opportunities in licensed mining operations." },
];

const reasons = [
  { icon: Handshake, title: "Direct from Source", desc: "We mine, cut and export — no middlemen, no markups." },
  { icon: ShieldCheck, title: "Verified Provenance", desc: "Every stone traceable from mine to market." },
  { icon: Eye, title: "Full Transparency", desc: "Open pricing, open processes, open communication." },
  { icon: HeartHandshake, title: "Fair Trade", desc: "Equitable wages and community investment, always." },
];

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center text-primary-foreground overflow-hidden">
        <img
          src={hero}
          alt="Raw blue tanzanite gemstone on dark slate"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container-x relative z-10 pt-28 pb-20">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow mb-7">Arusha · Tanzania · Est. 1994</p>
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif leading-[1.02]">
              Tanzania's Finest <span className="italic text-accent">Gemstones</span>, Sourced with Integrity.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
              For over three decades, Top Maasai Mining Co. has supplied the world's most discerning houses with rare Tanzanian minerals — ethically mined from the foothills of Mererani.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="xl">
                <Link to="/services">
                  Discover Our Services <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="xl">
                <Link to="/contact">Request a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="maasai-border absolute bottom-0 inset-x-0" />
      </section>

      {/* TRUST STRIP */}
      <section className="py-14 md:py-20 bg-background border-b border-border">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-10">
          {trust.map((t) => (
            <div key={t.label} className="flex items-start gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-secondary text-accent shrink-0">
                <t.icon className="w-5 h-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-serif text-2xl text-primary leading-tight">{t.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section">
        <div className="container-x grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <img
              src={aboutImg}
              alt="Artisan miner holding rough gemstones"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full aspect-[4/5] object-cover rounded-md shadow-elevated"
            />
            <div className="absolute -bottom-6 -right-6 hidden md:block bg-accent text-accent-foreground p-6 rounded-md shadow-elevated max-w-[200px]">
              <p className="font-serif text-4xl leading-none">30+</p>
              <p className="text-xs uppercase tracking-[0.18em] mt-2">Years of Heritage</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6">About Us</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              Rooted in the land. <br />
              Trusted across the world.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Founded in 1994 in the heart of Maasai country, our company unites generations of mining knowledge with modern standards of ethics, certification, and craftsmanship.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We work hand-in-hand with local artisans and international partners to deliver gemstones and minerals of exceptional integrity — each piece carrying the spirit of its origin.
            </p>
            <Button asChild variant="navy" size="lg" className="mt-9">
              <Link to="/about">
                Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="section bg-secondary/40">
        <div className="container-x">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-5">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">A complete vertical from mine to market.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="group bg-card p-8 rounded-md border border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
              >
                <span className="grid place-items-center w-14 h-14 rounded-full bg-primary text-accent mb-7 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <s.icon className="w-6 h-6" strokeWidth={1.5} />
                </span>
                <h3 className="text-2xl text-primary font-serif">{s.title}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground mt-6 inline-block">
                  0{i + 1} / 0{services.length}
                </span>
              </article>
            ))}
            <Link
              to="/services"
              className="bg-primary text-primary-foreground p-8 rounded-md flex flex-col justify-between min-h-[260px] hover:bg-primary/90 transition group"
            >
              <p className="eyebrow !text-accent">Explore</p>
              <div>
                <p className="font-serif text-3xl leading-tight">View all services</p>
                <ArrowRight className="w-6 h-6 mt-6 text-accent group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container-x">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-14">
            <div>
              <p className="eyebrow mb-5">Why Choose Us</p>
              <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">Standards that make the difference.</h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Every partnership we build rests on four uncompromising principles.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-5">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-accent/10 text-accent shrink-0">
                    <r.icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="text-xl text-primary font-serif">{r.title}</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ETHICAL MINING SECTION */}
      <section className="section bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container-x grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-6">Ethical Mining</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              The right way is the <span className="italic text-accent">only</span> way.
            </h2>
            <p className="mt-6 text-primary-foreground/75 text-lg leading-relaxed">
              We believe Tanzania's mineral wealth must benefit the people who call this land home — and the planet we share.
            </p>
            <ul className="mt-9 space-y-4">
              {[
                "Strictly no child labor across our operations",
                "Fair compensation and safe working conditions",
                "Active environmental restoration programs",
                "Full traceability and third-party audits",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-primary-foreground/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="gold" size="lg" className="mt-10">
              <Link to="/ethical-mining">
                Read Our Commitment <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="relative">
            <div
              className="aspect-square rounded-md bg-cover bg-center shadow-elevated"
              style={{ backgroundImage: `url(${aboutImg})` }}
              role="img"
              aria-label="Ethical mining operations"
            />
            <div className="maasai-border absolute -top-3 left-8 right-8 opacity-90" />
          </div>
        </div>
      </section>

      <CtaBanner />
    </SiteLayout>
  );
};

export default Index;
