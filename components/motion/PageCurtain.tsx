"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/LogoMark";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

const COVER = 0.4;
const REVEAL = 0.45;

// Page transition (Awwwards reference: BCG Building Design). A black panel with the site's curved top corners
// rises over the page, the White October mark rises inside it and smiles, the route changes underneath, then
// the panel lifts away. Reason: the brand mark marks the hand-over between pages, and the curved edge is the
// same shape as the dark chambers you scroll past.
// It takes over clicks on internal links. Back/forward, modified clicks, same-page links and reduced motion
// fall through to normal navigation.
export function PageCurtain() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const waiting = useRef<(() => void) | null>(null);
  const [run, setRun] = useState(0); // remounts the mark so its smile plays every time

  // The new route is in: resolve the wait inside the running timeline.
  useEffect(() => {
    waiting.current?.();
    waiting.current = null;
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (prefersReducedMotion()) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      // Capture phase + stopPropagation: Next's own <Link> click handler never sees the click, so it cannot navigate early.
      e.preventDefault();
      e.stopPropagation();
      // A second page link clicked while a transition runs is swallowed, not handed to Next (it would race the first).
      if (busy.current) return;
      busy.current = true;
      setRun((n) => n + 1);
      const p = panel.current;
      const m = mark.current;
      if (!p || !m) {
        router.push(url.pathname + url.search + url.hash);
        busy.current = false;
        return;
      }
      lenis?.stop();

      const ease = "power3.inOut";
      p.style.pointerEvents = "auto";
      const tl = gsap.timeline({
        onComplete: () => {
          p.style.pointerEvents = "none";
          gsap.set(p, { yPercent: 0 });
          gsap.set(m, { y: 0, opacity: 0 });
          busy.current = false;
          lenis?.start();
        },
      });
      tl.fromTo(p, { yPercent: 0 }, { yPercent: -100, duration: COVER, ease })
        .fromTo(m, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "expo.out" }, COVER * 0.4)
        .add(
          () =>
            new Promise<void>((resolve) => {
              // Route change: push, then wait for the pathname to change (4s safety so the curtain can never stick).
              const timer = window.setTimeout(resolve, 4000);
              waiting.current = () => {
                window.clearTimeout(timer);
                resolve();
              };
              router.push(url.pathname + url.search + url.hash);
            }).then(() => {
              // Top of the new page, or its #section when the link has one (e.g. /#faq from another page).
              const target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
              if (target) target.scrollIntoView();
              else window.scrollTo(0, 0);
              tl.resume();
            }),
        )
        .addPause("+=0")
        .to(m, { y: -40, opacity: 0, duration: 0.2, ease: "power2.in" })
        .to(p, { yPercent: -200, duration: REVEAL, ease }, "<0.05");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, lenis]);

  return (
    <div
      ref={panel}
      aria-hidden
      // Rests below the screen via the CSS translate property; GSAP animates yPercent (transform) on top of it:
      // 0 = hidden below, -100 = covering, -200 = lifted off the top.
      className="pointer-events-none fixed inset-0 z-[70] grid translate-y-full place-items-center rounded-t-[32px] bg-black md:rounded-t-chamber"
    >
      <div ref={mark} className="w-[min(420px,64vw)] opacity-0">
        <LogoMark key={run} smileOnView tone="white" className="w-full" title="" />
      </div>
    </div>
  );
}
