"use client";

import { useRef, useState } from "react";
import { Plus } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappHref } from "@/content/site";

// FAQ. Desktop: questions on the left, the answer on the right (click or arrow keys). Phones: accordion.
// Answers are unpublished until Medhansh confirms the facts: those show the "pending" line, nothing invented.
export function Faq() {
  const { label, title, items, pending } = site.faq;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const answer = (i: number) => items[i].a || pending;

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="chamber-top relative -mt-8 scroll-mt-0 bg-canvas py-20 md:-mt-16 md:py-28">
      <div className="container-site">
        <p className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
          <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
          {label}
        </p>
        <h2 id="faq-title" className="text-h1 mt-5 text-ink">
          <span className="font-bold">{title.bold}</span> <span className="font-light">{title.rest}</span>
        </h2>

        <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <ul className="divide-y-2 divide-ink border-y-2 border-ink">
            {items.map((it, i) => {
              const open = active === i;
              return (
                <li key={it.q}>
                  <h3>
                    <button
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      type="button"
                      aria-expanded={open}
                      // Phones show the inline answer, desktop the shared panel (the inline one is display:none there).
                      aria-controls={`faq-a-${i} faq-panel`}
                      onClick={() => setActive(i)}
                      onKeyDown={(e) => onKey(e, i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-[19px] font-semibold leading-snug text-ink md:text-[22px]"
                    >
                      {it.q}
                      <Plus
                        size={20}
                        weight="bold"
                        aria-hidden
                        className={`shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-orange-ink" : ""}`}
                      />
                    </button>
                  </h3>
                  {/* Phones: the answer opens under its question */}
                  <div id={`faq-a-${i}`} hidden={!open} className="pb-5 text-[17px] leading-snug text-grey-ink lg:hidden">
                    {answer(i)}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Desktop: one answer panel that follows the selected question */}
          <div id="faq-panel" aria-live="polite" className="hidden self-start rounded-card bg-black p-10 text-white lg:sticky lg:top-28 lg:block">
            <p className="text-[13px] uppercase tracking-[0.14em] text-grey-soft">Answer</p>
            <p className="mt-4 text-[22px] font-semibold leading-snug">{items[active].q}</p>
            <p className="mt-4 text-[18px] leading-snug text-grey-soft">{answer(active)}</p>
            <div className="mt-8">
              <ButtonLink href={whatsappHref()} variant="outline-light" target="_blank" rel="noopener">
                Ask on WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
