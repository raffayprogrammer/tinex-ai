"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * The single scroll-reveal contract for the whole site.
 * Everything that enters on scroll goes through this, so the page has one
 * easing curve and one distance rather than a dozen slightly different ones.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${seen ? "in" : ""} ${className}`}
      style={delay ? ({ "--d": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
