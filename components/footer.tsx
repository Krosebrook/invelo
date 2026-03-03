import Link from "next/link";
import { ArrowRight } from "lucide-react";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/soc2", label: "SOC 2 Report" },
];

/**
 * Site footer with branding, navigation links, and trust badges.
 */
export function Footer() {
  return (
    <footer
      className="bg-int-dark text-muted-foreground py-16 border-t border-white/10"
      role="contentinfo"
    >
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Branding */}
        <div className="text-center md:text-left">
          <div className="text-white font-serif font-bold text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
            <span className="text-int-gold">I</span> INT INC.
          </div>
          <p className="text-sm opacity-80 mb-2">
            We are not consultants. We are partners.
          </p>
          <p className="text-xs text-muted">
            InVelo is a service line of INT Inc.
          </p>
        </div>

        {/* Navigation Links */}
        <nav
          className="flex flex-wrap justify-center gap-8 text-sm font-medium"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://humanx.co"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-int-gold flex items-center gap-1"
          >
            HumanX 2026
            <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </div>

      {/* Trust Badges */}
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5">
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <TrustBadge label="SOC 2 Type II" />
          <TrustBadge label="Women-Owned Business" />
          <TrustBadge label="25+ Years Excellence" />
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 text-xs text-muted">
        &copy; {new Date().getFullYear()} INT Inc. All rights reserved. |
        Lincolnshire, IL
      </div>
    </footer>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-medium text-white/70">
      <div className="w-2 h-2 rounded-full bg-int-teal" aria-hidden="true" />
      {label}
    </div>
  );
}
