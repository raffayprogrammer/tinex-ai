"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

/**
 * The pill's indicator follows the pointer, then settles back onto whichever
 * section you are actually reading. Scroll spy and hover share one element,
 * so the nav never shows two competing "you are here" signals.
 */
export function Nav() {
  const pillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>("");

  const moveThumb = useCallback((el: HTMLElement | null) => {
    const pill = pillRef.current;
    const thumb = thumbRef.current;
    if (!pill || !thumb) return;
    if (!el) {
      thumb.style.opacity = "0";
      return;
    }
    const p = pill.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    thumb.style.opacity = "1";
    thumb.style.width = `${r.width}px`;
    thumb.style.transform = `translateX(${r.left - p.left}px)`;
  }, []);

  const settle = useCallback(() => {
    const pill = pillRef.current;
    if (!pill) return;
    moveThumb(pill.querySelector<HTMLElement>('[data-active="true"]'));
  }, [moveThumb]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    return () => spy.disconnect();
  }, []);

  useEffect(() => {
    settle();
    window.addEventListener("resize", settle);
    return () => window.removeEventListener("resize", settle);
  }, [active, settle]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-5 py-4 transition-[background-color,backdrop-filter,border-color] duration-500 ease-[var(--ease-soft)] sm:px-8 ${
        stuck
          ? "border-b border-line-soft bg-ground/75 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <a href="#top" className="group flex items-center gap-2.5" aria-label={`${site.name}, back to top`}>
        <Logo />
        <span className="text-[0.9375rem] font-semibold tracking-[-0.01em]">
          Tinex<span className="text-brass">.AI</span>
        </span>
      </a>

      <nav
        ref={pillRef}
        onMouseLeave={settle}
        aria-label="Sections"
        className="relative hidden items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1 backdrop-blur-xl lg:flex"
      >
        <span
          ref={thumbRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1 h-[calc(100%-0.5rem)] rounded-full bg-white/[0.075] opacity-0 transition-[transform,width,opacity] duration-500 ease-[var(--ease)]"
        />
        {nav.map((item) => {
          const isActive = active === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              data-active={isActive}
              onMouseEnter={(e) => moveThumb(e.currentTarget)}
              onFocus={(e) => moveThumb(e.currentTarget)}
              className={`relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-350 ease-[var(--ease-soft)] ${
                isActive ? "text-ink" : "text-ink-dim hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          );
        })}

        <span className="mx-1.5 h-[18px] w-px bg-line" aria-hidden="true" />

        <span className="flex items-center gap-2 py-1.5 pl-2 pr-1.5 text-[0.8125rem] text-ink-dim">
          On shift
          <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-turf/30 bg-turf/15">
            <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-turf" />
          </span>
        </span>
      </nav>

      <a
        href="#pricing"
        className="group inline-flex items-center gap-2 rounded-full bg-brass px-4 py-2 text-[0.8125rem] font-medium text-[#12100a] transition-colors duration-400 hover:bg-[#e6b455]"
      >
        Start hiring
      </a>
    </header>
  );
}

function Logo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="6" stroke="rgba(242,240,234,.2)" />
      {/* a T cut from a shift block — the mark reads as a name badge */}
      <path d="M6 7.5h12M12 7.5V17" stroke="#D9A441" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="1.4" fill="#4E9E7F" />
    </svg>
  );
}
