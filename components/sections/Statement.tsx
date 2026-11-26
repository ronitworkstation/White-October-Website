import { SplitReveal } from "@/components/motion/SplitReveal";
import { site } from "@/content/site";
import { FactsRow } from "./FactsRow";

// One big centred statement on white, then the row of real facts on a grey band. Rises over the dark
// client-logo chamber above it.
// Awaits Medhansh's approval (see content/site.ts whyUs).
export function Statement() {
  const { label, statement, facts } = site.whyUs;
  return (
    <section data-chamber-in aria-labelledby="why-title" className="chamber-top relative -mt-8 bg-white pt-24 md:-mt-16 md:pt-36">
      <div className="container-site text-center">
        <h2
          id="why-title"
          className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink"
        >
          {/* The WO square, tilted as in the mark */}
          <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
          {label}
        </h2>
        {/* Reason: the statement is the argument of the page; words brighten at reading pace as you scroll */}
        <SplitReveal
          as="p"
          scrub
          className="mx-auto mt-8 max-w-[24ch] text-[30px] font-normal leading-[1.1] tracking-[-0.02em] text-ink sm:text-[40px] md:mt-10 md:text-[56px] xl:text-[64px]"
        >
          {statement.before} <strong className="font-bold">{statement.emphasis}</strong>
          {statement.after}
        </SplitReveal>
      </div>

      {/* The facts row on a grey band (reference: the handover "Why White October" panel, FactsRow from 76226a1) */}
      <div className="mt-16 bg-panel py-14 md:mt-24 md:py-20">
        <div className="w-full px-4 md:px-8 lg:px-[7.5vw]">
          <FactsRow facts={facts} />
        </div>
      </div>
    </section>
  );
}
