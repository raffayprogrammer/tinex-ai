"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Band, Kicker } from "./ui";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type Line = { who: "caller" | "maya"; text: string; at: number };

/* A real call, on the clock. The `at` values are the seconds each line lands,
   which also drives the call timer so the two never disagree. */
const SCRIPT: Line[] = [
  { who: "caller", text: "Hi — I'm after a quote for a patio out back.", at: 3 },
  { who: "maya", text: "Happy to help. Is it a new patio, or replacing one that's already there?", at: 9 },
  { who: "caller", text: "New. Maybe four hundred square feet, and it slopes a bit.", at: 17 },
  { who: "maya", text: "Noted — I'll flag the drainage for the estimator. I can get a crew out Tuesday at nine to measure. Does that work?", at: 26 },
  { who: "caller", text: "Tuesday's good, yeah.", at: 34 },
  { who: "maya", text: "Booked. You'll get a text to confirm, and your estimate lands the same day as the visit.", at: 41 },
];

const OUTCOMES = [
  { label: "Lead captured", detail: "Name, number, address", at: 46 },
  { label: "Site visit booked", detail: "Tue 9:00am · crew 2", at: 49 },
  { label: "Handed to Eli", detail: "Drainage flagged on the brief", at: 52 },
];

const END = 56;

export function CallDemo() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  // the clock: one interval drives every element of the scene
  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => {
      setTick((prev) => (prev >= END ? 0 : prev + 1));
    }, 420);
    return () => clearInterval(id);
  }, [inView, reduced]);

  // with motion off the call is shown already completed, not replayed
  const t = reduced ? END : tick;
  const answered = t >= 2;

  const visible = SCRIPT.filter((l) => t >= l.at);
  const speaking = visible.length ? visible[visible.length - 1].who : null;
  const outcomes = OUTCOMES.filter((o) => t >= o.at);

  const mm = String(Math.floor(t / 60)).padStart(2, "0");
  const ss = String(t % 60).padStart(2, "0");

  return (
    <Band>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-5">
          <Reveal>
            <Kicker>A call, start to finish</Kicker>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-[17ch] text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.05]"
          >
            This is the call you just missed.
          </Reveal>
          <Reveal as="p" delay={0.12} className="max-w-[50ch] leading-relaxed text-muted">
            Maya picks up on the second ring, qualifies the job, notices the
            slope, books the visit and hands the brief to Eli — while you are
            still on the mower. No app to open, nothing for you to do afterwards.
          </Reveal>
          <Reveal delay={0.16} className="flex flex-col gap-2 pt-2">
            {[
              "Answers 24/7, including the Sunday enquiries you never see",
              "Books straight onto the calendar your crews already use",
              "Every call recorded, transcribed and searchable",
            ].map((b) => (
              <p key={b} className="flex gap-3 text-[0.9375rem] text-ink-dim">
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-brass" />
                {b}
              </p>
            ))}
          </Reveal>
        </div>

        {/* ---------------- the call itself ---------------- */}
        <Reveal delay={0.1}>
          <div
            ref={ref}
            className="overflow-hidden rounded-3xl border border-line-soft bg-surface"
          >
            {/* status bar */}
            <div className="flex items-center justify-between gap-4 border-b border-line-soft px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full border transition-colors duration-700 ${
                    answered
                      ? "border-turf/40 bg-turf/15"
                      : "border-brass/40 bg-brass/15"
                  }`}
                >
                  <PhoneIcon className={answered ? "text-turf" : "text-brass"} />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-ink">
                    {answered ? "Maya — on the call" : "Incoming call"}
                  </span>
                  <span className="font-mono text-[0.6875rem] text-faint">
                    +1 (317) 555 0148 · Indianapolis
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs tabular-nums text-muted">
                {mm}:{ss}
              </span>
            </div>

            {/* waveform */}
            <Waveform active={answered && t < END} speaking={speaking} />

            {/* transcript */}
            <div className="flex min-h-[280px] flex-col gap-3 px-5 py-4 sm:min-h-[320px]">
              {visible.length === 0 && (
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                  Ringing…
                </p>
              )}
              {visible.map((line, i) => (
                <div
                  key={`${line.at}-${i}`}
                  className={`flex ${line.who === "maya" ? "justify-end" : "justify-start"}`}
                  style={{ animation: reduced ? undefined : "line-in .5s var(--ease) both" }}
                >
                  <div
                    className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[0.875rem] leading-relaxed ${
                      line.who === "maya"
                        ? "rounded-br-sm bg-brass/12 text-ink"
                        : "rounded-bl-sm bg-white/[0.05] text-ink-dim"
                    }`}
                  >
                    <span className="mb-1 block font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-faint">
                      {line.who === "maya" ? "Maya" : "Caller"}
                    </span>
                    {line.text}
                  </div>
                </div>
              ))}
            </div>

            {/* outcomes */}
            <div className="flex flex-wrap gap-2 border-t border-line-soft px-5 py-4">
              {OUTCOMES.map((o) => {
                const on = outcomes.includes(o);
                return (
                  <span
                    key={o.label}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.75rem] transition-all duration-500 ease-[var(--ease)] ${
                      on
                        ? "border-turf/35 bg-turf/10 text-ink opacity-100"
                        : "border-line-soft bg-transparent text-faint opacity-40"
                    }`}
                    style={{ transform: on ? "none" : "translateY(4px)" }}
                  >
                    <TickIcon className={on ? "text-turf" : "text-faint"} />
                    <span>{o.label}</span>
                    <span className="hidden text-faint sm:inline">· {o.detail}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes line-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: none; }
        }
      `}</style>
    </Band>
  );
}

/** Canvas waveform. Bars lean toward whoever is talking, so the graphic is
 *  reporting the conversation rather than just wobbling. */
function Waveform({
  active,
  speaking,
}: {
  active: boolean;
  speaking: "caller" | "maya" | null;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({ active, speaking });

  // the draw loop reads the latest values from a ref so it never restarts
  useEffect(() => {
    state.current = { active, speaking };
  }, [active, speaking]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BARS = 68;
    const W = (canvas.width = 680);
    const H = (canvas.height = 72);
    const gap = W / BARS;
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += 0.06;
      ctx.clearRect(0, 0, W, H);
      const { active: on, speaking: who } = state.current;

      for (let i = 0; i < BARS; i++) {
        const centre = Math.abs(i - BARS / 2) / (BARS / 2);
        const env = 1 - centre * 0.72;
        const wobble =
          Math.sin(t * 1.7 + i * 0.42) * 0.5 +
          Math.sin(t * 2.9 + i * 0.17) * 0.32 +
          Math.sin(t * 0.7 + i) * 0.18;
        const amp = on ? (0.35 + Math.abs(wobble) * 0.85) * env : 0.06;
        const h = Math.max(2, amp * H * 0.86);

        ctx.fillStyle =
          who === "maya" ? "rgba(217,164,65,.85)" : "rgba(182,188,181,.55)";
        const x = i * gap + gap * 0.22;
        const w = Math.max(1.5, gap * 0.42);
        ctx.beginPath();
        ctx.roundRect(x, (H - h) / 2, w, h, w / 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    draw();
    if (!reduced) loop();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="border-b border-line-soft bg-ground/40 px-5 py-3">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-[52px] w-full"
        style={{ display: "block" }}
      />
    </div>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M4.6 1.8 6 4.3 4.7 5.7a8 8 0 0 0 3.6 3.6l1.4-1.3 2.5 1.4v2.2c0 .6-.5 1-1.1 1A10.6 10.6 0 0 1 1.4 2.9c0-.6.4-1.1 1-1.1h2.2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TickIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
      <path d="M2 6.4 4.6 9 10 3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
