"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { navigationLinks } from "@/lib/site-data";
import { buttonClasses } from "@/lib/styles";

export function Navbar() {
  const pathname = usePathname();
  const navbarRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");

    const updateViewport = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    if (isMobile) {
      gsap.set(navbar, {
        width: "100%",
        maxWidth: "none",
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 0,
        scale: 1,
        backgroundColor: "rgba(20, 23, 44, 0.9)",
        boxShadow: "0 12px 28px -22px rgba(4, 6, 18, 0.45)",
        backdropFilter: "blur(14px)",
        borderColor: "rgba(248, 244, 235, 0.12)",
        xPercent: 0,
      });
      return;
    }

    const expandedWidth = "95%";
    const expandedMaxWidth = "1400px";
    const compactWidth = "72%";
    const compactMaxWidth = "900px";
    const expandedBackground = pathname === "/" ? "rgba(20, 23, 44, 0.42)" : "rgba(20, 23, 44, 0.78)";
    const compactBackground = "rgba(20, 23, 44, 0.74)";

    const setCompactState = () => {
      gsap.set(navbar, {
        width: compactWidth,
        maxWidth: compactMaxWidth,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 9999,
        scale: 0.96,
        backgroundColor: compactBackground,
        boxShadow: "0 22px 48px -24px rgba(4, 6, 18, 0.46)",
        backdropFilter: "blur(16px)",
        borderColor: "rgba(248, 244, 235, 0.14)",
        xPercent: -50,
      });
    };

    if (pathname !== "/") {
      setCompactState();
      return;
    }

    gsap.set(navbar, {
      width: expandedWidth,
      maxWidth: expandedMaxWidth,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 24,
      paddingRight: 24,
      borderRadius: 24,
      scale: 1,
      backgroundColor: expandedBackground,
      boxShadow: "0 12px 32px -22px rgba(4, 6, 18, 0.24)",
      backdropFilter: "blur(8px)",
      borderColor: "rgba(248, 244, 235, 0.1)",
      xPercent: -50,
    });

    const tween = gsap.to(navbar, {
      width: compactWidth,
      maxWidth: compactMaxWidth,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 9999,
      scale: 0.96,
      backgroundColor: compactBackground,
      boxShadow: "0 22px 48px -24px rgba(4, 6, 18, 0.46)",
      backdropFilter: "blur(16px)",
      borderColor: "rgba(248, 244, 235, 0.14)",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=220",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [isMobile, pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerStyle = isMobile
    ? {
        transformOrigin: "top center",
        width: "100%",
        maxWidth: "none",
        padding: "12px 16px",
        borderRadius: "0px",
        backgroundColor: "rgba(20, 23, 44, 0.9)",
        backdropFilter: "blur(14px)",
        boxShadow: "0 12px 28px -22px rgba(4, 6, 18, 0.45)",
      }
    : {
        transformOrigin: "top center",
        width: pathname === "/" ? "95%" : "72%",
        maxWidth: pathname === "/" ? "1400px" : "900px",
        padding: pathname === "/" ? "16px 24px" : "12px 20px",
        borderRadius: pathname === "/" ? "24px" : "9999px",
        backgroundColor: pathname === "/" ? "rgba(20, 23, 44, 0.42)" : "rgba(20, 23, 44, 0.74)",
        backdropFilter: pathname === "/" ? "blur(8px)" : "blur(16px)",
        boxShadow:
          pathname === "/" ? "0 12px 32px -22px rgba(4, 6, 18, 0.24)" : "0 22px 48px -24px rgba(4, 6, 18, 0.46)",
      };

  return (
    <div className="sticky top-0 z-50 px-0 pt-0 lg:px-2 lg:pt-4">
      <header
        ref={navbarRef}
        className={`relative flex items-center justify-between border border-primary-foreground/10 ${
          isMobile ? "left-0" : "left-1/2"
        }`}
        style={headerStyle}
      >
        <div className="flex h-16 w-full items-center justify-between gap-6 lg:h-20">
          <Link href="/" className="flex items-center" aria-label="Top Maasai home">
            <Image
              src="/images/top-maasai-logo.png"
            alt="Top Maasai"
            width={280}
            height={280}
            priority
            className="h-14 w-auto brightness-0 invert lg:h-20"
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

        <div className="relative lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-primary-foreground/20 px-4 py-2 text-sm text-primary-foreground backdrop-blur-sm"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            Menu
          </button>

          {menuOpen ? (
            <div
              id="mobile-navigation"
              className="absolute right-0 top-[calc(100%+0.75rem)] w-72 rounded-2xl border border-primary-foreground/10 bg-primary/95 p-4 shadow-elevated backdrop-blur-xl"
            >
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full border border-primary-foreground/15 px-3 py-1.5 text-sm text-primary-foreground/80 hover:border-accent hover:text-accent"
                  aria-label="Close menu"
                >
                  Close
                </button>
              </div>
            <nav className="flex flex-col gap-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-base text-primary-foreground/90 hover:bg-primary-foreground/5 hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className={`${buttonClasses.gold} mt-4 w-full justify-center`}>
              Request a Quote
            </Link>
            </div>
          ) : null}
        </div>
        </div>
      </header>
    </div>
  );
}
