import { ApproachSection } from "./approach-section";
import { ComparisonSection } from "./comparison-section";
import { FaqSection } from "./faq-section";
import { FinalCtaSection } from "./final-cta-section";
import { HeroSection } from "./hero-section";
import { InsightsPreviewSection } from "./insights-preview-section";
import { MarketingFooter } from "./marketing-footer";
import { MarketingHeader } from "./marketing-header";
import { ProblemSection } from "./problem-section";
import { ProcessSection } from "./process-section";
import { RecentlyShippedSection } from "./recently-shipped-section";
import { ServicesSection } from "./services-section";
import { StickyMobileCta } from "./sticky-mobile-cta";
import { WhatWeBuildSection } from "./what-we-build-section";
import { WhoWeWorkWithSection } from "./who-we-work-with-section";

/*
 * `WorkSection`, `WhoItsForSection`, `AboutSection`, and `ContactSection`
 * are intentionally NOT mounted here. Their component files remain in
 * the codebase so they can be reattached without re-implementation when
 * we have a reason to bring them back.
 */
export function LandingShell() {
  return (
    <div className="relative min-h-svh bg-background text-foreground antialiased">
      <MarketingHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <ProcessSection />
        <WhatWeBuildSection />
        <WhoWeWorkWithSection />
        <ApproachSection />
        <ComparisonSection />
        <ServicesSection />
        <RecentlyShippedSection />
        <InsightsPreviewSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
      <StickyMobileCta />
    </div>
  );
}
