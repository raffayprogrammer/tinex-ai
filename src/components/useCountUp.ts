"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Counts from 0 to `target` once `run` goes true. Figures on this page are
 * money and volume, so they should tally rather than appear — but never at
 * the cost of legibility, hence the instant resolve under reduced motion.
 */
export function useCountUp(target: number, run: boolean, duration = 1100) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!run || reduced || started.current) return;
    started.current = true;

    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setValue(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration, reduced]);

  // with motion off the figure is derived at its final value, never tweened
  return reduced ? target : value;
}
