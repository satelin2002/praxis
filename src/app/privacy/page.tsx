import type { Metadata } from "next";
import Link from "next/link";

import { MarketingFooter } from "@/components/marketing/marketing-footer";
import { MarketingHeader } from "@/components/marketing/marketing-header";

const LAST_UPDATED = "May 8, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Buildroom collects, uses, and protects your information.",
};

/*
 * Plain-language v1 Privacy Policy. Covers exactly what the live site
 * does today: contact form, newsletter signup, analytics. Refresh with
 * counsel review before scaling — for now it's enough to clear Stripe
 * verification and meet baseline legal obligations.
 */
export default function PrivacyPage() {
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
              Privacy Policy
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
              We collect the minimum information needed to reply to you and
              run the service. We don&rsquo;t sell your data. We don&rsquo;t
              run advertising. If you want your data deleted, email{" "}
              <MailLink /> and we&rsquo;ll handle it within 30 days.
            </p>
          </Section>

          <Section title="What we collect">
            <ul>
              <li>
                <strong>Contact form submissions.</strong> Your name, work
                email, company, and the message you write. Used only to reply
                to your inquiry.
              </li>
              <li>
                <strong>Newsletter signups.</strong> Just your email address.
                Used to send occasional notes from us. Unsubscribe anytime
                from any email.
              </li>
              <li>
                <strong>Server logs.</strong> Standard request logs (IP
                address, user agent, page) retained for 30 days for security
                and abuse prevention.
              </li>
              <li>
                <strong>Subscription data (when applicable).</strong> If you
                subscribe to a paid plan, payment processing is handled by
                Stripe. We never see or store your full card number.
              </li>
            </ul>
          </Section>

          <Section title="What we don't collect">
            <ul>
              <li>We don&rsquo;t use third-party advertising trackers.</li>
              <li>
                We don&rsquo;t sell, rent, or share your information with
                anyone for marketing purposes.
              </li>
              <li>
                We don&rsquo;t profile you for any purpose other than
                replying to you and running the service.
              </li>
            </ul>
          </Section>

          <Section title="Who we share data with">
            <p>
              Only the operational service providers we need to run Buildroom
              — and only the data each one strictly needs:
            </p>
            <ul>
              <li>
                <strong>Supabase</strong> — stores contact form submissions
                and newsletter subscriptions.
              </li>
              <li>
                <strong>Stripe</strong> — processes payments. Their privacy
                policy applies to payment data.
              </li>
              <li>
                <strong>Vercel</strong> — hosts the site. Standard request
                logs only.
              </li>
            </ul>
            <p>
              We don&rsquo;t share data with any other third parties, and we
              don&rsquo;t engage in data brokerage.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              We use a minimal set of cookies needed for the site to work
              (e.g., remembering whether you&rsquo;ve dismissed something).
              We don&rsquo;t use advertising or cross-site tracking cookies.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask us to access, correct, or delete the personal data
              we hold about you at any time. Email <MailLink /> and
              we&rsquo;ll respond within 30 days. If you&rsquo;re in the EU
              or UK, you also have the right to data portability and to
              lodge a complaint with your local supervisory authority.
            </p>
          </Section>

          <Section title="Data retention">
            <p>
              Contact form submissions are retained for as long as your
              inquiry is active and for up to 24 months after the last
              interaction, in case you come back. Newsletter subscriptions
              are retained until you unsubscribe. Server logs roll off after
              30 days.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we make material changes, we&rsquo;ll update the date at
              the top of this page and, where appropriate, send a note to
              anyone whose data is affected.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or a request about your data?{" "}
              <MailLink />
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
