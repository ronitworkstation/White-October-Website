"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger pins and Lenis never disagree on scroll position.
// Reduced motion: native scrolling.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = ref.current?.lenis;
    if (!lenis) return;
    if (prefersReducedMotion()) {
      lenis.options.smoothWheel = false;
    }
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);
    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, []);

  return (
    <>
      <ReactLenis root ref={ref} options={{ autoRaf: false, lerp: 0.1, anchors: { offset: -96 } }} />
      {children}
    </>
  );
}
