"use client";

import { useEffect, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "@/src/actions/contact";
import { contactSchema, type ContactFormValues } from "@/src/lib/validations/contact-schema";

type FormStatus = {
  type: "success" | "error";
  message: string;
} | null;

const inputClasses =
  "w-full rounded-2xl border border-accent/25 bg-primary-foreground px-6 py-8 font-body text-base leading-relaxed text-primary caret-accent outline-none transition placeholder:text-primary/45 focus:border-accent focus:bg-primary-foreground focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60 autofill:border-accent autofill:shadow-[inset_0_0_0_1000px_hsl(var(--primary-foreground))] autofill:[-webkit-text-fill-color:hsl(var(--primary))]";

const textInputClasses = `${inputClasses} min-h-[2rem] px-7 py-8 text-lg`;

const labelClasses = "font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/70";

const errorClasses = "font-body text-sm text-accent";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!status) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setStatus(null);
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [status]);

  function onSubmit(values: ContactFormValues) {
    setStatus(null);

    startTransition(async () => {
      const response = await sendContactMessage(values);

      if (!response.success) {
        if (response.fieldErrors) {
          Object.entries(response.fieldErrors).forEach(([field, messages]) => {
            if (messages?.[0]) {
              setError(field as keyof ContactFormValues, { message: messages[0] });
            }
          });
        }

        setStatus({ type: "error", message: response.message });
        return;
      }

      reset();
      setStatus({ type: "success", message: response.message });
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary p-7 text-primary-foreground shadow-elevated md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.07] mix-blend-overlay"
      />

      <div className="relative space-y-7">
        <div>
          <p className="eyebrow mb-4 text-accent">Contact Us</p>
          <h2 className="font-heading text-3xl leading-tight md:text-4xl">Send us your sourcing request.</h2>
        </div>

        {status ? (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-2xl border px-5 py-4 text-sm leading-relaxed shadow-card ${
              status.type === "success"
                ? "border-accent/50 bg-accent/10 text-primary-foreground"
                : "border-destructive/50 bg-destructive/10 text-primary-foreground"
            }`}
          >
            <div className="flex gap-3">
              {status.type === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" /> : null}
              <p>{status.message}</p>
            </div>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-4">
            <label htmlFor="name" className={labelClasses}>
              Full name
            </label>
            <input
              id="name"
              autoComplete="name"
              placeholder="Jane Doe"
              className={textInputClasses}
              {...register("name")}
            />
            {errors.name?.message ? <p className={errorClasses}>{errors.name.message}</p> : null}
          </div>

          <div className="space-y-4">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="jane@company.com"
              className={textInputClasses}
              {...register("email")}
            />
            {errors.email?.message ? <p className={errorClasses}>{errors.email.message}</p> : null}
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="company" className={labelClasses}>
            Company
          </label>
          <input
            id="company"
            autoComplete="organization"
            placeholder="Company or atelier"
            className={textInputClasses}
            {...register("company")}
          />
          {errors.company?.message ? <p className={errorClasses}>{errors.company.message}</p> : null}
        </div>

        <div className="space-y-4">
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            rows={7}
            placeholder="Tell us about the stones, minerals, quantities, destination, or partnership you are exploring."
            className={`${inputClasses} min-h-60 resize-y`}
            {...register("message")}
          />
          {errors.message?.message ? <p className={errorClasses}>{errors.message.message}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-8 font-body text-sm font-semibold text-accent-foreground transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              Sending <Loader2 className="h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Send Inquiry <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

    </form>
  );
}
