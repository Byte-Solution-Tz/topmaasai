import Link from "next/link";
import { Gem } from "lucide-react";
import { navigationLinks } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary-foreground/10 bg-primary/95 backdrop-blur-md">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-accent-foreground">
            <Gem className="h-5 w-5" strokeWidth={1.5} />
          </span>
          <span className="leading-tight">
            <span className="block text-lg text-primary-foreground">Top Maasai</span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-accent">Mining Co.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm tracking-wide text-primary-foreground/80 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className={buttonClasses.gold}>
            Request a Quote
          </Link>
        </div>

        <details className="relative lg:hidden">
          <summary className="cursor-pointer rounded-full border border-primary-foreground/20 px-4 py-2 text-sm text-primary-foreground">
            Menu
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-primary-foreground/10 bg-primary p-4 shadow-elevated">
            <nav className="flex flex-col gap-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-4 py-3 text-base text-primary-foreground/90 hover:bg-primary-foreground/5 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact" className={`${buttonClasses.gold} mt-4 w-full justify-center`}>
              Request a Quote
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
