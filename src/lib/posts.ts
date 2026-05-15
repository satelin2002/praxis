/**
 * Mock post data. The shape mirrors what we'll fetch from Supabase
 * (table: `posts`, see lib/supabase/* for the seam). When Supabase
 * is wired up, replace `getPosts` / `getPost` bodies with queries —
 * the shape and route components don't change.
 *
 * Body strings use a tiny markdown-marker convention parsed at render
 * time in /insights/[slug]/page.tsx:
 *   "## Heading"       → <h2>
 *   "### Subheading"   → <h3>
 *   "- list item"      → <li> (consecutive items batch into a <ul>)
 *   "> Quoted text"    → <blockquote>
 *   "anything else"    → <p>
 */

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  /** One-line problem statement — rendered as a Problem callout above the body. */
  problem: string;
  /** One-line solution statement — rendered as a Solution callout above the body. */
  solution: string;
  /** Optional hero image (lives in /public/blog/). 16:9 PNG/JPG recommended. */
  image?: string;
  body: ReadonlyArray<string>;
  publishedAt: string;
  readMinutes: number;
  tag: "Engineering" | "Production" | "Evals" | "Field notes" | "Case study";
}

const POSTS: ReadonlyArray<Post> = [
  // ───────── most recent ─────────
  {
    slug: "hvac-missed-lead-patterns",
    title:
      "5 patterns I keep seeing in HVAC missed-lead handling",
    excerpt:
      "After looking at dozens of small-to-mid HVAC contractors — their Google profiles, websites, review patterns, the threads in r/hvacadvice — five missed-lead patterns show up so consistently I can predict them by company size. Ranked by how much money they cost, with a rough order to fix them in.",
    problem:
      "Most HVAC contractors lose meaningful revenue every week to a handful of fixable workflow gaps — and the gaps are invisible because the lost jobs never show up in any system the owner is looking at.",
    solution:
      "Five specific patterns, ranked by dollar impact: after-hours voicemail blackholes, 4+ hour web-form response, no qualification before dispatch, estimate follow-up that dies after the first send, and no review-request flow. Fix Pattern 1 first.",
    image: "/blog/hvac-missed-lead-patterns.png",
    publishedAt: "2026-05-15",
    readMinutes: 8,
    tag: "Field notes",
    body: [
      "## Why HVAC is fundamentally a phone-call business",
      "HVAC is a phone-call business. When a homeowner's AC fails on a 95-degree afternoon, the first contractor who answers — not the cheapest, not the one with the best reviews, not the one who shows up first on a Google ad — gets the job. The economic gravity of that fact shapes nearly every operational decision in a well-run shop, and the absence of it explains nearly every failure in a struggling one.",
      "Over the past several weeks I've spent time looking at small-to-mid HVAC contractors — their Google Business Profiles, their websites, their review patterns over the last 24 months, the recurring complaints in places like r/hvacadvice, the way they describe themselves on Facebook versus how their customers describe them. Five missed-lead patterns show up across nearly every shop. None of them are individually catastrophic. All five at once is.",
      "Here they are, ranked roughly in the order they cost the most money. If you only fix one thing in 2026, fix the first one.",

      "## Pattern 1: After-hours calls go to voicemail and never get returned",
      "This is the single largest source of missed revenue in nearly every HVAC business I've looked at, and it's also the most invisible. Here's the sequence. Customer's AC fails at 7pm after dinner. They Google a contractor and call. Office is closed. Call rolls to voicemail. Customer hangs up without leaving a message — because most customers don't bother with voicemail anymore — and calls the next contractor on the list. By morning the lead is gone and the original contractor doesn't even know they had it.",
      "The compounding part is that the most valuable leads are exactly the ones most likely to call after hours. A homeowner whose system is working doesn't think about HVAC. A homeowner whose system just failed on a hot day will call until somebody answers. Every minute they wait is one more contractor they'll try.",
      "The traditional fix is an answering service. Answering services solve part of the problem — somebody picks up — but they introduce two new failures. First, they take a message and pass it on, which means the contractor still has to call back the next morning, by which point the customer has often already booked someone else. Second, answering service operators aren't trained to triage urgency in the trade, so the contractor gets dispatched for low-value calls (filter changes, thermostat questions) while real emergencies (no cooling in a heatwave, gas smell, water damage from a leak) get the same routing as everything else.",
      "The newer fix is an AI receptionist that's actually built for the trade — answers every call 24/7, qualifies urgency in plain conversation, books non-emergency jobs directly into the contractor's real calendar, and texts the owner a summary with a callback recommendation when something is genuinely urgent. That sounds like marketing copy until you do the math. A typical 5-truck HVAC contractor missing 30% of after-hours calls at an average ticket size of $400, with roughly 15 after-hours calls per week, is missing $90K–$95K per year. That's the size of the prize on Pattern 1 alone.",

      "## Pattern 2: Web-form leads sit four-plus hours before first contact",
      "This one is subtler than the after-hours problem, but for any HVAC business spending real money on digital ads, it's almost as expensive. A homeowner fills out the \"Get a quote\" form on the contractor's website. The form lands in an `info@` inbox or a CRM that someone checks \"when they have a minute.\" First contact happens four to six hours later. By then, the homeowner has filled out the same form on two or three other contractor sites and is already in a quote-comparison conversation with whoever responded first.",
      "The research on this is consistent across industries — response time to inbound leads has more impact on conversion than nearly any other variable. A 5-minute first response converts roughly 7x better than a 1-hour response. Most HVAC businesses live at 4+ hours.",
      "The reason isn't lack of caring; it's that the dispatcher who would respond to these leads is also answering the phone, scheduling techs, taking payments, ordering parts, and handling the cancellation that just came in. The web form gets the lowest priority in a queue where every priority is urgent.",
      "The automation answer here is unglamorous and effective. The form submits, the homeowner gets a personalized text or email within 60 seconds confirming receipt and asking three quick qualification questions about the unit, the issue, and their schedule. They feel heard. The dispatcher then opens a queue of pre-qualified leads with relevant info already gathered, instead of cold-calling a list of contact forms. The conversion lift comes from the 60-second acknowledgment, not from anything sophisticated downstream.",

      "## Pattern 3: No qualification before dispatch — techs sent out on low-value jobs",
      "The third pattern is where good contractors lose money even when they don't lose leads. A call comes in. Dispatcher books a tech. Tech drives 40 minutes to find out it's a $40 filter replacement or a thermostat battery. The full hour of tech time plus truck cost is now sunk on a job that doesn't justify it.",
      "Most HVAC contractors don't have qualification because qualification feels like turning away customers. But there's a meaningful difference between turning a customer away and routing them to the right kind of service. A homeowner who needs a filter change and doesn't know it should still be served — just by a five-minute phone walkthrough or a clearly-priced $25 diagnostic service-call, not by an unscheduled $200 truck roll.",
      "The pattern that fixes this is a short, conversational qualification before dispatch — usually via text or chat, ideally automated for the first pass. Three questions: what is the unit doing or not doing, what year is the equipment, and what's the zip code. Those three answers route 80% of incoming jobs correctly without a human dispatcher needing to think about them, and they surface the actual emergencies so a human can confirm them before a truck rolls.",

      "## Pattern 4: Estimate follow-up dies after the first send",
      "The fourth pattern: contractor gives an estimate. Either in person, or by email, or by text. Homeowner says \"thanks, we'll get back to you.\" The estimate gets logged in QuickBooks or stays open in a ServiceTitan deal. And then nothing happens. No follow-up at 24 hours. No follow-up at 3 days. No follow-up at 7 days.",
      "Why? Two reasons. First, follow-up feels pushy. Owners don't want to seem desperate. Second, follow-up requires a system, and most small contractors run on memory plus a spreadsheet. The estimate goes out, the owner has good intentions, and then three new fires demand attention and the estimate fades.",
      "The homeowner's actual decision-making timeline is usually 3 to 10 days. They get two or three estimates, compare prices, ask their spouse or partner, maybe check reviews, and then decide. The contractor who reaches out at 24 hours (just to confirm receipt and answer any questions), again at 3 days (a light check-in), and once more at 7 days (a final \"thinking of going another direction or want to talk\" note) closes meaningfully more deals — because they were present at the moment the homeowner was actually deciding, and the silent contractors weren't.",
      "This is the easiest of the five patterns to fix because it doesn't require AI or any sophisticated tech. A simple email cadence in any tool, or a job-status trigger in Jobber / ServiceTitan / Housecall Pro, solves 80% of the gap. The only reason it stays broken is that the contractor doesn't see the lost deals — they just see the deals they won, and assume the rest were going to say no anyway.",

      "## Pattern 5: No review-request flow after job completion",
      "The fifth pattern is the one that compounds over years and quietly kills the top of the funnel. Contractor completes a job. Customer is happy. Contractor moves on to the next job. Nobody ever asks the customer to leave a review.",
      "Three or six months later, the contractor checks Google and notices they haven't gotten a new review in months. Their competitor down the street has added 40 new reviews in the same period. The competitor isn't doing better work — they're just asking.",
      "The owners I've seen do this right have one consistent habit: an automated text or email goes out within 24 hours of job completion, with a direct link to their Google Business Profile (or Yelp, or wherever they want the review). The text is short, polite, optional. About 30 to 40% of customers leave a review when asked this way — versus less than 5% who do it unprompted.",
      "The compound effect is enormous. A contractor with 200 reviews ranks meaningfully better on Google Maps than one with 40, all else equal. The 200-review contractor gets more inbound leads. They charge more because they look more established. The gap compounds every year, and the contractors who started asking three years ago are now uncatchable on the basis of social proof alone.",

      "## The compound effect, with rough math",
      "None of these five patterns is fatal on its own. A business can survive missing 30% of after-hours calls if its daytime conversion is strong. It can survive slow web-form response if it has enough word-of-mouth referrals. It can survive no review-request flow if its existing reviews are already great.",
      "What kills small HVAC businesses is having all five patterns at once. Most do.",
      "Rough compound math, for a hypothetical 5-truck HVAC contractor doing $1.5M in revenue:",
      "- ~$90K/year lost to after-hours miss (Pattern 1)",
      "- $30K–$80K/year of underperforming digital ad spend due to slow web-form response (Pattern 2)",
      "- ~$15K/year of wasted truck time on jobs that didn't need a truck (Pattern 3)",
      "- 10–15% of pipeline lost to dead estimate follow-up — typically $50K–$150K/year (Pattern 4)",
      "- A slowly-eroding top-of-funnel that compounds annually (Pattern 5)",
      "You don't have to believe my exact numbers. Pick any of the five, audit it for a single week, and the gap is usually self-evident in the call log or the Google Business Profile metrics.",

      "## Where to start",
      "If you only fix one of these in 2026, fix Pattern 1 — after-hours calls. It's the biggest dollar amount, the most visible to your customer (they can tell when you didn't pick up), and the fix is concrete enough to demonstrate ROI inside a month. You can see the missed calls in your phone log, you can count them, and you can attach a number to them.",
      "If you're going to fix more than one, the order I'd recommend by revenue impact is: 1 (after-hours), 4 (estimate follow-up), 5 (review request), 2 (web-form response), 3 (qualification). The first three are essentially free-money fixes for a business that already has decent daytime operations.",
      "Pattern 4 is the most underrated. It's the easiest of the five to implement and the one that produces the fastest revenue lift, because every estimate you've sent in the last 30 days is still recoverable if you reach out today.",

      "## A 15-minute self-audit",
      "If you want a quick read on which of these patterns is costing your business the most, do this audit yourself before the end of the week:",
      "- Pull your call log for the last 7 days. Count how many calls came in between 6pm and 8am and on weekends. Of those, how many show a returned call within 4 hours? That's Pattern 1.",
      "- Pull your last 20 web-form submissions. What's the timestamp between submission and first outreach? Anything over 30 minutes is Pattern 2 territory.",
      "- Pull your last 10 truck-rolls. How many turned into a billable repair versus a diagnostic-only? Anything below 80% conversion suggests Pattern 3.",
      "- Pull your last 15 estimates. For each, what was your second touch? If the answer for most is \"there wasn't one,\" that's Pattern 4.",
      "- Open your Google Business Profile. How many reviews in the last 90 days? Divide by jobs completed. If you're under 15%, that's Pattern 5.",
      "The audit takes 15 to 20 minutes. The answers tell you exactly which pattern is costing you the most right now.",
    ],
  },

  {
    slug: "hvac-estimate-followup-cadence",
    title:
      "The follow-up cadence that closes HVAC estimates (and why most contractors don't run one)",
    excerpt:
      "Most HVAC estimates die not because the homeowner picked a competitor but because nobody followed up. Here's the three-touch cadence that actually closes — what to send, when to send it, and the one thing to never do.",
    problem:
      "Estimates go out, then die in silence. Owners assume the homeowner picked someone cheaper. The actual reason is usually that nobody else followed up either, and the homeowner just stalled.",
    solution:
      "A three-touch cadence — 24 hours, 3 days, 7 days — each with a different purpose and tone. Stop selling, start showing up. The contractor who's present when the homeowner is actually deciding usually wins.",
    image: "/blog/hvac-estimate-followup-cadence.png",
    publishedAt: "2026-05-15",
    readMinutes: 7,
    tag: "Field notes",
    body: [
      "## Why estimates go cold (and why it's almost never the price)",
      "Most HVAC owners I talk to assume their estimates die because a competitor came in cheaper. Sometimes that's true. Most of the time it isn't.",
      "What actually happens: the homeowner gets two or three estimates. They pick the one they feel best about, which is usually the contractor who seemed most responsive, most professional in their follow-through, and most present during the decision-making window. Price is a tiebreaker, not the primary signal.",
      "The contractors I've watched run the trades for a long time figured this out years ago. They don't compete on price — they compete on attention. The estimate isn't the close; the estimate is the start of a 3-to-10-day conversation that ends with a yes or a no.",
      "Most contractors don't run that conversation. They send the estimate. They wait. They get ghosted. They blame the price.",

      "## The actual buyer's decision timeline",
      "Here's how a typical homeowner actually makes the decision after they receive your estimate. The timeline varies but the rhythm doesn't:",
      "- **Day 0 (estimate sent):** Homeowner glances at it. Maybe reads it carefully, more often skims. Saves it in their email.",
      "- **Day 1–2:** They're getting other estimates. Yours is sitting in a pile of two or three. They mentally rank them on price + gut feel.",
      "- **Day 3–5:** Real decision window. They're talking to their spouse / partner. They might read the reviews on your Google Business Profile. They might ask a friend whose HVAC was installed recently.",
      "- **Day 5–7:** Decision is made. They book someone. The ones they didn't book don't get a callback — they just go silent.",
      "- **Day 7+:** Either the job has started or the project is on indefinite hold. After 7 days, you've usually lost the deal.",
      "The point of this timeline is that **the decision is being made on Days 3–5**, not on Day 0 when you sent the estimate. If your only contact was the estimate itself, you're not even in the conversation at the moment the homeowner is actually choosing.",

      "## The three-touch cadence",
      "Three follow-ups, each with a different purpose. Total time investment per estimate: under 10 minutes spread across a week if you do it by hand, zero minutes if it's automated.",

      "### Touch 1: 24-hour check-in",
      "Purpose: confirm they received it and answer any questions while the estimate is fresh.",
      "What to send: a short text or email. Casual. Not pushy. Something like:",
      "> Hey [Name] — just wanted to make sure the estimate came through OK. Happy to walk through any of it on the phone if anything's unclear. No rush.",
      "Why this works: it shows up as a human moment, not a sales push. About 20% of homeowners will reply with a real question (which is gold — they're engaged enough to ask). The other 80% will think \"good, this contractor follows up — that's a good sign\" and not respond, which is fine. You've planted the seed.",
      "What NOT to do at this stage: don't ask for the close, don't push urgency, don't mention price or discounts. The 24-hour touch is purely a presence signal.",

      "### Touch 2: 3-day check-in",
      "Purpose: be present during the actual decision window.",
      "What to send: slightly more substantive. Reference something specific to their job that demonstrates you remember them.",
      "> Hey [Name] — circling back on the [type of system / specific issue] estimate. A lot of homeowners ask me at this point about [common decision point — financing, brand selection, timing, warranty]. Happy to talk through any of that whenever's good for you.",
      "Why this works: it positions you as the helpful expert at the exact moment they're making a decision. Roughly 30% of homeowners will respond to this one, and a meaningful percentage of those will book.",
      "What NOT to do: don't drop the price, don't say \"have you decided yet,\" don't make it about closing. Make it about helping them decide — which is a different posture and they can feel the difference.",

      "### Touch 3: 7-day final check-in",
      "Purpose: catch the homeowner who got distracted, plus close the loop cleanly on the ones who chose someone else.",
      "What to send: warm, short, and easy to reply to in either direction.",
      "> Hey [Name] — last note from me on the [system] project. Totally OK if you've gone another direction; if so, no need to reply. If you're still thinking it through and want to chat, I'm around this week.",
      "Why this works: the explicit \"no need to reply if you've gone another direction\" removes the social friction that keeps homeowners from responding. About 15-20% will respond — some to book, some to politely close the door (which is also useful because now you know).",
      "Most contractors never reach this touch. The ones who do close more deals than they realize.",

      "## What to never do",
      "Three patterns that look like follow-up but actively hurt your close rate:",
      "- **Calling instead of texting/emailing.** Cold calls feel pushy. The homeowner doesn't owe you a conversation. Text and email respect their pace and convert better at every touch in this cadence.",
      "- **Dropping the price.** \"I can do $200 off if you book by Friday.\" Once you do this, you've trained the customer that your original price was fake. You also lose the contractors-who-don't-discount market segment, which is exactly the segment that pays full margin.",
      "- **More than three touches in a week.** Touch 4, 5, 6 cross from \"professional follow-up\" into \"annoying.\" Three touches is the right number. After Day 7, leave them alone unless they reach out.",
      "There's a fourth one worth mentioning: don't make the follow-ups feel templated. The whole point is the homeowner feels you remembered them specifically. Reference their actual system, their actual issue, their actual conversation. Five seconds of personalization beats any amount of cleverness in the template.",

      "## Setting up the cadence: manual vs. automated",
      "Three options, from cheapest to most polished.",
      "### Option 1: Manual reminders in your CRM",
      "If you use Jobber, ServiceTitan, Housecall Pro, or even just QuickBooks, set a recurring reminder on every new estimate: 24 hours, 3 days, 7 days. Write the touches by hand. Total time per estimate: 5–10 minutes spread across a week. Effective, sustainable for under ~20 estimates a month.",
      "### Option 2: Email automation tool",
      "ConvertKit, Mailchimp, ActiveCampaign — any of them can run a 3-touch sequence triggered when you tag an estimate as \"sent.\" You still personalize the first message of each touch; the tool handles the timing. Works well up to maybe 100 estimates a month.",
      "### Option 3: Workflow automation",
      "What we build at Workflow Crew. Estimate goes out, our system automatically schedules the three touches, drafts them with the homeowner's specifics pulled from your CRM, queues them for your approval the morning of each send. You can edit any of them before they go out. Once you trust the cadence, you can flip it to autopilot. Works at any volume.",
      "All three of these are better than not following up. The biggest revenue lift is not from picking the most sophisticated option — it's from going from zero follow-ups to one follow-up. Start there. Upgrade the tool when you outgrow it.",

      "## The math on what this costs you not to run",
      "Rough numbers for a contractor sending 30 estimates a month.",
      "- Industry-average close rate on estimates without follow-up: 25–35%.",
      "- Industry-average close rate on estimates with a 3-touch cadence: 40–50%.",
      "- Delta: 5–15 additional closed jobs per month.",
      "- At an average residential HVAC job size of $5,000–$8,000, that's $25K–$120K per month in recovered revenue.",
      "You don't have to believe the high end of that range. Believe the low end. The math still works.",

      "## One last thing",
      "Estimate follow-up is the lowest-effort, highest-leverage workflow in HVAC. It doesn't require AI. It doesn't require new software. It doesn't require hiring anyone. It just requires showing up at 24 hours, 3 days, and 7 days with a short, human message that says \"hey, I remember you, happy to help when you're ready.\"",
      "Start tomorrow. Pull your last 10 estimates. Send a 24-hour, 3-day, or 7-day touch to each one depending on where they are in the timeline. Some will close just from that single nudge. That's data on what this cadence is worth, with zero new tools and zero new hires.",
    ],
  },

  {
    slug: "hvac-inbox-audit-15-minutes",
    title:
      "Auditing your own HVAC inbox in 15 minutes: 4 signals you're losing jobs",
    excerpt:
      "Most HVAC owners have never actually audited their own inbox. They run on intuition: \"we get most of the leads we should be getting.\" Usually they don't. Here are four signals that show up in any contractor's inbox + phone log and the rough dollar value attached to each.",
    problem:
      "Owners who haven't audited their inbox in years assume they're capturing most of their incoming demand. The dollar value of what's leaking is usually 2–5x what they'd guess.",
    solution:
      "A 15-minute self-audit that surfaces the four most common gaps: voicemails with no callback logged, stale web-form submissions, quotes that died without follow-up, and customer complaints about response time hiding in your Google reviews. With dollar values attached.",
    image: "/blog/hvac-inbox-audit.png",
    publishedAt: "2026-05-15",
    readMinutes: 7,
    tag: "Field notes",
    body: [
      "## Why this audit is worth 15 minutes of your week",
      "Most HVAC owners I talk to have never sat down and actually audited their own inbox. They run on intuition: \"we get most of the leads we should be getting.\" When I ask them to walk me through a specific week's call log + email + Google Business Profile inbox, the answers usually shift inside five minutes.",
      "Not because the owner is wrong about the business overall — most of them have good gut feel for revenue and pipeline. But intuition is shaped by what you see in your active customers, not by what you're missing. Missed-lead patterns are silent by definition. They don't show up in your books, they don't trigger any alerts, and the customers you didn't serve never tell you.",
      "The audit below takes 15 to 20 minutes. The four signals it surfaces tell you which of your inbound channels is leaking the most money. Once you know that, you can fix the largest gap first instead of doing five things that might individually move the needle.",

      "## Before you start: what to have open",
      "You need three things accessible:",
      "- **Your phone log for the last 7 days.** From your business phone — landline, VoIP, RingCentral, whatever you use. You want the timestamps, not just the numbers.",
      "- **Your web-form submissions for the last 30 days.** Whatever shows up when someone fills out the \"Get a quote\" form on your site. If it lands in an `info@` email inbox, open that. If it goes to a CRM (ServiceTitan, Jobber, Housecall Pro), open the Leads tab.",
      "- **Your Google Business Profile, with reviews sorted by most recent.** Twelve months of reviews is enough.",
      "Roughly 15 minutes. Read down each signal below and check the corresponding source. Each signal has a rough dollar value attached so you can compare them.",

      "## Signal 1: Voicemails without a callback logged",
      "Open your phone log. Find every inbound call from the last 7 days that went to voicemail. Now check whether each one shows a follow-up outbound call from your team within 4 hours.",
      "What you're looking for: voicemails that never got a callback at all, or got one the next morning.",
      "What it means: every one of those is a customer who probably called the next contractor on Google after they hung up. Most modern homeowners don't leave voicemails — they just try the next number. So the count of unreturned voicemails is the LOW estimate of missed calls. Add roughly 2x for the calls that came in, rolled to voicemail, and the caller hung up without leaving anything.",
      "**Rough dollar value:** for a typical residential HVAC contractor, every missed inbound call is worth $300–$500 in expected revenue (most calls during business hours convert at 25–40% if answered live, at an average residential ticket of $1,000–$2,000). A contractor with 5 unreturned voicemails per week is missing $7,800–$13,000/month at the low estimate, $15K–$25K/month at the more realistic estimate.",
      "**Where this happens:** almost always after-hours, weekends, and during lunch — when the dispatcher is busy or off. The fix is straightforward: an answering service for the cheap version, or an AI receptionist that actually qualifies the call and books appointments for the better version.",

      "## Signal 2: Web-form submissions older than 24 hours, unread or unactioned",
      "Open your `info@` inbox (or wherever your web forms land). Sort by date. Scroll back 30 days. Count every web-form submission with no outbound reply timestamp.",
      "What it means: every one of those is a homeowner who took the active step of filling out your form — which is high-intent behavior — and got zero response from your business. Almost all of them filled out forms on two or three competitor sites that same day. The first contractor to respond won the conversation.",
      "**Rough dollar value:** web-form leads convert at 7–10x higher when responded to in under 5 minutes versus over an hour. For a contractor with any digital ad spend, slow response is silently halving the effectiveness of every ad dollar. If you're spending $2K/month on Google Ads driving form submissions and responding in 4+ hours, you're effectively spending $1K of that wasted.",
      "**Where this happens:** any inbox that isn't somebody's primary inbox. If your web forms route to `info@` or `quotes@` or a CRM tab, they get the lowest-priority attention. They should be triggering an SMS/email to the dispatcher within 60 seconds, and (better) auto-acknowledging the customer with a templated reply in the same window.",

      "## Signal 3: Estimates sent without a follow-up trail",
      "Open your most recent 15–20 estimates. For each, look at what happened after the estimate was sent.",
      "Three states you'll find:",
      "- **Closed (booked the job):** good. Move on.",
      "- **Lost to a competitor (customer said so):** also fine — at least you know.",
      "- **Silent (no response, no follow-up from you):** this is the problem state.",
      "What you're counting: how many of your estimates went silent without any follow-up from your team. Industry-wide, most contractors leave 60–80% of their estimates in this silent state. They blame the silence on \"the customer went with somebody cheaper\" — but they don't actually know that. They never asked.",
      "**Rough dollar value:** the contractor who runs even a single follow-up message at 3 days closes roughly 30–50% more of their pipeline than the contractor who doesn't. For a contractor sending 25 estimates a month at $4,000 average residential ticket, that's $30K–$50K per month in revenue you're leaving on the table.",
      "**Where this happens:** the gap between \"estimate sent\" and \"job booked\" in nearly every CRM. There's almost never an automatic system that triggers follow-up. Manual reminders work if you have under 20 estimates a month; automated workflows are necessary above that volume.",
      "(For the actual cadence I recommend, see the companion post on the three-touch follow-up.)",

      "## Signal 4: Response-time complaints in your Google reviews",
      "Open your Google Business Profile. Sort reviews by most recent. Look at the 1-star and 2-star reviews from the last 12 months.",
      "What you're scanning for: complaints that mention any of these phrases:",
      "- \"Took forever to call back\"",
      "- \"Never got back to me\"",
      "- \"Had to call multiple times\"",
      "- \"No one answered\"",
      "- \"Voicemail full\"",
      "- \"Form on the website didn't work / no one responded\"",
      "Even one such review in the last 12 months is meaningful. Three or more is a strong signal that your inbound capture has a chronic gap that customers are publicly documenting.",
      "**Rough dollar value:** this one is harder to quantify but probably the biggest of the four. Every 1-star or 2-star review on your Google profile costs you future leads forever. Prospective customers read the bad reviews before deciding to call you. A contractor with 4.6 stars + 30 reviews gets meaningfully fewer leads than one with 4.8 stars + 30 reviews, all else equal — and the gap compounds as both contractors accumulate more reviews over time.",
      "**The hidden value of this signal:** if customers are documenting your response-time problem in public, your *competitors* are seeing it too. They use it. \"We always pick up the phone\" is a competitive position you can't take if there are reviews that say you don't.",

      "## Adding it up",
      "Add the four rough dollar values you found, even at the low end. For a typical residential HVAC contractor, the total usually lands in the $40K–$80K per month range. Many of the contractors I look at are above that.",
      "You don't have to believe the numbers. The point of the audit is to surface the *signals* — the specific voicemails, the specific forms, the specific estimates, the specific complaints — so you can put faces and dollar amounts on what was previously invisible.",

      "## Quick fixes you can deploy this week",
      "Each signal has a corresponding fix that doesn't require any new technology to start with:",
      "- **Signal 1 (voicemails):** every voicemail in your inbox right now should get a callback by the end of today, regardless of how old it is. Yes, some of them are too old to recover. Some aren't. Then put a hard rule in place: every voicemail gets a callback within 2 hours during business hours.",
      "- **Signal 2 (web forms):** add an auto-reply to whichever inbox receives them. Even a templated \"Thanks for reaching out, [name from dispatcher] will be in touch within an hour\" is a 10x improvement over silence. Then enforce the 1-hour SLA internally.",
      "- **Signal 3 (estimate follow-up):** pick your 5 oldest open estimates and send a 1-line follow-up text to each one today. Some will close. That's data on what this workflow is worth at zero new investment.",
      "- **Signal 4 (response-time reviews):** publicly respond to every existing 1-star and 2-star review that mentions response time. Briefly, professionally, with a real apology and an offer to make it right. Future customers reading your reviews see your response, not just the complaint.",
      "None of these fixes are the long-term answer. The long-term answer is automation that handles all four signals systematically without requiring the owner to remember. But the manual fixes above will move the needle this week — and they tell you whether the automated version is worth investing in.",

      "## Closing",
      "If you ran the audit and want to talk through what you found, book a free 15-minute call. Bring your numbers — I'll tell you which of the four signals to fix first based on what your inbox actually shows, and what the workflow to fix it would look like for your business specifically.",
      "If you didn't run the audit and got here from skimming, scroll back up. The whole post is 15 minutes of your time invested in figuring out where the largest gap in your business currently is. Worth it.",
    ],
  },
];

export async function getPosts(): Promise<ReadonlyArray<Post>> {
  return [...POSTS].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  return POSTS.find((p) => p.slug === slug) ?? null;
}
