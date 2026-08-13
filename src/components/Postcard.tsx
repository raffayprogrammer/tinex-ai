"use client";

import { JobPhoto } from "./JobPhoto";
import { useCountUp } from "./useCountUp";
import { useInView } from "./useInView";

/**
 * The NeighborReach mechanism, drawn instead of described: a street grid, the
 * radius sweeping out from the finished job, houses lighting up as they fall
 * inside it, and the card that lands on their mat.
 */
export function Postcard() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const homes = useCountUp(120, inView, 1400);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      {/* --- radius map --- */}
      <div className="relative overflow-hidden rounded-2xl border border-line-soft bg-ground">
        <svg viewBox="0 0 400 240" className="block w-full" role="img" aria-label="Postcards sent to homes within a four-block radius of a completed job">
          <defs>
            <radialGradient id="sweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D9A441" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#D9A441" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#D9A441" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* street grid */}
          <g stroke="rgba(242,240,234,.09)" strokeWidth="1">
            {[40, 80, 120, 160, 200].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
            ))}
            {[50, 110, 170, 230, 290, 350].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="240" />
            ))}
          </g>

          {/* the radius */}
          <circle
            cx="200"
            cy="120"
            r="105"
            fill="url(#sweep)"
            stroke="rgba(217,164,65,.35)"
            strokeDasharray="4 5"
            style={{
              transformOrigin: "200px 120px",
              transform: inView ? "scale(1)" : "scale(0.2)",
              opacity: inView ? 1 : 0,
              transition: "transform 1.6s var(--ease) .2s, opacity 1s var(--ease-soft) .2s",
            }}
          />

          {/* neighbouring homes lighting up as the radius reaches them */}
          {HOUSES.map((h, i) => {
            const inside = Math.hypot(h.x - 200, h.y - 120) < 105;
            return (
              <rect
                key={i}
                x={h.x - 4}
                y={h.y - 4}
                width="8"
                height="8"
                rx="1.5"
                fill={inside ? "#D9A441" : "rgba(242,240,234,.16)"}
                style={{
                  opacity: inView ? (inside ? 0.95 : 0.35) : 0,
                  transition: `opacity .5s var(--ease-soft) ${0.5 + i * 0.035}s`,
                }}
              />
            );
          })}

          {/* the finished job */}
          <g style={{ opacity: inView ? 1 : 0, transition: "opacity .6s var(--ease-soft) .1s" }}>
            <circle cx="200" cy="120" r="9" fill="#4E9E7F" />
            <circle cx="200" cy="120" r="9" fill="none" stroke="#4E9E7F" strokeOpacity="0.5">
              <animate attributeName="r" values="9;22;9" dur="3s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        <div className="flex items-center justify-between gap-4 border-t border-line-soft px-4 py-3">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
            Job complete · 14 Oak Ridge Dr
          </span>
          <span className="font-mono text-[0.75rem] tabular-nums text-brass">
            {Math.round(homes)} homes
          </span>
        </div>
      </div>

      {/* --- the card that lands --- */}
      <div className="grid grid-cols-[1.15fr_1fr] gap-3 rounded-2xl border border-line-soft bg-surface p-3">
        <JobPhoto
          slot="patio-after"
          caption="Your finished job"
          className="aspect-[4/3] rounded-xl"
        />
        <div className="flex flex-col justify-between gap-3 py-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-[0.9375rem] leading-snug text-ink">
              We just finished a patio on your street.
            </span>
            <span className="text-[0.75rem] leading-relaxed text-muted">
              Free quotes for Oak Ridge neighbours through October.
            </span>
          </div>
          <div className="flex flex-col gap-1 border-t border-line-soft pt-2.5">
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-faint">
              Postage paid
            </span>
            <span className="font-mono text-[0.625rem] leading-relaxed text-faint">
              RESIDENT
              <br />
              OAK RIDGE DR
              <br />
              INDIANAPOLIS IN
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const HOUSES = [
  { x: 80, y: 60 }, { x: 140, y: 60 }, { x: 200, y: 55 }, { x: 260, y: 60 }, { x: 320, y: 60 },
  { x: 80, y: 100 }, { x: 140, y: 100 }, { x: 260, y: 100 }, { x: 320, y: 100 },
  { x: 80, y: 140 }, { x: 140, y: 140 }, { x: 260, y: 140 }, { x: 320, y: 140 },
  { x: 80, y: 180 }, { x: 140, y: 180 }, { x: 200, y: 185 }, { x: 260, y: 180 }, { x: 320, y: 180 },
  { x: 30, y: 80 }, { x: 30, y: 160 }, { x: 370, y: 80 }, { x: 370, y: 160 },
];
