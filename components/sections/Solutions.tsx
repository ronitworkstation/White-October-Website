import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { solutions } from "@/content/solutions";
import { ItemTrack } from "./ItemTrack";

// Solutions: one row per family. Layout from the Christmas-store reference (heading column with round
// arrows on the left, a sideways row of cards on the right); the cards themselves are the company
// profile's: black tile, photo on the right, "**Bold** Regular" name over a short orange rule.
export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="container-site scroll-mt-24 py-24 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 id="solutions-title" className="text-[40px] font-bold leading-[1.02] tracking-[-0.02em] text-ink md:text-[64px]">
          Our <span className="font-light">Solutions</span>
        </h2>
        <p className="max-w-[420px] text-[17px] leading-snug text-grey-ink md:pb-2 md:text-right">
          Four families of work, each customised in-house to carry your brand.
        </p>
      </div>

      <div className="mt-12 space-y-14 md:mt-16 md:space-y-20">
        {solutions.map((s, i) => (
          <div key={s.slug} className="grid gap-6 border-t-2 border-ink pt-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 lg:pt-8">
            <ItemTrack
              index={i}
              label={`${s.titleBold} ${s.titleRest}`}
              items={s.items}
              href={`/solutions/${s.slug}`}
              heading={
                <>
                  <p aria-hidden className="font-display text-[56px] font-bold leading-none text-grey md:text-[72px]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-[30px] font-bold leading-[1.05] tracking-[-0.01em] text-ink md:text-[34px]">
                    {s.titleBold} <span className="font-light">{s.titleRest}</span>
                  </h3>
                  <p className="mt-3 max-w-[300px] text-[16px] leading-snug text-grey-ink">{s.short}</p>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink underline decoration-orange decoration-2 underline-offset-[6px]"
                  >
                    See all {s.items.length}
                    <ArrowUpRight size={15} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </>
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
