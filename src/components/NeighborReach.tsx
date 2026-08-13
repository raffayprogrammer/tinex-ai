import { neighborReach } from "@/content/site";
import { Postcard } from "./Postcard";
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
          <Postcard />
        </Reveal>
      </div>
    </Band>
  );
}
