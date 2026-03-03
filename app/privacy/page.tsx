import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | InVelo by INT Inc.",
  description: "Privacy policy for InVelo services and the INT Inc. website.",
};

/**
 * Privacy Policy page.
 */
export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-int-gold transition-colors mb-8"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Back to Home
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl text-int-navy mb-8">
          Privacy Policy
        </h1>

        <div className="text-base md:text-lg leading-relaxed text-muted space-y-6">
          <p>
            <strong>Last updated:</strong> January 2026
          </p>

          <section>
            <h2 className="font-serif text-2xl text-int-navy mt-8 mb-4">
              Information We Collect
            </h2>
            <p>
              When you use our contact form or engage with our services, we
              collect information you provide directly, including your name,
              email address, company name, and message content.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-int-navy mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p>
              We use your information to respond to your inquiries, provide our
              services, and communicate with you about our offerings. We do not
              sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-int-navy mt-8 mb-4">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. All data transmissions are
              encrypted using industry-standard TLS protocols.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-int-navy mt-8 mb-4">
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy, please contact us
              through our website or email us at privacy@intinc.com.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} INT Inc. All rights reserved.
        </div>
      </div>
    </main>
  );
}
