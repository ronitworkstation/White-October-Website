"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Magnetic pull: the wrapped control leans up to `strength` x the cursor's offset toward the pointer and
// springs back on leave. Reason: feedback that the primary action is live, before the click.
// Mouse only (hover + fine pointer); touch and keyboard users get the normal button. Off under reduced motion.
export function Magnetic({ strength = 0.28, className = "", children }: { strength?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * strength);
        y((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref, dependencies: [strength] },
  );

  return (
    <span ref={ref} className={`inline-flex ${className}`}>
      {children}
    </span>
  );
}
