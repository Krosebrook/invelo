"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Database, ClipboardCheck, CheckCircle } from "lucide-react";

const stages = [
  {
    id: 0,
    label: "Discovery",
    icon: Search,
    description: "Week 1: Interview IT team, identify 15 key processes.",
  },
  {
    id: 1,
    label: "Build",
    icon: Database,
    description: "Weeks 2-3: Build real-time access & incident logs.",
  },
  {
    id: 2,
    label: "Review",
    icon: ClipboardCheck,
    description: "Week 4: Internal compliance validation & refinement.",
  },
  {
    id: 3,
    label: "Audit Pass",
    icon: CheckCircle,
    description: "Weeks 5-6: Auditor review. System live. Passed.",
  },
] as const;

const statusMessages = [
  "Week 1: Discovery & Requirements...",
  "Weeks 2-3: Rapid Compliance Build...",
  "Week 4: Verification & Handoff...",
  "Weeks 5-6: Audit Success. Mission Complete.",
] as const;

/**
 * SOC 2 Sprint timeline diagram showing the 6-week journey.
 */
export function SOC2SprintDiagram() {
  const [step, setStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div
      className="flex flex-col items-center p-8 bg-int-navy rounded-xl border border-int-teal/20 my-8 shadow-2xl overflow-visible"
      data-testid="diagram-soc2"
    >
      <h3 className="font-serif text-xl mb-4 text-white">The SOC 2 Sprint</h3>
      <p className="text-sm text-muted-foreground mb-8 text-center max-w-md">
        How a healthcare IT firm went from chaos to compliant in 6 weeks.
      </p>

      <div
        className="relative w-full max-w-lg flex items-center justify-between mb-8 px-4"
        aria-label="SOC 2 Sprint timeline: Discovery, Build, Review, Audit Pass"
      >
        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = step === i;
          const isHovered = hoveredStep === i;
          const isAuditPass = i === 3;

          return (
            <div key={stage.id} className="flex items-center">
              <div
                className="flex flex-col items-center gap-3 relative z-10"
              >
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute bottom-full mb-4 w-48 bg-int-dark border border-int-gold/30 text-white text-[10px] leading-snug p-3 rounded-lg shadow-2xl z-[100] pointer-events-none"
                      role="tooltip"
                    >
                      <p className="font-bold text-int-gold uppercase tracking-widest mb-1 border-b border-white/10 pb-1">
                        {stage.label}
                      </p>
                      <p className="text-muted-foreground pt-1 leading-relaxed">
                        {stage.description}
                      </p>
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-int-dark"
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-help
                    ${
                      isActive
                        ? isAuditPass
                          ? "border-int-gold bg-int-gold text-white shadow-[0_0_20px_rgba(197,160,89,0.3)]"
                          : "border-white text-white bg-int-teal shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        : "border-muted text-muted bg-int-dark"
                    }
                    ${isHovered ? "border-int-gold text-white scale-110" : ""}
                  `}
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          scale: isHovered ? 1.15 : isActive ? 1.1 : 1,
                          y: isActive ? -4 : 0,
                        }
                  }
                  onMouseEnter={() => setHoveredStep(i)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onFocus={() => setHoveredStep(i)}
                  onBlur={() => setHoveredStep(null)}
                  aria-label={`${stage.label}: ${stage.description}`}
                >
                  <Icon size={24} aria-hidden="true" />
                </motion.button>

                <span
                  className={`text-[10px] uppercase font-bold tracking-wider transition-colors duration-300 ${
                    isActive || isHovered ? "text-white" : "text-muted"
                  }`}
                >
                  {stage.label}
                </span>
              </div>

              {i < stages.length - 1 && (
                <div className="flex-1 h-[2px] bg-muted mx-2 relative overflow-hidden min-w-[40px]">
                  <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ x: "-100%" }}
                    animate={{ x: step > i ? "0%" : "-100%" }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div
        className="w-full bg-int-dark/50 p-4 rounded-lg border border-muted/50 min-h-[60px] flex items-center justify-center text-center"
        aria-live="polite"
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
            className="text-sm text-muted-foreground italic"
          >
            {statusMessages[step]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
