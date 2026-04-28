import type { LucideIcon } from "lucide-react";
import {
  Award,
  Coins,
  Compass,
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
  email: "info@topmaasaimining.com",
  phone: "+255 000 000 000",
  address: "Mererani Road, Arusha, Tanzania",
  hours: "Mon - Fri · 08:00 - 17:00 EAT",
};

export const trustSignals: TrustSignal[] = [
  { icon: Award, label: "30+ Years", description: "Of trusted expertise" },
  { icon: Leaf, label: "Ethical Mining", description: "Responsible sourcing" },
  { icon: Globe2, label: "Global Reach", description: "Clients in 25+ countries" },
  { icon: ShieldCheck, label: "Certified Quality", description: "Internationally graded" },
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
    title: "Direct from Source",
    description: "We mine, cut, and export without unnecessary intermediaries.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Provenance",
    description: "Every parcel is documented and traceable from mine to market.",
  },
  {
    icon: Eye,
    title: "Full Transparency",
    description: "Clear communication, open pricing, and documented sourcing practices.",
  },
  {
    icon: HeartHandshake,
    title: "Fair Trade",
    description: "Equitable wages and long-term investment in local communities.",
  },
];

export const ethicalHighlights = [
  "Strictly no child labor across our operations",
  "Fair compensation and safe working conditions",
  "Active environmental restoration programs",
  "Full traceability and third-party audits",
];

export const aboutPillars: IconCard[] = [
  {
    icon: Compass,
    title: "Our Mission",
    description:
      "To responsibly bring Tanzania's rare minerals to the world while uplifting the communities and lands from which they come.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To be Africa's most trusted name in ethical gemstone sourcing, recognized for craftsmanship, transparency, and heritage.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity in every transaction, respect for people and place, and excellence in every stone we touch.",
  },
];

export const globalReachStats = [
  { value: "25+", label: "Countries" },
  { value: "120+", label: "Partners" },
  { value: "1994", label: "Founded" },
];

export const serviceDetails: ServiceDetail[] = [
  {
    number: "01",
    title: "Gemstone Sourcing",
    image: "/images/service-gemstone.jpg",
    description:
      "Direct-from-origin tanzanite, ruby, sapphire, garnet, tourmaline, and a curated selection of rare African gems. Every parcel is inspected, graded, and documented at our Arusha facility.",
    bullets: ["Origin certification", "Wholesale and single-stone supply", "GIA-aligned grading", "Discreet logistics"],
  },
  {
    number: "02",
    title: "Rare Earth Minerals",
    image: "/images/service-minerals.jpg",
    description:
      "Strategic and industrial minerals supplied to refiners, manufacturers, and research institutions with verified provenance and transparent pricing.",
    bullets: ["Industrial mineral supply", "Custom volume contracts", "Export documentation", "Consistent quality control"],
  },
  {
    number: "03",
    title: "Lapidary Services",
    image: "/images/service-lapidary.jpg",
    description:
      "Master cutters with decades of experience shaping Tanzania's hardest stones, from precision faceting to bespoke calibration for jewelry houses.",
    bullets: ["Faceting and polishing", "Calibrated stone cutting", "Custom shapes on request", "Loss-minimized yields"],
  },
  {
    number: "04",
    title: "Jewelry Production",
    image: "/images/service-jewelry.jpg",
    description:
      "Bespoke fine jewelry produced in collaboration with select international designers and finished to global luxury standards.",
    bullets: ["Bespoke design", "18k and platinum settings", "Small-batch production", "White-label partnerships"],
  },
  {
    number: "05",
    title: "Mining Investment",
    image: "/images/service-investment.jpg",
    description:
      "Equity and joint-venture opportunities in licensed Tanzanian mining operations built on transparency, reporting discipline, and shared returns.",
    bullets: ["Licensed concessions", "Joint-venture structures", "Audited reporting", "ESG-conscious operations"],
  },
];

export const ethicalPillars: IconCard[] = [
  {
    icon: ShieldOff,
    title: "No Child Labor",
    description:
      "Our concessions are strictly adult-only, with worker verification and community support that keeps children in classrooms rather than mines.",
  },
  {
    icon: Coins,
    title: "Fair Compensation",
    description:
      "Miners receive wages above regional averages together with safety equipment, health support, and performance-linked incentives.",
  },
  {
    icon: Trees,
    title: "Environmental Responsibility",
    description:
      "We rehabilitate the sites we work through controlled extraction, water stewardship, and active reforestation programs.",
  },
  {
    icon: FileSearch,
    title: "Radical Transparency",
    description:
      "Independent audits and documented chain-of-custody records allow buyers to trace every gem we sell back to origin.",
  },
];

export const commitmentStats = [
  { value: "0", label: "Cases of child labor - ever" },
  { value: "100%", label: "Audited supply chain" },
  { value: "1.2M+", label: "USD reinvested in communities" },
];
