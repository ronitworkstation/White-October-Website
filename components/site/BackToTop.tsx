"use client";

import { ArrowUp } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";

// Back to top (reference: Yucca Packaging footer): an outlined square that fills on hover.
// Uses Lenis so the trip up is smooth; with reduced motion Lenis is native and the jump is instant.
export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      type="button"
      onClick={() => (lenis ? lenis.scrollTo(0) : window.scrollTo(0, 0))}
      aria-label="Back to top"
      className="grid size-11 shrink-0 place-items-center rounded-[12px] border-2 border-white text-white transition-colors duration-300 hover:bg-white hover:text-ink"
    >
      <ArrowUp size={18} weight="bold" aria-hidden />
    </button>
  );
}
