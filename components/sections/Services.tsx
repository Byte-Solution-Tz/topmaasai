import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeDifferentiators, serviceHighlights } from "@/lib/site-data";

export function ServicesSection() {
  return (
    <>
      <section className="section bg-secondary/40">
        <div className="container-x">
          <div className="mb-14 max-w-2xl">
            <p className="eyebrow mb-5">What We Do</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              A complete vertical from mine to market.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceHighlights.map((service, index) => (
              <article
                key={service.title}
                className="group rounded-md border bg-card p-8 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
              >
                <span className="mb-7 grid h-14 w-14 place-items-center rounded-full bg-primary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="text-2xl text-primary">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  0{index + 1} / 0{serviceHighlights.length}
                </span>
              </article>
            ))}
            <Link
              href="/services"
              className="group flex min-h-[260px] flex-col justify-between rounded-md bg-primary p-8 text-primary-foreground transition hover:bg-primary/90"
            >
              <p className="eyebrow !text-accent">Explore</p>
              <div>
                <p className="text-3xl leading-tight">View all services</p>
                <ArrowRight className="mt-6 h-6 w-6 text-accent transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow mb-5">Why Choose Us</p>
            <h2 className="text-4xl leading-tight text-primary md:text-5xl">
              Standards that make the difference.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Every partnership we build rests on four uncompromising principles.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {homeDifferentiators.map((item) => (
              <div key={item.title} className="flex gap-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="text-xl text-primary">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
