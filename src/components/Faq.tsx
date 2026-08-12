"use client";

import { useId, useState } from "react";
import { faq } from "@/content/site";
import { Reveal } from "./Reveal";
import { Band, SectionHead } from "./ui";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <Band id="faq">
      <SectionHead
        kicker="Questions"
        heading="The ones worth asking before you sign anything."
      />

      <Reveal className="flex flex-col border-t border-line-soft">
        {faq.map((item, i) => {
          const isOpen = open === i;
          const panelId = `${base}-panel-${i}`;
          const buttonId = `${base}-button-${i}`;

          return (
            <div key={item.q} className="border-b border-line-soft">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] tracking-[-0.02em] transition-colors duration-400 ease-[var(--ease-soft)] hover:text-brass"
                >
                  {item.q}
                  <Sign open={isOpen} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="acc"
                data-open={isOpen}
              >
                <div>
                  <p className="max-w-[68ch] pb-6 text-[0.9375rem] leading-relaxed text-muted">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </Reveal>
    </Band>
  );
}

function Sign({ open }: { open: boolean }) {
  return (
    <span className="relative h-3 w-3 shrink-0" aria-hidden="true">
      <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
      <span
        className={`absolute left-0 top-1/2 h-px w-full bg-current transition-[transform,opacity] duration-500 ease-[var(--ease)] ${
          open ? "rotate-0 opacity-0" : "rotate-90 opacity-100"
        }`}
      />
    </span>
  );
}
