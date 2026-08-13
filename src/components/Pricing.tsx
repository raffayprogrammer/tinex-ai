"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ANNUAL_DISCOUNT, OVERAGE_PER_MIN, tiers } from "@/content/site";
import { Reveal } from "./Reveal";
import { Band, Check, SectionHead } from "./ui";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Cycle = "monthly" | "annual";

/** Counts to a new price rather than snapping, so switching cycle reads as
 *  the same number changing rather than four cards being replaced. */
function useTween(target: number, enabled: boolean) {
  const [tweened, setTweened] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (!enabled) {
      from.current = target;
      return;
    }
    const start = performance.now();
    const origin = from.current;
    const dur = 520;
    let raf = 0;

    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setTweened(Math.round(origin + (target - origin) * e));
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, enabled]);

  // when motion is off the price is derived, never animated into place
  return enabled ? tweened : target;
}

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const animate = !usePrefersReducedMotion();
  const groupRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const group = groupRef.current;
    const thumb = thumbRef.current;
    if (!group || !thumb) return;
    const move = () => {
      const active = group.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!active) return;
      const g = group.getBoundingClientRect();
      const a = active.getBoundingClientRect();
      thumb.style.width = `${a.width}px`;
      thumb.style.transform = `translateX(${a.left - g.left}px)`;
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [cycle]);

  return (
    <Band id="pricing">
      <SectionHead
        align="center"
        kicker="Pricing"
        heading="Priced against a payroll line, not a software line."
        body="Every plan includes a human Agent Manager and a published minute allowance. No plan is priced per seat, because you are not buying seats."
      />

      {/* cycle toggle */}
      <Reveal className="mb-12 flex justify-center">
        <div
          ref={groupRef}
          className="relative flex rounded-full border border-line bg-surface p-1"
        >
          <span
            ref={thumbRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-1 top-1 h-[calc(100%-0.5rem)] rounded-full bg-white/[0.09] transition-[transform,width] duration-500 ease-[var(--ease)]"
          />
          {(["monthly", "annual"] as const).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cycle === c}
              onClick={() => setCycle(c)}
              className={`relative z-10 whitespace-nowrap rounded-full px-5 py-2 text-[0.8125rem] transition-colors duration-200 ease-[var(--ease-soft)] ${
                cycle === c ? "text-ink" : "text-muted hover:text-ink-dim"
              }`}
            >
              {c === "monthly" ? "Monthly" : "Annual"}
              {c === "annual" && (
                <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-brass">
                  −15%
                </span>
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-4 lg:grid-cols-4">
        {tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 0.07} className="reveal-card">
            <TierCard tier={tier} cycle={cycle} animate={animate} />
          </Reveal>
        ))}
      </div>

      {/* the metering promise, stated plainly rather than buried */}
      <Reveal
        delay={0.1}
        className="mt-8 flex flex-col gap-3 rounded-2xl border border-line-soft bg-surface/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
      >
        <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted">
          <span className="text-ink">Minutes are metered and published.</span>{" "}
          Beyond your allowance, calls run {OVERAGE_PER_MIN} per minute as a
          separate line on your invoice. We would rather show you the meter than
          sell you &ldquo;unlimited&rdquo; and throttle you in July.
        </p>
        <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-faint">
          Setup billed once
        </span>
      </Reveal>
    </Band>
  );
}

function TierCard({
  tier,
  cycle,
  animate,
}: {
  tier: (typeof tiers)[number];
  cycle: Cycle;
  animate: boolean;
}) {
  const target =
    cycle === "annual"
      ? Math.round(tier.monthly * (1 - ANNUAL_DISCOUNT))
      : tier.monthly;
  const price = useTween(target, animate);

  return (
    <article
      className={`flex h-full flex-col gap-6 rounded-3xl border p-6 transition-[transform,border-color] duration-250 ease-[var(--ease)] hover:-translate-y-1 sm:p-7 ${
        tier.featured
          ? "border-brass/30 bg-[linear-gradient(180deg,rgba(217,164,65,.08),rgba(17,22,20,.5)_46%)]"
          : "border-line-soft bg-surface hover:border-line"
      }`}
    >
      <header className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[1.0625rem] tracking-[-0.02em]">{tier.name}</h3>
          {tier.featured && (
            <span className="shrink-0 rounded-full border border-brass/30 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-brass">
              Most hired
            </span>
          )}
        </div>
        <p className="text-[0.8125rem] text-muted">{tier.purpose}</p>
      </header>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono text-[clamp(1.75rem,3vw,2.25rem)] leading-none tabular-nums tracking-[-0.03em]">
            ${price.toLocaleString("en-US")}
          </span>
          <span className="text-[0.8125rem] text-faint">/mo</span>
        </div>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-faint">
          {tier.setup} · {tier.minutes}
        </span>
      </div>

      <ul className="flex flex-1 flex-col gap-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-dim">
            <Check className="text-brass" />
            {f}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
          tier.featured
            ? "sheen bg-brass text-[#12100a] hover:bg-[#e6b455]"
            : "border border-line bg-white/[0.04] text-ink hover:border-white/25 hover:bg-white/[0.09]"
        }`}
      >
        {tier.featured ? "Start with the Duo" : `Hire ${tier.name}`}
      </a>
    </article>
  );
}
