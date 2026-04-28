import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CtaSection } from "@/components/sections/CTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { serviceDetails } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Top Maasai Mining Co. services across gemstone sourcing, lapidary, jewelry production, rare minerals, and mining partnerships.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Services"
        title="From the earth to the atelier."
        description="Five specialized services, one continuous chain of custody, each backed by decades of expertise and an uncompromising commitment to quality."
      />

      {serviceDetails.map((service, index) => {
        const reversed = index % 2 === 1;

        return (
          <section key={service.number} className={`section ${reversed ? "bg-secondary/40" : ""}`}>
            <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div className={reversed ? "lg:order-2" : ""}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={1280}
                  height={960}
                  className="w-full rounded-md object-cover shadow-elevated"
                />
              </div>
              <div className={reversed ? "lg:order-1" : ""}>
                <p className="eyebrow mb-5">Service {service.number}</p>
                <h2 className="text-4xl leading-tight text-primary md:text-5xl">{service.title}</h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-foreground">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`${buttonClasses.navy} mt-9`}>
                  Inquire <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      <CtaSection />
    </>
  );
}
