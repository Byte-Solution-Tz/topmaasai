import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader, CtaBanner } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import gem from "@/assets/service-gemstone.jpg";
import minerals from "@/assets/service-minerals.jpg";
import lapidary from "@/assets/service-lapidary.jpg";
import jewelry from "@/assets/service-jewelry.jpg";
import investment from "@/assets/service-investment.jpg";

const services = [
  {
    n: "01",
    title: "Gemstone Sourcing",
    image: gem,
    desc: "Direct-from-origin tanzanite, ruby, sapphire, garnet, tourmaline and a curated selection of rare African gems. Every parcel inspected, graded and documented at our Arusha facility.",
    bullets: ["Origin certification", "Wholesale & single-stone supply", "GIA-aligned grading", "Discreet logistics"],
  },
  {
    n: "02",
    title: "Rare Earth Minerals",
    image: minerals,
    desc: "Strategic and industrial minerals supplied to refiners, manufacturers and research institutions. Verified provenance, consistent quality, transparent pricing.",
    bullets: ["Tanzanite ore & rough", "Industrial mineral supply", "Custom volume contracts", "Export documentation"],
  },
  {
    n: "03",
    title: "Lapidary Services",
    image: lapidary,
    desc: "Master cutters with decades of experience shaping Tanzania's hardest stones. From precision faceting to bespoke calibration for jewelry houses.",
    bullets: ["Faceting & polishing", "Calibrated stone cutting", "Custom shapes on request", "Loss-minimized yields"],
  },
  {
    n: "04",
    title: "Jewelry Production",
    image: jewelry,
    desc: "Bespoke fine jewelry produced in collaboration with select international designers. Made with our own stones, finished to global luxury standards.",
    bullets: ["Bespoke design", "18k & platinum settings", "Small-batch production", "White-label partnerships"],
  },
  {
    n: "05",
    title: "Mining Investment",
    image: investment,
    desc: "Equity and joint-venture opportunities in licensed Tanzanian mining operations. Long-term partnerships built on full transparency and shared returns.",
    bullets: ["Licensed concessions", "JV structures", "Audited reporting", "ESG-compliant operations"],
  },
];

const Services = () => (
  <SiteLayout>
    <PageHeader
      eyebrow="Our Services"
      title="From the earth to the atelier."
      description="Five specialized services, one continuous chain of custody — each backed by decades of expertise and an uncompromising commitment to quality."
    />

    {services.map((s, i) => {
      const reversed = i % 2 === 1;
      return (
        <section key={s.n} className={`section ${i % 2 === 1 ? "bg-secondary/40" : ""}`}>
          <div className="container-x grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div className={reversed ? "lg:order-2" : ""}>
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full aspect-[5/4] object-cover rounded-md shadow-elevated"
              />
            </div>
            <div className={reversed ? "lg:order-1" : ""}>
              <p className="eyebrow mb-5">Service {s.n}</p>
              <h2 className="text-4xl md:text-5xl font-serif text-primary leading-tight">{s.title}</h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{s.desc}</p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-3">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-foreground">
                    <Check className="w-5 h-5 text-accent mt-0.5 shrink-0" strokeWidth={2} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="navy" size="lg" className="mt-9">
                <Link to="/contact">
                  Inquire <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      );
    })}

    <CtaBanner />
  </SiteLayout>
);

export default Services;
