"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A rail that fills in proportion to how far the reader has scrolled through
 * the sequence. Scroll-linked rather than time-linked, so it reports the
 * reader's own progress instead of animating at them.
 */
export function StepRail() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;
    const measure = () => {
      const parent = el.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top reaches 80% down the viewport,
      // 1 when its bottom passes 40% down
      const start = vh * 0.8;
      const end = vh * 0.4;
      const raw = (start - r.top) / Math.max(1, r.height - (start - end));
      setProgress(Math.max(0, Math.min(1, raw)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(measure);
        ticking = true;
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-line-soft sm:block"
    >
      <span
        className="block w-full origin-top bg-gradient-to-b from-brass to-brass/20"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
