"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const data = {
  consultant: { val: 150, label: "$150k" },
  invelo: { val: 25, label: "$25k" },
};

/**
 * Cost comparison bar chart: Big 4 consultant vs InVelo.
 */
export function CostComparisonChart() {
  const [hoveredBar, setHoveredBar] = useState<"consultant" | "invelo" | null>(
    null
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className="flex flex-col md:flex-row gap-8 items-center p-8 bg-card text-int-navy rounded-xl my-8 border border-border shadow-md"
      data-testid="diagram-cost"
    >
      <div className="flex-1 min-w-[240px]">
        <h3 className="font-serif text-2xl mb-2 text-int-navy">
          The Cost of Compliance
        </h3>
        <p className="text-muted text-sm mb-6 leading-relaxed">
          Comparison for a standard SOC 2 Type II remediation project.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm text-muted">
            <div
              className="w-4 h-4 bg-muted rounded-sm"
              aria-hidden="true"
            />
            <span>Big 4 Consultant (3 Months)</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-int-navy font-bold">
            <div
              className="w-4 h-4 bg-int-teal rounded-sm"
              aria-hidden="true"
            />
            <span>InVelo Catalyst Build (6 Weeks)</span>
          </div>
        </div>
      </div>

      <div
        className="relative w-64 h-72 bg-int-cream rounded-xl border border-border p-6 flex justify-around items-end"
        role="img"
        aria-label="Bar chart comparing costs: Big 4 Consultant $150k, InVelo $25k"
      >
        {/* Grid lines */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10"
          aria-hidden="true"
        >
          <div className="w-full h-[1px] bg-int-navy" />
          <div className="w-full h-[1px] bg-int-navy" />
          <div className="w-full h-[1px] bg-int-navy" />
          <div className="w-full h-[1px] bg-int-navy" />
        </div>

        {/* Consultant Bar */}
        <div
          className="w-20 flex flex-col justify-end items-center h-full z-10"
          onMouseEnter={() => setHoveredBar("consultant")}
          onMouseLeave={() => setHoveredBar(null)}
          data-testid="bar-consultant"
        >
          <div className="flex-1 w-full flex items-end justify-center relative mb-3">
            <AnimatePresence>
              {hoveredBar === "consultant" && (
                <motion.div
                  className="absolute bottom-full mb-3 bg-int-dark text-white text-xs font-bold py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  role="tooltip"
                >
                  {data.consultant.label}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-int-dark"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="w-full bg-muted rounded-t-sm"
              initial={prefersReducedMotion ? { height: "100%" } : { height: 0 }}
              animate={{ height: "100%" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 20 }
              }
            />
          </div>
          <div className="h-8 flex items-center text-[10px] font-bold text-muted uppercase tracking-wider text-center">
            Big 4 Firm
          </div>
        </div>

        {/* InVelo Bar */}
        <div
          className="w-20 flex flex-col justify-end items-center h-full z-10"
          onMouseEnter={() => setHoveredBar("invelo")}
          onMouseLeave={() => setHoveredBar(null)}
          data-testid="bar-invelo"
        >
          <div className="flex-1 w-full flex items-end justify-center relative mb-3">
            <AnimatePresence>
              {hoveredBar === "invelo" && (
                <motion.div
                  className="absolute bottom-full mb-3 bg-int-dark text-white text-xs font-bold py-1.5 px-3 rounded shadow-xl whitespace-nowrap z-50 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  role="tooltip"
                >
                  {data.invelo.label}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-int-dark"
                    aria-hidden="true"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              className="w-full bg-gradient-to-t from-int-navy to-int-teal rounded-t-md shadow-lg"
              initial={
                prefersReducedMotion ? { height: "16.6%" } : { height: 0 }
              }
              animate={{ height: "16.6%" }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 20, delay: 0.2 }
              }
            />
          </div>
          <div className="h-8 flex items-center text-[10px] font-bold text-int-navy uppercase tracking-wider text-center">
            InVelo
          </div>
        </div>
      </div>
    </div>
  );
}
