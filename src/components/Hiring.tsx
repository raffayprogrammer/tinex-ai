import { agentManager, steps } from "@/content/site";
import { Reveal } from "./Reveal";
import { Band, Kicker, SectionHead } from "./ui";

export function Hiring() {
  return (
    <Band id="hiring">
      <SectionHead
        kicker="How hiring works"
        heading="A week from now, someone else is answering the phone."
        body="Three steps, in this order, because each one depends on the last."
      />

      <div className="flex flex-col">
        {steps.map((step, i) => (
          <Reveal
            key={step.n}
            delay={i * 0.08}
            className="grid gap-4 border-t border-line-soft py-8 sm:grid-cols-[auto_minmax(0,24ch)_minmax(0,1fr)] sm:gap-10 sm:py-10 last:border-b"
          >
            <span className="pt-1 font-mono text-xs tabular-nums text-brass">
              {step.n}
            </span>
            <h3 className="text-lg leading-snug tracking-[-0.02em] sm:text-xl">
              {step.title}
            </h3>
            <div className="flex flex-col gap-2.5">
              <p className="max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted">
                {step.body}
              </p>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
                {step.note}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* the Agent Manager — the reason step 02 exists at all */}
      <div className="mt-20 grid gap-12 rounded-3xl border border-line-soft bg-surface p-7 sm:mt-24 sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16 lg:p-14">
        <div className="flex flex-col gap-4">
          <Reveal>
            <Kicker>{agentManager.kicker}</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[18ch] text-[clamp(1.5rem,3vw,2.35rem)] leading-[1.08]"
          >
            {agentManager.heading}
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[50ch] leading-relaxed text-muted">
            {agentManager.body}
          </Reveal>
        </div>

        <div className="flex flex-col">
          {agentManager.points.map((p, i) => (
            <Reveal
              key={p.title}
              delay={0.1 + i * 0.08}
              className="flex flex-col gap-2 border-t border-line-soft py-6 first:border-t-0 first:pt-0 last:pb-0"
            >
              <h3 className="flex items-center gap-2.5 text-[0.9375rem] font-medium tracking-[-0.01em]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                {p.title}
              </h3>
              <p className="pl-[1rem] text-[0.9375rem] leading-relaxed text-muted">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}
