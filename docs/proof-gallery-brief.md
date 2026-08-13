# Tinex.AI — "The Work" Proof Gallery Brief

An editorial 3D depth gallery, adapted from an Awwwards-style portfolio prompt.

**Blocking dependency:** this section cannot ship without real photography and
written client permission. See [Before this can be built](#before-this-can-be-built).

---

## What changed from the source prompt

The source is a **studio portfolio** pattern — projects, client, year. Tinex is
not a studio and has no portfolio of its own work; its output is invisible
(answered calls, drafted estimates).

The translation that makes it earn its place: **the gallery shows the physical
jobs Tinex's agents booked.** Editorial photography of finished hardscape work,
overlaid with monospace metadata exposing what the agents did to win it.

That inverts the usual relationship. Most AI vendors show dashboards. This shows
a patio, and then tells you it got booked at 23:47 on a Sunday by an agent while
the owner was asleep. The photograph makes the abstraction concrete; the metadata
makes the photograph a sales argument.

---

## Aesthetic

Deep dark theme, glowing accents, oversized headers against monospace technical
metadata — retained wholesale, because it already matches the site.

**Use the existing tokens.** `--color-ground` is `#0b0e0d`, effectively identical
to the requested `#0b0c10` but already contrast-verified. Do not introduce a
second near-black.

**Typography — one deviation.** The source asks for large serif headers. The site
runs **Archivo + IBM Plex Mono**, and Plex Mono already carries every figure and
label, which is exactly the "technical metadata overlay" register the prompt
wants.

- If the gallery is a **section** of the existing page → keep Archivo. A third
  family on one page reads as indecision, not editorial range.
- If the gallery becomes its **own route** (`/work`) → a display serif is a
  legitimate counterpoint. Recommended: **Instrument Serif** or **Fraunces** at
  optical size 72+, used only for the gallery header. Never for body.

---

## Layout

### 1. Header
Fixed, minimal, frosted — `backdrop-filter: blur(12px)`. The existing `Nav`
already does this on scroll; reuse it rather than building a second header.

### 2. Hero
Oversized headline collapsing into a sticky bar on scroll.

> **The work they booked while you slept.**

Collapse is scroll-linked, not time-linked: the headline scales and translates
into the nav bar between 0 and 40vh, handing off to the fixed nav without a
visible jump. Copy goes in `src/content/site.ts`.

### 3. Interactive Canvas — the depth tunnel

- Job cards positioned along the **Z axis** in a tunnel perspective.
- Scroll drives the camera **forward along Z** (`scrub: 1.5`), pulling cards into
  focus. Distant cards carry **bokeh depth-of-field blur**; the focal card is sharp.
- Ambient particles and a **fluid wave mesh reacting to scroll velocity** — keep
  this at very low amplitude. It should read as atmosphere, not as a screensaver.
- **Hover:** fluid wave distortion shader on the card, and the metadata block
  fades up.

**Card metadata** — the whole point of the section:

| Field       | Example                              |
| ----------- | ------------------------------------ |
| Client      | `Show Me Mowers`                     |
| Location    | `Indianapolis, IN`                   |
| Job         | `420 sq ft paver patio`              |
| Booked by   | `Maya — 23:47, Sunday`               |
| Estimate    | `Same day, 4 min after the call`     |
| Value       | `$8,010`                             |

The "Booked by" line is the one that sells. It should be brass, and it should be
the last thing to fade in.

### 4. Detail View
Clicking a card opens a fullscreen drawer: high-res photography, horizontal
slider, and a short write-up of how the job came in.

Accessibility requirements for the drawer, non-negotiable:
- Focus moves to the drawer on open and is **trapped** until close
- `Escape` closes; focus returns to the originating card
- `role="dialog"` + `aria-modal="true"` + labelled by the client name
- The horizontal slider is keyboard-operable with arrow keys, not drag-only
- Body scroll locked while open, restored on close

---

## Performance and fallback

Same rules as [`immersive-landing-brief.md`](./immersive-landing-brief.md), which
this section inherits rather than restates. Specifically:

- **≤180 KB gzipped** for the 3D layer, shared across both briefs — not per section
- `dpr={[1, 2]}`, `frameloop="demand"`, dispose on unmount, pause on `document.hidden`
- Capability gate: skip WebGL on ≤4 cores, ≤4 GB RAM, coarse pointer under 768px,
  `saveData`, failed WebGL context, or `prefers-reduced-motion`

**The fallback is not optional and must be genuinely good.** Without WebGL this
becomes a **CSS grid of the same photographs with the same metadata** — which,
honestly, delivers most of the persuasive value. Build the grid first, verify it
sells on its own, then layer the tunnel on top for capable desktops.

If the grid does not work without the shader, the shader is not the problem.

---

## Before this can be built

Unlike the hero brief, this section **cannot ship on placeholders**. A depth
gallery of empty frames is worse than no gallery.

Required first:

1. **Photography — 6 to 10 finished jobs, minimum.** Real work, shot in daylight,
   1600px+ wide. Fewer than six and the tunnel has no depth to travel through.
2. **Written client permission** for each named business. Show Me Mowers, Blade
   to Blade and Front Range Autmow are named in the business plan; naming them
   publicly alongside performance claims needs sign-off, not assumption.
3. **Verified metadata per job.** The "Booked by Maya — 23:47 Sunday" line is a
   factual claim about a real business's revenue. Every value must come from
   actual call logs. **Do not reconstruct these from plausible-sounding
   defaults** — a contractor who spots one invented number discounts the entire
   page, and an inflated job value attributed to a named client is a liability
   for them as well as for Tinex.
4. **No stock and no AI-generated hardscape.** The buyer identifies this work for
   a living.

Until 1–3 exist, the honest version of this section is the current roster and the
call/estimate demos, which claim nothing that cannot be shown.

---

## Recommendation

Build in this order, stopping at any point where the value has already landed:

1. **CSS grid + metadata overlays**, real photos, no WebGL — ships the argument
2. **Detail drawer** with slider and write-up — deepens it
3. **Z-axis tunnel, bokeh, wave shader** — desktop enhancement only

Step 1 is where nearly all the persuasion lives. Steps 2 and 3 are craft, and
worth doing once step 1 is proven — but a contractor deciding whether to spend
$797/mo is convinced by the patio and the timestamp, not by the depth of field.
