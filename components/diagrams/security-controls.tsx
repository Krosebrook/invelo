"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, UserCheck, Lock, Activity } from "lucide-react";

const controls = [
  {
    id: "AUTH",
    label: "AUTH",
    icon: UserCheck,
    tooltip: "Verifies user identity and permissions",
  },
  {
    id: "ENC",
    label: "ENC",
    icon: Lock,
    tooltip: "End-to-end data encryption at rest and in transit",
  },
  {
    id: "LOG",
    label: "LOG",
    icon: Activity,
    tooltip: "Immutable audit trails and incident logging",
  },
  {
    id: "SOC2",
    label: "SOC2",
    icon: Shield,
    tooltip: "Continuous compliance monitoring and reporting",
  },
] as const;

/**
 * Security controls diagram showing AUTH, ENC, LOG, SOC2 capabilities.
 */
export function SecurityControlsDiagram() {
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);

  return (
    <div
      className="relative flex flex-col items-center p-6 bg-int-dark/30 rounded-xl border border-white/10 my-6 w-full group"
      data-testid="diagram-security-container"
    >
      <div
        className="w-full flex flex-col items-center bg-int-navy/50 p-6 rounded-lg"
        data-testid="diagram-security"
      >
        <div className="flex items-center gap-2 mb-6">
          <Shield className="text-int-gold" size={20} aria-hidden="true" />
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">
            Security Controls
          </h3>
        </div>

        <div
          className="flex justify-around w-full gap-2"
          role="list"
          aria-label="Security controls"
        >
          {controls.map((control) => {
            const Icon = control.icon;
            const isHovered = hoveredControl === control.id;

            return (
              <div
                key={control.id}
                className="relative flex flex-col items-center"
                role="listitem"
              >
                <motion.button
                  className={`w-14 h-14 rounded-lg border flex items-center justify-center transition-all duration-300 cursor-help ${
                    isHovered
                      ? "border-int-gold bg-int-gold/10 text-int-gold scale-110 shadow-[0_0_15px_rgba(197,160,89,0.3)]"
                      : "border-white/10 text-white/60 bg-white/5"
                  }`}
                  onMouseEnter={() => setHoveredControl(control.id)}
                  onMouseLeave={() => setHoveredControl(null)}
                  onFocus={() => setHoveredControl(control.id)}
                  onBlur={() => setHoveredControl(null)}
                  aria-label={`${control.label}: ${control.tooltip}`}
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.button>

                <span
                  className={`text-[9px] font-bold mt-2 tracking-widest transition-colors ${
                    isHovered ? "text-int-gold" : "text-white/40"
                  }`}
                >
                  {control.label}
                </span>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute bottom-full mb-4 w-40 bg-int-dark border border-int-gold/30 text-white text-[10px] leading-snug p-3 rounded-lg shadow-2xl z-[100] pointer-events-none"
                      role="tooltip"
                    >
                      <p className="font-bold text-int-gold uppercase tracking-widest mb-1 border-b border-white/10 pb-1">
                        {control.label}
                      </p>
                      <p className="text-muted-foreground pt-1 leading-relaxed">
                        {control.tooltip}
                      </p>
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-int-dark"
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
