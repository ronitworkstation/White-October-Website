"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Site-wide scroll transitions. Renders nothing; lives in the site layout and re-runs on every route change.
//
// 1. Chamber arrivals, every page: any element marked [data-chamber-in] (the curved sections) grows from 94% to full
//    width as its top travels from the bottom of the screen to 55% up. Reason: sections read as panels stacking
//    onto the page, the same curved-edge idea as the page-transition curtain.
// 2. Hero hand-over, home only (a section labelled #hero-title): headline and subline lift and fade first, the CTAs
//    follow, the photo settles back as the dark clients chamber rises over it. Reason: the first screen hands over
//    to the proof instead of just scrolling off.
//
// One signature moment per page; nothing on the quote form. Scrubbed (no autoplay), transform and opacity only.
// Off under reduced motion.
export function SectionMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Next keeps visited routes mounted but hidden (display: none), and a route can stream in after the pathname
      // changes (Suspense). So: only take elements of the shown route, and rebuild when that set changes.
      const visible = (selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector).filter((el) => el.getClientRects().length > 0);

      let ctx: gsap.Context | undefined;
      let targets: HTMLElement[] = [];
      const build = () => {
        const hero = visible("section[aria-labelledby='hero-title']")[0];
        const chambers = visible("[data-chamber-in]");
        const next = hero ? [hero, ...chambers] : chambers;
        if (next.length === targets.length && next.every((el, i) => el === targets[i])) return;
        targets = next;
        ctx?.revert();
        ctx = gsap.context(() => {
          if (hero) {
            const q = (s: string) => hero.querySelector<HTMLElement>(s);
            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
            });
            tl.to([q("#hero-title"), q("[data-hero-sub]"), q("[data-hero-proof]")], { y: -120, opacity: 0, duration: 0.55, stagger: 0.05 }, 0)
              .to([q("[data-hero-cta]"), q("[data-hero-chips]")], { y: -40, opacity: 0, duration: 0.35 }, 0.1)
              .to(q("[data-hero-photo]"), { scale: 0.9, y: 60, transformOrigin: "50% 100%", duration: 1 }, 0);
          }

          chambers.forEach((el) => {
            gsap.fromTo(
              el,
              { scale: 0.94, transformOrigin: "50% 0%" },
              {
                scale: 1,
                ease: "none",
                // This layout-level code can run before a page's own pin (home Process) exists, so these triggers
                // refresh after the default ones: chambers below a pin must be measured with its pin spacing.
                scrollTrigger: { trigger: el, start: "top bottom", end: "top 55%", scrub: 0.6, refreshPriority: -1 },
              },
            );
          });
        });
        // Re-measure everything once the route's own triggers (pins) exist.
        ScrollTrigger.refresh();
      };

      let raf = requestAnimationFrame(build);
      const schedule = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(build);
      };
      const observer = new MutationObserver(schedule);
      const main = document.getElementById("main");
      if (main) observer.observe(main, { childList: true, subtree: true });

      // Fonts and images change heights after load; re-measure once everything is in.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh, { once: true });
      return () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
        window.removeEventListener("load", refresh);
        ctx?.revert();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
