"use client";

import { useActionState } from "react";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import type { ContactFormState } from "@/lib/contact-schema";

/**
 * Contact / Start Mission section with working form.
 */
export function ContactSection() {
  const [state, action, pending] = useActionState<ContactFormState, FormData>(
    submitContact,
    null
  );

  return (
    <section
      id="contact"
      className="py-24 bg-int-navy text-white"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            id="contact-heading"
            className="font-serif text-4xl md:text-5xl mb-6 text-center"
          >
            Start a Mission
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-center">
            Tell us the problem. We&apos;ll tell you what we&apos;d build, how
            long it takes, and what it costs. No pitch deck. No 6-month
            engagement. Just a plan.
          </p>

          {state?.success ? (
            <SuccessMessage />
          ) : (
            <form action={action} className="space-y-6">
              {/* Global error message */}
              {state?.error && !state?.fieldErrors && (
                <div
                  className="flex items-center gap-2 p-4 bg-destructive/20 border border-destructive/30 rounded-lg text-destructive-foreground"
                  role="alert"
                >
                  <AlertCircle size={18} aria-hidden="true" />
                  <span>{state.error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white"
                  >
                    Your Name <span className="text-int-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 bg-int-dark border border-white/20 rounded-lg text-white placeholder:text-muted focus:border-int-gold focus:ring-2 focus:ring-int-gold/20 transition-colors"
                    placeholder="Jane Smith"
                    aria-describedby={
                      state?.fieldErrors?.name ? "name-error" : undefined
                    }
                    aria-invalid={!!state?.fieldErrors?.name}
                  />
                  {state?.fieldErrors?.name && (
                    <p
                      id="name-error"
                      className="text-sm text-red-400"
                      role="alert"
                    >
                      {state.fieldErrors.name[0]}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email Address <span className="text-int-gold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-int-dark border border-white/20 rounded-lg text-white placeholder:text-muted focus:border-int-gold focus:ring-2 focus:ring-int-gold/20 transition-colors"
                    placeholder="jane@company.com"
                    aria-describedby={
                      state?.fieldErrors?.email ? "email-error" : undefined
                    }
                    aria-invalid={!!state?.fieldErrors?.email}
                  />
                  {state?.fieldErrors?.email && (
                    <p
                      id="email-error"
                      className="text-sm text-red-400"
                      role="alert"
                    >
                      {state.fieldErrors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Company field */}
              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-white"
                >
                  Company{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  className="w-full px-4 py-3 bg-int-dark border border-white/20 rounded-lg text-white placeholder:text-muted focus:border-int-gold focus:ring-2 focus:ring-int-gold/20 transition-colors"
                  placeholder="Acme Corp"
                />
              </div>

              {/* Message field */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Tell us about your problem{" "}
                  <span className="text-int-gold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-int-dark border border-white/20 rounded-lg text-white placeholder:text-muted focus:border-int-gold focus:ring-2 focus:ring-int-gold/20 transition-colors resize-y min-h-[120px]"
                  placeholder="We need a compliance dashboard for our SOC 2 audit, but our current tools don't provide the audit trail we need..."
                  aria-describedby={
                    state?.fieldErrors?.message ? "message-error" : undefined
                  }
                  aria-invalid={!!state?.fieldErrors?.message}
                />
                {state?.fieldErrors?.message && (
                  <p
                    id="message-error"
                    className="text-sm text-red-400"
                    role="alert"
                  >
                    {state.fieldErrors.message[0]}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="flex flex-col md:flex-row justify-center gap-6 pt-4">
                <button
                  type="submit"
                  disabled={pending}
                  className="px-8 py-4 bg-int-gold text-white font-bold rounded-full hover:bg-white hover:text-int-gold transition-all shadow-lg transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-int-gold disabled:hover:text-white flex items-center justify-center gap-2"
                >
                  {pending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    "Start a Mission"
                  )}
                </button>

                <a
                  href="https://humanx.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  Meet us at HumanX 2026
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function SuccessMessage() {
  return (
    <div
      className="text-center py-12 px-6 bg-int-dark/50 rounded-xl border border-int-teal/30"
      role="status"
      aria-live="polite"
    >
      <CheckCircle
        size={48}
        className="text-int-teal mx-auto mb-4"
        aria-hidden="true"
      />
      <h3 className="font-serif text-2xl text-white mb-2">Message Sent!</h3>
      <p className="text-muted-foreground">
        Thank you for reaching out. We&apos;ll be in touch within 24 hours to
        discuss your mission.
      </p>
    </div>
  );
}
