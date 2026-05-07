import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/src/components/forms/ContactForm";
import { PageHeader } from "@/components/sections/PageHeader";
import { contactDetails } from "@/lib/site-data";

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
      <div className="-mt-36 bg-primary pt-36">
        <PageHeader
          eyebrow="Contact"
          title="Let's begin a conversation."
          description="Whether you are sourcing a single rare stone or building a long-term partnership, our team is ready to help."
        />
      </div>

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
              <p className="text-2xl leading-snug">"Trust is the rarest gem we offer."</p>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-accent">Top Maasai Mining Co.</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
