"use client";

import { useRef } from "react";
import { DUR, gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { site } from "@/content/site";

// Four steps. Desktop with full motion: the section pins and the steps hand over one by one as you scroll
// (reason: the process is a sequence, so scroll position becomes the "next step" control).
// Phones, tablets and reduced motion: a plain stacked list, no pin. Layout is CSS only (`lg:full-motion:`);
// JS only drives the timeline when the same condition holds.
export function Process() {
  const root = useRef<HTMLElement>(null);
  const { label, title, steps } = site.process;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-step]", root.current!);
        const dots = gsap.utils.toArray<HTMLElement>("[data-dot]", root.current!);
        gsap.set(panels.slice(1), { opacity: 0, y: 40 });
        gsap.set(dots, { opacity: 0.3 });
        gsap.set(dots[0], { opacity: 1 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: `+=${steps.length * 70}%`, pin: true, scrub: 0.6 },
          defaults: { ease: "none" },
        });
        for (let i = 1; i < panels.length; i++) {
          tl.to(panels[i - 1], { opacity: 0, y: -40, duration: DUR.quick }, i * 1)
            .to(panels[i], { opacity: 1, y: 0, duration: DUR.quick }, i * 1 + 0.15)
            .to(dots[i - 1], { opacity: 0.3, duration: DUR.quick }, i * 1)
            .to(dots[i], { opacity: 1, duration: DUR.quick }, i * 1 + 0.15);
        }
        tl.to({}, { duration: 0.4 }); // brief hold on the last step before the pin releases
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [steps.length] },
  );

  return (
    <section
      ref={root}
      id="process"
      aria-labelledby="process-title"
      className="chamber-top relative -mt-8 scroll-mt-0 bg-canvas py-20 md:-mt-16 md:py-28 lg:full-motion:flex lg:full-motion:h-screen lg:full-motion:items-center lg:full-motion:py-0"
    >
      <div className="container-site">
        <p className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
          <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
          {label}
        </p>
        <h2 id="process-title" className="text-h1 mt-5 text-ink">
          <span className="font-bold">{title.bold}</span> <span className="font-light">{title.rest}</span>
        </h2>

        {/* Stacked by default. Desktop + full motion: panels share one grid cell and cross-fade. */}
        <ol className="mt-12 grid gap-10 md:mt-16 lg:full-motion:mt-14 lg:full-motion:gap-0">
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-step
              className="grid gap-3 border-t-2 border-ink pt-5 md:grid-cols-[120px_1fr] md:gap-8 lg:full-motion:[grid-area:1/1] lg:full-motion:border-t-0 lg:full-motion:pt-0"
            >
              <span aria-hidden className="font-display text-[56px] font-bold leading-none text-orange-ink md:text-[96px] lg:full-motion:text-[160px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h2 font-bold text-ink">{s.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[18px] leading-snug text-grey-ink md:text-[20px]">{s.line}</p>
              </div>
            </li>
          ))}
        </ol>

        <ul aria-hidden className="mt-10 hidden gap-2 lg:full-motion:flex">
          {steps.map((s) => (
            <li key={s.title} data-dot className="h-1.5 w-12 rounded-full bg-ink" />
          ))}
        </ul>
      </div>
    </section>
  );
}
