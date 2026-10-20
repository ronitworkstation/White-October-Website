"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { ItemCard } from "@/components/ui/ItemCard";
import { DUR, EASE, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import type { Solution } from "@/content/solutions";

// Solutions as a numbered list (Indigram reference): number, condensed title + one line, a photo on a tile
// tilted like the WO square, and a round arrow. Clicking a row opens it in place to show that family's
// profile cards; one row is open at a time and all start closed. Closed panels stay in the HTML (inert,
// zero height) so every item is still on the page for search engines.
export function SolutionsList({ solutions }: { solutions: Solution[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const root = useRef<HTMLUListElement>(null);
  const uid = useId();

  // Stop any running panel tweens if the list unmounts mid-animation.
  useGSAP(
    () => {
      const el = root.current;
      return () => {
        if (el) gsap.killTweensOf(el.querySelectorAll("[data-panel], [data-card]"));
      };
    },
    { scope: root },
  );

  // Reason: the panel grows from the row the visitor clicked, so the cards read as "inside" it.
  // Height and the cards' fade run on one timeline; ScrollTrigger re-measures afterwards because
  // everything below the list has moved. Runs from the click handler, never during render.
  const animate = (next: number | null, prev: number | null) => {
    const panel = (i: number) => root.current?.querySelector<HTMLElement>(`[data-panel="${i}"]`);
    const instant = prefersReducedMotion();
    const done = () => ScrollTrigger.refresh();
    if (prev !== null) {
      const p = panel(prev);
      if (p) gsap.to(p, { height: 0, duration: instant ? 0 : DUR.standard * 0.8, ease: "power3.inOut", onComplete: done });
    }
    if (next !== null) {
      const p = panel(next);
      if (!p) return;
      const cards = p.querySelectorAll("[data-card]");
      if (instant) {
        gsap.set(p, { height: "auto" });
        gsap.set(cards, { opacity: 1, y: 0 });
        done();
        return;
      }
      gsap
        .timeline({ onComplete: done })
        .fromTo(p, { height: 0 }, { height: "auto", duration: DUR.standard, ease: EASE })
        .fromTo(cards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: DUR.standard, ease: EASE, stagger: 0.05 }, 0.08);
    }
  };

  const toggle = (i: number) => {
    const next = open === i ? null : i;
    animate(next, open);
    setOpen(next);
  };

  return (
    <ul ref={root} className="mt-10 border-b-2 border-ink md:mt-14">
      {solutions.map((s, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-btn-${i}`;
        const panelId = `${uid}-panel-${i}`;
        return (
          <li key={s.slug} className="border-t-2 border-ink">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-1 py-6 text-left outline-offset-4 md:grid-cols-[88px_1fr_200px_auto] md:items-center md:gap-x-8 md:py-8"
              >
                <span className="pt-1.5 font-display text-[22px] font-bold leading-none text-ink md:pt-0 md:text-[30px]">
                  {String(i + 1).padStart(3, "0")}
                </span>
                <span className="min-w-0">
                  {/* The list names the family only ("Recognition", not "Recognition Solutions") */}
                  <span className="block font-display text-[30px] font-bold uppercase leading-[0.95] tracking-[0.005em] text-ink md:text-[44px]">
                    {`${s.titleBold} ${s.titleRest}`.replace(/ Solutions$/, "")}
                  </span>
                  <span className="mt-2 block max-w-[46ch] text-[15px] leading-snug text-grey-ink md:text-[16px]">
                    {s.short}
                  </span>
                </span>
                {/* Tile tilted like the WO square; it straightens when the row is hovered, focused or open */}
                <span
                  aria-hidden
                  className={`relative hidden aspect-[3/2] w-[200px] overflow-hidden rounded-[18px] border-[6px] border-white bg-white outline-2 outline-panel transition-[rotate,scale] duration-500 ease-out-expo md:block ${
                    isOpen ? "rotate-0" : "-rotate-8 group-hover:rotate-0 group-hover:scale-[1.04] group-focus-visible:rotate-0"
                  }`}
                >
                  <Image src={s.cover} alt="" fill sizes="200px" className="rounded-[12px] object-cover" />
                </span>
                <span
                  aria-hidden
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink transition-[background-color,color,rotate] duration-300 ease-out-expo ${
                    isOpen ? "rotate-90 bg-orange text-ink" : "bg-ink text-white group-hover:bg-orange group-hover:text-ink"
                  }`}
                >
                  <ArrowRight size={18} weight="bold" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              data-panel={i}
              inert={!isOpen}
              className="h-0 overflow-hidden"
            >
              <div className="pb-8 md:pb-10">
                <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
                  {s.items.map((item, j) => (
                    <li key={item.name} data-card className="w-[min(84vw,340px)] shrink-0 snap-start md:w-auto">
                      <ItemCard item={item} href={`/solutions/${s.slug}`} number={`${i + 1}.${j + 1}`} />
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/solutions/${s.slug}`}
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-[16px] font-semibold text-ink underline decoration-orange decoration-2 underline-offset-[6px]"
                >
                  See the full {s.titleBold} {s.titleRest} page
                  <ArrowUpRight size={15} weight="bold" className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
