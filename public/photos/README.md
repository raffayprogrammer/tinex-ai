# Job photos

Drop your own photographs in this folder to replace the placeholders on the site.

The filename must match the `slot` name used in the component. Currently used:

| File                       | Where it appears                | Suggested shot                                    |
| -------------------------- | ------------------------------- | ------------------------------------------------- |
| `patio-after.jpg`          | NeighborReach postcard          | A finished hardscape job, shot square-on           |
| `crew-on-site.jpg`         | Roster section                  | Crew working — people, not just the end result     |
| `truck.jpg`                | Closing CTA                     | Branded truck or trailer on a driveway             |

**Guidelines**

- **Use your own work.** Stock photography of generic landscaping reads as fake to
  a contractor, and undermines the rest of the page.
- Landscape orientation, at least 1600px wide. JPEG, quality ~80.
- Shoot in daylight but avoid harsh midday sun — the site is dark, so images with
  deep shadows and warm light sit best against it.
- Keep them under ~400KB each. `next/image` handles resizing and modern formats,
  but the source shouldn't be a 12MB phone original.

If a file is missing, the site renders a designed placeholder instead of a broken
image — so it is safe to ship before the photography is ready.
