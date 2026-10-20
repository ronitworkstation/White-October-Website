import { SplitReveal } from "@/components/motion/SplitReveal";
import { site } from "@/content/site";
import { FactsRow } from "./FactsRow";

// "Why White October" (Benzai10 reference): a small label on the left, one large statement on the right,
// then a row of real facts. A light chamber that rises over the dark client-logo chamber above it.
export function WhyUs() {
  const { label, statement, facts } = site.whyUs;
  return (
    <section aria-labelledby="why-title" className="chamber-top relative -mt-8 bg-panel py-24 md:-mt-16 md:py-36">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2
            id="why-title"
            className="flex items-center gap-3 self-start text-[13px] font-semibold uppercase tracking-[0.16em] text-ink lg:col-span-4 lg:pt-4"
          >
            {/* The WO square, tilted as in the mark */}
            <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
            {label}
          </h2>
          {/* Reason: the statement is the argument of the page; words brighten at reading pace as you scroll */}
          <SplitReveal
            as="p"
            scrub
            className="max-w-[26ch] text-[30px] font-normal leading-[1.1] tracking-[-0.02em] text-ink sm:text-[38px] md:text-[46px] lg:col-span-8 xl:col-span-7 xl:col-start-6 xl:text-[52px]"
          >
            {statement.before} <strong className="font-bold">{statement.emphasis}</strong>
            {statement.after}
          </SplitReveal>
        </div>
        <div className="mt-16 md:mt-24">
          <FactsRow facts={facts} />
        </div>
      </div>
    </section>
  );
}
