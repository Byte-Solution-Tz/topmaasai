import type { Metadata } from "next";
import { ImmersiveServices } from "@/components/sections/ImmersiveServices";
import { PageHeader } from "@/components/sections/PageHeader";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Top Maasai Mining Co. services across mineral sourcing, rare earth minerals, in-house lapidary cutting, jewelry production, mining investment, and export support.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="Our Services"
          title="Authentic Earth's Rare Minerals, From Source to Market."
          description="We combine direct gemstone and mineral sourcing, rare earth mineral sourcing, in-house lapidary cutting, custom jewelry production, mining investment partnerships, and export support for international buyers."
        />
      </div>

      <ImmersiveServices />
    </>
  );
}
