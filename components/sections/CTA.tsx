import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonClasses } from "@/lib/styles";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-28">
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
      />
      <div className="container-x relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <p className="eyebrow mb-5">Begin a Conversation</p>
          <h2 className="text-4xl leading-tight text-primary-foreground md:text-5xl">
            Source Tanzania&apos;s finest gemstones with confidence.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/70">
            Speak with our team about wholesale supply, custom cuts, or investment partnerships.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className={buttonClasses.gold}>
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/services" className={buttonClasses.outlineLight}>
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
