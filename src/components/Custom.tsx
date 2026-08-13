import { Reveal } from "./Reveal";
import { Band, Kicker } from "./ui";

/**
 * Deliberately the smallest section on the page. Custom work funds the
 * product but does not scale, so the site should let it be found without
 * inviting every visitor to ask for it.
 */
export function Custom() {
  return (
    <Band>
      <div className="grid gap-8 rounded-3xl border border-line-soft bg-surface/60 p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div className="flex flex-col gap-3">
          <Reveal>
            <Kicker>Custom build-outs</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[26ch] text-[clamp(1.25rem,2.2vw,1.75rem)] leading-[1.15]"
          >
            Something on the roster nearly fits, but not quite?
          </Reveal>
          <Reveal as="p" delay={0.1} className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted">
            We take on a small number of bespoke automation builds each quarter —
            work that connects the systems you already run. Scoped and quoted up
            front, from $2,500 setup. If we think a roster agent would do the job
            for less, we will say so.
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <a
            href="mailto:hello@tinex.ai?subject=Custom%20automation%20enquiry"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line bg-white/[0.04] px-6 py-3 text-sm text-ink transition-[background-color,border-color] duration-200 hover:border-white/25 hover:bg-white/[0.09]"
          >
            Describe the problem
          </a>
        </Reveal>
      </div>
    </Band>
  );
}
