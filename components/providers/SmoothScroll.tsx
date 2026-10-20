"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger pins and Lenis never disagree on scroll position.
// Reduced motion: native scrolling.
// lenis/react creates the instance in its own effect, so it is read with useLenis() (re-renders once it exists).
// Reading a ref in a mount-only effect sees nothing, the ticker never starts, and the wheel stops working.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  // Decided once on the client (state is not serialised, so this reads <html data-motion> during hydration).
  const [smoothWheel] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!lenis) return;
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false, lerp: 0.1, smoothWheel, anchors: { offset: -96 } }} />
      {children}
    </>
  );
}
