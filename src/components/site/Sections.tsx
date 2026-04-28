import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => (
  <section className="pt-36 pb-16 md:pt-44 md:pb-24 bg-primary text-primary-foreground relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 20%, hsl(var(--accent)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--accent)) 0, transparent 40%)",
      }}
    />
    <div className="container-x relative">
      <div className="max-w-3xl animate-fade-up">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.05]">{title}</h1>
        {description && (
          <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl leading-relaxed">{description}</p>
        )}
      </div>
    </div>
    <div className="maasai-border absolute bottom-0 inset-x-0 opacity-90" />
  </section>
);

export const CtaBanner = () => (
  <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
    <div
      className="absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-10"
      style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }}
    />
    <div className="container-x relative grid md:grid-cols-[1fr_auto] items-center gap-10">
      <div className="max-w-2xl">
        <p className="eyebrow mb-5">Begin a Conversation</p>
        <h2 className="text-4xl md:text-5xl text-primary-foreground leading-tight">
          Source Tanzania's finest gemstones with confidence.
        </h2>
        <p className="mt-5 text-primary-foreground/70 text-lg max-w-xl">
          Speak with our team about wholesale, custom cuts, or investment partnerships.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button asChild variant="gold" size="xl">
          <Link to="/contact">
            Get in Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="outlineLight" size="xl">
          <Link to="/services">Our Services</Link>
        </Button>
      </div>
    </div>
  </section>
);
