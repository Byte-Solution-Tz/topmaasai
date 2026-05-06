import type { LucideIcon } from "lucide-react";
import {
  Award,
  Coins,
  Crosshair,
  Eye,
  FileSearch,
  Gem,
  Globe2,
  Hammer,
  Handshake,
  Heart,
  HeartHandshake,
  Leaf,
  Mountain,
  ShieldCheck,
  ShieldOff,
  Sparkles,
  Trees,
  TrendingUp,
} from "lucide-react";

type LinkItem = {
  href: string;
  label: string;
};

type IconCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type TrustSignal = {
  icon: LucideIcon;
  label: string;
  description: string;
};

type ServiceDetail = {
  number: string;
  title: string;
  image: string;
  description: string;
  bullets: string[];
};

export const navigationLinks: LinkItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/ethical-mining", label: "Ethical Mining" },
  { href: "/contact", label: "Contact" },
];

export const contactDetails = {
  email: "info@topmaasai.com",
  phone: "+255 (0)754 270 000",
  address: "Arusha, Tanzania",
  hours: "Mon - Fri · 08:00 - 17:00 EAT",
};

export const trustSignals: TrustSignal[] = [
  { icon: Award, label: "30+ Years", description: "In the gemstone trade" },
  { icon: Leaf, label: "Ethical Trade", description: "Responsible mining practices" },
  { icon: Globe2, label: "Global Reach", description: "East Africa, Europe, Thailand, Singapore, China and beyond" },
  { icon: ShieldCheck, label: "Certified Quality", description: "Professionally verified before sale" },
];

export const serviceHighlights: IconCard[] = [
  {
    icon: Gem,
    title: "Gemstone Sourcing",
    description: "Tanzanite, ruby, sapphire, garnet, and more, supplied directly from origin.",
  },
  {
    icon: Mountain,
    title: "Rare Earth Minerals",
    description: "Industrial and strategic minerals for refiners, manufacturers, and global markets.",
  },
  {
    icon: Hammer,
    title: "Lapidary Services",
    description: "Precision gem cutting and polishing by master artisans in Arusha.",
  },
  {
    icon: Sparkles,
    title: "Jewelry Production",
    description: "Bespoke jewelry manufacturing finished to international standards.",
  },
  {
    icon: TrendingUp,
    title: "Mining Investment",
    description: "Long-term partnerships in licensed mining operations with transparent reporting.",
  },
];

export const homeDifferentiators: IconCard[] = [
  {
    icon: Handshake,
    title: "Authenticity & Traceability",
    description: "Every gemstone can be traced back to its origin, ensuring genuine value and transparency.",
  },
  {
    icon: ShieldCheck,
    title: "Over 30 Years of Experience",
    description: "Three decades in the gemstone trade provides deep market knowledge and trusted relationships.",
  },
  {
    icon: Eye,
    title: "Direct Trade Model",
    description: "We connect producers directly to buyers, eliminating unnecessary intermediaries.",
  },
  {
    icon: HeartHandshake,
    title: "Certified Quality",
    description: "All gemstones are professionally verified before any sale transactions.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    description:
      "We serve clients across East Africa, Europe, Thailand, Singapore, China and other international gemstone markets.",
  },
  {
    icon: Gem,
    title: "End-to-End Services",
    description: "From mineral sourcing to cutting and jewelry creation, we manage the entire journey.",
  },
];

export const ethicalHighlights = [
  "No child labor",
  "Responsible environmental practices",
  "Fair compensation for miners",
  "Transparent traceability of gemstones",
  "Compliance with government regulations",
];

export const aboutPillars: IconCard[] = [
  {
    icon: Eye,
    title: "Vision",
    description:
      "To position Tanzania's mining sector on the global stage through ethical trade, exceptional craftsmanship, and trusted partnerships.",
  },
  {
    icon: Crosshair,
    title: "Mission",
    description:
      "To connect miners, craftsmen, and global buyers through transparent sourcing, responsible mining practices, and a commitment to quality in every gemstone we deliver.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Ethics, Integrity, Excellence, Quality, Community.",
  },
];

export const globalReachStats = [
  { value: "East Africa", label: "Regional markets" },
  { value: "Europe", label: "Global reach" },
  { value: "Asia", label: "Thailand, Singapore, China" },
];

export const serviceDetails: ServiceDetail[] = [
  {
    number: "01",
    title: "Mineral Sourcing",
    image: "/images/service-gemstone.jpg",
    description:
      "We specialize in sourcing rare and valuable colored gemstones directly from trusted mines, including Tanzanite, ruby, sapphire, garnet, tourmaline, rhodolite and other rare colored stones.",
    bullets: ["Trusted mines", "Colored gemstones", "Inspection", "Authentication and certification"],
  },
  {
    number: "02",
    title: "Rare Earth Minerals",
    image: "/images/service-minerals.jpg",
    description:
      "We specialize in sourcing rare earth minerals through trusted mining networks and verified producers, including lithium, graphite, nickel, rare earth elements, and other strategic industrial minerals.",
    bullets: ["Trusted mining networks", "Verified producers", "Strategic industrial minerals", "Rare earth elements"],
  },
  {
    number: "03",
    title: "Lapidary",
    image: "/images/service-lapidary.jpg",
    description:
      "Our in-house lapidary team ensures each gemstone reaches its highest potential through custom gemstone cuts, precision polishing, and quality finishing.",
    bullets: ["In-house gem cutting", "Custom gemstone cuts", "Precision polishing", "Quality finishing"],
  },
  {
    number: "04",
    title: "Jewelry Production",
    image: "/images/service-jewelry.jpg",
    description:
      "We design and produce fine gemstone jewelry, including custom gemstone settings, bespoke jewelry pieces, and finished gemstone jewelry collections.",
    bullets: ["Custom gemstone settings", "Bespoke jewelry pieces", "Finished collections", "Maasai women artisans"],
  },
  {
    number: "05",
    title: "Mining Investment",
    image: "/images/service-investment.jpg",
    description:
      "We facilitate opportunities for investors to participate in mineral sourcing and mining ventures through trusted mining operations and valuable gemstone markets.",
    bullets: ["Mineral sourcing", "Mining ventures", "Trusted operations", "Gemstone markets"],
  },
];

export const ethicalPillars: IconCard[] = [
  {
    icon: ShieldOff,
    title: "No Child Labor",
    description: "Our ethical approach ensures no child labor.",
  },
  {
    icon: Coins,
    title: "Fair Compensation for Miners",
    description: "Our ethical approach ensures fair compensation for miners.",
  },
  {
    icon: Trees,
    title: "Responsible Environmental Practices",
    description: "Our ethical approach ensures responsible environmental practices.",
  },
  {
    icon: FileSearch,
    title: "Transparent Traceability",
    description: "Our ethical approach ensures transparent traceability of gemstones.",
  },
];

export const commitmentStats = [
  { value: "No", label: "Child labor" },
  { value: "Fair", label: "Compensation for miners" },
  { value: "Traceable", label: "Gemstone origin" },
];
