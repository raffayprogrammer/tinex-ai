"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { Band, Kicker } from "./ui";
import { useCountUp } from "./useCountUp";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/* The drainage line exists because Maya heard "it slopes a bit" on the call.
   That handoff is the whole argument for buying a team over a point tool. */
const LINES = [
  { desc: "Excavation and grading", qty: "420 sq ft", amount: 1260, flagged: false },
  { desc: "Base prep, 6\" compacted aggregate", qty: "420 sq ft", amount: 1470, flagged: false },
  { desc: "Pavers — Holland, charcoal blend", qty: "420 sq ft", amount: 3780, flagged: false },
  { desc: "French drain along the low edge", qty: "24 lin ft", amount: 960, flagged: true },
  { desc: "Edge restraint and polymeric sand", qty: "Included", amount: 540, flagged: false },
];

const SUBTOTAL = LINES.reduce((n, l) => n + l.amount, 0);

export function EstimateDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => {
      setCount((n) => {
        if (n >= LINES.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 520);
    return () => clearInterval(id);
  }, [inView, reduced]);

  // with motion off the estimate is shown finished rather than assembling
  const shown = reduced ? LINES.length : count;
  const done = shown >= LINES.length;
  const total = useCountUp(SUBTOTAL, done, 900);

  return (
    <Band>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-center lg:gap-20">
        {/* ---------------- the estimate ---------------- */}
        <Reveal>
          <div
            ref={ref}
            className="overflow-hidden rounded-3xl border border-line-soft bg-surface"
          >
            <div className="flex items-center justify-between gap-4 border-b border-line-soft px-5 py-4">
              <div className="flex flex-col">
                <span className="text-sm text-ink">Estimate #1042</span>
                <span className="font-mono text-[0.6875rem] text-faint">
                  14 Oak Ridge Dr · paver patio
                </span>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] transition-colors duration-700 ${
                  done
                    ? "border-turf/35 bg-turf/10 text-turf"
                    : "border-brass/35 bg-brass/10 text-brass"
                }`}
              >
                {done ? "Ready for approval" : "Eli is drafting"}
              </span>
            </div>

            <div className="flex flex-col">
              {LINES.map((line, i) => {
                const on = i < shown;
                return (
                  <div
                    key={line.desc}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-line-soft px-5 py-3.5 transition-all duration-600 ease-[var(--ease)]"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "none" : "translateY(10px)",
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="flex flex-wrap items-center gap-2 text-[0.875rem] text-ink">
                        {line.desc}
                        {line.flagged && (
                          <span className="rounded-full border border-brass/30 bg-brass/10 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-brass">
                            flagged on the call
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-faint">
                        {line.qty}
                      </span>
                    </div>
                    <span className="font-mono text-[0.875rem] tabular-nums text-ink-dim">
                      ${line.amount.toLocaleString("en-US")}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-baseline justify-between gap-4 px-5 py-4">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Total
              </span>
              <span className="font-mono text-[clamp(1.25rem,2.4vw,1.75rem)] tabular-nums leading-none text-ink">
                ${Math.round(total).toLocaleString("en-US")}
              </span>
            </div>

            <div className="border-t border-line-soft px-5 py-3">
              <span className="font-mono text-[0.6875rem] text-faint">
                Drafted 4 minutes after the call ended · waiting on your approval
              </span>
            </div>
          </div>
        </Reveal>

        {/* ---------------- copy ---------------- */}
        <div className="flex flex-col gap-5 lg:order-first">
          <Reveal>
            <Kicker>Then the estimate</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[17ch] text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.05]"
          >
            Out the same day, not the same week.
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[50ch] leading-relaxed text-muted">
            Eli takes the brief straight from Maya and prices it against your
            own rates. Notice the drainage line — nobody typed that in. Maya
            heard &ldquo;it slopes a bit&rdquo; on the call and passed it along.
          </Reveal>
          <Reveal as="p" delay={0.16} className="max-w-[50ch] leading-relaxed text-muted">
            That handoff between two agents is the thing a single bolt-on
            receptionist cannot do, and it is why the estimate is waiting for you
            rather than sitting on your list for Thursday.
          </Reveal>
        </div>
      </div>
    </Band>
  );
}
