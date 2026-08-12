import { nav, site } from "@/content/site";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { Kicker, Shell } from "./ui";

export function Close() {
  return (
    <>
      <section
        id="contact"
        className="relative mx-2 mb-2 grid justify-items-center gap-6 overflow-hidden rounded-[24px] border border-line-soft bg-surface px-5 py-24 text-center sm:mx-4 sm:mb-4 sm:rounded-[28px] sm:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-1/4 bottom-[-60%] h-[120%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(217,164,65,.16),transparent_62%)]"
        />

        <Reveal className="relative">
          <Kicker>Indianapolis · Colorado Front Range · remote elsewhere</Kicker>
        </Reveal>

        <Reveal
          as="h2"
          delay={0.06}
          className="relative max-w-[17ch] text-[clamp(1.9rem,4.4vw,3.2rem)] leading-[1.02]"
        >
          Stop answering the phone on the mower.
        </Reveal>

        <Reveal
          as="p"
          delay={0.12}
          className="relative max-w-[46ch] leading-relaxed text-muted"
        >
          Twenty minutes on a call is enough to work out which one you should
          hire first — and whether you should hire one from us at all.
        </Reveal>

        <Reveal delay={0.18} className="relative flex flex-wrap justify-center gap-2.5">
          <a
            href="mailto:hello@tinex.ai?subject=Hiring%20an%20AI%20employee"
            className="sheen group inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-medium text-[#12100a] transition-colors duration-400 hover:bg-[#e6b455]"
          >
            Book the call
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-400 ease-[var(--ease)] group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
            >
              <path
                d="M2 9 9 2M3.4 2H9v5.6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-6 py-3 text-sm text-ink transition-[background-color,border-color] duration-400 hover:border-white/25 hover:bg-white/[0.09]"
          >
            Look at pricing again
          </a>
        </Reveal>
      </section>

      <footer className="border-t border-line-soft py-10">
        <Shell className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-3">
              <Logo size={26} />
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                AI labor for home services
              </span>
            </div>
            <nav className="flex flex-wrap gap-6" aria-label="Footer">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-[0.8125rem] text-muted transition-colors duration-350 hover:text-ink"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Compliance disclosure the business plan flags as blocking */}
          <p className="max-w-[76ch] border-t border-line-soft pt-6 text-[0.75rem] leading-relaxed text-faint">
            Every Tinex voice agent identifies itself as artificial intelligence
            at the start of every call and announces that the call is being
            recorded before any other conversation takes place. Outbound calling
            is placed only where documented prior express written consent is on
            file. Pricing shown excludes applicable taxes; minute allowances and
            overage rates are set out in your service agreement.
          </p>

          <span className="text-[0.75rem] text-faint">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
        </Shell>
      </footer>
    </>
  );
}
