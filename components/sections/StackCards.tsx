"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Stacking cards (pattern after Olivier Larose's "stacking cards"). Layout lives in the markup: from md up each
// <li data-stack-item> is a full-height sticky slot, so every card pins and the next one slides over it.
// Motion (full motion, md and up only):
// - a card shrinks a little as the cards after it arrive (reason: shows depth, the earlier family steps back);
// - its photo settles from a slight zoom while the card scrolls into place (reason: draws the eye to the product).
// Transform only. Reduced motion keeps the plain sticky stack with no scaling.
export function StackCards({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLUListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const list = root.current!;
        const items = gsap.utils.toArray<HTMLElement>("[data-stack-item]", list);
        const n = items.length;
        items.forEach((item, i) => {
          const card = item.querySelector<HTMLElement>("[data-stack-card]");
          const img = item.querySelector<HTMLElement>("[data-stack-img]");
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.3 },
              { scale: 1, ease: "none", scrollTrigger: { trigger: item, start: "top bottom", end: "top top", scrub: true } },
            );
          }
          if (card && i < n - 1) {
            gsap.to(card, {
              scale: 1 - (n - i) * 0.05,
              ease: "none",
              transformOrigin: "50% 0%",
              scrollTrigger: { trigger: item, start: "top top", endTrigger: list, end: "bottom bottom", scrub: true },
            });
          }
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <ul ref={root} className={className}>
      {children}
    </ul>
  );
}
