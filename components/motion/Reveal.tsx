"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  as?: ElementType;
  /** Animate the direct children one after another instead of the block as a whole. */
  stagger?: boolean;
  delay?: number;
  className?: string;
  children: ReactNode;
};

// Scroll reveal: the block (or each direct child) rises 24px and fades in once, when it enters the view.
// Reason: content that arrives as you scroll reads as sequence; once only, so scrolling back up stays calm.
// Server HTML is complete; under full motion CSS keeps it invisible until the tween takes over (globals.css),
// under reduced motion nothing is hidden or animated.
export function Reveal({ as: Tag = "div", stagger = false, delay = 0, className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.fromTo(
        targets,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.slow,
          ease: EASE,
          delay,
          stagger: stagger ? 0.08 : 0,
          clearProps: "transform",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onStart: () => el.setAttribute("data-reveal-ready", ""),
        },
      );
      el.setAttribute("data-reveal-ready", "");
    },
    { scope: ref, dependencies: [stagger, delay] },
  );

  return (
    <Tag ref={ref} data-reveal={stagger ? "group" : "self"} className={className}>
      {children}
    </Tag>
  );
}
