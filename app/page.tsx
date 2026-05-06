import { AboutSection } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { ServicesSection } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
    </>
  );
}
