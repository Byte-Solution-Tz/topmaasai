import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contactDetails, navigationLinks } from "@/lib/site-data";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="maasai-border opacity-80" />
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-6 inline-flex items-center" aria-label="Top Maasai home">
            <Image
              src="/images/top-maasai-logo.png"
              alt="Top Maasai"
              width={250}
              height={250}
              className="h-20 w-auto brightness-0 invert"
            />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Three decades of ethically sourced Tanzanian gemstones and rare minerals, from the foothills
            of Mererani to global markets.
          </p>
        </div>

        <div>
          <h2 className="mb-5 text-xs uppercase tracking-[0.22em] text-accent">Explore</h2>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            {navigationLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-xs uppercase tracking-[0.22em] text-accent">Services</h2>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li>Gemstone Sourcing</li>
            <li>Rare Earth Minerals</li>
            <li>Lapidary &amp; Cutting</li>
            <li>Jewelry Production</li>
            <li>Mining Investment</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-xs uppercase tracking-[0.22em] text-accent">Contact</h2>
          <ul className="space-y-4 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{contactDetails.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${contactDetails.email}`} className="hover:text-accent">
                {contactDetails.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${contactDetails.phone.replace(/\s+/g, "")}`} className="hover:text-accent">
                {contactDetails.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-primary-foreground/60 md:flex-row">
          <p>&copy; {currentYear} Top Maasai Mining Co. All rights reserved.</p>
          <p>Arusha · Tanzania · Est. 1994</p>
        </div>
      </div>
    </footer>
  );
}
