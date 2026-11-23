"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Slow drift: the wrapped photo moves down `distance` px while the hero scrolls away, so it lags the page.
// Reason: depth. The people stay put while the floor moves a little slower than the text. Transform only,
// scrubbed to scroll, off under reduced motion.
export function Parallax({ className, distance = 48, children }: { className?: string; distance?: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const section = el.closest("section") ?? el;
      gsap.to(el, {
        y: distance,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: ref, dependencies: [distance] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
