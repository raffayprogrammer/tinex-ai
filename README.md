# Tinex.AI — landing site

Marketing site for Tinex.AI: named, pre-built AI employees that landscaping and
hardscaping contractors hire the way they'd hire a person.

Built from **Tinex.AI — Business Plan (Aug 2026)**. That document is the source of
truth for every claim, figure and price on the page.

- **Next.js 16.3** (App Router) · **React 19.2** · **Tailwind CSS v4** · TypeScript
- Zero runtime dependencies beyond React and Next — all motion is CSS + one small canvas
- Fully static: the whole page prerenders to HTML, so it's fast and indexable

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint, currently clean
```

---

## Deploying to Vercel

The site is a stock static Next.js app — no env vars, no external services, no
database. Vercel needs no configuration beyond the defaults.

**1. Push to GitHub**

```bash
git remote add origin https://github.com/<you>/tinex-landing.git
git branch -M main
git push -u origin main
```

**2. Import on Vercel**

Go to [vercel.com/new](https://vercel.com/new), pick the repo, and press Deploy.
Vercel auto-detects Next.js; leave every field as it comes.

| Setting          | Value                  |
| ---------------- | ---------------------- |
| Framework        | Next.js (auto)         |
| Build command    | `next build` (auto)    |
| Output directory | `.next` (auto)         |
| Install command  | `npm install` (auto)   |
| Environment vars | none                   |

**3. Point the domain at it**

In *Project → Settings → Domains*, add `tinex.ai` and `www.tinex.ai`. Vercel
prints the DNS records to set at your registrar.

After the domain is live, confirm `metadataBase` in
[`src/app/layout.tsx`](src/app/layout.tsx) still reads `https://tinex.ai` — it's
what makes Open Graph and Twitter card URLs absolute.

---

## Where the content lives

**Everything you'll want to change is in one file:
[`src/content/site.ts`](src/content/site.ts).** Copy, prices, the roster, the FAQ,
market figures and their sources all live there as typed constants. The components
render it; they don't hardcode it.

```
src/
  content/site.ts        ← all copy and numbers
  app/
    layout.tsx           fonts, metadata, <html>
    globals.css          design tokens + the motion primitives
    page.tsx             section order
  components/
    Nav.tsx              sticky pill nav, scroll spy
    Hero.tsx             three rotating pain states
    Atmosphere.tsx       canvas light behind the hero
    LaborAnchor.tsx      the human-vs-Tinex cost comparison
    Roster.tsx           the six agents
    Hiring.tsx           three steps + the Agent Manager
    NeighborReach.tsx    the direct-mail product
    Custom.tsx           custom build-outs (deliberately small)
    Pricing.tsx          four tiers, monthly/annual toggle
    Faq.tsx              accordion
    Close.tsx            closing CTA, footer, compliance disclosure
    Reveal.tsx           the one scroll-reveal contract
    ui.tsx               Shell / Band / SectionHead / Button
```

### Changing prices

Edit the `tiers` array in `src/content/site.ts`. Annual pricing is derived from
`ANNUAL_DISCOUNT` (currently `0.15`) — don't hardcode a second set of numbers, or
the toggle will disagree with itself.

---

## Design notes

**Palette.** Brass `#D9A441` (machinery, hi-vis) is the accent and the only bold
colour on the page. Turf `#4E9E7F` is reserved for status. Clay `#C4643F` is used
in exactly one place — the bar showing what a human hire costs. Ground is a
green-biased near-black, not a neutral grey.

**Type.** Archivo for everything structural (a grotesque with signage and
industrial heritage), IBM Plex Mono for every number, label and readout, so
figures read as instrument data. Both self-host via `next/font`.

**Motion.** One easing curve — `cubic-bezier(.22, 1, .36, 1)` — for the whole site.
Three primitives in `globals.css`: `.reveal` (scroll entrance), `.word` (per-word
hero stagger), and `.acc` (a `0fr → 1fr` grid accordion, no height maths). Every
one of them collapses to its final state under `prefers-reduced-motion`, and the
`@media (scripting: none)` block makes sure a no-JS visitor sees a full page
rather than a blank one.

**Dark only, deliberately.** The site commits to a single visual world rather
than shipping a half-considered light theme. Every colour is painted explicitly.

---

## Before this goes live

These are content decisions, not code — the site is ready, these need a human.

1. **Reference clients.** `references` in `src/content/site.ts` names *Show Me
   Mowers*, *Blade to Blade* and *Front Range Autmow* from the business plan.
   Get written permission before publishing, or delete the array — the strip
   disappears cleanly.
2. **Agent availability.** Each entry in `roster` carries a `status`
   (`Available now` / `Early access` / `Joining soon`). These are set from the
   plan's sequencing, not from what's actually shipped. Correct them.
3. **Retire the legacy pricing.** The plan is explicit that the old `$149`
   tier and the `$397–$597` spread must not coexist with this ladder. Take
   them down wherever they still appear.
4. **Contact route.** Every CTA points at `mailto:hello@tinex.ai`. Swap for a
   real booking link once one exists.
5. **Re-verify the figures.** The business plan says market and competitor data
   should be re-checked before client-facing use. Sources are printed next to
   each figure on the page, so this is quick.

## Not built yet

Deliberately out of scope for a launch landing page — flag if you want them:
a booking/lead form and its backend, analytics, a blog or case studies, and the
NeighborReach product UI itself.
