"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";

import { useFadeIn } from "./utils";

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How does the queue work?",
    a: "Drop requests into your board in priority order. We work on one at a time on Pilot or Starter, two at a time on Growth. When one ships, we start the next.",
  },
  {
    q: "What counts as one new automation?",
    a: 'Every build is classified as standard (1 slot), complex (2 slots), or major (3 slots) — see "What counts as one automation slot?" on the pricing section. We classify in writing before any work starts. We\'re generous about scope at the boundary — if it\'s borderline, we err in your favor.',
  },
  {
    q: "What if my project is bigger than three slots?",
    a: "For projects beyond the standard subscription scope — full automation programs, multi-agent platforms, regulated systems — we offer custom engagements starting at $25,000. Email hello@tryworkflowcrew.com with what you're trying to build and we'll scope it.",
  },
  {
    q: "Where do my automations run?",
    a: "On your infrastructure, not ours. We deploy to your accounts using your API keys — your OpenAI/Anthropic, your hosting (Railway, Render, Vercel — we'll recommend), your CRM/email/calendar. We have access to maintain them while you're subscribed, but nothing critical lives on our side. This means you own everything, you're never locked in, and your automations don't disappear if we ever do.",
  },
  {
    q: "What does it cost to run my automations on my own infrastructure?",
    a: "Beyond your subscription, you'll pay vendor costs directly: OpenAI or Anthropic for model usage, your hosting provider, Twilio if you're using voice, etc. Most subscribers spend $50–$300/month total in vendor costs depending on volume. We tune for cost during onboarding and recommend the cheapest viable stack for your workflows.",
  },
  {
    q: "What happens when all my automations are built and running?",
    a: "Two paths. Most subscribers keep building — businesses have a backlog of 6–12 automation ideas, and the second and third automations usually surface once the first is live. If you genuinely don't need new builds, pause your subscription. Your live automations keep running on your infrastructure, billing pauses, and you can resume anytime.",
  },
  {
    q: "Can I switch tiers?",
    a: "Anytime. Upgrade when you want more new builds per month. Downgrade when you've slowed down. We pro-rate every change. No phone calls required — just message us in your board.",
  },
  {
    q: "What if I have no ideas right now?",
    a: "Email us a sentence about your business. We'll send back 5–10 things you could automate. Free, no obligation.",
  },
  {
    q: "Can I pause my subscription?",
    a: "Yes — anytime. Your existing automations keep running on your infrastructure. Billing pauses, new builds pause, our monitoring pauses. If something breaks during a pause, resume your subscription and we'll fix it (usually within a day). Most subscribers pause for slow months and resume when they need new builds.",
  },
  {
    q: "What happens if I cancel?",
    a: "You keep everything. Code, prompts, integrations, deployment — all yours, on your infrastructure. Your automations keep running as long as you keep paying your vendors (OpenAI/Anthropic, hosting, etc.). We hand off documentation and remove ourselves from your accounts. No data hostage, no migration fee, no goodbye paperwork.",
  },
  {
    q: "What tools do you integrate with?",
    a: "Anything with an API. Common ones: HubSpot, Salesforce, Slack, Google Workspace, Microsoft 365, Stripe, Shopify, Intercom, Zendesk, ServiceTitan, Jobber, Calendly, Twilio, and 100+ more.",
  },
  {
    q: "Is there a setup fee or contract?",
    a: "No setup fee. No contract. 7-day money-back guarantee on your first month.",
  },
  {
    q: "Do you work with my industry?",
    a: "Probably yes. We've shipped automations for HVAC and home services, plumbing, electrical, roofing, real estate, dental and med spas, law firms, auto services, e-commerce brands, agencies, fitness studios, restaurants, logistics, and B2B SaaS. If you have a workflow eating real time and you can pay $2,500/mo, we're a fit. Email us if you're unsure.",
  },
  {
    q: "How do I know it's working — and what does maintenance cover?",
    a: "Every automation has a monitoring dashboard you can see anytime — success rates, error rates, costs, all live. We're alerted before you are when something breaks. Maintenance covers: monitoring, error tracking, model updates as new versions release, prompt and logic tweaks for edge cases, integration fixes when external APIs change. Major rebuilds count as one of your monthly new builds.",
  },
  {
    q: "Will it sound like a robot?",
    a: "No. We tune voice and tone to match your business. For phone-handling automations, the assistant introduces itself as an AI assistant when the caller asks or when applicable disclosure laws require it — and otherwise just gets on with helping the caller.",
  },
  {
    q: "Is Workflow Crew affiliated with Google or Alphabet?",
    a: "No. Workflow Crew is an independent business and is not affiliated with, sponsored by, endorsed by, or associated with Google, Alphabet, or any current or former employer of its founders.",
  },
  {
    q: "Do you use customer data to train models?",
    a: "No, not unless separately agreed in writing. We use the model providers you're paying for (OpenAI, Anthropic, etc.) under their standard terms — not a Workflow Crew-trained model. Your business data isn't used to train anything.",
  },
  {
    q: "Can I approve messages before they go out?",
    a: "Yes. For sensitive workflows — refunds, escalations, regulated communications — we configure a human approval step. Drafts queue for your review, and nothing sends until you (or someone you designate) signs off.",
  },
  {
    q: "Do you handle regulated workflows (legal, medical, financial)?",
    a: "We assist with the surrounding workflow — intake, scheduling, summaries, follow-up — but we don't provide legal, medical, financial, or regulated advice. Final professional judgment stays with the licensed professional. Compliance with HIPAA, state bar rules, FINRA, and similar frameworks is your team's responsibility, and we'll configure approval steps and audit trails to support it.",
  },
];

export function FaqSection() {
  const { ref, visible } = useFadeIn();

  return (
    <section
      ref={ref}
      id="faq"
      className="relative scroll-mt-24 bg-secondary px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="mx-auto w-full max-w-300">
        <SectionHeading
          eyebrow="Common questions"
          title="The honest answers."
          description="Everything we get asked before subscribing. If yours isn't here, email us — we'll add it."
          visible={visible}
        />

        <div
          data-fade
          className={cn(
            "mx-auto mt-12 max-w-3xl transition-all duration-700 ease-out",
            visible
              ? "translate-y-0 opacity-100 delay-200"
              : "translate-y-6 opacity-0",
          )}
        >
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Catch buyers whose specific concern isn't in the list — they
              leave silently otherwise. Single line, low-key, but visible. */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Have a different question? Email{" "}
            <a
              href="mailto:hello@tryworkflowcrew.com"
              className="text-info underline-offset-4 hover:underline"
            >
              hello@tryworkflowcrew.com
            </a>
            {" "}— we usually reply within an hour.
          </p>
        </div>
      </div>
    </section>
  );
}
