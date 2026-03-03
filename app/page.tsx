import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { HowItWorksSection } from "@/components/sections/how-it-works";
import { SOC2StorySection } from "@/components/sections/soc2-story";
import { CatalystBuildsSection } from "@/components/sections/catalyst-builds";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { AboutSection } from "@/components/sections/about";
import { WhyIntSection } from "@/components/sections/why-int";
import { FAQSection } from "@/components/sections/faq";
import { ContactSection } from "@/components/sections/contact";

/**
 * InVelo Marketing Site - Home Page
 * Mission-Complete AI Services by INT Inc.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <SOC2StorySection />
        <CatalystBuildsSection />
        <TestimonialsSection />
        <AboutSection />
        <WhyIntSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
