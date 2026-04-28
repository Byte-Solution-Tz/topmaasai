import { Link } from "react-router-dom";
import { Gem, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="maasai-border opacity-80" />
      <div className="container-x py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-accent text-accent-foreground">
              <Gem className="w-5 h-5" strokeWidth={1.5} />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg">Top Maasai</span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-accent">Mining Co.</span>
            </span>
          </div>
          <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
            Three decades of ethically sourced Tanzanian gemstones and rare minerals — from the foothills of Mererani to the world.
          </p>
        </div>

        <div>
          <h4 className="text-accent text-xs uppercase tracking-[0.22em] mb-5">Explore</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-accent transition">About Us</Link></li>
            <li><Link to="/services" className="hover:text-accent transition">Services</Link></li>
            <li><Link to="/ethical-mining" className="hover:text-accent transition">Ethical Mining</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent text-xs uppercase tracking-[0.22em] mb-5">Services</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li>Gemstone Sourcing</li>
            <li>Rare Earth Minerals</li>
            <li>Lapidary &amp; Cutting</li>
            <li>Jewelry Production</li>
            <li>Mining Investment</li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent text-xs uppercase tracking-[0.22em] mb-5">Contact</h4>
          <ul className="space-y-4 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <span>Mererani, Arusha, Tanzania</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <a href="mailto:info@topmaasaimining.com" className="hover:text-accent transition">info@topmaasaimining.com</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-accent shrink-0" />
              <a href="tel:+255000000000" className="hover:text-accent transition">+255 000 000 000</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-x py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Top Maasai Mining Co. All rights reserved.</p>
          <p>Arusha · Tanzania · Est. 1994</p>
        </div>
      </div>
    </footer>
  );
};
