import { SplitReveal } from "@/components/motion/SplitReveal";
import { solutions } from "@/content/solutions";
import { SolutionsList } from "./SolutionsList";

// Solutions: heading, then the four families as an expandable numbered list (SolutionsList).
export function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="container-site scroll-mt-24 py-24 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {/* Reason: marks the start of the pitch after the hero; words rise as the section arrives */}
        <SplitReveal
          as="h2"
          id="solutions-title"
          type="words"
          className="text-[40px] font-bold leading-[1.02] tracking-[-0.02em] text-ink md:text-[64px]"
        >
          Our <span className="font-light">Solutions</span>
        </SplitReveal>
        <p className="max-w-[420px] text-[17px] leading-snug text-grey-ink md:pb-2 md:text-right">
          Four families of work, each customised in-house to carry your brand. Open one to see what we make.
        </p>
      </div>
      <SolutionsList solutions={solutions} />
    </section>
  );
}
