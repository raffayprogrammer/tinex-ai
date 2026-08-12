import { neighborReach } from "@/content/site";
import { Reveal } from "./Reveal";
import { Band, Check, Kicker } from "./ui";

export function NeighborReach() {
  return (
    <Band id="neighborreach">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Kicker className="text-brass">{neighborReach.kicker}</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[18ch] text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.05]"
          >
            {neighborReach.heading}
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[52ch] leading-relaxed text-muted">
            {neighborReach.body}
          </Reveal>

          <Reveal delay={0.16} className="flex flex-col gap-2.5 pt-1">
            {neighborReach.bullets.map((b) => (
              <p key={b} className="flex gap-3 text-[0.9375rem] text-ink-dim">
                <Check className="text-brass" />
                {b}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 pt-3">
            <span className="font-mono text-sm tabular-nums text-ink">
              {neighborReach.price.access}
              <span className="text-faint">/mo access</span>
            </span>
            <span className="font-mono text-sm tabular-nums text-ink">
              {neighborReach.price.per}
              <span className="text-faint">/postcard, printed and posted</span>
            </span>
          </Reveal>

          <Reveal as="p" delay={0.24} className="font-mono text-[0.6875rem] leading-relaxed text-faint">
            Source: {neighborReach.source}
          </Reveal>
        </div>

        {/* the mechanism, drawn rather than described */}
        <Reveal delay={0.12}>
          <div className="relative overflow-hidden rounded-3xl border border-line-soft bg-surface p-7 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_70%_20%,rgba(217,164,65,.09),transparent_60%)]"
            />
            <div className="relative flex flex-col gap-5">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-faint">
                What happens when Jake closes a job
              </span>

              {[
                { t: "Job marked complete", s: "Jake · 14 Oak Ridge Dr", tone: "turf" },
                { t: "Radius selected", s: "120 homes within 4 blocks", tone: "line" },
                { t: "Card built from the job photos", s: "Your crew, that patio", tone: "line" },
                { t: "Postcards in the mail", s: "120 × $1.15 · billed per piece", tone: "brass" },
              ].map((row, i, arr) => (
                <div key={row.t} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        row.tone === "turf"
                          ? "bg-turf"
                          : row.tone === "brass"
                            ? "bg-brass"
                            : "bg-white/25"
                      }`}
                    />
                    {i < arr.length - 1 && (
                      <span className="mt-1 w-px flex-1 bg-line" />
                    )}
                  </div>
                  <div className="flex flex-col pb-5 last:pb-0">
                    <span className="text-[0.9375rem] text-ink">{row.t}</span>
                    <span className="font-mono text-[0.75rem] text-faint">
                      {row.s}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
