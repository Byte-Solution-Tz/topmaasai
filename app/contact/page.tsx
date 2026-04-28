import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader } from "@/components/sections/PageHeader";
import { contactDetails } from "@/lib/site-data";
import { buttonClasses, fieldClasses } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Top Maasai Mining Co. for gemstone sourcing, mineral supply, custom lapidary work, and long-term mining partnerships.",
};

const contactItems = [
  { icon: MapPin, label: "Office", value: contactDetails.address },
  { icon: Mail, label: "Email", value: contactDetails.email, href: `mailto:${contactDetails.email}` },
  { icon: Phone, label: "Phone", value: contactDetails.phone, href: `tel:${contactDetails.phone.replace(/\s+/g, "")}` },
  { icon: Clock, label: "Hours", value: contactDetails.hours },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's begin a conversation."
        description="Whether you are sourcing a single rare stone or building a long-term partnership, our team is ready to help."
      />

      <section className="section">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5">Reach Us</p>
            <h2 className="text-3xl leading-tight text-primary md:text-4xl">Speak with our Arusha office.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Our team responds to every inquiry within one business day. For urgent matters, email or
              call directly.
            </p>

            <ul className="mt-10 space-y-7">
              {contactItems.map((item) => (
                <li key={item.label} className="flex gap-5">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                    <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 inline-block text-foreground hover:text-accent">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-foreground">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="relative mt-12 overflow-hidden rounded-md bg-primary p-8 text-primary-foreground">
              <div className="maasai-border absolute inset-x-0 top-0 opacity-90" />
              <p className="text-2xl leading-snug">"Trust is the rarest gem we offer."</p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-accent">Top Maasai Mining Co.</p>
            </div>
          </div>

          <form
            action={`mailto:${contactDetails.email}`}
            method="post"
            encType="text/plain"
            className="space-y-6 rounded-md border bg-card p-8 shadow-card md:p-12"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full name
                </label>
                <input id="name" name="name" required placeholder="Jane Doe" className={fieldClasses.input} />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className={fieldClasses.input}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="inquiry" className="text-sm font-medium text-foreground">
                Inquiry type
              </label>
              <select id="inquiry" name="inquiry" defaultValue="Gemstone Sourcing" className={fieldClasses.select}>
                <option>Gemstone Sourcing</option>
                <option>Rare Earth Minerals</option>
                <option>Lapidary Services</option>
                <option>Jewelry Production</option>
                <option>Mining Investment</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us about your project, volume requirements, or questions."
                className={fieldClasses.textarea}
              />
            </div>

            <button type="submit" className={buttonClasses.navy}>
              Send Inquiry <Send className="h-4 w-4" />
            </button>

            <p className="text-xs text-muted-foreground">
              Submitting this form opens your email client with the details prefilled. For direct outreach,
              email {contactDetails.email}.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
