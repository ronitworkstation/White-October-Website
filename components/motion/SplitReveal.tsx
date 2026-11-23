"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { DUR, EASE, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  as?: ElementType;
  /** "lines": lines rise out of a mask. "words": words rise out of a mask. */
  type?: "lines" | "words";
  /** "load": plays once on page load. "scroll": plays once when it enters the view. */
  trigger?: "load" | "scroll";
  /** Words brighten from faint to full as the reader scrolls through the block (sets the reading pace). */
  scrub?: boolean;
  delay?: number;
  className?: string;
  id?: string;
  children: ReactNode;
};

// Text reveal built on GSAP SplitText. The text is server-rendered and stays in the HTML as-is;
// the split happens only in the browser, only with full motion, and after the web fonts load
// (autoSplit re-splits on resize/font swaps, and the returned tween is re-synced each time).
// Screen readers read the original text: aria "auto" labels the element and hides the pieces.
// Before the split, CSS keeps the block invisible under full motion so it never flashes (globals.css).
export function SplitReveal({
  as: Tag = "div",
  type = "lines",
  trigger = "scroll",
  scrub = false,
  delay = 0,
  className,
  id,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      let split: SplitText | undefined;
      let cancelled = false;

      const run = contextSafe!(() => {
        if (cancelled) return;
        split = SplitText.create(el, {
          type: scrub || type === "words" ? "words" : "lines",
          mask: scrub ? undefined : type,
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            el.dataset.splitReady = "";
            if (scrub) {
              return gsap.fromTo(
                self.words,
                // 0.45 keeps unread words at about 3:1 on white: still clearly "not yet", and legible (WCAG large text).
                { opacity: 0.45 },
                {
                  opacity: 1,
                  ease: "none",
                  stagger: 0.1,
                  scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 50%", scrub: 0.6 },
                },
              );
            }
            const pieces = type === "lines" ? self.lines : self.words;
            return gsap.from(pieces, {
              yPercent: 110,
              duration: DUR.slow,
              ease: EASE,
              stagger: type === "lines" ? 0.08 : 0.04,
              delay,
              scrollTrigger: trigger === "scroll" ? { trigger: el, start: "top 85%", once: true } : undefined,
            });
          },
        });
      });

      document.fonts.ready.then(run);
      return () => {
        cancelled = true;
        split?.revert();
        delete el.dataset.splitReady;
      };
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}
