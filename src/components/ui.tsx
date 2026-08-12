import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Kicker({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  kicker,
  heading,
  body,
  align = "left",
}: {
  kicker: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-4 ${
        centered ? "items-center text-center" : "max-w-[58ch]"
      } mb-12 sm:mb-16`}
    >
      <Reveal as="div">
        <Kicker>{kicker}</Kicker>
      </Reveal>
      <Reveal
        as="h2"
        delay={0.06}
        className="text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.05]"
      >
        {heading}
      </Reveal>
      {body && (
        <Reveal
          as="p"
          delay={0.12}
          className={`text-[0.9375rem] leading-relaxed text-muted sm:text-base ${
            centered ? "max-w-[54ch]" : "max-w-[56ch]"
          }`}
        >
          {body}
        </Reveal>
      )}
    </div>
  );
}

export function Band({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-line-soft py-20 sm:py-28 lg:py-32 ${className}`}
    >
      <Shell>{children}</Shell>
    </section>
  );
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,border-color,transform,color] duration-400 ease-[var(--ease)] active:scale-[0.97]";

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
}) {
  const styles =
    variant === "solid"
      ? "sheen bg-brass text-[#12100a] hover:bg-[#e6b455]"
      : "border border-line bg-white/[0.04] text-ink hover:border-white/25 hover:bg-white/[0.09]";

  return (
    <a href={href} className={`group ${BASE} ${styles} ${className}`}>
      {children}
    </a>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-400 ease-[var(--ease)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px] ${className}`}
    >
      <path
        d="M2 9 9 2M3.4 2H9v5.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`mt-[0.3rem] shrink-0 ${className}`}
    >
      <path
        d="M2 6.4 4.6 9 10 3.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
