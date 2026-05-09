import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";
import { SectionHeading } from "@/components/shared/section-heading";

export const metadata: Metadata = {
  title: "Insights — coming soon",
  description:
    "Long-form posts on the engagements we ship are publishing here soon. Until then, get in touch and we'll talk through your workflow directly.",
  robots: { index: false, follow: false },
};

export default function InsightsIndexPage() {
  return (
    <div className="relative min-h-svh bg-background text-foreground antialiased">
      <MarketingHeader />
      <main>
        <section className="px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32">
          <div className="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
            <SectionHeading
              eyebrow="Insights"
              title="Posts publishing here soon."
              description="We'd rather ship long-form posts that come out of real engagements than fill a blog with generics. The first ones land as engagements wrap. In the meantime, the fastest way to get a sense of how we think is a 30-minute discovery call."
            />

            <div className="mt-12">
              <Button asChild size="xl" className="group">
                <Link href="/#contact">
                  Book a free 30-min call
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
