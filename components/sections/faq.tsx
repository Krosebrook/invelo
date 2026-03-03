"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What happens after the engagement ends?",
    answer:
      "You own everything. Full source code, complete data export, comprehensive documentation, and all intellectual property. We design every engagement with a clear exit strategy. There's no vendor lock-in, no ongoing licensing fees, and no dependency on us to maintain the system.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Flat project fees based on scope, typically ranging from $5K to $250K. We quote a fixed price upfront after our discovery call. No hourly billing, no hidden costs, no surprise change orders. If scope changes significantly, we'll discuss it transparently.",
  },
  {
    question: "What makes InVelo different from traditional consultants?",
    answer:
      "Traditional consultants sell you a relationship. We sell you an outcome. Our goal is to build a working solution and leave. We don't maximize billable hours—we minimize time-to-value. Every engagement has a defined end date from day one.",
  },
  {
    question: "Can you work with our existing systems?",
    answer:
      "Yes. We integrate with your existing tech stack, compliance frameworks, and operational workflows. Our catalyst builds are designed to complement, not replace, your infrastructure. We'll assess compatibility during the discovery phase.",
  },
  {
    question: "What if we need ongoing support after the build?",
    answer:
      "We offer optional managed support periods (typically 2-6 months) to ensure smooth operation. This is entirely optional—the tool is designed to be self-sufficient. We also provide training and documentation so your team can maintain it independently.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Most projects begin within 1-2 weeks of signing. Our streamlined discovery process means we can move from initial call to active build faster than traditional consulting engagements.",
  },
];

/**
 * FAQ section with accordion-style expandable items.
 */
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 bg-card border-t border-border"
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">
            QUESTIONS
          </div>
          <h2
            id="faq-heading"
            className="font-serif text-3xl md:text-5xl mb-4 text-int-navy"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Clear answers about how we work, what we deliver, and what makes us
            different.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className="space-y-4"
            role="region"
            aria-label="Frequently asked questions"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const id = `faq-${index}`;

              return (
                <div
                  key={index}
                  className={cn(
                    "border rounded-lg transition-colors",
                    isOpen
                      ? "border-int-gold/50 bg-int-cream/50"
                      : "border-border"
                  )}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-content`}
                    id={`${id}-trigger`}
                  >
                    <span className="font-medium text-int-navy pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "flex-shrink-0 text-int-gold transition-transform",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`${id}-content`}
                        role="region"
                        aria-labelledby={`${id}-trigger`}
                        initial={
                          prefersReducedMotion
                            ? { height: "auto" }
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          prefersReducedMotion
                            ? {}
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-muted leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
