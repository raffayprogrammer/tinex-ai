import { laborAnchor, proof } from "@/content/site";
import { ProofStat } from "./ProofStat";
import { Reveal } from "./Reveal";
import { Band, Kicker } from "./ui";

const TONE = {
  clay: "bg-clay/70",
  muted: "bg-white/25",
  brass: "bg-brass",
} as const;

const MAX = Math.max(...laborAnchor.bars.map((b) => b.value));

export function LaborAnchor() {
  return (
    <Band>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <div className="flex flex-col gap-4">
          <Reveal>
            <Kicker>{laborAnchor.kicker}</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.05]"
          >
            {laborAnchor.heading}
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[52ch] leading-relaxed text-muted">
            {laborAnchor.body}
          </Reveal>
          <Reveal as="p" delay={0.16} className="mt-2 font-mono text-[0.6875rem] leading-relaxed text-faint">
            Source: {laborAnchor.source}
          </Reveal>
        </div>

        {/* the bars */}
        <Reveal className="flex flex-col gap-7" delay={0.1}>
          {laborAnchor.bars.map((bar, i) => (
            <div key={bar.label} className="flex flex-col gap-2.5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-ink">{bar.label}</span>
                <span className="font-mono text-sm tabular-nums text-ink">
                  {bar.display}
                  <span className="text-faint">{bar.unit}</span>
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <span
                  className={`bar-fill block h-full rounded-full ${TONE[bar.tone]}`}
                  style={
                    {
                      width: `${(bar.value / MAX) * 100}%`,
                      "--d": `${0.15 + i * 0.14}s`,
                    } as React.CSSProperties
                  }
                />
              </div>
              <span className="text-[0.8125rem] text-faint">{bar.sub}</span>
            </div>
          ))}

          <p className="max-w-[48ch] border-t border-line-soft pt-6 text-[0.9375rem] leading-relaxed text-ink-dim">
            {laborAnchor.footnote}
          </p>
        </Reveal>
      </div>

      {/* market proof, stated with sources rather than asserted */}
      <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:mt-24 sm:grid-cols-3">
        {proof.map((p, i) => (
          <Reveal
            key={p.figure}
            delay={i * 0.07}
            className="flex flex-col gap-1.5 bg-ground p-6 sm:p-7"
          >
            <span className="font-mono text-[clamp(1.5rem,2.6vw,2rem)] tabular-nums leading-none text-brass">
              <ProofStat figure={p.figure} />
            </span>
            <span className="text-sm leading-snug text-ink-dim">{p.label}</span>
            <span className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
              {p.source}
            </span>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
