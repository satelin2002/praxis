import type { Metadata } from "next";
import Link from "next/link";

import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";

const LAST_UPDATED = "May 8, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of Buildroom services and the subscription model.",
};

/*
 * Plain-language v1 Terms of Service. Reflects the live offer:
 * monthly subscription, cancel anytime, 7-day money-back, customer
 * owns the work, limitation of liability to the monthly fee. Refresh
 * with counsel review before scaling — for now it's enough to clear
 * Stripe verification and meet baseline contractual obligations.
 */
export default function TermsPage() {
  return (
    <div className="relative min-h-svh bg-background text-foreground antialiased">
      <MarketingHeader />
      <main className="px-4 py-16 sm:px-6 sm:py-24">
        <article className="prose prose-neutral mx-auto flex w-full max-w-2xl flex-col gap-6">
          <header className="flex flex-col gap-3 border-b border-border pb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-primary">
              Legal
            </span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
              Last updated · {LAST_UPDATED}
            </p>
          </header>

          <p className="rounded-md border border-border bg-secondary px-4 py-3 text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">
              Independence:
            </strong>{" "}
            Buildroom is an independent business and is not affiliated with,
            sponsored by, endorsed by, or associated with Google, Alphabet,
            or any current or former employer of its founders.
          </p>

          <Section title="The short version">
            <p>
              You subscribe to Buildroom monthly. We build and maintain AI
              workflows for you. You can pause or cancel anytime. You own
              what we build — code, prompts, integrations, and
              documentation. We&rsquo;re liable up to the most recent
              monthly fee. The full version follows.
            </p>
          </Section>

          <Section title="1. Who these terms are between">
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) are an agreement
              between you (&ldquo;you,&rdquo; &ldquo;Customer&rdquo;) and
              Buildroom (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
              &ldquo;Buildroom&rdquo;). By subscribing to a Buildroom plan
              or otherwise using the service, you agree to these Terms.
            </p>
          </Section>

          <Section title="2. The service">
            <p>
              Buildroom provides AI workflow automation as a monthly
              subscription. Each plan includes a capacity for active
              workflows, a build cadence, ongoing maintenance, and the
              support level described on the pricing page at the time you
              subscribe.
            </p>
            <p>
              We&rsquo;ll work on your requests in priority order from your
              private board. We make reasonable commercial efforts to ship
              within the cadence stated on your plan, but specific delivery
              dates are estimates, not guarantees.
            </p>
          </Section>

          <Section title="3. Subscription, billing, and cancellation">
            <ul>
              <li>
                <strong>Billing.</strong> Subscriptions are billed monthly
                in advance via Stripe.
              </li>
              <li>
                <strong>Pause.</strong> You can pause your subscription at
                any time. Workflows we&rsquo;ve already shipped keep
                running. You won&rsquo;t be billed while paused. New work
                resumes when you resume the subscription.
              </li>
              <li>
                <strong>Cancellation.</strong> You can cancel at any time.
                Your subscription remains active through the end of the
                current billing period; we don&rsquo;t prorate refunds for
                partial months unless explicitly stated.
              </li>
              <li>
                <strong>7-day money-back guarantee.</strong> Within the
                first 7 days of your initial subscription, email us at{" "}
                <MailLink /> and we&rsquo;ll refund your first month
                in full, no questions asked.
              </li>
              <li>
                <strong>Price changes.</strong> If we change pricing,
                existing subscribers stay at their current rate for at least
                90 days from notice. We&rsquo;ll email you in advance.
              </li>
            </ul>
          </Section>

          <Section title="4. What you own; what we own">
            <p>
              <strong>You own everything we build for you</strong> — the
              code, prompts, data, integrations, configuration, and
              documentation we produce as part of your engagement
              (collectively, the &ldquo;Deliverables&rdquo;). When you
              cancel, the Deliverables remain yours and continue to run on
              the infrastructure you control.
            </p>
            <p>
              We retain ownership of generic methods, frameworks, and
              know-how we use across all customers (the &ldquo;Background
              IP&rdquo;). We grant you a perpetual, royalty-free licence to
              use any Background IP embedded in your Deliverables.
            </p>
            <p>
              Buildroom branding, marketing materials, and the website are
              ours.
            </p>
          </Section>

          <Section title="5. Your responsibilities">
            <ul>
              <li>
                Provide accurate information and timely access to the tools,
                data, and credentials we need to do the work.
              </li>
              <li>
                Don&rsquo;t use Buildroom or anything we build for unlawful
                purposes, to harm others, or to violate third-party rights.
              </li>
              <li>
                You&rsquo;re responsible for the costs of any third-party
                services your workflows use (model providers, APIs,
                hosting), unless explicitly bundled into your plan.
              </li>
            </ul>
          </Section>

          <Section title="6. Confidentiality">
            <p>
              We treat any non-public information you share as confidential.
              We won&rsquo;t use it for anything other than delivering your
              service, and we won&rsquo;t disclose it to anyone outside the
              people delivering your engagement. Standard mutual NDAs are
              available on request before we discuss technical detail.
            </p>
          </Section>

          <Section title="7. Service warranty">
            <p>
              We warrant that we&rsquo;ll perform the service with the care,
              skill, and diligence you&rsquo;d expect from a competent
              professional engineering team. For workflows shipped under a
              defined acceptance criterion, if the workflow doesn&rsquo;t
              meet criteria at deployment, we&rsquo;ll keep working until it
              does, at no additional charge.
            </p>
            <p>
              Beyond that, the service is provided &ldquo;as is.&rdquo; We
              don&rsquo;t warrant that the AI output will always be correct,
              that integrations will be uninterrupted, or that third-party
              tools will continue to work in the way they did at the time
              of build.
            </p>
          </Section>

          <Section title="8. Limitation of liability">
            <p>
              To the maximum extent allowed by law, Buildroom&rsquo;s total
              liability arising out of or relating to these Terms or the
              service is limited to the amount you paid us in the most
              recent 1 month. Neither party is liable for indirect,
              consequential, or punitive damages.
            </p>
            <p>
              Nothing in these Terms limits liability for fraud, gross
              negligence, willful misconduct, or anything that can&rsquo;t
              be limited under applicable law.
            </p>
          </Section>

          <Section title="9. Termination by us">
            <p>
              We may suspend or terminate your subscription if you&rsquo;re
              materially in breach of these Terms (for example, abusive
              behaviour or unlawful use), with notice and a reasonable
              opportunity to cure where appropriate. If we terminate without
              cause, we&rsquo;ll refund any prepaid amount for periods after
              the termination date.
            </p>
          </Section>

          <Section title="10. Changes to these terms">
            <p>
              If we materially change these Terms, we&rsquo;ll update the
              date above and notify subscribers by email. Continued use of
              the service after the effective date constitutes acceptance.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p>
              These Terms are governed by the laws of the jurisdiction in
              which Buildroom is registered. Disputes will be handled in
              the courts of that jurisdiction.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              Questions, requests, or anything else? <MailLink />
            </p>
          </Section>

          <footer className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
            <Link
              href="/"
              className="text-info underline-offset-4 hover:underline"
            >
              ← Back to Buildroom
            </Link>
          </footer>
        </article>
      </main>
      <MarketingFooter />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
        {children}
      </div>
    </section>
  );
}

function MailLink() {
  return (
    <a
      href="mailto:hello@buildroom.ai"
      className="text-info underline-offset-4 hover:underline"
    >
      hello@buildroom.ai
    </a>
  );
}
