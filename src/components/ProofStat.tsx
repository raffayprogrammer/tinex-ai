"use client";

import { useCountUp } from "./useCountUp";
import { useInView } from "./useInView";

/**
 * Parses a display figure like "77%", "726,565" or "$500–$2,000" into a
 * countable number plus its surrounding characters, so the tally is driven by
 * the same string the copy uses. Ranges count the upper bound and keep the
 * lower one static — animating both reads as a slot machine.
 */
export function ProofStat({ figure }: { figure: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });

  const match = figure.match(/^(.*?)([\d,]+)([^\d]*)$/);
  const prefix = match?.[1] ?? "";
  const digits = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = Number(digits.replace(/,/g, "")) || 0;

  const value = useCountUp(target, inView, 1400);
  const grouped = digits.includes(",");

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {target
        ? grouped
          ? Math.round(value).toLocaleString("en-US")
          : Math.round(value)
        : digits}
      {suffix}
    </span>
  );
}
