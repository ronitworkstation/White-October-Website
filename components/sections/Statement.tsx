import { SplitReveal } from "@/components/motion/SplitReveal";
import { site } from "@/content/site";

// One big centred statement on white. It rises over the dark client-logo chamber above it.
// Awaits Medhansh's approval (see content/site.ts whyUs).
export function Statement() {
  const { label, statement } = site.whyUs;
  return (
    <section data-chamber-in aria-labelledby="why-title" className="chamber-top relative -mt-8 bg-white pb-16 pt-24 md:-mt-16 md:pb-24 md:pt-36">
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
    </section>
  );
}
