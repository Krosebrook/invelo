"use client";

import { ArrowDown } from "lucide-react";
import { HeroScene } from "@/components/hero-scene";
import { scrollToSection } from "@/lib/scroll";

/**
 * Hero section with animated background and main CTA.
 */
export function HeroSection() {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-int-dark">
      <HeroScene />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(30,58,95,0.4)_0%,rgba(15,23,42,0.8)_60%,rgba(15,23,42,1)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <div className="inline-block mb-6 px-4 py-1 border border-int-teal/50 text-int-teal text-xs tracking-[0.25em] uppercase font-bold rounded-full backdrop-blur-md bg-int-navy/30 shadow-[0_0_15px_rgba(13,148,136,0.3)]">
          HumanX 2026 &bull; San Francisco
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-8 drop-shadow-lg text-balance">
          InVelo
          <span className="italic font-light text-muted-foreground text-3xl md:text-5xl block mt-4">
            Mission-Complete AI Services
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-12 text-pretty">
          INT Inc. builds catalyst tools that solve one problem fast—compliance
          dashboards, onboarding accelerators, crisis response systems—then
          hands you the keys.
          <span className="block mt-4 text-int-gold font-medium">
            No lock-in. No consultant debt. Just outcomes.
          </span>
        </p>

        <div className="flex justify-center mt-12">
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection("how-it-works", e)}
            data-testid="hero-discover-cta"
            className="group relative inline-flex items-center gap-4 px-12 py-5 rounded-full border border-int-gold/80 bg-int-navy/40 text-int-gold shadow-[0_0_20px_rgba(197,160,89,0.2)] backdrop-blur-md transition-all duration-500 hover:bg-int-gold hover:text-int-navy hover:shadow-[0_0_60px_rgba(197,160,89,0.6)] hover:-translate-y-1 hover:scale-105 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-int-dark"
          >
            <span className="text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-300">
              See How It Works
            </span>
            <ArrowDown
              size={20}
              className="transition-transform duration-500 group-hover:translate-y-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
