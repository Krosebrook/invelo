"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "InVelo delivered our SOC 2 dashboard in 3 weeks. The Big 4 quoted us 3 months. We passed the audit and now own the tool outright.",
    author: "Sarah Chen",
    role: "CTO",
    company: "HealthTech Startup",
  },
  {
    quote:
      "The onboarding accelerator saved us 800 hours of staff time in the first year. It paid for itself in 6 weeks.",
    author: "Marcus Johnson",
    role: "VP of Operations",
    company: "Financial Services Firm",
  },
  {
    quote:
      "When our crisis response system failed, INT Inc. built us a replacement in 5 days. No other firm could move that fast.",
    author: "Emily Rodriguez",
    role: "Director of IT",
    company: "Regional Healthcare Network",
  },
];

/**
 * Testimonials carousel section with client quotes.
 */
export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section
      className="py-24 bg-int-cream border-t border-border"
      aria-labelledby="testimonials-heading"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-int-gold uppercase">
            CLIENT STORIES
          </div>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl md:text-5xl mb-4 text-int-navy"
          >
            Results That Speak
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            className="relative bg-card rounded-2xl shadow-lg p-8 md:p-12 border border-border"
            aria-live="polite"
          >
            {/* Quote icon */}
            <Quote
              className="absolute top-6 left-6 text-int-gold/20"
              size={48}
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentIndex}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <p className="text-xl md:text-2xl font-serif text-int-navy leading-relaxed mb-8 text-pretty">
                  &ldquo;{current.quote}&rdquo;
                </p>

                <footer className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full bg-int-navy flex items-center justify-center text-white font-bold text-lg"
                    aria-hidden="true"
                  >
                    {current.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-int-navy block">
                      {current.author}
                    </cite>
                    <span className="text-sm text-muted">
                      {current.role}, {current.company}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full border border-border hover:border-int-gold hover:text-int-gold transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                className="flex gap-2"
                aria-label="Testimonial indicators"
              >
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? "bg-int-gold" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === currentIndex ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full border border-border hover:border-int-gold hover:text-int-gold transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
