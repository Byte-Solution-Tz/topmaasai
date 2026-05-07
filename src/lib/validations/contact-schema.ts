import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z
    .string()
    .trim()
    .max(160, "Company must be 160 characters or fewer.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Please share at least 20 characters so we can respond properly.")
    .max(3000, "Message must be 3,000 characters or fewer."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
