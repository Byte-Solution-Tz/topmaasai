import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHeader } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Message sent. We will be in touch within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Let's begin a conversation."
        description="Whether you are sourcing a single rare stone or building a long-term partnership, our team is ready to help."
      />

      <section className="section">
        <div className="container-x grid lg:grid-cols-[1fr_1.3fr] gap-14 lg:gap-20">
          {/* LEFT — info */}
          <div>
            <p className="eyebrow mb-5">Reach Us</p>
            <h2 className="text-3xl md:text-4xl font-serif text-primary leading-tight">
              Speak with our Arusha office.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Our team responds to every inquiry within one business day. For urgent matters, please call directly.
            </p>

            <ul className="mt-10 space-y-7">
              {[
                { icon: MapPin, label: "Office", val: "Mererani Road, Arusha, Tanzania" },
                { icon: Mail, label: "Email", val: "info@topmaasaimining.com" },
                { icon: Phone, label: "Phone", val: "+255 000 000 000" },
                { icon: Clock, label: "Hours", val: "Mon – Fri · 08:00 – 17:00 EAT" },
              ].map((c) => (
                <li key={c.label} className="flex gap-5">
                  <span className="grid place-items-center w-12 h-12 rounded-full bg-secondary text-accent shrink-0">
                    <c.icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{c.label}</p>
                    <p className="text-foreground mt-1">{c.val}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-12 p-8 bg-primary text-primary-foreground rounded-md relative overflow-hidden">
              <div className="maasai-border absolute top-0 inset-x-0 opacity-90" />
              <p className="font-serif text-2xl leading-snug">
                "Trust is the rarest gem we offer."
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-accent">— Top Maasai Mining Co.</p>
            </div>
          </div>

          {/* RIGHT — form */}
          <form
            onSubmit={onSubmit}
            className="bg-card border border-border rounded-md p-8 md:p-12 shadow-card space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" required placeholder="Jane Doe" className="h-12 rounded-md" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="jane@company.com" className="h-12 rounded-md" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiry">Inquiry type</Label>
              <Select required>
                <SelectTrigger id="inquiry" className="h-12 rounded-md">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gemstone">Gemstone Sourcing</SelectItem>
                  <SelectItem value="minerals">Rare Earth Minerals</SelectItem>
                  <SelectItem value="lapidary">Lapidary Services</SelectItem>
                  <SelectItem value="jewelry">Jewelry Production</SelectItem>
                  <SelectItem value="investment">Mining Investment</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                required
                rows={6}
                placeholder="Tell us about your project, volume requirements, or questions…"
                className="rounded-md resize-none"
              />
            </div>

            <Button type="submit" variant="navy" size="lg" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Sending…" : (<>Send Message <Send className="w-4 h-4" /></>)}
            </Button>

            <p className="text-xs text-muted-foreground pt-2">
              By submitting this form you agree to be contacted by Top Maasai Mining Co. regarding your inquiry.
            </p>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
