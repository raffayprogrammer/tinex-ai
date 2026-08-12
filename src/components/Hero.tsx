"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { heroStates, references, roster } from "@/content/site";
import { Atmosphere } from "./Atmosphere";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const HOLD = 8000;
const OUT = 440;

type Token = { kind: "break" } | { kind: "word"; text: string; dim: boolean; delay: number };

/**
 * Parses a headline into an ordered token list *before* rendering, so the
 * stagger delays are a pure function of the string. Accumulating them inside
 * a .map callback would keep incrementing across re-renders and drift.
 * `<em>` marks the line that drops to the dim weight.
 */
function parseHeadline(html: string): Token[] {
  const tokens: Token[] = [];
  let dim = false;
  let index = 0;

  for (const segment of html.split(/(<em>|<\/em>)/)) {
    if (segment === "<em>") {
      dim = true;
      tokens.push({ kind: "break" });
      continue;
    }
    if (segment === "</em>") {
      dim = false;
      continue;
    }
    for (const text of segment.split(/\s+/)) {
      if (!text) continue;
      tokens.push({ kind: "word", text, dim, delay: index * 0.05 });
      index += 1;
    }
  }
  return tokens;
}

function Words({ html }: { html: string }) {
  return (
    <>
      {parseHeadline(html).map((token, i) =>
        token.kind === "break" ? (
          <br key={`b${i}`} />
        ) : (
          // the trailing space is a real text node — .word is inline-block,
          // so without it adjacent words would butt together
          <Fragment key={`w${i}`}>
            <span
              className="word"
              style={{ "--d": `${token.delay}s` } as React.CSSProperties}
            >
              <span className={token.dim ? "text-muted" : undefined}>
                {token.text}
              </span>
            </span>{" "}
          </Fragment>
        ),
      )}
    </>
  );
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = usePrefersReducedMotion();

  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
  };

  const goTo = useCallback(
    (next: number) => {
      clear();
      const swap = () => {
        setIndex(next);
        setPhase("in");
      };
      if (reduced) {
        swap();
        return;
      }
      setPhase("out");
      timer.current = setTimeout(swap, OUT);
    },
    [reduced],
  );

  // auto-advance, paused entirely under reduced motion
  useEffect(() => {
    if (reduced || phase !== "in") return;
    timer.current = setTimeout(
      () => goTo((index + 1) % heroStates.length),
      HOLD,
    );
    return clear;
  }, [index, phase, goTo, reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((index + 1) % heroStates.length);
      if (e.key === "ArrowLeft")
        goTo((index + heroStates.length - 1) % heroStates.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo]);

  const state = heroStates[index];

  return (
    <div id="top" className="px-2 pt-20 sm:px-4 sm:pt-24">
      <div className="relative flex min-h-[min(88vh,860px)] flex-col overflow-hidden rounded-[24px] border border-line-soft bg-surface sm:rounded-[28px]">
        <Atmosphere state={index} />

        {/* light shafts, as if through a stand of trees */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[58%] justify-center gap-6 sm:gap-12"
        >
          {[38, 56, 30, 47].map((h, i) => (
            <span
              key={i}
              className="w-px bg-gradient-to-t from-white/25 to-transparent"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>

        {/* floor vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_1px_0_rgba(242,240,234,.06),inset_0_-140px_150px_-100px_rgba(0,0,0,.92)]"
        />

        <div className="relative z-10 flex flex-1 flex-col justify-between gap-10 p-5 sm:p-7">
          {/* ---------- the state itself ---------- */}
          <div
            className={`flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center state-${phase}`}
          >
            <div className="state-copy inline-flex items-center gap-2.5 rounded-full border border-line bg-ground/50 px-3.5 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-brass" />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-dim">
                {state.eyebrow}
              </span>
            </div>

            <h1 className="max-w-[19ch] text-[clamp(2.1rem,6.6vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em]">
              <Words html={state.headline} />
            </h1>

            <p className="state-copy max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-dim sm:text-[1.0625rem]">
              {state.lede}
            </p>

            <div className="state-copy flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href="#pricing"
                  className="sheen group inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-medium text-[#12100a] transition-colors duration-400 hover:bg-[#e6b455]"
                >
                  See who you can hire
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    aria-hidden="true"
                    className="transition-transform duration-400 ease-[var(--ease)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
                  >
                    <path
                      d="M2 9 9 2M3.4 2H9v5.6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#roster"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-6 py-3 text-sm text-ink transition-[background-color,border-color] duration-400 hover:border-white/25 hover:bg-white/[0.09]"
                >
                  Meet the roster
                </a>
              </div>
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                {state.stat.value} · {state.stat.label}
              </p>
            </div>
          </div>

          {/* ---------- footer bar ---------- */}
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="hidden flex-col gap-2 sm:flex">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
                On the roster
              </span>
              <div className="flex items-center gap-1.5">
                {roster.map((a, i) => (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("roster");
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    title={`${a.name} — ${a.role}`}
                    className={`grid h-8 w-8 place-items-center rounded-full border text-[0.6875rem] font-medium transition-[transform,background-color,border-color] duration-500 ease-[var(--ease)] hover:-translate-y-0.5 ${
                      i === index
                        ? "border-brass/45 bg-brass/15 text-ink"
                        : "border-line bg-ground/50 text-muted hover:text-ink"
                    }`}
                  >
                    {a.name.slice(0, 2)}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2.5">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
                {String(index + 1).padStart(2, "0")} / 03
              </span>
              <div className="flex gap-1.5" role="tablist" aria-label="Hero states">
                {heroStates.map((s, i) => (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={s.eyebrow}
                    onClick={() => i !== index && goTo(i)}
                    className={`h-[3px] w-9 overflow-hidden rounded-full bg-white/15 ${
                      i === index ? "tick-active" : i < index ? "tick-done" : ""
                    }`}
                    style={{ "--hold": `${HOLD}ms` } as React.CSSProperties}
                  >
                    <span className="tick-fill block h-full w-full bg-brass" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* reference clients — names only, no invented endorsements */}
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 pb-2 pt-8 text-center">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-faint">
          Working with
        </span>
        {references.map((r) => (
          <span key={r} className="text-sm text-muted">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
