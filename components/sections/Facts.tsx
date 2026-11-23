"use client";

import { useRef } from "react";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/site";

// Black chamber with four real facts as big Antonio numbers. Server HTML already shows the final numbers;
// with full motion they count up from 0 when the band enters (reason: the numbers are the proof).
export function Facts() {
  const root = useRef<HTMLElement>(null);
  const { facts } = site.whyUs;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const counters = gsap.utils.toArray<HTMLElement>("[data-count]", root.current);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
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
    <section ref={root} aria-label="White October in numbers" className="chamber-top bg-black py-20 text-white md:py-28">
      <ul className="container-site grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {facts.map((f) => (
          <li key={f.label} data-fact className="border-t-2 border-line pt-5">
            <p
              className={`font-display font-bold leading-none text-orange ${
                "value" in f ? "text-[64px] md:text-[96px] lg:text-[112px]" : "whitespace-nowrap text-[44px] md:text-[64px] lg:text-[52px] xl:text-[72px]"
              }`}
            >
              {"value" in f ? (
                <>
                  <span data-count={f.value}>{f.value}</span>
                  {f.suffix}
                </>
              ) : (
                f.text
              )}
            </p>
            <p className="mt-4 text-[15px] leading-snug text-grey-soft md:text-[17px]">{f.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
