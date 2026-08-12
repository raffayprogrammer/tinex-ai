"use client";

import { useEffect, useRef } from "react";

type Target = { x: number; y: number; a: number };

/**
 * Ambient light behind the hero — dawn over a job site rather than a
 * neon glow. Rendered into a deliberately tiny canvas and stretched by CSS:
 * that upscale IS the blur, so it costs almost nothing on a phone.
 *
 * `state` shifts where the light sits, so changing hero state moves the
 * atmosphere with it instead of leaving a static backdrop behind.
 */
const W = 180;
const H = 108;

const STATES: Target[][] = [
  // brass key, turf fill, warm haze, deep floor
  [
    { x: 0.5, y: 0.44, a: 0.3 },
    { x: 0.74, y: 0.3, a: 0.16 },
    { x: 0.28, y: 0.6, a: 0.12 },
    { x: 0.55, y: 0.82, a: 0.1 },
  ],
  [
    { x: 0.3, y: 0.36, a: 0.27 },
    { x: 0.6, y: 0.58, a: 0.19 },
    { x: 0.78, y: 0.28, a: 0.13 },
    { x: 0.44, y: 0.84, a: 0.09 },
  ],
  [
    { x: 0.68, y: 0.5, a: 0.29 },
    { x: 0.34, y: 0.28, a: 0.17 },
    { x: 0.5, y: 0.72, a: 0.14 },
    { x: 0.8, y: 0.66, a: 0.1 },
  ],
];

const TINTS: [number, number, number][] = [
  [217, 164, 65], // brass
  [78, 158, 127], // turf
  [232, 214, 178], // warm haze
  [70, 92, 84], // deep floor
];

export function Atmosphere({ state = 0 }: { state?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);

  // the render loop reads the latest state from a ref rather than restarting
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;

    const blobs = STATES[0].map((b, i) => ({
      ...b,
      r: [0.62, 0.46, 0.4, 0.5][i],
      tint: TINTS[i],
    }));

    let t = 0;
    let raf = 0;
    let running = true;

    const reduced =
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      t += 0.0015;
      const targets = STATES[stateRef.current % STATES.length];

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#0b0e0d";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      blobs.forEach((b, i) => {
        const target = targets[i];
        b.x += (target.x - b.x) * 0.02;
        b.y += (target.y - b.y) * 0.02;
        b.a += (target.a - b.a) * 0.02;

        const dx = reduced ? 0 : Math.sin(t * (1.3 + i * 0.4) + i) * 0.045;
        const dy = reduced ? 0 : Math.cos(t * (1.0 + i * 0.3) + i * 2) * 0.035;

        const cx = (b.x + dx) * W;
        const cy = (b.y + dy) * H;
        const r = b.r * W;
        const [cr, cg, cb] = b.tint;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${b.a})`);
        g.addColorStop(0.45, `rgba(${cr},${cg},${cb},${b.a * 0.3})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      ctx.globalCompositeOperation = "source-over";
    };

    const loop = () => {
      if (!running) return;
      paint();
      raf = requestAnimationFrame(loop);
    };

    // always paint one frame so the panel is never an empty black box
    paint();
    if (!reduced) loop();

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        loop();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ filter: "saturate(112%)" }}
    />
  );
}
