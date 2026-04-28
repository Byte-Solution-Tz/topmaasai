import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ethicalHighlights } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export function EthicalSection() {
  return (
    <section className="section relative overflow-hidden bg-primary text-primary-foreground">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-6">Ethical Mining</p>
          <h2 className="text-4xl leading-tight md:text-5xl">
            The right way is the <span className="italic text-accent">only</span> way.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">
            We believe Tanzania&apos;s mineral wealth must benefit the people who call this land home and
            the environment that sustains it.
          </p>
          <ul className="mt-9 space-y-4">
            {ethicalHighlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-primary-foreground/85">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link href="/ethical-mining" className={`${buttonClasses.gold} mt-10`}>
            Read Our Commitment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative">
          <Image
            src="/images/ethical-landscape.jpg"
            alt="Ethical mining operations in the Tanzanian highlands"
            width={1280}
            height={960}
            className="aspect-square w-full rounded-md object-cover shadow-elevated"
          />
          <div className="maasai-border absolute -top-3 left-8 right-8 opacity-90" />
        </div>
      </div>
    </section>
  );
}
