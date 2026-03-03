"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "problem", label: "The Problem" },
  { id: "how-it-works", label: "How It Works" },
  { id: "use-cases", label: "Use Cases" },
  { id: "about", label: "About" },
] as const;

/**
 * Site header with scroll-aware styling and mobile navigation.
 * Includes smooth scroll behavior and keyboard accessibility.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToSection = useCallback(
    (id: string) => (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      setMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    []
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-card/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer"
            data-testid="nav-logo"
            aria-label="INT Inc. - Go to top"
          >
            <div className="w-10 h-10 bg-int-navy rounded-sm flex items-center justify-center text-white font-sans font-bold text-xl shadow-md">
              <span className="text-int-gold">I</span>
            </div>
            <div className="flex flex-col">
              <span
                className={cn(
                  "font-serif font-bold text-lg tracking-wide leading-none transition-colors",
                  scrolled ? "text-int-navy" : "text-white"
                )}
              >
                INT INC.
              </span>
              <span
                className={cn(
                  "text-[10px] font-bold tracking-[0.2em] uppercase leading-none mt-1",
                  scrolled ? "text-int-gold" : "text-int-gold/80"
                )}
              >
                InVelo
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div
            className={cn(
              "hidden md:flex items-center gap-8 text-sm font-medium tracking-wide",
              scrolled ? "text-muted" : "text-white/90"
            )}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollToSection(item.id)}
                className="hover:text-int-gold transition-colors cursor-pointer uppercase focus-visible:text-int-gold"
                data-testid={`nav-link-${item.id}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={scrollToSection("contact")}
              className="px-6 py-2 bg-int-gold text-white font-bold rounded-full hover:bg-white hover:text-int-gold transition-all shadow-sm cursor-pointer border border-int-gold focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              data-testid="nav-cta"
            >
              Start a Mission
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "md:hidden p-2 transition-colors",
              scrolled ? "text-int-navy" : "text-white"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-int-cream flex flex-col items-center justify-center gap-8 text-xl font-serif text-int-navy animate-fade-in-up"
          data-testid="mobile-menu-container"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={scrollToSection(item.id)}
              className="hover:text-int-gold transition-colors cursor-pointer uppercase focus-visible:text-int-gold"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={scrollToSection("contact")}
            className="px-8 py-3 bg-int-navy text-white rounded-full shadow-lg cursor-pointer hover:bg-int-gold transition-colors"
          >
            Start a Mission
          </a>
        </div>
      )}
    </>
  );
}
