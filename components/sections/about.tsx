import { History, Target, Landmark, Flag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ValueCard {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
}

const valueCards: ValueCard[] = [
  {
    title: "Legacy",
    description: "Established in 1999, headquartered in Lincolnshire, IL.",
    icon: History,
    iconColor: "text-int-gold",
  },
  {
    title: "Mission",
    description: "Building the tools you need — then getting out of the way.",
    icon: Target,
    iconColor: "text-int-teal",
  },
  {
    title: "Stability",
    description: "Private, profitable, and women-owned business.",
    icon: Landmark,
    iconColor: "text-int-navy",
  },
  {
    title: "Exit Strategy",
    description: "Every engagement has a defined end. We build for outcomes.",
    icon: Flag,
    iconColor: "text-int-teal",
  },
];

/**
 * About Us / Heritage section with company values.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 bg-int-cream border-t border-border"
      data-testid="section-about"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">
              OUR HERITAGE
            </div>
            <h2
              id="about-heading"
              className="font-serif text-4xl md:text-5xl mb-8 text-int-navy"
            >
              25 Years of Managed Excellence
            </h2>
            <div className="space-y-6 text-lg text-muted leading-relaxed">
              <p>
                Founded in the late 90s, <strong className="text-foreground">INT Inc.</strong> has navigated
                every major technological shift. InVelo applies that deep
                operational DNA to the frontier of Artificial Intelligence.
              </p>
              <p>
                We believe that for AI to be truly transformative, it must be
                practical. We are not consultants who leave you with a slide
                deck. We build, we operate, and when the mission is complete, we
                leave you in control.
              </p>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            role="list"
            aria-label="Company values"
          >
            {valueCards.map((card) => (
              <ValueCardComponent key={card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueCardComponent({
  title,
  description,
  icon: Icon,
  iconColor,
}: ValueCard) {
  return (
    <article
      className="p-8 bg-card rounded-xl shadow-sm border border-border flex flex-col items-center text-center"
      role="listitem"
    >
      <Icon className={`${iconColor} mb-4`} size={32} aria-hidden="true" />
      <h4 className="font-serif text-lg mb-2">{title}</h4>
      <p className="text-sm text-muted">{description}</p>
    </article>
  );
}
