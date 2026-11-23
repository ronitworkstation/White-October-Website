"use client";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

// Scroll transitions for the home page. Renders nothing; it finds its targets by data attributes.
//
// 1. Hero hand-over (scrubbed while the hero scrolls away): the headline and subline lift and fade first, the CTA
//    and solution chips follow, and the photo settles back (scale 0.9, anchored at its bottom) as the dark client
//    chamber rises over it. Reason: the first screen hands over to the proof instead of just scrolling off.
// 2. Chamber arrivals ([data-chamber-in]): each curved section grows from 94% to full width as its top travels
//    from the bottom of the screen to 55% up. Reason: the sections read as panels stacking onto the page, the same
//    curved-edge idea as the page transition curtain. Process is excluded: it has its own pin.
//
// Transform and opacity only, scrubbed (no autoplay). Off under reduced motion: everything stays static.
export function HomeScroll() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const hero = document.querySelector<HTMLElement>("section[aria-labelledby='hero-title']");
    if (hero) {
      const q = (s: string) => hero.querySelector<HTMLElement>(s);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      tl.to([q("#hero-title"), q("[data-hero-sub]")], { y: -120, opacity: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to([q("[data-hero-cta]"), q("[data-hero-chips]")], { y: -40, opacity: 0, duration: 0.35 }, 0.1)
        .to(q("[data-hero-photo]"), { scale: 0.9, y: 60, transformOrigin: "50% 100%", duration: 1 }, 0);
    }

    gsap.utils.toArray<HTMLElement>("[data-chamber-in]").forEach((el) => {
      gsap.fromTo(
        el,
        { scale: 0.94, transformOrigin: "50% 0%" },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 55%", scrub: 0.6 },
        },
      );
    });

    // Fonts and images change heights after load; re-measure once everything is in.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  });

  return null;
}
