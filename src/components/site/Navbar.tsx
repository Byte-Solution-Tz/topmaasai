import { Link, NavLink as RNavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/ethical-mining", label: "Ethical Mining" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const onDark = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !onDark || open;

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        solid ? "bg-primary/95 backdrop-blur-md shadow-card" : "bg-transparent",
      )}
    >
      <div className="container-x flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid place-items-center w-10 h-10 rounded-full bg-accent text-accent-foreground">
            <Gem className="w-5 h-5" strokeWidth={1.5} />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg text-primary-foreground">Top Maasai</span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-accent">Mining Co.</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <RNavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm tracking-wide transition-colors",
                  isActive ? "text-accent" : "text-primary-foreground/80 hover:text-accent",
                )
              }
            >
              {l.label}
            </RNavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="gold" size="default">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-primary-foreground p-2"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-primary-foreground/10">
          <div className="container-x py-6 flex flex-col gap-1">
            {links.map((l) => (
              <RNavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "py-3 text-base border-b border-primary-foreground/10",
                    isActive ? "text-accent" : "text-primary-foreground/90",
                  )
                }
              >
                {l.label}
              </RNavLink>
            ))}
            <Button asChild variant="gold" size="lg" className="mt-5 w-full">
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
