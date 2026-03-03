"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * "Why INT Inc." section with animated data vault illustration.
 */
export function WhyIntSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="why-int"
      className="py-24 bg-muted-foreground/5 border-t border-border"
      aria-labelledby="why-int-heading"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Data Vault Illustration */}
        <div className="md:col-span-5 relative">
          <div className="aspect-square bg-int-dark rounded-xl overflow-hidden relative border border-border shadow-2xl">
            <DataVaultIllustration animate={!prefersReducedMotion} />
            <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-int-gold font-sans font-bold tracking-widest opacity-80">
              LIVE MONITORING ACTIVE
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-teal uppercase">
            THE DIFFERENCE
          </div>
          <h2
            id="why-int-heading"
            className="font-serif text-4xl mb-6 text-int-navy"
          >
            Why INT Inc.
          </h2>
          <p className="text-lg text-muted mb-6 leading-relaxed">
            Other firms sell you a relationship. We sell you an outcome. 25
            years of managed services excellence means we know how to build,
            operate, AND walk away when the mission is complete.
          </p>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            We maintain the plumbing so you can focus on the business value.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <StatCard value="4 Weeks" label="Average time to live deployment" />
            <StatCard
              value="25+"
              label="Years of Managed Services Excellence"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 p-6 bg-card border border-border rounded-lg shadow-sm">
      <div className="text-3xl font-serif text-int-gold mb-2">{value}</div>
      <p className="text-sm text-muted font-medium">{label}</p>
    </div>
  );
}

/**
 * CSS/SVG data vault illustration replacing Three.js scene.
 */
function DataVaultIllustration({ animate }: { animate: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-int-dark via-int-navy/20 to-int-dark" />

      {/* Server stack illustration */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Top security cap */}
        <motion.div
          className="w-32 h-2 rounded-full bg-int-gold shadow-lg shadow-int-gold/30"
          animate={animate ? { opacity: [0.7, 1, 0.7] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Server units */}
        <div className="mt-4 space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="relative"
              animate={
                animate ? { y: [0, -2, 0] } : {}
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              <div className="w-28 h-8 bg-int-navy border border-white/10 rounded-sm flex items-center px-2 gap-1">
                {/* Status lights */}
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === 2 ? "bg-int-gold" : "bg-int-teal"
                  } ${animate ? "animate-pulse" : ""}`}
                />
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === 1 ? "bg-int-gold" : "bg-int-teal"
                  } opacity-60`}
                />
                <div className="flex-1" />
                <div className="w-8 h-1 bg-white/20 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Base platform */}
        <div className="mt-4 w-36 h-4 bg-int-navy rounded-sm border border-white/20" />

        {/* Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 200 200"
        >
          <motion.ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="25"
            fill="none"
            stroke="rgba(13, 148, 136, 0.3)"
            strokeWidth="1"
            animate={animate ? { rotate: 360 } : {}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
          <motion.ellipse
            cx="100"
            cy="100"
            rx="85"
            ry="30"
            fill="none"
            stroke="rgba(30, 58, 95, 0.3)"
            strokeWidth="1"
            animate={animate ? { rotate: -360 } : {}}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "center" }}
          />
        </svg>
      </div>
    </div>
  );
}
