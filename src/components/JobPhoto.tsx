"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * A slot for one of your own job photographs.
 *
 * TO ADD A REAL PHOTO: drop a file into `public/photos/` named after the
 * `slot` prop — e.g. slot="patio-after" looks for `/photos/patio-after.jpg`.
 * Nothing else to change; it swaps in on next load.
 *
 * Until then this renders a designed placeholder rather than a broken image
 * or an empty box, so the page is presentable before the photography exists.
 */
export function JobPhoto({
  slot,
  caption,
  className = "",
  sizes = "(max-width: 768px) 100vw, 45vw",
}: {
  slot: string;
  caption?: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden bg-surface-2 ${className}`}
      aria-label={caption}
    >
      {!failed && (
        <Image
          src={`/photos/${slot}.jpg`}
          alt={caption ?? ""}
          fill
          sizes={sizes}
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease)] group-hover:scale-[1.04]"
        />
      )}

      {failed && (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(150deg,#171e1b,#0f1412_60%)]">
          {/* faint contour lines — reads as ground, not as a missing asset */}
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.35]"
            viewBox="0 0 200 150"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <path
                key={i}
                d={`M-20 ${40 + i * 22} Q 50 ${20 + i * 22} 100 ${42 + i * 22} T 220 ${34 + i * 22}`}
                fill="none"
                stroke="rgba(217,164,65,.16)"
                strokeWidth="1"
              />
            ))}
          </svg>
          <div className="relative flex flex-col items-center gap-1.5 px-4 text-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="1.5" y="3.5" width="17" height="13" rx="2.5" stroke="rgba(217,164,65,.5)" />
              <circle cx="7" cy="8" r="1.6" stroke="rgba(217,164,65,.5)" />
              <path d="M2.5 14.5 7 10.5l3.5 3 3-2.5 4 3.5" stroke="rgba(217,164,65,.5)" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-[0.5625rem] uppercase leading-relaxed tracking-[0.12em] text-faint">
              /photos/{slot}.jpg
            </span>
          </div>
        </div>
      )}

      {caption && !failed && (
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ink/80">
          {caption}
        </span>
      )}
    </div>
  );
}
