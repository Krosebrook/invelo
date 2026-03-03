import Link from "next/link";
import { ArrowLeft, Shield, CheckCircle } from "lucide-react";

export const metadata = {
  title: "SOC 2 Compliance | InVelo by INT Inc.",
  description:
    "INT Inc. maintains SOC 2 Type II certification. Learn about our security and compliance commitments.",
};

/**
 * SOC 2 compliance information page.
 */
export default function SOC2Page() {
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

        <div className="flex items-center gap-4 mb-8">
          <Shield className="text-int-teal" size={48} aria-hidden="true" />
          <h1 className="font-serif text-4xl md:text-5xl text-int-navy">
            SOC 2 Compliance
          </h1>
        </div>

        <div className="bg-int-cream rounded-xl p-8 border border-border mb-8">
          <h2 className="font-serif text-xl text-int-navy mb-4">
            Our Commitment to Security
          </h2>
          <p className="text-muted leading-relaxed">
            INT Inc. maintains SOC 2 Type II certification, demonstrating our
            commitment to the security, availability, and confidentiality of
            customer data. Every InVelo catalyst build is designed with
            compliance in mind from day one.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-2xl text-int-navy">
            Security Controls
          </h2>

          <ul className="space-y-4" role="list">
            {[
              "End-to-end encryption for data at rest and in transit",
              "Multi-factor authentication for all system access",
              "Immutable audit logging and activity monitoring",
              "Regular security assessments and penetration testing",
              "Employee security training and background checks",
              "Incident response and disaster recovery procedures",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle
                  className="text-int-teal flex-shrink-0 mt-1"
                  size={20}
                  aria-hidden="true"
                />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 p-8 bg-int-navy rounded-xl text-white">
          <h2 className="font-serif text-xl mb-4">Request Our SOC 2 Report</h2>
          <p className="text-muted-foreground mb-6">
            Qualified prospects and customers can request a copy of our SOC 2
            Type II report under NDA.
          </p>
          <Link
            href="/#contact"
            className="inline-block px-6 py-3 bg-int-gold text-white font-bold rounded-full hover:bg-white hover:text-int-gold transition-colors"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted">
          &copy; {new Date().getFullYear()} INT Inc. All rights reserved.
        </div>
      </div>
    </main>
  );
}
