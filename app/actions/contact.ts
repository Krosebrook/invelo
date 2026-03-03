"use server";

import { contactSchema, type ContactFormState } from "@/lib/contact-schema";
import { Resend } from "resend";

/**
 * Server action to handle contact form submission.
 * Validates input with Zod, then sends email via Resend if configured.
 */
export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Parse form data
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
  };

  // Validate with Zod
  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      error: "Please check your inputs and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, company, message } = parsed.data;

  // Check for Resend API key
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL || "contact@intinc.com";

  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "InVelo Contact Form <onboarding@resend.dev>",
        to: contactEmail,
        replyTo: email,
        subject: `InVelo Inquiry from ${name}${company ? ` (${company})` : ""}`,
        text: `
New contact form submission from InVelo:

Name: ${name}
Email: ${email}
${company ? `Company: ${company}\n` : ""}
Message:
${message}

---
Sent from InVelo Contact Form
        `.trim(),
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      return {
        error:
          "Failed to send your message. Please try again or email us directly.",
      };
    }
  } else {
    // Log submission for development/preview environments
    console.log("Contact form submission (no RESEND_API_KEY configured):", {
      name,
      email,
      company,
      message: message.substring(0, 100) + "...",
    });
  }

  return { success: true };
}
