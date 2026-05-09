/**
 * Mock post data. The shape mirrors what we'll fetch from Supabase
 * (table: `posts`, see lib/supabase/* for the seam). When Supabase
 * is wired up, replace `getPosts` / `getPost` bodies with queries —
 * the shape and route components don't change.
 */

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  /** One-line problem statement — rendered as a Problem callout above the body. */
  problem: string;
  /** One-line solution statement — rendered as a Solution callout above the body. */
  solution: string;
  image?: string;
  body: ReadonlyArray<string>;
  publishedAt: string;
  readMinutes: number;
  tag: "Engineering" | "Production" | "Evals" | "Field notes" | "Case study";
}

const POSTS: ReadonlyArray<Post> = [
  // ───────── most recent ─────────
  {
    slug: "black-friday-with-one-agent",
    title:
      "How a 40-person e-commerce team handled Black Friday with one AI agent (and one human on standby)",
    excerpt:
      "A long-form case study of an e-commerce support team that 6×'d its inbound on Black Friday weekend without hiring temp staff. The agent handled 71% of tickets autonomously, the on-call engineer slept through the night, and the team learned more about their own customers than they had in a year.",
    problem:
      "A 40-person DTC apparel team facing a 6× spike in support volume on Black Friday weekend, with no realistic way to hire and train temp staff in time.",
    solution:
      "A single AI agent drafting tier-1 replies with conservative escalation, eight-person team plus one engineer on standby — they handled 21,400 tickets autonomously at 91% CSAT and got bored instead of buried.",
    image: "/images/insight-support-agent.png",
    publishedAt: "2026-05-12",
    readMinutes: 13,
    tag: "Case study",
    body: [
      "A small DTC apparel brand we worked with last fall had a Black Friday problem. They had grown 4× year-over-year and were projecting a 6× spike in support volume across the holiday weekend. Their support team was eight people. They had two options: hire and onboard temps in October, hoping the temps could handle their voice and policy by November — or build something. They built something. Here's the full story, including the parts we got wrong.",
      "The starting point: pre-engagement audit. Their existing support workflow was simple — every email or chat went into Front, a human agent read it, looked up the customer's order in Shopify, drafted a response, and shipped it. Average handle time was 4 minutes per ticket. Volume on a normal day was about 600 tickets. They were projecting 3,500 tickets per day across the holiday weekend, with no realistic way to scale headcount in time.",
      "We spent the first week building the eval suite, not the agent. We pulled 1,200 historical tickets from the previous year, anonymized them, and graded each one along three axes: was the response correct, was it on-brand, was it the kind of message the team would want sent unsupervised. That last column was the one that mattered. Of the 1,200, only 920 cleared the bar — the rest were either edge cases the team handled by judgment, or situations where the right answer was 'escalate to a human.' The 920 became our training and evaluation ground truth.",
      "The agent itself took two weeks to build and another two weeks to harden. It read each incoming ticket, looked up the customer's order history in Shopify, classified the topic — order status, return request, sizing question, billing dispute, lost package, plus a half-dozen others — and either drafted a response with citations to the relevant policy doc or flagged the ticket for human handling. The 'flag for human' decision was the most important part of the design. We made it conservative: any ticket the agent's confidence score didn't clear 88% on, any ticket mentioning a refund over $200, any ticket from a customer flagged in their CRM as 'high-touch' — straight to a human, no draft, no question.",
      "The pre-launch eval against the held-out 200 tickets was the test we cared about. The agent matched the human team's response on 76% of them, was within editorial tolerance on another 11% (the response was different but defensible), and disagreed meaningfully on 13%. Of those 13%, every single disagreement should have been an escalation — the agent missed a tone cue, or treated a complaint as a question, or didn't catch that the customer was actually asking about a different order. We tightened the escalation rules until the disagreement column dropped to 3% — the residual 3% was where we and the team agreed both answers were defensible.",
      "Black Friday weekend. The team had two engineers on rotation for the inevitable production fire and one customer-success lead reviewing flagged tickets in real time. The agent ran from Thursday 6pm Pacific through the following Wednesday morning. Total volume: 21,400 tickets across the weekend. Agent handled 71% autonomously. Average response latency: 47 seconds. Escalation rate started at 31% and dropped to 24% by Sunday as the team tuned the rules in real time. CSAT held at 91% — slightly below the 94% baseline, but well within acceptable for the team given they handled 6× normal volume.",
      "The honest parts. We over-tuned the escalation rules in the first 12 hours. The team got buried because the agent was being too cautious, escalating tickets that any reasonable rep would have handled. We loosened three of the rules (the threshold on confidence, the 'high-touch customer' rule, and a rule that escalated anything mentioning sizing) on Friday morning. That single change took the escalation rate from 38% down to 28% — and CSAT actually went UP, because customers were getting answers in 47 seconds instead of waiting 2 hours for a human.",
      "The unexpected part. The agent's flagging rules surfaced patterns the team had never seen clearly before. Three percent of tickets were customers whose orders had shipped to the wrong city — a known shipping-partner issue the team had been quietly absorbing. Five percent were sizing complaints concentrated on three specific SKUs. Two percent were customers who had paid through Shop Pay and were getting confused by the receipt format. Each of these was a fix the team could now do upstream of the agent — and would never have seen at this resolution by hand.",
      "The on-call engineer slept through both nights. The escalation queue stayed manageable. The CS lead reviewed flagged tickets between dinner and bed, then again at breakfast. By Monday morning the team was bored — bored is the right outcome for a holiday weekend in support. Over the next three weeks they shipped four product fixes derived from the patterns the agent had surfaced.",
      "The lessons we'd carry forward. First: the 'when to escalate' rules are 60% of the work. Get them wrong and the team drowns; get them right and they get to do real work. Second: the eval suite earns its keep on launch day. Without 1,200 graded tickets, we wouldn't have known what 'right' looked like, and the team wouldn't have trusted the agent's drafts enough to let them ship. Third: the agent isn't the product — the patterns the agent surfaces are. The team got more insight into their own customers in five days than they had in the previous twelve months.",
      "Ship cost: $18,500 total — Audit + Build engagement, fixed price. Token cost across the weekend: under $400. Compared to the realistic alternative — hiring four temps, training them on the team's voice in two weeks, and praying they didn't burn out — the math was straightforward.",
      "If you're reading this with a holiday peak coming up: start the eval suite now. The build is the easy part. The trust is the hard part. The trust takes time the calendar might not give you.",
    ],
  },
  {
    slug: "should-you-automate-this",
    title:
      "Should you automate this workflow? A simple test.",
    excerpt:
      "Most teams asking 'should we automate this' are asking the wrong question. The right question — and a four-part test you can run in fifteen minutes to know whether a workflow is worth automating, without writing a single line of code or paying a consultant.",
    problem:
      "Most teams asking 'should we automate this with AI?' can't tell which workflows are good candidates and which will eat budget without ever shipping.",
    solution:
      "A four-question test — frequency, structure, recoverability, auditability — that filters the yes-cases from the no-cases in fifteen minutes, before you write a line of code or hire a consultant.",
    image: "/images/insight-lead-routing.png",
    publishedAt: "2026-05-08",
    readMinutes: 9,
    tag: "Field notes",
    body: [
      "We get asked some version of this question on every discovery call: should we automate this with AI, or is it just hype? The honest answer is that most teams asking it are asking the wrong question. The right question isn't 'can AI do this?' — current models can do astonishingly well at almost anything that lives mostly in language. The right question is whether the workflow is shaped right for AI to do it dependably enough that you'd let it ship without a human in the loop.",
      "Here's the simple test. Four questions. Run them on any workflow you're considering. If the answer to all four is yes, automate it. If two are no, walk away. If it's mixed, redesign the workflow before you automate.",
      "1. Is the workflow frequent enough that a human currently does it more than ten times a week? Below ten times a week, the cost of building, evaluating, and monitoring an AI workflow exceeds the cost of just letting a human keep doing it. That math doesn't change much across team sizes — it's the eval and monitoring overhead that doesn't scale down. If the workflow is genuinely rare, the right answer is usually a checklist or a shared template, not an agent.",
      "2. Does the workflow have a clearly defined input and a clearly defined output? Not 'unstructured email goes in, vague answer goes out' — but 'a customer support ticket goes in, a draft response and an escalation flag come out.' The more clearly you can describe what success looks like in writing, the more reliably an AI agent can match it. If you can't describe success on a whiteboard in five minutes, you're not ready to automate it. You need to define it first, by hand.",
      "3. Is the cost of a single failure bounded and recoverable? An AI agent that drafts customer support replies that go through human review before sending — fine, the cost of a wrong draft is a few seconds of human attention. An AI agent that automatically issues refunds without review — the cost of a wrong refund is real money and can compound. The right question isn't 'will the AI ever be wrong' (it will). The right question is 'when it's wrong, what does it cost us, and how fast can we catch it?' If a single failure could harm a customer, breach compliance, or cost more than a few hundred dollars to recover, you need a human in the loop. That doesn't mean don't automate — it means design the automation around the human review point, not around fully autonomous shipping.",
      "4. Can you tell, after the fact, whether the workflow ran correctly? This is the eval question. If a customer complains about the response they got, can you go look at exactly what the agent did and decide whether it was the right call? If you can't audit the work, you can't trust the work. If you can audit it but only by reading every output by hand, you can't scale the trust. Both of those are signals the workflow needs eval infrastructure before it's ready to automate. Cheap version: a sample-based weekly review where someone reads 50 random outputs and grades them. Expensive version: an automated regression suite that runs on every change. Either works. Neither one is optional.",
      "Worked examples. Lead intake — runs hundreds of times a week, has a structured input/output, single failures are recoverable (a missed lead becomes a follow-up), the work is auditable (every output is a CRM record). Yes, automate. Customer support tier-1 — same answers across all four. Yes, automate. Custom proposal writing for high-value deals — runs maybe twice a week, the inputs are mostly conversation context, a wrong proposal can torpedo a six-figure deal, and the output is hard to grade objectively. Don't automate; this is a job for a smart human who knows the customer.",
      "The middle ground. The workflows where the answer is mixed are usually the most interesting ones. Sales follow-up emails: frequent, structured-ish, recoverable, mostly auditable — but the line between 'good enough to send' and 'damage the relationship' is subtle. The right answer is not 'don't automate' or 'fully automate' — it's 'automate the draft, keep the human as the sender.' That's the pattern most of our SMB engagements end up looking like. The agent does the work; the human owns the send.",
      "What this test is for. It's for the founder or operator who has read about AI everywhere and feels like they're falling behind because they haven't done it yet. They haven't fallen behind. They just need a test to know which of the dozens of workflows in their business are actually worth automating right now versus which can wait. Run the test. Pick the one workflow that scores yes on all four. Start there.",
      "What this test isn't for. It's not a substitute for actually building the thing once you've decided to automate. The build is where most projects fail — not at the 'should we' question. If you score a workflow yes on all four and have not built the eval suite, designed the human-review points, or written down what 'correct' means in three concrete examples, you're not ready to start. Start with that, not with the prompt.",
      "If you want help running this test on your business, that's exactly what our Workflow Audit is. Two weeks, fixed price, no commitment to build with us. We'll go through your workflows with you and tell you which ones to automate, which to leave alone, and roughly what each one would cost.",
    ],
  },
  {
    slug: "support-agent-71-to-94",
    title:
      "From 71% to 94%: eval-driven iteration on a customer-support agent",
    excerpt:
      "How a SaaS support agent went from a confident demo to a production-grade 94% accuracy in two weeks. The key wasn't prompt-tuning — it was extending the eval suite until it caught what we were missing.",
    problem:
      "A SaaS support agent demoing beautifully at week 4 of build but stuck at 71% on the regression suite — the customer's CTO nervous, vibes saying 'almost there,' eval suite saying 'not close.'",
    solution:
      "Extending the eval suite first instead of tuning the prompt — the broader eval revealed retrieval was the bottleneck, not generation. Hybrid search + query rewriter took the score to 94% in two weeks of eval-gated PRs.",
    image: "/images/insight-support-agent.png",
    publishedAt: "2026-05-01",
    readMinutes: 8,
    tag: "Case study",
    body: [
      "By week 4 of a build engagement with a Series-C B2B SaaS support team, the customer-support agent was demoing beautifully — and scoring 71% on our regression suite. The customer's CTO was nervous. The vibes said 'almost there'; the eval suite said 'not close.'",
      "The instinct most teams reach for at this stage is prompt-tuning. We did the opposite. We extended the eval suite first. Two hundred new hand-graded edge cases — handoffs to humans, multi-step questions, ambiguous topics, customers asking the same thing three different ways. The score went DOWN to 64% before we touched any code, because the broader eval was finally catching failure modes the original suite missed.",
      "The signal in that drop was: retrieval was the bottleneck, not generation. The model's drafts were good when context was good. They were bad when retrieval gave it the wrong document. We swapped from semantic-only search to hybrid (BM25 lexical + pgvector semantic) and added a query rewriter for ambiguous questions — the kind that look like one question but are actually three.",
      "That alone moved 64% to 87% on the new eval. The remaining seven points came from prompt structure: an explicit 'do not fabricate citations' instruction in the system prompt, a per-claim citation requirement, and refusal patterns for genuinely out-of-scope questions. We measured each change individually so we'd know which ones to keep.",
      "Total iteration: two weeks, 50-some PRs, every one eval-gated. The customer's CTO trusted the 94% number because every commit had an eval delta in the PR. The number didn't come from 'we tried it and it seemed better' — it came from a regression suite that knew when it was lying.",
      "The lesson, restated: when an agent is plateauing, extending the eval suite usually beats tweaking the prompt. The suite tells you where the agent actually fails. The prompt only tells you what you wish were true.",
    ],
  },
  {
    slug: "evals-before-everything",
    title: "Evals before everything: why most agent projects fail in week six",
    excerpt:
      "If you can't measure your agent in a way an engineer would defend in a code review, you can't ship it. Here's the eval framework we set up before writing a single agent prompt.",
    problem:
      "Most agent projects 'look ready' by week six but have no way to defend the claim — without an eval framework there's no shared definition of 'better,' and the team argues about prompts in Slack instead of shipping.",
    solution:
      "Build the eval framework before writing a single agent prompt — fixed real-input dataset, deterministic graders, calibrated LLM-judge for open-ended fields, per-PR regression detection. Make the suite the contract between the team and the agent.",
    image: "/images/insight-support-agent.png",
    publishedAt: "2026-04-22",
    readMinutes: 9,
    tag: "Evals",
    body: [
      "There's a moment in nearly every agent project — usually around week six — where the team realizes the demo they showed in week two is the only version they'll ever ship. The honest reason is almost always the same: nobody built an eval framework first.",
      "We treat evals as the contract between the team and the agent. If the eval suite doesn't go red on a regression, the regression isn't real. If a change can't be defended with a passing eval, it doesn't ship. That's not a process — it's the only way to make agent work feel like engineering instead of vibes.",
      "The framework we set up before writing a single prompt: a fixed dataset of 500–1000 real inputs (anonymized), a deterministic grader for the structured fields, an LLM-judge for the open-ended fields with a calibrated rubric, and a per-PR diff that flags any regression of more than 1%. None of this is novel. The discipline of doing it before the agent exists is what's rare.",
      "What we don't do: rely on a single \"vibes\" eval. We've watched every team that does this end up arguing about whether the new prompt is \"better\" with no shared definition. The argument is unwinnable. The eval suite ends it.",
    ],
  },
  {
    slug: "deciding-agent-disagreement",
    title:
      "Disagreement detection: building a deciding agent that doesn't lie to itself",
    excerpt:
      "Multi-agent panels are popular for high-stakes review — legal, medical, financial. The standard pattern hides the most useful signal. Here's how we built a deciding agent for a fintech contract-review system that surfaces disagreement instead of averaging it away.",
    problem:
      "Multi-agent review panels using majority vote silently discard the most informative signal — disagreement — and produce decisions you can't audit, which compliance won't approve.",
    solution:
      "A deciding agent that reads each panelist's reasoning, identifies disagreements, and decides based on direct evidence (not panelist confidence). The audit trail it produces — every claim, every citation, every decision — became the actual product.",
    image: "/images/insight-contract-review.png",
    publishedAt: "2026-04-15",
    readMinutes: 10,
    tag: "Case study",
    body: [
      "Multi-agent panels — three or more reviewer agents voting on a high-stakes question — show up everywhere now: legal review, medical chart audit, financial document QA. The default pattern is majority vote. Take three opinions, count them, ship the most common answer. The problem with that pattern is that it discards the most informative signal in the panel: disagreement.",
      "When we built the contract-review system for a late-stage UK fintech, we found that disagreements between the reviewers carried more information than agreements. If two of three reviewers said 'this clause is risky' and one said 'this clause is fine,' the dissenter might be right (caught an indemnity carve-out the others missed) or wrong (misread a comma). You don't know without inspecting the disagreement. Majority vote silently picks one and moves on.",
      "So we replaced the vote with a deciding agent — a fourth agent whose job is not to count opinions but to read the panel's reasoning, identify each disagreement, and decide which reviewer is most likely right on each one, citing the supporting clause text directly. Every claim, every citation, every decision logged.",
      "Two weeks in, we noticed a problem: the deciding agent was deferring to the most confident-sounding reviewer rather than the most accurate one. That's a known LLM failure mode — pattern-matching tone over evidence. The fix was structural, not stylistic: we made the deciding agent score each panelist's claim against the contract text directly, with no access to the panelist's confidence language. Once it could only see claim + supporting clause, the right answer started to dominate.",
      "The unlock turned out to be the audit trail this produces. Compliance approved the system in one review pass — not because the agent was right more often (it was), but because every redline could be traced back to specific clauses and specific reviewer reasoning. They could review the lineage. The audit trail was the actual product; the agent was the engine that produced it.",
      "If you're building a multi-agent panel, the question isn't 'how do we vote.' It's 'what would a careful human reviewer notice that majority vote would hide.'",
    ],
  },
  {
    slug: "boring-infrastructure-ambitious-agents",
    title: "Boring infrastructure, ambitious agents",
    excerpt:
      "Postgres, LangGraph, OpenTelemetry. Why the most ambitious AI work we ship sits on the most conservative stack you can buy.",
    problem:
      "Teams burn entire quarters on bespoke vector DBs, custom orchestrators, and proprietary observability layers — and ship the actual agent late, or never.",
    solution:
      "Postgres, LangGraph, LangSmith, OpenTelemetry. Standard tools beneath the agent so the team's attention can sit on the actual hard problem — the agent's behavior under real traffic.",
    publishedAt: "2026-04-04",
    readMinutes: 7,
    tag: "Engineering",
    body: [
      "Every project has a finite novelty budget. Spend it on the infrastructure layer and you'll bankrupt yourself before the agent layer is interesting. Spend it on the agent layer and you'll ship.",
      "Our default stack hasn't changed in eighteen months: Postgres for state and pgvector, LangGraph for orchestration, LangSmith for tracing, OpenTelemetry for the rest, and whatever model is best on the eval suite this quarter. The point isn't that this stack is exciting. The point is that it's predictable. Predictable infra means the team's attention can sit on the actual hard problem — the agent's behavior under real traffic.",
      "We've watched teams burn entire quarters on bespoke vector databases, custom orchestrators, or proprietary observability layers. Every one of them ended up rebuilding what the boring stack already gives you, and shipping the agent late.",
    ],
  },
  {
    slug: "cascading-model-routing",
    title:
      "Cascading model routing: cutting $11k/mo to $3k/mo without losing accuracy",
    excerpt:
      "A growth-stage marketplace was running every lead through Claude Sonnet — overkill for 90% of rows, necessary for 10%. The fix: a small model decides what's hard, a big model handles what is. Here's the eval discipline that made the routing trustable.",
    problem:
      "A growth-stage marketplace running every lead through Claude Sonnet — accurate but burning $11k/mo, with no way to tell which rows were overkill and which genuinely needed reasoning.",
    solution:
      "Haiku produces both the enrichment and a confidence score on its own work; Sonnet only adjudicates when confidence is low. 88% of rows shipped from Haiku alone. Cost dropped to $3.2k/mo with accuracy held within a point of the all-Sonnet baseline.",
    image: "/images/insight-lead-routing.png",
    publishedAt: "2026-03-30",
    readMinutes: 9,
    tag: "Case study",
    body: [
      "A growth-stage B2B marketplace based in Berlin was running a lead-enrichment pipeline at $11,000 per month. Every row of their inbound went through Claude Sonnet — accurate, but overkill for the 90% of leads that were straightforward, and right-sized for the 10% that genuinely needed reasoning. They asked us if we could cut the cost without dropping the quality.",
      "The standard cost-engineering move is: route easy cases to a smaller model, escalate hard ones. We did that, with one twist — we made the smaller model do the routing decision rather than a heuristic. Heuristics rot. Models that have actually attempted the work tend to know whether they got it right.",
      "Claude Haiku ran on every row first. It produced two outputs: the enrichment itself, and a confidence score on its own work. If confidence was high, the row shipped. If low, Sonnet picked it up and adjudicated. About 88% of rows shipped from Haiku alone — most enrichment is mechanical, and a fast small model handles it cleanly.",
      "The risk with this pattern is that the small model lies about its own confidence — outputs 'I'm sure' on rows it got wrong. To catch that, we built a parallel eval: 500 random rows graded both by Haiku-only and by Sonnet-only on the same rubric, weekly. Haiku-only matched Sonnet-only on simple cases (94% vs 95%); diverged on hard ones (78% vs 92%). Crucially, the divergence correlated with Haiku's own confidence score — the routed-easy rows really were easier. The cascade caught the rest.",
      "Total cost dropped from $11k/mo to $3.2k/mo. Accuracy held within a point of the all-Sonnet baseline. The customer's finance team was happier than the engineering team — which is rare and worth remembering.",
      "The general lesson: model routing is mostly a question of whether you trust the routing signal. If you make the small model produce its own confidence and you eval that confidence weekly, you can route aggressively. If you route on heuristics or static rules, you'll drift.",
    ],
  },
  {
    slug: "production-from-day-one",
    title: "Production from day one: writing the runbook before the agent exists",
    excerpt:
      "If your runbook only exists after launch, your launch is going to slip. Why we draft the on-call doc on day one of every engagement.",
    problem:
      "Teams write the runbook after launch — and discover the launch was always going to slip because nobody can answer the 2am questions until launch is already broken.",
    solution:
      "Draft the on-call doc on day one of every engagement. Three sections: agent is wrong, agent is slow, agent is expensive. Half is wrong by launch — that's fine, the goal is surfacing what the team doesn't yet know.",
    publishedAt: "2026-03-18",
    readMinutes: 6,
    tag: "Production",
    body: [
      "The single most reliable predictor of whether an agent project ships is whether the runbook was written before the launch was scheduled. When teams write the runbook after the launch, they discover the launch was always going to slip — they just didn't know it.",
      "On day one of every engagement we draft a one-page on-call doc with three sections: \"the agent is wrong,\" \"the agent is slow,\" \"the agent is expensive.\" Under each, the rollback path, the metric to watch, the escalation. Half of it is wrong by launch — that's fine, the goal is to surface what the team doesn't yet know.",
      "The pattern we see in stalled projects: nobody can answer \"what happens at 2am when this hallucinates a refund?\" Nobody wants to be the one who answers it. So launch keeps slipping. Writing the runbook first turns the question into a checkbox.",
    ],
  },
  {
    slug: "what-poc-purgatory-actually-looks-like",
    title: "What POC purgatory actually looks like",
    excerpt:
      "Five concrete failure modes we see in stalled agent projects — drawn from the last twelve audits we ran.",
    problem:
      "A dozen stalled agent projects, all rhyming. The same five failure modes recur — but they hide in the version-control footprint, not in the architecture diagrams the team shows you.",
    solution:
      "A taxonomy of those five — prompt-as-codebase, orchestrator-of-the-month, the eval that doesn't disagree, the hidden cost ceiling, the unowned guardrail — with the signal that gives each one away in the repo.",
    publishedAt: "2026-02-27",
    readMinutes: 8,
    tag: "Field notes",
    body: [
      "We've audited a dozen stalled agent projects in the last eighteen months. The failure modes rhyme. Five concrete ones, with the version control footprint that gives them away:",
      "1. The prompt-as-codebase. The repo has more `.md` files than `.py` files. Every change is a string edit. There are no tests. The team argues about whether the change is better in Slack threads.",
      "2. The orchestrator-of-the-month. The repo's orchestration layer has been rewritten three times in six months. None of them are wrong; the team just keeps fleeing whichever choice they made last.",
      "3. The eval that doesn't disagree. The eval suite passes every commit. It always passed. It would pass an empty agent. Nobody trusts it because it never finds anything.",
      "4. The hidden cost ceiling. The agent works in dev but the team has no idea what it costs at scale. Someone will eventually be surprised by a $40k month and the project will pause.",
      "5. The unowned guardrail. There are PII redactors and policy filters scattered throughout. Nobody owns them. Nobody can list them. They will silently fail in production and nobody will know.",
    ],
  },
];

const RICH_SECTIONS: Record<string, ReadonlyArray<string>> = {
  "black-friday-with-one-agent": [
    "## The operating principle",
    "> The agent was not designed to replace judgment. It was designed to make the easy decisions boring and the hard decisions visible.",
    "The most useful design choice was separating the work into three buckets before writing prompts: requests the agent could answer, requests the agent could draft but not send, and requests the agent should not touch. That third bucket kept the team honest. It included angry customers, refund edge cases, anything involving a delivery exception over a fixed dollar threshold, and any customer the team had already marked as high-touch. Once those boundaries were explicit, the conversation stopped being abstract. The team was no longer asking whether AI could handle support. They were asking which exact classes of support were safe to automate under pressure.",
    "### What we measured during the weekend",
    "- Escalation rate by topic, not just total escalation rate.",
    "- Average response latency for autonomous replies and human-reviewed replies separately.",
    "- CSAT split by agent-handled, drafted, and fully human tickets.",
    "- The top reasons tickets escaped automation.",
    "- Policy citations attached to every autonomous response.",
    "The measurement mattered because launch weekend was not the finish line. It was the first honest test of the workflow under stress. The dashboard the team watched was intentionally small: volume, latency, escalation, CSAT, and the list of reasons the agent had refused to answer. When something moved, they knew which rule to inspect. They did not need a war room full of charts; they needed a short list of decisions they trusted.",
    "## What we would do differently",
    "We would run the escalation loosening exercise earlier. The first twelve hours showed that conservative rules are safer but not automatically better. A rule that escalates too often creates a different failure mode: humans get buried, customers wait, and the system looks broken even when the model is behaving responsibly. The better pre-launch exercise is to simulate peak volume with multiple escalation thresholds and ask the team which failure mode they prefer. In this case, the correct answer was not maximum caution. It was bounded autonomy with clear review queues.",
    "The other change would be upstream instrumentation. The agent surfaced SKU-level sizing complaints, wrong-city shipping patterns, and receipt confusion after launch. That was valuable, but the team could have started capturing those categories during the eval build. The next version of this engagement would treat insight capture as a first-class output from day one, not a pleasant surprise after the holiday weekend.",
    "## Takeaways for teams with seasonal spikes",
    "- Start with historical tickets, not a blank prompt.",
    "- Define escalation before defining tone.",
    "- Launch with one human owner for policy decisions.",
    "- Expect to tune rules in the first twelve hours.",
    "- Review the patterns the agent finds after the spike ends.",
  ],
  "should-you-automate-this": [
    "## A faster way to score the workflow",
    "> The right automation candidate is not the flashiest workflow. It is the workflow where the definition of correct is boring enough to test.",
    "The four-question test is useful because it forces the team to describe the work without reaching for model language. Frequency tells you whether the payoff is real. Structure tells you whether the system can know what it is supposed to produce. Recoverability tells you how much autonomy is appropriate. Auditability tells you whether you can learn from mistakes without turning every output into a meeting. When those four answers are clear, the technical plan becomes much less mysterious.",
    "### Quick scoring rubric",
    "- 0 points: the workflow is rare, vague, high-risk, and hard to audit.",
    "- 1 point: one dimension is strong, but the workflow still needs redesign before automation.",
    "- 2 points: two dimensions are strong; start with human-reviewed drafts or internal-only automation.",
    "- 3 points: the workflow is a good candidate with one explicit guardrail.",
    "- 4 points: the workflow is ready for a scoped automation build.",
    "A good first project usually scores three or four. A two-point workflow is not a no; it is a design prompt. You can often raise the score by narrowing the input, adding human review, or making the output more structured. For example, 'write proposals' is usually a poor candidate. 'Draft the first follow-up email after a discovery call using these five fields' is much stronger.",
    "## Examples that change after redesign",
    "Invoice follow-up looks risky if the system can send anything to anyone. It becomes safer when the agent only drafts reminders for invoices under a threshold, checks payment status, and routes exceptions to finance. Hiring outreach looks fragile if the output is a complete candidate evaluation. It becomes useful when the system summarizes structured interview notes and flags missing evidence. The automation target is rarely the whole job. It is the repeatable slice of the job that already has an implied checklist.",
    "## Questions to ask before the first build",
    "- What would make a human reject this output?",
    "- Which data source is the source of truth?",
    "- What should the system do when the data is missing?",
    "- Who reviews failures each week?",
    "- What metric proves the workflow is better after launch?",
  ],
  "support-agent-71-to-94": [
    "## Why the first score was misleading",
    "> A passing demo is not the same thing as a passing regression suite. The demo shows what the agent can do. The suite shows what it reliably does.",
    "The original 71% number looked disappointing, but it was useful because it was honest. The agent could answer clean questions when retrieval found the right document. It failed when the question was ambiguous, when the customer used product slang, or when two issues were buried in one message. That pattern told us the model was not the main bottleneck. The context pipeline was. If we had spent the next week polishing tone, we would have made the wrong answers sound better without making them more correct.",
    "## The eval expansion",
    "We added two hundred examples that represented the cases support leads actually worried about. That included plan-change edge cases, billing confusion, integration questions with stale docs, and tickets that should have become human handoffs. Each example had the expected answer, the documents that should support it, and a reason the answer was safe or unsafe to send.",
    "- Multi-intent tickets where the customer asked two questions in one message.",
    "- Ambiguous terms that matched multiple help-center articles.",
    "- Questions with missing account context.",
    "- Policy exceptions that required a human decision.",
    "- Out-of-scope questions where refusal was the correct answer.",
    "### The retrieval fix",
    "Hybrid search worked because customer language did not always match documentation language. Semantic search found conceptual matches, but it missed exact product names and billing terms. Keyword search caught those exact tokens but over-ranked stale pages. The query rewriter gave both systems a better query, then the ranker blended the results. Once retrieval improved, the answer model suddenly looked much smarter, even though the model had barely changed.",
    "## What changed in the team's process",
    "Every pull request carried an eval delta. A prompt edit that improved friendly tone but dropped citation accuracy did not ship. A retrieval change that improved ambiguous questions but hurt billing answers got split and tested again. This made the customer conversation calmer. The CTO was no longer being asked to trust a demo. They could see the failure categories shrinking week by week.",
    "## Practical lessons",
    "- Extend evals before tuning prompts when the failure mode is unclear.",
    "- Grade retrieval separately from generation.",
    "- Require citations per claim, not just per answer.",
    "- Keep refusal examples in the suite so safety does not regress.",
    "- Make the eval delta visible in code review.",
    "The final 94% mattered less than the path to 94%. The team trusted the number because they had watched the suite get harder before it got greener. That is the difference between a metric used for marketing and a metric used for engineering.",
    "## A week-by-week view",
    "Week one was almost entirely diagnostic. We resisted the urge to rewrite the prompt and instead labeled failures by source: wrong document, missing document, ambiguous user phrasing, weak refusal, or answer formatting. That taxonomy made the backlog obvious. More than half the misses were context misses, so generation work moved lower in priority. This is the point where many projects waste time because the visible artifact is the answer text. The invisible artifact, retrieval quality, is usually where the leverage lives.",
    "Week two was eval-gated implementation. Hybrid retrieval shipped first, then the query rewriter, then citation enforcement, then refusal patterns. Each change had to move a specific category without damaging another. The team kept a small set of golden tickets open during review so product, support, and engineering could discuss concrete examples instead of arguing about abstract accuracy.",
    "### What made the number defensible",
    "- The eval set got harder before the score improved.",
    "- Each failure had a category and an owner.",
    "- Improvements were measured against a locked holdout set.",
    "- Support leads reviewed sampled outputs, not just engineers.",
    "- The launch threshold was agreed before the final score arrived.",
    "That last point was easy to underestimate. Agreeing on launch criteria before the score arrives prevents the team from moving the bar when the result feels emotionally close.",
    "It also gives the customer a fair way to say yes.",
  ],
  "evals-before-everything": [
    "## What an eval suite is actually for",
    "> The eval suite is not a scoreboard. It is the contract between the business process and the agent.",
    "Most teams treat evals as a final exam. They build the agent, try a few examples, and write tests once the behavior feels close. That order is backwards. The eval should exist before the agent because it forces the team to write down what good work means. Without that definition, every prompt change becomes a taste debate. One person likes a shorter answer. Another likes more explanation. Nobody can prove whether the system got better.",
    "A useful suite has three layers. The first layer checks deterministic fields: did the agent choose the right category, escalation flag, account ID, or policy source. The second layer checks open-ended quality with a rubric. The third layer checks operational behavior: latency, cost, refusal rate, and whether the system produced an audit trail. If any layer is missing, the team will discover the gap in production.",
    "## The dataset",
    "The best examples come from real work. Synthetic examples are useful for edge cases, but they cannot replace messy historical data. Real inputs contain shorthand, typos, missing context, contradictory documents, and strange customer phrasing. Those are the cases that break agents after launch.",
    "- Sample across time, not just recent clean examples.",
    "- Include failures and escalations, not only successful historical work.",
    "- Remove or anonymize sensitive data before it reaches model providers.",
    "- Preserve enough context to grade the output fairly.",
    "- Keep a locked holdout set that prompt experiments cannot see.",
    "### The grader",
    "For structured fields, deterministic graders are best. They are boring, fast, and hard to argue with. For open-ended answers, an LLM judge can work if the rubric is narrow and calibrated against human review. The judge should explain the grade, cite the rubric line it used, and be sampled by humans regularly. A judge that never disagrees with the team is not a judge; it is decoration.",
    "## How evals change delivery",
    "Once the suite exists, the project rhythm changes. Discovery produces the first examples. Build work is organized around failure categories. Weekly updates show which categories moved and which did not. Launch readiness becomes a threshold decision instead of a confidence ritual. This is why evals belong at the start: they turn an agent project into an engineering project.",
    "## Minimum viable eval checklist",
    "- At least 100 real examples before the first prototype.",
    "- At least 30 edge cases before pilot.",
    "- A written rubric for each non-deterministic judgment.",
    "- Per-change regression output in pull requests.",
    "- A post-launch review loop that samples real production outputs.",
    "## The operating cadence",
    "A strong eval practice becomes a weekly rhythm. On Monday, the team reviews the worst failures from the last run and decides which category matters most. During the week, implementation work targets that category. On Friday, the team looks at the delta and decides whether the change is real, partial, or misleading. This cadence prevents the project from drifting into prompt tinkering. It also makes progress understandable to non-engineers because the update is tied to user-visible failure modes.",
    "The cadence should include negative news. If the score drops because the dataset got harder, say that plainly. If a new prompt improves tone but hurts factuality, say that too. The purpose of evals is not to make every week look good. It is to keep the team oriented toward launchable behavior.",
    "### Common mistakes",
    "- Testing only happy paths because they are easier to collect.",
    "- Letting the same person write prompts and grade open-ended outputs without review.",
    "- Changing the dataset every week and losing the ability to compare deltas.",
    "- Reporting one aggregate score when the failure categories moved in opposite directions.",
    "- Treating cost and latency as operational details instead of eval dimensions.",
    "The best eval suites are small enough to run often and serious enough to change decisions. They do not need to be academically perfect. They need to be trusted by the people who will own the workflow after launch.",
    "## What to show stakeholders",
    "Executives usually do not need every row in the eval suite. They need to see that the suite represents real work and that failures are shrinking in categories that matter. A useful update shows three things: the current score, the top failing category, and examples of outputs that changed because of the latest work. That format keeps the discussion grounded. It also prevents the common trap where one impressive demo outweighs a weak test set.",
    "The strongest stakeholder reviews include bad examples. Showing failures builds trust because it proves the team is not hiding uncertainty. It also lets operators correct the rubric. Sometimes an engineer thinks an answer is wrong because it differs from the expected text, while the support lead sees that it is acceptable. Sometimes the reverse happens. The review meeting is where the definition of good gets sharper.",
  ],
  "deciding-agent-disagreement": [
    "## Why disagreement is valuable",
    "> In high-stakes review, disagreement is not noise. It is the signal that tells you where the document deserves attention.",
    "Majority vote feels safe because it produces a single answer. The problem is that it hides the reasoning. In contract review, the minority view can be the only reviewer that noticed a carve-out, a definition buried in another section, or a clause that applies only under a specific condition. Averaging that away gives the team a tidy answer with a weak audit trail. A deciding agent should not ask which reviewer sounded most confident. It should ask which claim is best supported by the source text.",
    "## The panel design",
    "The system used three reviewer roles. One looked for commercial risk, one looked for compliance exposure, and one looked for operational obligations. Each reviewer had a narrow rubric and had to cite clause language for every claim. The deciding agent then received claims and citations, not confidence language. That forced the final step to compare evidence instead of personalities.",
    "- Reviewer A: commercial terms, payment, renewal, termination, liability.",
    "- Reviewer B: privacy, data handling, regulatory obligations, audit rights.",
    "- Reviewer C: delivery commitments, support obligations, implementation risk.",
    "- Decider: disagreement summary, evidence comparison, final ranked output.",
    "### The failure mode we had to remove",
    "The first deciding agent overweighted fluent reasoning. A reviewer that wrote in a crisp legal style could win even when the citation was weaker. The fix was to strip confidence language and ask the decider to score claim against clause. This made the process less theatrical and more reliable. It also produced a better audit trail because every final decision pointed back to specific text.",
    "## What compliance liked",
    "Compliance did not approve the system because it promised perfect accuracy. They approved it because the workflow made review inspectable. A human could open the redline, see the ranked risk, read the cited clause, and inspect the disagreement that led to the final decision. That is much closer to how careful human review works. The agent was useful because it made the reasoning path visible.",
    "## Implementation notes",
    "- Store reviewer outputs separately before merging.",
    "- Preserve dissent instead of deleting it from the final report.",
    "- Require citations for every claim that survives into the redline.",
    "- Evaluate the decider on evidence quality, not answer confidence.",
    "- Sample disagreements after launch; they are the best training data.",
    "The strongest version of a multi-agent panel is not a debate club. It is a structured review process where disagreement becomes a queue of things worth inspecting.",
    "## How we evaluated the decider",
    "The decider had its own test set. We did not only grade the final answer; we graded whether it noticed the important disagreement, whether it cited the right clause, and whether it explained why one interpretation beat another. This mattered because a decider can be accidentally right for the wrong reason. In legal review, that is not good enough. The workflow needs to produce a path a reviewer can defend later.",
    "We also created adversarial examples where the confident reviewer was wrong. Those examples were uncomfortable, but they were the ones that improved the system. They forced the decider to ignore polish and inspect evidence. When the decider failed, the fix was usually structural: hide confidence language, require clause-by-claim scoring, or ask for a separate uncertainty note.",
    "### Review outputs that mattered",
    "- A ranked list of risks, not a flat summary.",
    "- The clause text attached to each surviving claim.",
    "- A disagreement note when reviewers split.",
    "- A confidence explanation tied to evidence, not tone.",
    "- A human-review flag when the evidence was incomplete.",
    "This made the final report more useful than a conventional summary. The customer did not want another document to trust blindly. They wanted a review packet that showed its work.",
    "The deciding agent earned trust by becoming less magical. The more it exposed evidence, uncertainty, and dissent, the more useful it became to the humans responsible for the final judgment.",
  ],
  "boring-infrastructure-ambitious-agents": [
    "## The novelty budget",
    "> Every project gets one hard problem for free. Spend it on infrastructure and the agent never gets interesting.",
    "Agent projects already contain enough uncertainty: model behavior, messy inputs, ambiguous business rules, cost ceilings, latency, privacy, and user trust. Adding experimental infrastructure to that list usually makes the project slower without making the agent better. The conservative stack is not a lack of ambition. It is how you reserve ambition for the behavior that matters.",
    "Postgres is rarely the wrong default for state. It gives teams transactions, permissions, backups, migrations, and observability they already understand. pgvector is often enough for retrieval until the workload proves otherwise. OpenTelemetry is boring in the best possible way because it connects traces to the systems teams already use. LangGraph or a similar orchestration layer is useful when the workflow needs stateful branching, retries, and resumability. None of these choices are glamorous. That is the point.",
    "## Where teams overbuild",
    "- A custom vector service before proving retrieval quality is the bottleneck.",
    "- A bespoke orchestrator before defining the workflow state machine.",
    "- A prompt management layer before prompts are reviewed like code.",
    "- A tracing system that product and support teams cannot read.",
    "- A model router with no eval proving the route decision is trustworthy.",
    "### What the boring stack buys you",
    "It buys rollback paths. It buys queryable state. It buys hiring flexibility. It buys cheaper debugging at 2am. Most importantly, it makes failures legible. When an agent gives the wrong answer, the team can inspect the input, retrieved context, tool calls, model output, guardrail decision, and final action. That inspection path matters more than the elegance of the architecture diagram.",
    "## When to choose something specialized",
    "There are real reasons to leave the boring path. You may need a specialized vector database for very large collections, a queue built for extreme throughput, or a policy engine for regulated workflows. The rule is simple: specialize after the eval suite or production load proves the default is failing. Do not specialize because the architecture feels too ordinary.",
    "## A practical default stack",
    "- Postgres for application state, audit logs, and small-to-medium retrieval.",
    "- A job queue for long-running work and retries.",
    "- Object storage for source documents and generated artifacts.",
    "- OpenTelemetry-compatible traces for every agent run.",
    "- A small eval runner that can execute against fixed datasets in CI.",
    "Ambitious agents do not need exotic foundations. They need foundations that let the team see, measure, and repair behavior quickly.",
    "## The architecture review test",
    "Before adding a new infrastructure component, ask what user-visible behavior it improves. If the answer is vague, the component probably belongs later. A vector database may improve recall, but only after the team can show recall is the problem. A complex orchestration framework may improve resumability, but only after the workflow has meaningful state transitions. A prompt registry may improve governance, but only after prompts are reviewed and shipped often enough to need governance.",
    "This test keeps the architecture attached to evidence. It does not block sophistication; it sequences it. The stack can become more specialized as the workload proves what it needs. Until then, familiar tools let the team spend its attention on the agent's behavior under real conditions.",
    "### Signals the stack is too clever",
    "- Engineers can explain the infrastructure but not the launch metric.",
    "- The tracing system cannot answer why a specific output happened.",
    "- Local development requires too many services to run a simple test.",
    "- The team has rewritten orchestration without changing user outcomes.",
    "- Nobody can estimate the cost of a production run.",
    "### Signals the stack is doing its job",
    "- A failed run can be replayed from stored inputs.",
    "- Tool calls, retrieved context, and model outputs share one trace ID.",
    "- Product owners can inspect examples without reading logs.",
    "- Rollbacks are boring.",
    "- The eval suite runs before architectural preferences dominate the conversation.",
    "The point is not minimalism for its own sake. The point is operational clarity. The more ambitious the agent, the more boring its foundation should feel.",
    "## A migration path that keeps options open",
    "Starting boring does not mean staying static forever. The trick is to choose defaults that can be replaced when evidence demands it. If Postgres retrieval stops scaling, move the retrieval layer behind an interface and replace that piece. If the job queue becomes the bottleneck, swap it without changing the agent contract. If model routing becomes complex, add a routing service after the eval suite can prove the router's value. Good boring infrastructure is modular enough to evolve without forcing a rewrite.",
    "This is why we prefer clear interfaces over clever platforms. The agent should know how to ask for context, call tools, store state, and emit traces. It should not care whether retrieval is backed by pgvector today and a specialized service next quarter. That separation lets teams buy sophistication with evidence instead of committing to it on day one.",
    "The best architecture review ends with fewer exciting decisions, not more. Fewer moving parts means more time spent on evals, guardrails, and the uncomfortable business rules that actually determine whether the agent ships.",
    "That trade is almost always worth it.",
    "Especially when the team is still discovering the real workflow.",
    "It keeps the system honest.",
  ],
  "cascading-model-routing": [
    "## The routing question",
    "> Cascading only works when the cheap model is allowed to say, 'this one is not mine.'",
    "The first version of the customer's enrichment system was accurate because it used a strong model for everything. It was also wasteful. Most rows were routine: company domain, industry, employee count range, simple ICP score, and a first-touch note based on public information. The expensive cases were different. They involved ambiguous company names, sparse websites, conflicting data sources, or leads that matched the ICP in one dimension but failed in another. The routing problem was to separate those cases without hiding the hard ones.",
    "## Why heuristics were not enough",
    "A static rule like 'send all enterprise leads to the large model' sounds reasonable until the data shifts. Some enterprise leads are obvious. Some small accounts are subtle. Heuristics also tend to multiply: one rule for geography, one for missing domain, one for industry, one for title. Eventually nobody knows which rule produced the route. We wanted the small model to attempt the work and expose its uncertainty, then prove through evals that the uncertainty correlated with actual difficulty.",
    "### The eval that made routing safe",
    "- Sample five hundred rows weekly from recent production traffic.",
    "- Run the small-model answer and the large-model answer against the same rubric.",
    "- Compare both to human spot checks on a smaller calibrated sample.",
    "- Track accuracy by confidence bucket, not only aggregate accuracy.",
    "- Review the false-confident cases first because they are the dangerous ones.",
    "The key chart was not cost. It was confidence calibration. If rows marked high-confidence by the small model matched the large-model baseline, the cascade could route aggressively. If that relationship drifted, the system would widen the escalation band until calibration recovered.",
    "## Operational changes",
    "Sales reps did not see model names. They saw a lead score, the evidence behind it, and a draft they could edit. Finance saw cost per thousand leads. Engineering saw route distribution and disagreement rate. Each audience got the metric that matched its decision. That separation helped adoption because the system did not ask every stakeholder to care about token routing.",
    "## Lessons for cost reduction",
    "- Never optimize cost before you have an accuracy baseline.",
    "- Treat confidence as a hypothesis that must be calibrated.",
    "- Route based on attempted work, not metadata alone.",
    "- Keep a fallback path that can widen automatically when drift appears.",
    "- Report cost savings alongside quality and coverage, not instead of them.",
    "The final savings were real, but the important win was predictability. The team could forecast spend, explain quality, and tune the cascade without rewriting the pipeline.",
    "## The human review loop",
    "The cascade improved because sales reps were part of the feedback loop. They did not grade every row, but they flagged bad fits, weak personalization, and missing context when they saw it. Those flags became weekly samples for the eval set. This kept the benchmark connected to the work the business actually cared about: better prioritization, faster outreach, and fewer obviously wrong drafts.",
    "The feedback loop also protected against silent drift. A model route can look stable while the market changes underneath it. New segments appear. Titles shift. Company websites get thinner. If the weekly sample only checks old examples, the router can become overconfident. Production sampling keeps the cascade honest.",
    "### What we exposed in reporting",
    "- Percentage of rows handled by the small model.",
    "- Accuracy by confidence bucket.",
    "- Escalation rate by lead source.",
    "- Cost per thousand enriched leads.",
    "- Human override rate on generated drafts.",
    "The most useful report combined cost and quality. A cost chart alone would have encouraged aggressive routing. An accuracy chart alone would have hidden the financial win. Together, they let the customer tune the system like an operating process rather than a model experiment.",
    "That tuning continued after launch. The team reviewed the lowest-confidence rows every week, promoted stable categories into the small-model path, and tightened escalation when new lead sources appeared.",
    "The cascade became a managed system, not a one-time optimization.",
  ],
  "production-from-day-one": [
    "## Why the runbook comes first",
    "> A runbook written after launch documents what you wish you had known before launch.",
    "Writing the runbook on day one feels premature until the first hard question appears. What happens if the agent sends the wrong answer? Who can disable autonomous mode? Which metric proves the system is drifting? How expensive can a single run become? These questions are uncomfortable because they reveal missing product decisions. That is exactly why they belong at the start. The runbook is not paperwork. It is a discovery tool.",
    "A good early runbook is allowed to be wrong. In fact, it will be wrong. The point is to create placeholders for operational decisions while there is still time to change the design. If the rollback path requires engineering work that does not exist yet, the team learns that before launch week. If nobody owns the policy exceptions queue, the team learns that before a customer finds the edge case.",
    "## The three failure sections",
    "### The agent is wrong",
    "This section defines what counts as wrong, who reviews examples, how bad outputs are corrected, and when the system should fall back to human review. It also lists the audit fields required for investigation: input, retrieved context, tool calls, model output, guardrail decision, and final action.",
    "### The agent is slow",
    "This section defines latency thresholds and degradation behavior. Some workflows can wait. Others need immediate response. If the model provider is slow, the system may switch models, skip enrichment, or queue the task. The right answer depends on the workflow, so it must be written down.",
    "### The agent is expensive",
    "This section defines cost budgets per run, per day, and per customer. It also lists the controls: max retries, max document length, model fallback, caching, and alerts. Cost surprises are usually design failures, not accounting failures.",
    "## What the runbook changes",
    "- It turns scary launch questions into design tasks.",
    "- It gives non-engineers a shared language for failure.",
    "- It forces rollback and manual-review paths to exist before launch.",
    "- It makes monitoring requirements concrete.",
    "- It creates an owner for decisions that would otherwise drift.",
    "The runbook is the cheapest version of production pressure. It lets the team rehearse failure before failure has customers attached to it.",
    "## The launch rehearsal",
    "Before the first production user touches the workflow, run a rehearsal. Pick twenty realistic inputs and walk them through the system as if it were launch day. Do not let engineers narrate what should happen. Use the actual UI, the actual alerts, the actual logs, and the actual rollback path. The goal is to find the places where the runbook makes assumptions the product does not support yet.",
    "A rehearsal usually reveals small but important gaps. The alert goes to the wrong channel. The support owner can see the final answer but not the retrieved context. The rollback disables the model but leaves scheduled jobs running. The cost alert fires after the budget is already exceeded. None of these are model failures, but any one of them can make launch feel chaotic.",
    "### Runbook fields worth writing early",
    "- Owner for business policy decisions.",
    "- Owner for technical incidents.",
    "- Disable switch and expected recovery time.",
    "- Data sources required for investigation.",
    "- Customer-facing language for known failure modes.",
    "- Cost, latency, and quality thresholds.",
    "## Why this increases trust",
    "Teams trust systems they know how to stop. The disable switch is not a sign of weak automation; it is what makes autonomy acceptable. Once stakeholders understand that bad behavior can be contained, they become more willing to launch the useful parts of the system. Production readiness is not the absence of failure. It is knowing what failure looks like and what the team will do next.",
    "## What belongs in the first version",
    "The first runbook should be short enough that someone will actually read it during an incident. We aim for one page per failure family, with links to deeper logs or dashboards. The main page names the owner, the symptom, the first check, the rollback path, and the customer-facing response if one is needed. Anything longer belongs in supporting documentation.",
    "This short format creates a useful discipline. If the team cannot express the failure mode in a few lines, the design is probably still unclear. If the rollback path takes a paragraph to explain, it is probably too fragile. If the owner is a group instead of a person, the incident will wait for consensus. Runbooks expose those weaknesses early.",
    "The first version should also include a review cadence. Incidents are not the only source of learning. Near misses, user overrides, high-cost runs, slow runs, and false refusals all deserve review. A weekly thirty-minute production review is often enough. The important thing is that someone looks at real behavior after launch and has the authority to change the system.",
    "Without that cadence, the runbook becomes a launch artifact instead of an operating tool.",
    "With it, the runbook stays alive.",
    "And the launch keeps improving.",
    "That is the real point of writing it early: it gives the team a living place to put operational learning before the stakes are high.",
  ],
  "what-poc-purgatory-actually-looks-like": [
    "## The shape of a stalled project",
    "> POC purgatory rarely looks broken. It looks almost done for months.",
    "The dangerous thing about a stalled agent project is that it continues to produce demos. Someone can always find an example where the agent performs well. The roadmap always has one more prompt pass, one more retrieval tweak, one more framework migration. The project does not fail loudly. It becomes difficult to explain why it has not launched. That is the signal to inspect the operating model, not the demo.",
    "## Five failure modes in more detail",
    "The prompt-as-codebase failure is not just too many prompts. It is the absence of reviewable behavior. If every improvement is a string edit with no eval delta, the team cannot tell whether it made the system better or merely different. The fix is to treat prompts as code-adjacent artifacts: versioned, reviewed, tested, and tied to examples.",
    "The orchestrator-of-the-month failure is a flight from product uncertainty. Teams rewrite orchestration because choosing a framework feels like progress. The harder work is defining states, retries, ownership, and what happens when tools fail. A simple state machine with clear recovery beats a sophisticated graph nobody can operate.",
    "The eval that does not disagree is worse than no eval because it creates false confidence. A useful eval should sometimes embarrass the team. It should catch regressions, expose weak categories, and make launches harder until the system deserves trust.",
    "The hidden cost ceiling appears when nobody knows the unit economics. The agent works in dev, then production traffic multiplies document length, retries, and tool calls. Suddenly the model bill is a product decision. Cost needs to be visible per workflow before launch.",
    "The unowned guardrail is the most common safety smell. There are filters, allowlists, redactors, and policy checks, but no owner and no test plan. Guardrails are product behavior. They need names, tests, and review cadence.",
    "## Audit questions we ask",
    "- What exact metric decides launch readiness?",
    "- Which eval examples currently fail, and who owns fixing them?",
    "- What is the rollback path for a bad autonomous action?",
    "- What does one production run cost at p50, p95, and worst case?",
    "- Which guardrail has an owner who can explain it without reading code?",
    "## How to get out",
    "Pick one workflow slice and make it boring. Freeze the framework. Build or repair the eval suite. Remove autonomous actions until the review path is trusted. Put cost and latency in the weekly update. Then launch the smallest version that creates real operational value. POC purgatory ends when the team stops optimizing the demo and starts operating the workflow.",
    "## The recovery plan",
    "The fastest recovery usually starts by shrinking scope. Pick one workflow, one input channel, one output, and one owner. If the current agent handles support, sales, and internal Q&A, choose the slice with the clearest eval. If the system has autonomous actions, turn them into reviewed drafts until the suite earns back trust. If the architecture has multiple orchestration paths, freeze one and delete the others from the launch path.",
    "Then build a brutally concrete launch checklist. The checklist should include the eval threshold, rollback path, cost budget, data retention rule, support owner, and post-launch review meeting. This sounds basic, but stalled projects often lack exactly these decisions. They have model experiments instead of operating agreements.",
    "### What to keep and what to discard",
    "- Keep examples from real users, even if the prototype is discarded.",
    "- Keep traces that explain failures.",
    "- Keep prompts only if they are tied to eval results.",
    "- Discard framework experiments that did not change outcomes.",
    "- Discard metrics nobody used to make a launch decision.",
    "## The honest test",
    "Ask the team to name the smallest version they would let run tomorrow with a human watching. If nobody can name it, the project is still too vague. If they can name it, build the guardrails around that version and launch a pilot. Momentum returns when real work starts flowing through the system, even at small scale.",
    "## The first seven days after rescue",
    "Day one is scope reduction. Day two is eval repair. Day three is tracing and cost visibility. Day four is removing autonomous actions that cannot be defended. Day five is running the rescued workflow against historical examples. Day six is a human-reviewed pilot. Day seven is the decision meeting: keep going, narrow further, or stop. This cadence is intentionally blunt. A stalled project needs evidence quickly.",
    "The goal is not to save every artifact. It is to save the useful learning. Once the team sees real inputs moving through a narrower workflow, the project becomes easier to reason about. The fear fades because the system is no longer a vague AI initiative. It is a concrete operation with owners, thresholds, and examples.",
    "That concreteness is what stalled projects are usually missing.",
    "Once it appears, the team can make real decisions again.",
  ],
};

function enrichPost(post: Post): Post {
  const body = [...post.body, ...(RICH_SECTIONS[post.slug] ?? [])];
  return {
    ...post,
    body,
    readMinutes: Math.max(post.readMinutes, Math.ceil(wordCount(body) / 200)),
  };
}

function wordCount(blocks: ReadonlyArray<string>): number {
  return blocks
    .join(" ")
    .replace(/[#>`.-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export async function getPosts(): Promise<ReadonlyArray<Post>> {
  // SUPABASE SEAM: replace with `supabase.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false })`.
  return POSTS.filter((p) => isPublished(p.publishedAt)).map(enrichPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  // SUPABASE SEAM: replace with `supabase.from("posts").select("*").eq("slug", slug).single()`.
  const post = POSTS.find((p) => p.slug === slug);
  return post && isPublished(post.publishedAt) ? enrichPost(post) : null;
}

function isPublished(iso: string): boolean {
  return new Date(`${iso}T00:00:00Z`).getTime() <= Date.now();
}
