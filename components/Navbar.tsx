"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export function Navbar() {
  const pathname = usePathname();
  const [isSolid, setIsSolid] = useState(pathname !== "/");

  useEffect(() => {
    const updateNavbar = () => {
      const scrolled = window.scrollY > 56;
      setIsSolid(pathname !== "/" || scrolled);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isSolid
          ? "border-b border-primary-foreground/10 bg-primary/95 shadow-card backdrop-blur-md"
          : "border-b border-primary-foreground/10 bg-primary/20 backdrop-blur-xl"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Top Maasai home">
          <Image
            src="/images/top-maasai-logo.png"
            alt="Top Maasai"
            width={280}
            height={280}
            priority
            className="h-20 w-auto brightness-0 invert"
          />
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
          <summary className="cursor-pointer rounded-full border border-primary-foreground/20 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm">
            Menu
          </summary>
          <div className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-primary-foreground/10 bg-primary/95 p-4 shadow-elevated backdrop-blur-xl">
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
