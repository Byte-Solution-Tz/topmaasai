import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { contactDetails, navigationLinks } from "@/lib/site-data";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-12 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--gold) / 0.45), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(var(--emerald-deep) / 0.45), transparent 70%)" }}
      />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.26] mix-blend-multiply" />

      <div className="container-x relative py-10 md:py-14">
        <div className="rounded-[2rem] bg-primary px-7 py-10 text-primary-foreground shadow-elevated md:px-12 md:py-14 lg:px-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow mb-6 text-sm">Contact Us</p>
              <h2 className="max-w-3xl font-heading text-3xl font-medium leading-[1.08] tracking-[-0.02em] md:text-5xl">
                Connect with Top Maasai Mining Co.
              </h2>
              <p className="mt-7 max-w-2xl font-body text-lg leading-[1.7] text-primary-foreground/76 md:text-xl">
                We connect miners, craftsmen, and global buyers through transparent sourcing,
                responsible mining practices, and quality in every gemstone we deliver.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground shadow-card transition-all hover:bg-accent/90 hover:shadow-elevated"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-primary-foreground/40 px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="mb-6 inline-flex items-center" aria-label="Top Maasai home">
              <Image
                src="/images/top-maasai-logo.png"
                alt="Top Maasai"
                width={150}
                height={150}
                className="h-28 w-auto md:h-32 lg:h-40"
              />
            </Link>
            
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-semibold text-primary">Explore</h2>
            <ul className="space-y-4 text-base leading-[1.7] text-muted-foreground">
              {navigationLinks
                .filter((link) => link.href !== "/")
                .map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex items-center gap-2 hover:text-accent">
                      {link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-semibold text-primary">Services</h2>
            <ul className="space-y-4 text-base leading-[1.7] text-muted-foreground">
              <li>Gemstone Sourcing</li>
              <li>Rare Earth Minerals</li>
              <li>Lapidary &amp; Cutting</li>
              <li>Jewelry Production</li>
              <li>Mining Investment</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 font-heading text-2xl font-semibold text-primary">Contact</h2>
            <ul className="space-y-5 text-base leading-[1.7] text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <span>{contactDetails.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <a href={`mailto:${contactDetails.email}`} className="hover:text-accent">
                  {contactDetails.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                <a href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`} className="hover:text-accent">
                  {contactDetails.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/70 pt-6 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {currentYear} Top Maasai Mining Co. All rights reserved.</p>
          <p>Arusha · Tanzania · Est. 1994</p>
        </div>
      </div>
    </footer>
  );
}
