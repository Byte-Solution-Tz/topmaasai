import type { Metadata } from "next";
import { CtaSection } from "@/components/sections/CTA";
import { ImmersiveServices } from "@/components/sections/ImmersiveServices";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Top Maasai Mining Co. services across gemstone sourcing, lapidary, jewelry production, rare minerals, and mining partnerships.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="Our Services"
          title="From the earth to the atelier."
          description="Five specialized services, one continuous chain of custody, each backed by decades of expertise and an uncompromising commitment to quality."
        />
      </div>

      <ImmersiveServices />

      <CtaSection />
    </>
  );
}
