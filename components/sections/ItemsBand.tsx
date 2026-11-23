"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { solutions } from "@/content/solutions";

// "Everything we make": an orange band with every item from the four solution families running in two rows,
// opposite directions, and one product photo standing in front of them.
// Reference: Yucca Packaging service page (Awwwards SOTD): flat colour panel, product centred, two rows of names
// behind it. Reason: shows the breadth of the catalogue in one glance without becoming a catalogue.
// Motion: rows drift slowly and speed up with scroll velocity, then ease back. Reduced motion: static, wrapped rows.
const all = solutions.flatMap((s) => s.items.map((i) => i.name));
const rows = [all.slice(0, Math.ceil(all.length / 2)), all.slice(Math.ceil(all.length / 2))];

export function ItemsBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current || prefersReducedMotion()) return;
      const tracks = gsap.utils.toArray<HTMLElement>("[data-track]", root.current);
      const loops = tracks.map((t, i) =>
        i % 2 === 0
          ? gsap.fromTo(t, { xPercent: 0 }, { xPercent: -50, duration: 60, ease: "none", repeat: -1 })
          : gsap.fromTo(t, { xPercent: -50 }, { xPercent: 0, duration: 60, ease: "none", repeat: -1 }),
      );
      let settle: gsap.core.Tween | undefined;
      // Scroll velocity drives speed: up to 6x while scrolling fast, eased back to 1x.
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 300);
          loops.forEach((l) => gsap.to(l, { timeScale: boost, duration: 0.2, overwrite: true }));
          settle?.kill();
          settle = gsap.delayedCall(0.25, () => loops.forEach((l) => gsap.to(l, { timeScale: 1, duration: 1, overwrite: true })));
        },
        onLeave: () => loops.forEach((l) => l.pause()),
        onEnterBack: () => loops.forEach((l) => l.resume()),
        onLeaveBack: () => loops.forEach((l) => l.pause()),
        onEnter: () => loops.forEach((l) => l.resume()),
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="items-title" className="relative overflow-hidden bg-orange py-20 text-ink md:py-28">
      <h2 id="items-title" className="sr-only">
        Everything we make
      </h2>
      <p aria-hidden className="container-site mb-8 text-[13px] font-semibold uppercase tracking-[0.16em] md:mb-12">
        Everything we make
      </p>

      <div className="relative">
        <div className="space-y-2 md:space-y-4">
          {rows.map((row, r) => (
            <div key={r} className="overflow-hidden reduced:overflow-visible">
              <ul
                data-track
                className="flex w-max gap-6 whitespace-nowrap text-[36px] font-light leading-none tracking-[-0.02em] md:gap-10 md:text-[72px] lg:text-[96px] reduced:w-full reduced:flex-wrap reduced:justify-center reduced:gap-x-6 reduced:gap-y-2 reduced:whitespace-normal reduced:text-[28px] reduced:md:text-[40px]"
              >
                {[...row, ...row].map((name, i) => (
                  <li key={`${name}-${i}`} aria-hidden={i >= row.length || undefined} className={i >= row.length ? "reduced:hidden" : ""}>
                    {name}
                    <span aria-hidden className="ml-6 inline-block size-3 -rotate-8 bg-ink align-middle md:ml-10 md:size-4" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The product in front of the moving names (hidden when motion is reduced and the rows wrap). */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center reduced:hidden">
          <div className="w-[min(320px,56vw)] -rotate-3 overflow-hidden rounded-card">
            <Image src="/images/solutions/swag-boxes.webp" alt="" width={589} height={442} sizes="320px" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
