"use client";

import { roster, type AgentStatus } from "@/content/site";
import { JobPhoto } from "./JobPhoto";
import { Reveal } from "./Reveal";
import { Band, SectionHead } from "./ui";

const STATUS: Record<AgentStatus, string> = {
  "Available now": "border-turf/35 bg-turf/12 text-turf",
  "Early access": "border-brass/35 bg-brass/12 text-brass",
  "Joining soon": "border-line bg-white/[0.04] text-faint",
};

export function Roster() {
  const track = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Band id="roster">
      <SectionHead
        kicker="The roster"
        heading="Six hires. None of them need a desk."
        body="Each one owns a job you are currently doing yourself at nine in the evening. Take one, take two, or take the whole front office."
      />

      <div className="grid gap-px overflow-hidden rounded-3xl border border-line-soft bg-line-soft sm:grid-cols-2 lg:grid-cols-3">
        {roster.map((agent, i) => (
          <Reveal
            key={agent.name}
            delay={(i % 3) * 0.07}
            className="spotlight relative flex flex-col gap-4 bg-ground p-7 transition-colors duration-500 ease-[var(--ease-soft)] hover:bg-surface-2 sm:p-8"
          >
            <article
              onPointerMove={track}
              className="relative z-10 flex h-full flex-col gap-4"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* name badge, not an avatar — these are staff, not people */}
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.04] font-mono text-sm text-ink">
                    {agent.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-lg leading-none tracking-[-0.02em]">
                      {agent.name}
                    </h3>
                    <span className="mt-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                      {agent.role}
                    </span>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.1em] ${STATUS[agent.status]}`}
                >
                  {agent.status}
                </span>
              </header>

              <p className="text-[0.9375rem] leading-relaxed text-ink-dim">
                {agent.does}
              </p>

              <div className="mt-auto flex flex-col gap-2 border-t border-line-soft pt-4">
                <Row label="Kills" value={agent.pain} />
                <Row label="Shift" value={agent.shift} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_1fr] sm:items-stretch">
        <JobPhoto
          slot="crew-on-site"
          caption="Your crew, on your jobs"
          className="min-h-[220px] rounded-2xl border border-line-soft"
          sizes="(max-width: 640px) 100vw, 55vw"
        />
        <div className="flex flex-col justify-center gap-3 rounded-2xl border border-line-soft bg-surface p-6">
          <p className="text-[0.9375rem] leading-relaxed text-ink-dim">
            The agents handle the phone and the paperwork. The part that
            actually needs hands stays with your crew.
          </p>
          <p className="text-[0.8125rem] leading-relaxed text-muted">
            Every agent identifies itself as AI and announces recording at the
            start of each call.
          </p>
        </div>
      </Reveal>
    </Band>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-[0.8125rem]">
      <span className="w-11 shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-faint">
        {label}
      </span>
      <span className="text-muted">{value}</span>
    </div>
  );
}
