"use client";

import { useRef } from "react";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Fact = { value: number; suffix: string; label: string } | { text: string; label: string };

// The row of real facts under the "Why White October" statement (Benzai10 layout: value over a small label,
// thin dividers between). Server HTML already shows the final numbers; with full motion they count up from 0
// when the row enters (reason: the numbers are the proof, so they get a moment of their own) and the
// dividers draw in with them.
export function FactsRow({ facts }: { facts: Fact[] }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]", root.current);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 85%", once: true } });
      tl.from("[data-divider]", { scale: 0, transformOrigin: "0 0", duration: DUR.slow, ease: EASE, stagger: 0.08 }, 0);
      tl.from("[data-fact]", { y: 24, opacity: 0, duration: DUR.standard, ease: EASE, stagger: 0.08 }, 0);
      counters.forEach((el) => {
        const end = Number(el.dataset.count);
        const n = { v: 0 };
        el.textContent = "0";
        tl.to(n, { v: end, duration: DUR.slow * 1.4, ease: "power2.out", onUpdate: () => (el.textContent = String(Math.round(n.v))) }, 0.1);
      });
    },
    { scope: root },
  );

  return (
    <ul ref={root} className="grid grid-cols-2 lg:grid-cols-4">
      {facts.map((f, i) => (
        <li key={f.label} className={`relative py-6 pr-4 lg:py-2 ${i === 0 ? "lg:pl-0" : "lg:pl-10 xl:pl-12"} ${i % 2 === 1 ? "pl-5" : ""}`}>
          {/* Phones: rules above each row and between the two columns. Desktop: one rule before each column. */}
          <span aria-hidden data-divider className={`absolute left-0 top-0 h-px w-full bg-grey-soft lg:h-full lg:w-px ${i === 0 ? "lg:hidden" : ""}`} />
          {i % 2 === 1 && <span aria-hidden data-divider className="absolute left-0 top-0 h-full w-px bg-grey-soft lg:hidden" />}
          <div data-fact>
            <p className="whitespace-nowrap text-[min(44px,8.5vw)] font-light leading-none tracking-[-0.03em] text-ink md:text-[56px] lg:text-[min(4vw,84px)]">
              {"value" in f ? (
                <>
                  <span data-count={f.value}>{f.value}</span>
                  {f.suffix}
                </>
              ) : (
                f.text
              )}
            </p>
            <p className="mt-4 text-[14px] leading-snug text-grey-ink md:text-[16px] xl:text-[20px]">{f.label}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
