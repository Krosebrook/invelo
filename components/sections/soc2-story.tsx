import { SOC2SprintDiagram } from "@/components/diagrams/soc2-sprint";
import { SecurityControlsDiagram } from "@/components/diagrams/security-controls";
import { CostComparisonChart } from "@/components/diagrams/cost-chart";

/**
 * SOC 2 case study section demonstrating real results.
 */
export function SOC2StorySection() {
  return (
    <section
      className="py-24 bg-int-navy text-white overflow-hidden relative"
      data-testid="section-soc2"
      aria-labelledby="soc2-heading"
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-96 h-96 rounded-full bg-int-teal blur-[100px] absolute top-[-100px] left-[-100px]" />
        <div className="w-96 h-96 rounded-full bg-int-gold blur-[100px] absolute bottom-[-100px] right-[-100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <SOC2SprintDiagram />
            <SecurityControlsDiagram />
            <CostComparisonChart />
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-int-dark/50 text-int-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-int-gold/20">
              REAL RESULTS
            </div>

            <h2
              id="soc2-heading"
              className="font-serif text-4xl md:text-5xl mb-6 text-white"
            >
              From Crisis to Compliance in 6 Weeks
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              A healthcare IT firm faced a SOC 2 audit with missing logs. A Big
              4 consultant quoted $150K and 3 months.
            </p>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              <strong className="text-white">
                InVelo built a custom compliance dashboard in 3 weeks.
              </strong>{" "}
              The client passed the audit, paid $25K total, and now owns the
              tool outright.
            </p>

            <blockquote className="text-lg text-int-gold font-serif italic border-l-2 border-int-gold pl-6">
              &ldquo;Compliance-ready from day 1. SOC 2 audit trail built into
              every catalyst build.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
