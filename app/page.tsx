import { AboutSection } from "@/components/sections/About";
import { CtaSection } from "@/components/sections/CTA";
import { EthicalSection } from "@/components/sections/Ethical";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <EthicalSection />
      <CtaSection />
    </>
  );
}
