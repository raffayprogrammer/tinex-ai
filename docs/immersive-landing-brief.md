# Tinex.AI — Immersive Landing Page Brief

A build brief for a WebGL/scrollytelling version of the Tinex.AI landing page.
Adapted from a generic flagship-hardware prompt; every section has been
re-pointed at what Tinex actually sells.

**Read the Constraints section first** — it contains the decisions that differ
from the source brief, and why.

---

## Role

Act as a **Principal Creative Technologist and Senior UI/UX Designer**, building a
production-ready interactive landing page for **Tinex.AI** — a company that rents
named AI employees (Maya, Eli, Jake, Rex, Ace, Nova) to landscaping and
hardscaping contractors, priced against the cost of an office hire rather than
against software.

**The audience is not a tech buyer.** It is the owner of a $500k–$3M landscaping
business, aged 30–55, who still answers the phone personally and writes estimates
at 9pm. They will most likely open this on a phone, outdoors, on mobile data.
Every decision below is subordinate to that fact.

---

## Tech Stack

Extend the **existing repository** rather than starting fresh:

- **Next.js 16.3** (App Router) · **React 19.2** · **TypeScript** · **Tailwind CSS v4**
- **GSAP 3 + ScrollTrigger** — scroll-driven timelines and pinning
- **Three.js** (react-three-fiber + drei) — the WebGL canvas
- **Lenis** — inertial smooth scrolling

All content lives in `src/content/site.ts`. Design tokens live in
`src/app/globals.css` under `@theme`. Do not hardcode colours or copy in
components.

### Existing tokens — use these, do not invent a new palette

| Token             | Value     | Role                                          |
| ----------------- | --------- | --------------------------------------------- |
| `--color-ground`  | `#0b0e0d` | Page ground — green-biased near-black         |
| `--color-surface` | `#111614` | Raised panels                                 |
| `--color-ink`     | `#f2f0ea` | Primary text                                  |
| `--color-muted`   | `#808a81` | Secondary text                                |
| `--color-faint`   | `#7a8080` | Captions — WCAG AA verified, do not darken    |
| `--color-brass`   | `#d9a441` | The accent. Machinery, hi-vis. Spend it once. |
| `--color-turf`    | `#4e9e7f` | Status only — never decorative                |
| `--color-clay`    | `#c4643f` | Reserved for pricing a human hire             |

**Typography:** Archivo (display/body) + IBM Plex Mono (all figures and labels).
Both already self-hosted via `next/font`. **Do not substitute Inter** — it is the
most over-used face in this category and carries none of Archivo's signage
heritage.

**Easing:** one curve site-wide — `cubic-bezier(0.22, 1, 0.36, 1)`.

---

## Section 1 — Hero: The Job Site (Fixed 3D Viewport)

**Layout.** Fullscreen sticky WebGL canvas, centred typography overlay, inset
bezel panel consistent with the current hero.

**The model.** Not a product — **a residential back yard**: a 400 sq ft paver
patio with a slope to one corner, a house edge, a lawn boundary. Low-poly,
stylised, lit as if at dawn. This is the customer's own world, and the exact job
described in the call demo (14 Oak Ridge Dr).

**Scroll interaction** (`scrub: 1.5`, tied to scroll progress):

1. **0 – 25%** — The patio rotates ~40° on Y. Camera drifts down toward ground level.
2. **25 – 60%** — Camera approaches (dolly, not FOV distortion). The slope becomes readable.
3. **60 – 100%** — **The exploded estimate.** The patio separates vertically into
   its cost layers, each with a mono label and price pinned to it:

   | Layer                     | Label                             |
   | ------------------------- | --------------------------------- |
   | Pavers (top)              | `Holland, charcoal — $3,780`      |
   | Edge restraint            | `Edging and polymeric sand — $540`|
   | Base aggregate            | `6" compacted base — $1,470`      |
   | French drain              | `Drainage, low edge — $960` ★     |
   | Excavation (bottom)       | `Excavation and grading — $1,260` |

   ★ The drainage layer arrives **last and glows brass**, carrying the label
   *"flagged on the call"*. This is the payoff: Maya heard "it slopes a bit",
   and Eli priced it. The most expensive animation on the page must land the
   product's core argument, not just look impressive.

**Overlay copy.** Retain the three rotating pain states already in
`heroStates`. The 3D scene sits behind them; it must never compete with the
headline for attention.

---

## Section 2 — Pinned Walkthrough: The Handoff (Scrollytelling)

**Pin** the container for **300vh** of scroll.

**Left panel (sticky).** Sequential slides, cross-fading on scroll:

1. **Maya answers** — "Second ring, 11pm on a Sunday. She qualifies the job and books the visit."
2. **Eli prices it** — "The brief becomes a line-item estimate against your own rates, same day."
3. **Jake runs it** — "Crew scheduled, customer updated, job closed — which triggers the neighbours' postcards."

**Right panel (3D focus).** The camera re-frames the same job-site model per
slide, with an emissive highlight on the relevant element:

| Slide | Camera focus            | Highlighted        |
| ----- | ----------------------- | ------------------ |
| 1     | The house / front door  | Incoming call pulse|
| 2     | The patio footprint     | Measurement overlay|
| 3     | The street and neighbours | Radius of homes  |

Slide 3 should hand off visually into the existing NeighborReach radius map, so
the WebGL section and the SVG section read as one continuous idea.

---

## Section 3 — Editorial Photo Grid with Parallax

**Layout.** 3-column asymmetric grid of real job photography.

**Motion.**
- Hover tilt physics — `transform: perspective(1000px)`, max 6° rotation, spring return
- Staggered scroll entry — reuse the existing `.reveal-card` preset (scale 0.94 → 1, slight overshoot)
- Differential parallax — column 1 at **0.8×**, column 2 at **1.2×**, column 3 at **1.0×**

**Photography.** Use the existing `JobPhoto` component and `public/photos/`
convention — a missing file renders a designed placeholder rather than breaking.
**Real client work only** (Show Me Mowers, Blade to Blade, Front Range Autmow,
with permission). No stock photography and no AI-generated job sites: the buyer
identifies hardscape work for a living and will spot a fake instantly, which
would undermine every honest claim on the page.

---

## Constraints and Performance Rules

These are not optional polish — they are the conditions under which the above is
worth building at all.

### Budget
- **≤ 180 KB gzipped** additional JS for the entire 3D layer. If Three.js +
  drei + GSAP + Lenis exceeds this, drop Lenis first (CSS scroll behaviour is
  adequate), then drei.
- Time-to-interactive on a mid-range Android over 4G must stay **under 4s**.
- The 3D layer must be `next/dynamic` with `ssr: false`, loaded **below** the
  hero copy so text paints first. Copy is the product; the canvas is decoration.

### Device and capability gating
Render the static hero (current implementation) and skip WebGL entirely when
**any** of these hold:

- `navigator.hardwareConcurrency <= 4`
- `navigator.deviceMemory <= 4`
- `matchMedia("(prefers-reduced-motion: reduce)")` matches
- `matchMedia("(pointer: coarse) and (max-width: 768px)")` matches
- WebGL context creation fails
- `navigator.connection.saveData` is true

The fallback is not a degraded experience — it is the page as it exists today,
which already tests clean. Treat WebGL as progressive enhancement for desktop.

### Rendering
- `dpr={[1, 2]}` — cap device pixel ratio at 2
- Debounced resize on `innerWidth`/`innerHeight`; update camera aspect and renderer size together
- `frameloop="demand"` — render only on scroll change, never a continuous RAF loop
- Dispose geometries, materials and textures on unmount
- Pause all rendering on `document.hidden`

### Accessibility — must hold, and is verified
- Contrast ≥ 4.5:1 for all text over the canvas; add a scrim if the WebGL background lightens beneath copy
- Canvas is `aria-hidden`; all information conveyed in 3D must also exist as text
- Pinned sections must not trap keyboard focus — tab order follows document order
- Touch targets ≥ 44×44px
- Full `prefers-reduced-motion` path: no pinning, no scrub, no smooth-scroll hijack

### Do not regress
The current page passes 13 browser-verified UX checks. Any of these breaking is
a build failure:

- `cursor: pointer` on all 17 interactive controls
- No horizontal overflow at 375 / 768 / 1024 / 1440
- All `.reveal` elements resolve (`opacity: 1`, `filter: none`) after scroll
- Zero page errors
- `filter: none` — never `blur(0)`, which minifies to invalid `blur()`

### Scroll hijacking
Lenis changes scroll feel for everyone, including people who did not ask for it.
Keep inertia **low** (`lerp: 0.1` or gentler), never disable native scrolling, and
bypass Lenis entirely under reduced-motion. A contractor trying to reach your
pricing should never fight the page.

---

## Deliverables

1. `src/components/three/` — canvas, scene, models, capability gate
2. `src/components/HeroScene.tsx` — dynamic import + static fallback
3. `src/components/PinnedWalkthrough.tsx` — GSAP ScrollTrigger pinned section
4. `src/components/PhotoGrid.tsx` — parallax editorial grid
5. `src/lib/lenis.ts` — smooth scroll provider, reduced-motion aware
6. Copy added to `src/content/site.ts` — no strings in components
7. Browser verification extending the existing checklist

---

## Honest assessment before building this

The current page loads instantly, is fully static, works with JavaScript
disabled, and passes every accessibility check. This brief trades a meaningful
part of that for cinematic impact.

That trade is **worth making if** the primary use is Gus sending the link into a
sales conversation, or the site needing to signal that a $2,497/mo product is
serious. It is **not worth making if** the primary channel is organic search and
cold outbound to contractors on phones in the field.

Build the desktop WebGL layer as pure enhancement, keep the current page as the
mobile and fallback experience, and the answer can be "both".
