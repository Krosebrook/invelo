/**
 * "The SaaS Trap" problem statement section.
 */
export function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-24 bg-card"
      data-testid="section-problem"
      aria-labelledby="problem-heading"
    >
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">
            The Problem
          </div>
          <h2
            id="problem-heading"
            className="font-serif text-4xl mb-6 leading-tight text-int-navy"
          >
            The SaaS Trap
          </h2>
          <div
            className="w-20 h-1 bg-int-teal mb-6"
            role="presentation"
            aria-hidden="true"
          />
        </div>

        <div className="md:col-span-8 text-lg text-muted leading-relaxed space-y-6">
          <p>
            <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-int-navy">
              $21M
            </span>{" "}
            Average enterprise waste on underused software licenses annually.
            Why? Because you&apos;re buying long-term platforms for short-term
            problems.
          </p>
          <p>
            Agentic AI has changed the math. Tools that used to take months to
            build now take weeks. The $300B SaaS selloff proved that enterprises
            are tired of rent-seeking software.
          </p>
          <p className="font-medium text-int-navy">
            Enterprises don&apos;t need another platform with a 3-year contract.
            They need the right tool for THIS quarter.
          </p>
        </div>
      </div>
    </section>
  );
}
