import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Plinth } from "@/components/ui/Plinth";
import { solutions } from "@/content/solutions";
import { StackCards } from "./StackCards";

// Solutions: four stacking cards (md up: each pins, the next slides over). Each links to its solution page.
// The cover photo sits on a plinth.
export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="container-site scroll-mt-24 bg-white pb-24 pt-8 [--stack-step:0px] [--stack-top:0px] md:pb-36 md:[--stack-step:28px] md:[--stack-top:16svh]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Reason: marks the start of the pitch after the proof; words rise as the section arrives */}
        <SplitReveal as="h2" id="solutions-title" type="words" className="text-h1 font-bold text-ink">
          Our <span className="font-light">Solutions</span>
        </SplitReveal>
        <p className="max-w-[420px] text-[17px] leading-snug text-grey-ink md:pb-2 md:text-right">
          Four families of work, each customised in-house to carry your brand.
        </p>
      </div>

      {/* Stacking cards: each family pins and the next slides over it (md and up). Motion in StackCards. */}
      <StackCards className="mt-10 grid gap-4 md:mt-14 md:block">
        {solutions.map((s, i) => (
          <li
            key={s.slug}
            data-stack-item
            className="md:sticky md:top-0 md:flex md:h-[100svh] md:items-start"
            style={{ paddingTop: `calc(var(--stack-top) + var(--stack-step) * ${i})` }}
          >
            <Link
              href={`/solutions/${s.slug}`}
              data-stack-card
              className="group grid w-full grid-cols-[1fr_auto] gap-4 rounded-card border-2 border-ink bg-white p-4 transition-colors duration-300 hover:bg-canvas md:h-[min(68svh,600px)] md:grid-cols-[2fr_3fr] md:gap-10 md:p-8 lg:p-10"
            >
              <span className="flex flex-col justify-between py-1">
                <span aria-hidden className="font-display text-[22px] font-bold text-grey md:text-[28px] lg:text-[36px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[26px] leading-[1.05] text-ink md:text-[36px] lg:text-[48px]">
                    <span className="font-bold">{s.titleBold}</span> <span className="font-light">{s.titleRest}</span>
                  </span>
                  <span className="mt-3 block max-w-[32ch] text-[15px] leading-snug text-grey-ink md:text-[16px] lg:text-[18px]">{s.short}</span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink md:mt-6 md:text-[16px]">
                    <span className="border-b-2 border-orange pb-0.5">Explore</span>
                    <ArrowUpRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </span>
              {/* Phones: small plinth as before. md up: the plinth fills the right of the card; its photo zooms in StackCards. */}
              <span className="block w-[38vw] max-w-[220px] overflow-hidden rounded-tile md:h-full md:w-auto md:max-w-none">
                <span data-stack-img className="block size-full">
                  <Plinth src={s.cover} aspect="aspect-[4/5] md:aspect-auto md:h-full" sizes="(min-width: 768px) 40vw, 220px" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </StackCards>
    </section>
  );
}
