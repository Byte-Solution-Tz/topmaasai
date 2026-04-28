import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClasses } from "@/lib/styles";

export function AboutSection() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <Image
            src="/images/about-hands.jpg"
            alt="Artisan miner holding rough gemstones"
            width={1024}
            height={1024}
            className="aspect-[4/5] w-full rounded-md object-cover shadow-elevated"
          />
          <div className="absolute -bottom-6 -right-6 hidden max-w-[200px] rounded-md bg-accent p-6 text-accent-foreground shadow-elevated md:block">
            <p className="text-4xl leading-none">30+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em]">Years of Heritage</p>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-6">About Us</p>
          <h2 className="text-4xl leading-tight text-primary md:text-5xl">
            Rooted in the land.
            <br />
            Trusted across the world.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Founded in 1994 in the heart of Maasai country, our company combines generations of mining
            knowledge with modern standards of ethics, certification, and craftsmanship.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We work alongside local artisans and international partners to deliver gemstones and minerals
            of exceptional integrity, each piece carrying the spirit of its origin.
          </p>
          <Link href="/about" className={`${buttonClasses.navy} mt-9`}>
            Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
