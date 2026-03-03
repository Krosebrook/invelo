"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * CSS/SVG animated hero background replacing Three.js.
 * Respects prefers-reduced-motion for accessibility.
 */
export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Static gradient for reduced motion */}
        <div className="absolute inset-0 bg-gradient-to-br from-int-navy/40 via-int-dark/80 to-int-dark" />
        {/* Static orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-int-teal/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-int-gold/10 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-int-navy/40 via-int-dark/80 to-int-dark animate-gradient-shift" />

      {/* Floating orbs with CSS transforms */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-int-teal/15 blur-3xl"
        style={{ top: "20%", left: "15%" }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-int-gold/10 blur-3xl"
        style={{ bottom: "15%", right: "10%" }}
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-int-navy/20 blur-2xl"
        style={{ top: "40%", right: "30%" }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SVG Ring elements */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Outer ring - slow rotation */}
        <motion.circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="rgba(197, 160, 89, 0.15)"
          strokeWidth="0.2"
          strokeDasharray="5 3"
          animate={{ rotate: 360 }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "center" }}
        />
        {/* Inner ring - counter rotation */}
        <motion.circle
          cx="50"
          cy="50"
          r="25"
          fill="none"
          stroke="rgba(13, 148, 136, 0.2)"
          strokeWidth="0.15"
          strokeDasharray="3 2"
          animate={{ rotate: -360 }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "center" }}
        />
        {/* Center pulse ring */}
        <motion.circle
          cx="50"
          cy="50"
          r="15"
          fill="none"
          stroke="rgba(30, 58, 95, 0.25)"
          strokeWidth="0.1"
          animate={{
            r: [15, 18, 15],
            opacity: [0.25, 0.15, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>

      {/* Particle dots */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
