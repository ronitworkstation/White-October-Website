import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Plinth } from "@/components/ui/Plinth";
import { solutions } from "@/content/solutions";

// Solutions: four staged tiles (2x2). Each links to its solution page. The cover photo sits on a plinth.
export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="container-site scroll-mt-24 bg-white pb-24 pt-8 md:pb-36">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Reason: marks the start of the pitch after the proof; words rise as the section arrives */}
        <SplitReveal as="h2" id="solutions-title" type="words" className="text-h1 font-bold text-ink">
          Our <span className="font-light">Solutions</span>
        </SplitReveal>
        <p className="max-w-[420px] text-[17px] leading-snug text-grey-ink md:pb-2 md:text-right">
          Four families of work, each customised in-house to carry your brand.
        </p>
      </div>

      <ul className="mt-10 grid gap-4 md:mt-14 md:gap-6 lg:grid-cols-2">
        {solutions.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/solutions/${s.slug}`}
              className="group grid grid-cols-[1fr_auto] gap-4 rounded-card border-2 border-ink bg-white p-4 transition-colors duration-300 hover:bg-canvas md:p-6"
            >
              <span className="flex flex-col justify-between py-1">
                <span aria-hidden className="font-display text-[22px] font-bold text-grey md:text-[28px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[26px] leading-[1.05] text-ink md:text-[36px]">
                    <span className="font-bold">{s.titleBold}</span> <span className="font-light">{s.titleRest}</span>
                  </span>
                  <span className="mt-3 block max-w-[28ch] text-[15px] leading-snug text-grey-ink md:text-[16px]">{s.short}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
                    <span className="border-b-2 border-orange pb-0.5">Explore</span>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </span>
              {/* Reason: the photo lifts on hover, a quiet cue that the tile is a link */}
              <span className="block w-[38vw] max-w-[220px] transition-transform duration-500 ease-out-expo group-hover:-translate-y-2 reduced:transform-none md:w-[200px]">
                <Plinth src={s.cover} aspect="aspect-[4/5]" sizes="220px" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
