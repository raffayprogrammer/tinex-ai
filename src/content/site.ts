/**
 * Single source of truth for every word and number on the site.
 * Figures trace to "Tinex.AI — Business Plan" (Aug 2026). Where the plan cites a
 * source, the `source` field records it so nothing on the page is unattributable.
 *
 * VERIFY BEFORE LAUNCH: agent `status` values and the `references` client names.
 */

export const site = {
  name: "Tinex.AI",
  domain: "tinex.ai",
  tagline: "Hire the function. Skip the person.",
  description:
    "Tinex.AI rents named AI employees to landscaping and hardscaping contractors — answering calls, writing estimates, chasing invoices — for about a tenth of what an office hire costs.",
} as const;

/* ------------------------------------------------------------------ */
/* Hero — three rotating states, each keyed to one acute owner pain    */
/* ------------------------------------------------------------------ */

export const heroStates = [
  {
    id: "calls",
    eyebrow: "Maya · Customer Service",
    headline: "The phone rang<em>during the bid walk</em>",
    lede: "So it went to voicemail, and the homeowner called the next company on the list. Maya answers every call, at any hour, and books the appointment before you have put your tape measure down.",
    stat: { value: "24/7", label: "Answered, including Sunday" },
  },
  {
    id: "estimates",
    eyebrow: "Eli · AI Estimator",
    headline: "The estimate went out<em>three days late</em>",
    lede: "By then the patio job was gone. Eli gathers the job details on the call, assembles the estimate the same day, and puts it in front of you to approve.",
    stat: { value: "Same day", label: "Estimate turnaround" },
  },
  {
    id: "invoices",
    eyebrow: "Rex · CRM Manager",
    headline: "That invoice has been open<em>for three weeks</em>",
    lede: "You have been avoiding the call. Rex has not. It works the AR list, chases the renewals, and warms the leads that went cold while you were on a mower.",
    stat: { value: "Every one", label: "Invoice followed up" },
  },
] as const;

/* ------------------------------------------------------------------ */
/* The labor anchor — the plan's single most important sales device    */
/* "Never quote a price without the labor comparison beside it."       */
/* ------------------------------------------------------------------ */

export const laborAnchor = {
  kicker: "The comparison that matters",
  heading: "You are not comparing us to software. You are comparing us to a hire.",
  body: "A receptionist costs $48,000 to $78,000 in their first year against a median base wage of $37,230, because benefits alone run about 29.8% of total compensation. And you still have to recruit them, train them, cover them when they are sick, and replace them when they quit.",
  source: "US Bureau of Labor Statistics — Receptionists; BLS Employer Costs for Employee Compensation",
  bars: [
    {
      label: "Office hire, fully loaded",
      sub: "Wage, benefits, payroll tax, PTO",
      value: 6500,
      display: "$4,000–$6,500",
      unit: "/mo",
      tone: "clay" as const,
    },
    {
      label: "Human answering service",
      sub: "Abby Connect, 500 minutes",
      value: 1380,
      display: "$1,380",
      unit: "/mo",
      tone: "muted" as const,
    },
    {
      label: "Tinex Starter Duo",
      sub: "Two agents, 1,750 minutes, Agent Manager",
      value: 797,
      display: "$797",
      unit: "/mo",
      tone: "brass" as const,
    },
  ],
  footnote:
    "They never quit, never call in sick, and do not need a desk. What they do need is someone to set them up properly — which is why every plan includes one.",
} as const;

/* ------------------------------------------------------------------ */
/* The roster — ordered by production readiness, per the plan          */
/* ------------------------------------------------------------------ */

export type AgentStatus = "Available now" | "Early access" | "Joining soon";

export const roster = [
  {
    name: "Maya",
    role: "Customer Service",
    status: "Available now" as AgentStatus,
    does: "Answers calls and chats, provides service info, books appointments straight onto the calendar.",
    pain: "Missed calls are lost jobs",
    shift: "Nights, weekends, and every hour you are on site",
  },
  {
    name: "Eli",
    role: "AI Estimator",
    status: "Available now" as AgentStatus,
    does: "Gathers job details, builds the estimate, preps it for your approval before the day is out.",
    pain: "Estimates going out days late",
    shift: "Same-day turnaround on every enquiry",
  },
  {
    name: "Jake",
    role: "Job Manager",
    status: "Available now" as AgentStatus,
    does: "Schedules crews, tracks jobs in progress, and tells the customer when the truck is arriving.",
    pain: "Customers calling to ask where the crew is",
    shift: "From dispatch to sign-off",
  },
  {
    name: "Rex",
    role: "CRM Manager",
    status: "Available now" as AgentStatus,
    does: "Manages the pipeline, chases unpaid invoices, and tracks renewals before they lapse.",
    pain: "Unpaid AR and leads gone cold",
    shift: "Every open invoice, every week",
  },
  {
    name: "Ace",
    role: "Chief of Staff",
    status: "Early access" as AgentStatus,
    does: "Runs your calendar and delegates between the other agents so the work moves without you in the middle.",
    pain: "The owner is the bottleneck",
    shift: "Orchestrates the whole roster",
  },
  {
    name: "Nova",
    role: "Marketing Manager",
    status: "Joining soon" as AgentStatus,
    does: "Runs the ads, posts the social content, and researches what is winning in your market.",
    pain: "No time for marketing",
    shift: "Always-on, seasonally aware",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Hiring sequence — genuinely ordered, so it is genuinely numbered    */
/* ------------------------------------------------------------------ */

export const steps = [
  {
    n: "01",
    title: "Pick who you are hiring",
    body: "Start with the pain that is costing you most. Most owners begin with Maya and Eli — the missed call and the late estimate — because those two are where the money is leaking fastest.",
    note: "One conversation · no procurement process",
  },
  {
    n: "02",
    title: "Your Agent Manager sets them up",
    body: "A real person learns your services, your pricing, your service area and how you like the phone answered, then builds it into the agents. You are not handed a configuration screen and left to it.",
    note: "Included in every plan · reachable afterwards",
  },
  {
    n: "03",
    title: "They start on Monday",
    body: "Calls get answered, estimates get written, invoices get chased. Your Agent Manager stays on the account, reviews transcripts with you, and tunes as your season changes.",
    note: "Month to month · 15% off annual",
  },
] as const;

/* ------------------------------------------------------------------ */
/* The Agent Manager — the actual moat                                 */
/* ------------------------------------------------------------------ */

export const agentManager = {
  kicker: "Why this works when the last tool did not",
  heading: "Every plan comes with a human whose job is making it work.",
  body: "Most AI tooling fails the small contractor at exactly the same point: the software is fine, and nobody ever finishes setting it up. Your Agent Manager does the setup, listens to the calls, fixes what is off, and stays reachable by phone.",
  points: [
    {
      title: "They learn your business, not a template",
      body: "What a paver patio bid actually needs. What your spring cleanup includes. Which questions to ask about drainage. What you charge per yard of mulch.",
    },
    {
      title: "They review the work",
      body: "Call transcripts and estimates get checked against how you would have handled it, and the agents get corrected. This is the part a $99 add-on cannot afford to include.",
    },
    {
      title: "They are there in season",
      body: "March through October is when this has to hold up. Your Agent Manager knows the calendar you are working to and scales the roster with it.",
    },
  ],
} as const;

/* ------------------------------------------------------------------ */
/* NeighborReach                                                       */
/* ------------------------------------------------------------------ */

export const neighborReach = {
  kicker: "NeighborReach.vip",
  heading: "The best lead you will get this week lives four doors down.",
  body: "You already know neighborhood farming works — you just never get round to the mailing. NeighborReach watches for Jake marking a job complete, then puts a postcard in front of the houses around it. Post-job radius mailings run 3–5% response against a 4.4% direct-mail average.",
  price: { access: "$99", per: "$1.15" },
  bullets: [
    "Fires automatically when the job is marked done — nothing for you to remember",
    "Your truck, your crew, your finished patio on the card",
    "Postage priced per piece, with USPS rate changes passed straight through",
  ],
  source: "USPS Every Door Direct Mail; Lob and Poplar published pricing",
} as const;

/* ------------------------------------------------------------------ */
/* Pricing — the four-rung ladder, metered                             */
/* ------------------------------------------------------------------ */

export const ANNUAL_DISCOUNT = 0.15;
export const OVERAGE_PER_MIN = "$0.35";

export const tiers = [
  {
    name: "Single Agent",
    monthly: 497,
    setup: "$299 setup",
    purpose: "One acute pain, solved properly",
    minutes: "1,000 minutes",
    features: [
      "Any one agent from the roster",
      "1,000 included minutes per month",
      "Dedicated Agent Manager",
      "Call recording and transcripts",
    ],
    featured: false,
  },
  {
    name: "Starter Duo",
    monthly: 797,
    setup: "$499 setup",
    purpose: "Where most owners start",
    minutes: "1,750 minutes",
    features: [
      "Any two agents — usually Maya and Eli",
      "1,750 included minutes per month",
      "Dedicated Agent Manager",
      "Handoff between the two agents",
    ],
    featured: true,
  },
  {
    name: "Core Four",
    monthly: 1497,
    setup: "$799 setup",
    purpose: "The front office, covered",
    minutes: "3,500 minutes",
    features: [
      "Maya, Eli, Jake and Rex",
      "Ace orchestration across all four",
      "3,500 included minutes per month",
      "Priority Agent Manager access",
    ],
    featured: false,
  },
  {
    name: "Full Team",
    monthly: 2497,
    setup: "$997 setup",
    purpose: "Everyone, plus an operator",
    minutes: "Unlimited, fair use",
    features: [
      "All six agents including Nova",
      "Virtual AI Operator running the roster",
      "Unlimited minutes within fair use",
      "Named Agent Manager and quarterly review",
    ],
    featured: false,
  },
] as const;

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    q: "Jobber sells an AI receptionist for $99. Why is this $497?",
    a: "Because it is not the same purchase. A $99 add-on answers the phone. Eli writes an actual estimate, Rex works an actual receivables list, and Ace hands work between them — multi-step jobs across your systems, not a single call script. And every Tinex plan includes a human Agent Manager who sets it all up and stays reachable, which is the one thing a $99 product structurally cannot pay for. If all you need is the phone answered, Jobber is genuinely the cheaper answer and we will tell you so.",
  },
  {
    q: "What happens if I go over my minutes?",
    a: `Overage runs at ${OVERAGE_PER_MIN} per minute and appears on your invoice as its own line. We publish the allowance up front rather than selling "unlimited" and then quietly rate-limiting you in July, which is when you need it most. If you are consistently over, your Agent Manager will move you up a tier — it is cheaper for you.`,
  },
  {
    q: "Do I have to leave Jobber or Housecall Pro?",
    a: "No. The agents work alongside your field service software rather than replacing it. Keep your scheduling and invoicing where your crews already know to look for it.",
  },
  {
    q: "Will my customers know they are talking to an AI?",
    a: "Yes, always. Every agent identifies itself as AI at the start of the call and announces that the call is recorded, before anything else happens. That is a legal requirement in a growing number of states and it is also just the right way to run it — homeowners react badly to finding out afterwards.",
  },
  {
    q: "How long does setup take, and what do you need from me?",
    a: "Roughly a week from signature, and about two hours of your time in total. Your Agent Manager needs your service list and pricing, your service area, a few recordings or notes on how you like calls handled, and access to wherever your jobs live.",
  },
  {
    q: "What if it does not work out?",
    a: "Plans are month to month. Annual prepay saves 15% and suits most operators better because it lands in the off-season, but it is not required and we would rather you started monthly than not at all.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Market proof                                                        */
/* ------------------------------------------------------------------ */

export const proof = [
  { figure: "77%", label: "of small businesses now use AI regularly", source: "Intuit QuickBooks, Jan 2026" },
  { figure: "726,565", label: "landscaping businesses in the US", source: "IBISWorld / Aspire" },
  { figure: "$500–$2,000", label: "reported monthly savings from AI, per SMB", source: "Thryv" },
] as const;

/* Reference clients named in the business plan.
   CONFIRM PERMISSION before this goes live. */
export const references = ["Show Me Mowers", "Blade to Blade", "Front Range Autmow"] as const;

export const nav = [
  { href: "#roster", label: "The roster" },
  { href: "#hiring", label: "How it works" },
  { href: "#neighborreach", label: "NeighborReach" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
] as const;
