"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type { SolutionItem } from "@/content/solutions";
import { prefersReducedMotion } from "@/lib/motion";

// One family row: heading column (server-rendered, passed in) with prev/next arrows, and a sideways
// row of profile-style cards. Native horizontal scroll with snap: swipe on phones, arrows or
// trackpad on desktop. The arrows only exist to help mouse users; nothing is hidden without them.
export function ItemTrack({
  index,
  label,
  items,
  href,
  heading,
}: {
  index: number;
  label: string;
  items: SolutionItem[];
  href: string;
  heading: React.ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const arrow =
    "inline-flex h-12 w-12 items-center justify-center rounded-full border-2 transition-[background-color,color,border-color,opacity] duration-300 disabled:pointer-events-none disabled:opacity-30";

  return (
    <>
      <div className="flex flex-col">
        {heading}
        <div className="mt-8 hidden gap-2 lg:flex">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={`Previous ${label} items`}
            className={`${arrow} border-ink bg-transparent text-ink hover:bg-ink hover:text-white`}
          >
            <ArrowLeft size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={`Next ${label} items`}
            className={`${arrow} border-ink bg-orange text-ink hover:bg-ink hover:text-white`}
          >
            <ArrowRight size={18} weight="bold" />
          </button>
        </div>
      </div>

      <ul
        ref={track}
        onScroll={update}
        aria-label={`${label}: ${items.length} items`}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-1 md:-mx-8 md:scroll-px-8 md:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0 lg:[mask-image:linear-gradient(to_right,#000_calc(100%-56px),transparent)]"
      >
        {items.map((item, j) => (
          <li key={item.name} className="w-[min(84vw,360px)] shrink-0 snap-start md:w-[400px]">
            <ItemCard item={item} href={href} number={`${index + 1}.${j + 1}`} priority={false} />
          </li>
        ))}
        {/* Trailing spacer so the last card can snap clear of the fade */}
        <li aria-hidden className="hidden w-10 shrink-0 lg:block" />
      </ul>
    </>
  );
}

function ItemCard({ item, href, number, priority }: { item: SolutionItem; href: string; number: string; priority: boolean }) {
  const words = item.name.split(" ");
  const n = item.boldWords ?? 1;
  const bold = words.slice(0, n).join(" ");
  const rest = words.slice(n).join(" ");
  return (
    <Link
      href={href}
      className="group relative block h-[220px] overflow-hidden rounded-[24px] bg-black text-white outline-offset-4 md:h-[248px]"
    >
      {item.image && (
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-[24px]">
          <Image
            src={item.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 768px) 200px, 42vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
          />
        </div>
      )}
      <span aria-hidden className="absolute left-4 top-4 font-display text-[14px] font-bold tracking-[0.06em] text-grey-soft md:left-6">
        {number}
      </span>
      {/* Text owns the left half only; long words hyphenate rather than run into the photo */}
      <span className="absolute inset-y-0 left-4 right-[calc(50%+12px)] flex flex-col justify-center hyphens-auto break-words md:left-6">
        <span className="text-[19px] leading-[1.1] md:text-[22px]">
          <span className="font-bold">{bold}</span>
          {rest && (
            <>
              {" "}
              <span className="block font-light">{rest}</span>
            </>
          )}
        </span>
        <span
          aria-hidden
          className="mt-3 block h-[3px] w-10 origin-left bg-orange transition-transform duration-500 ease-out-expo group-hover:scale-x-[1.8]"
        />
      </span>
    </Link>
  );
}
