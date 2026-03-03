import { Briefcase, Timer, DollarSign, CheckCircle2 } from "lucide-react";
import { PipelineDiagram } from "@/components/diagrams/pipeline-diagram";

const benefits = [
  {
    icon: Timer,
    title: "4 Weeks to Live:",
    description: "From discovery to deployment.",
  },
  {
    icon: DollarSign,
    title: "$5K - $250K:",
    description: 'Flat project fees. No hidden "scale" costs.',
  },
  {
    icon: CheckCircle2,
    title: "You Own The Code:",
    description: "No vendor lock-in. Full data export.",
  },
] as const;

/**
 * "How It Works" section explaining the InVelo delivery model.
 */
export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-muted-foreground/5 border-t border-border"
      data-testid="section-how-it-works"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-card text-int-navy text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-border shadow-sm">
              <Briefcase size={14} className="text-int-teal" aria-hidden="true" />
              INVELO DELIVERY MODEL
            </div>

            <h2
              id="how-it-works-heading"
              className="font-serif text-4xl md:text-5xl mb-6 text-int-navy"
            >
              Build. Use. Retire.
            </h2>

            <p className="text-lg text-muted mb-6 leading-relaxed">
              Our <strong>Catalyst Builds</strong> are purpose-built tools
              designed to deliver measurable results in weeks. We follow a
              strict 7-stage pipeline that ends with us{" "}
              <strong>leaving</strong>.
            </p>

            <ul className="space-y-4 mb-8" role="list">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-3">
                  <div
                    className="mt-1 w-5 h-5 rounded-full bg-int-teal/20 flex items-center justify-center text-int-teal flex-shrink-0"
                    aria-hidden="true"
                  >
                    <benefit.icon size={12} />
                  </div>
                  <span className="text-muted">
                    <strong className="text-foreground">{benefit.title}</strong>{" "}
                    {benefit.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <PipelineDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
