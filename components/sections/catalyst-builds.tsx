import { ShieldCheck, Users, AlertCircle, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CatalystBuild {
  title: string;
  price: string;
  duration: string;
  roi: string;
  icon: LucideIcon;
}

const catalystBuilds: CatalystBuild[] = [
  {
    title: "SOC 2 Sprint",
    price: "$25K",
    duration: "6 Weeks",
    roi: "Saved $125k vs Consultant",
    icon: ShieldCheck,
  },
  {
    title: "Onboarding Accelerator",
    price: "$12K-$20K",
    duration: "2-4 Weeks",
    roi: "Save 800 staff hrs/yr",
    icon: Users,
  },
  {
    title: "Crisis Response Kit",
    price: "$8K-$15K",
    duration: "3-5 Days",
    roi: "30-40% faster response",
    icon: AlertCircle,
  },
  {
    title: "Campaign Launch Kit",
    price: "$10K-$15K",
    duration: "1-2 Weeks",
    roi: "Launch 2 weeks faster",
    icon: Rocket,
  },
];

/**
 * Catalyst Builds (Use Cases) section showcasing available products.
 */
export function CatalystBuildsSection() {
  return (
    <section
      id="use-cases"
      className="py-24 bg-card"
      data-testid="section-catalyst"
      aria-labelledby="catalyst-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">
            CATALYST BUILDS
          </div>
          <h2
            id="catalyst-heading"
            className="font-serif text-3xl md:text-5xl mb-4 text-int-navy text-balance"
          >
            Purpose-Built Tools for Real Problems
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Each build solves one problem, proves value fast, and gives you full
            ownership.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          role="list"
        >
          {catalystBuilds.map((build, index) => (
            <CatalystCard key={build.title} {...build} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CatalystCard({
  title,
  price,
  duration,
  roi,
  icon: Icon,
  delay,
}: CatalystBuild & { delay: number }) {
  return (
    <article
      className="flex flex-col group animate-fade-in-up items-center p-8 bg-card rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 w-full h-full hover:border-int-gold/50"
      style={{ animationDelay: `${delay}s` }}
      role="listitem"
    >
      <div
        className="mb-6 text-int-navy group-hover:text-int-gold transition-colors duration-300"
        aria-hidden="true"
      >
        <Icon size={40} strokeWidth={1.5} />
      </div>

      <h3 className="font-serif text-xl text-int-navy text-center mb-2">
        {title}
      </h3>

      <div className="flex gap-2 mb-4 text-[10px] font-bold uppercase tracking-wider text-muted">
        <span className="px-2 py-1 bg-muted/20 rounded">{duration}</span>
        <span className="px-2 py-1 bg-int-cream text-int-navy rounded border border-int-gold/20">
          {price}
        </span>
      </div>

      <div
        className="w-8 h-0.5 bg-int-gold mb-4 opacity-60"
        role="presentation"
        aria-hidden="true"
      />

      <p className="text-sm text-muted font-medium text-center leading-relaxed mb-4">
        <span className="block text-xs text-int-teal font-bold uppercase mb-1">
          ROI Outcome
        </span>
        {roi}
      </p>
    </article>
  );
}
