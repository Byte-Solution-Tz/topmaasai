import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trustSignals } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export function Hero() {
  return (
    <>
      <section className="relative flex min-h-[calc(100svh-5rem)] items-center overflow-hidden text-primary-foreground">
        <Image
          src="/images/hero-tanzanite.jpg"
          alt="Raw blue tanzanite gemstone on dark slate"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container-x relative z-10 py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-7">Arusha · Tanzania · Est. 1994</p>
            <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-8xl">
              Tanzania&apos;s Finest <span className="italic text-accent">Gemstones</span>, Sourced with
              Integrity.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
              For over three decades, Top Maasai Mining Co. has supplied discerning buyers with rare
              Tanzanian minerals, ethically mined from the foothills of Mererani.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" className={buttonClasses.gold}>
                Discover Our Services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={buttonClasses.outlineLight}>
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
        <div className="maasai-border absolute inset-x-0 bottom-0" />
      </section>

      <section className="border-b border-border bg-background py-14 md:py-20">
        <div className="container-x grid grid-cols-2 gap-10 md:grid-cols-4">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <signal.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-2xl leading-tight text-primary">{signal.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{signal.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
