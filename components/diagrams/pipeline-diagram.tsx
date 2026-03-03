"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Search,
  Brain,
  Layers,
  Rocket,
  UserCheck,
  Activity,
  Flag,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

const stages = [
  {
    id: 1,
    label: "Intake",
    icon: Search,
    desc: "Discovery call & success metrics definition. (1-2 Days)",
  },
  {
    id: 2,
    label: "Design",
    icon: Brain,
    desc: "Architecture sprint & tool selection. (3 Days)",
  },
  {
    id: 3,
    label: "Build",
    icon: Layers,
    desc: "Rapid development & compliance checks. (2 Weeks)",
  },
  {
    id: 4,
    label: "Deploy",
    icon: Rocket,
    desc: "Soft launch & data export testing. (1 Week)",
  },
  {
    id: 5,
    label: "Handoff",
    icon: UserCheck,
    desc: "Training & full ownership transfer. (Week 4)",
  },
  {
    id: 6,
    label: "Operate",
    icon: Activity,
    desc: "Optional managed support period. (2-6 Months)",
  },
  {
    id: 7,
    label: "Retire",
    icon: Flag,
    desc: "Mission Complete. Data export & deprecation. (No Lock-in)",
  },
] as const;

const coords = [
  { x: "20%", y: "20%" },
  { x: "50%", y: "20%" },
  { x: "80%", y: "20%" },
  { x: "80%", y: "50%" },
  { x: "50%", y: "50%" },
  { x: "20%", y: "50%" },
  { x: "20%", y: "80%" },
];

/**
 * 7-Stage InVelo pipeline diagram with hover tooltips.
 * Shows the complete delivery lifecycle from intake to retirement.
 */
export function PipelineDiagram() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [currentStageId, setCurrentStageId] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const day = new Date().getDay();
    // Map Monday (1) to Stage 1, Sunday (0) to Stage 7
    const stageId = day === 0 ? 7 : day;
    setCurrentStageId(stageId);
  }, []);

  return (
    <div
      className="flex flex-col items-center p-8 bg-card rounded-xl shadow-sm border border-int-navy/10 my-8"
      data-testid="diagram-pipeline"
    >
      <div className="flex items-center gap-2 mb-4">
        <ClipboardCheck className="text-int-teal" size={24} aria-hidden="true" />
        <h3 className="font-serif text-xl text-int-navy">
          7-Stage Delivery Playbook
        </h3>
      </div>
      <p className="text-sm text-muted mb-8 text-center max-w-md">
        From intake to retirement. Hover to see the timeline.
      </p>

      <div
        className="relative w-72 h-72 bg-int-cream rounded-lg border border-int-navy/10 p-4"
        role="img"
        aria-label="7-stage pipeline diagram showing: Intake, Design, Build, Deploy, Handoff, Operate, and Retire phases"
      >
        {/* Connector Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          aria-hidden="true"
        >
          <path
            d="M 57.6 57.6 L 144 57.6 L 230.4 57.6 L 230.4 144 L 144 144 L 57.6 144 L 57.6 230.4 L 144 230.4"
            fill="none"
            stroke="#1E3A5F"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>

        {stages.map((stage, i) => {
          const Icon = stage.icon;
          const isHovered = hoveredStage === stage.id;
          const isCurrent = currentStageId === stage.id;
          const isRetire = stage.id === 7;

          return (
            <div key={stage.id}>
              <motion.button
                className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 cursor-help z-10 
                  ${
                    isRetire
                      ? "bg-int-gold border-int-gold text-white shadow-lg"
                      : "bg-card border-int-navy text-int-navy hover:border-int-teal hover:text-int-teal"
                  }
                  ${isHovered ? "scale-125 z-20" : ""}
                  ${isCurrent && !isRetire ? "border-int-teal text-int-teal shadow-[0_0_15px_rgba(13,148,136,0.3)]" : ""}
                `}
                style={{ left: coords[i].x, top: coords[i].y }}
                onMouseEnter={() => setHoveredStage(stage.id)}
                onMouseLeave={() => setHoveredStage(null)}
                onFocus={() => setHoveredStage(stage.id)}
                onBlur={() => setHoveredStage(null)}
                data-testid={`pipeline-stage-${stage.id}`}
                aria-label={`${stage.label}: ${stage.desc}`}
                aria-describedby={`stage-desc-${stage.id}`}
              >
                {isCurrent && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-int-teal"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    aria-hidden="true"
                  />
                )}
                <Icon size={14} aria-hidden="true" />

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-int-dark text-white text-[10px] leading-tight p-3 rounded-md shadow-2xl pointer-events-none z-50"
                      role="tooltip"
                      id={`stage-desc-${stage.id}`}
                    >
                      <div className="text-int-gold font-bold mb-1 border-b border-white/10 pb-1 uppercase tracking-wider">
                        {stage.label}{" "}
                        {isCurrent && (
                          <span className="text-int-teal ml-1">(Today)</span>
                        )}
                      </div>
                      <div className="text-muted-foreground mt-1">
                        {stage.desc}
                      </div>
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-int-dark"
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Stage Label */}
              <div
                className={`absolute text-[9px] font-bold uppercase tracking-wider text-center w-20 -ml-10 mt-8 pointer-events-none transition-colors duration-300 ${
                  isCurrent ? "text-int-teal" : "text-muted"
                }`}
                style={{ left: coords[i].x, top: coords[i].y }}
                aria-hidden="true"
              >
                {stage.label}
              </div>
            </div>
          );
        })}

        <div className="absolute right-8 bottom-8 flex items-center gap-2 text-int-gold">
          <span className="text-xs font-bold uppercase tracking-widest">
            End Game
          </span>
          <ArrowRight size={16} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 flex justify-between w-full max-w-xs text-xs font-mono text-muted uppercase tracking-widest">
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full bg-int-navy"
            aria-hidden="true"
          />
          <span>Build</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full bg-card border border-int-navy"
            aria-hidden="true"
          />
          <span>Operate</span>
        </div>
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 rounded-full bg-int-gold"
            aria-hidden="true"
          />
          <span>Retire</span>
        </div>
      </div>
    </div>
  );
}
