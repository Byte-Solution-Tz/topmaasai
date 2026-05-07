"use server";

import { resend } from "@/src/lib/resend";
import { contactSchema, type ContactFormValues } from "@/src/lib/validations/contact-schema";

type ContactActionResponse = {
  success: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
};

const sender = "Top Maasai <inquiries@topmaasai.com>";
const recipient = process.env.CONTACT_EMAIL ?? "inquiries@topmaasai.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendContactMessage(values: ContactFormValues): Promise<ContactActionResponse> {
  const result = contactSchema.safeParse(values);

  if (!result.success) {
    return {
      success: false,
      message: "Please review the highlighted fields.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      success: false,
      message: "Email delivery is not configured yet. Please email inquiries@topmaasai.com directly.",
    };
  }

  const data = result.data;
  const company = data.company?.trim();
  const subject = `New inquiry from ${data.name}`;

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    company ? `Company: ${company}` : null,
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2933; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New Top Maasai inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    if (error) {
      return {
        success: false,
        message: "We could not send your inquiry. Please email inquiries@topmaasai.com directly.",
      };
    }

    return {
      success: true,
      message: "Your inquiry has been sent. Our team will respond within one business day.",
    };
  } catch {
    return {
      success: false,
      message: "We could not send your inquiry. Please email inquiries@topmaasai.com directly.",
    };
  }
}
