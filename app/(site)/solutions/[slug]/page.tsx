import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { SectionMotion } from "@/components/motion/SectionMotion";
import { Reveal } from "@/components/motion/Reveal";
import { Plinth } from "@/components/ui/Plinth";
import { site } from "@/content/site";
import { solutions } from "@/content/solutions";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return {};
  const title = `${s.titleBold} ${s.titleRest}`;
  return {
    title,
    description: `${s.short} ${s.summary}`,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { title: `${title} | White October`, description: s.summary, url: `/solutions/${s.slug}` },
  };
}

// params is read inside Suspense so the page shell can render instantly (Next 16 instant navigation).
export default function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" aria-hidden />}>
      <SolutionContent params={params} />
    </Suspense>
  );
}

async function SolutionContent({ params }: { params: PageProps<"/solutions/[slug]">["params"] }) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = solutions.filter((x) => x.slug !== s.slug);

  return (
    <div>
      <section aria-labelledby="sol-title" className="container-site pb-16 pt-36 md:pb-24 md:pt-48">
        <p className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink">
          <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
          Solutions
        </p>
        <SplitReveal as="h1" id="sol-title" trigger="load" className="text-display mt-6 text-ink">
          <span className="font-bold">{s.titleBold}</span> <span className="font-light">{s.titleRest}</span>
        </SplitReveal>
        <p className="mt-8 max-w-[44ch] text-[20px] leading-snug text-grey-ink md:text-[24px]">{s.summary}</p>
      </section>

      <section aria-label={`${s.titleBold} ${s.titleRest} items`} className="container-site pb-24 md:pb-32">
        <Reveal as="ul" stagger className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {s.items.map((it, i) => (
            <li key={it.name}>
              {it.image && <Plinth src={it.image} alt={it.name} priority={i < 2} />}
              <h2 className="mt-4 text-[20px] leading-tight text-ink md:text-[24px]">
                <span className="font-bold">{it.name.split(" ").slice(0, it.boldWords ?? 1).join(" ")}</span>{" "}
                <span className="font-light">{it.name.split(" ").slice(it.boldWords ?? 1).join(" ")}</span>
              </h2>
              <p className="mt-2 max-w-[34ch] text-[15px] leading-snug text-grey-ink md:text-[17px]">{it.line}</p>
            </li>
          ))}
        </Reveal>
      </section>

      {/* Quote band + other families: one grey chamber (same panel grey as the home facts). It runs under the
          footer's curved top (negative bottom margin = footer top margin + chamber radius), so the footer curves over grey with no gap. */}
      <section
        data-chamber-in
        aria-labelledby="sol-quote"
        className="chamber-top -mb-[calc(1.5rem+32px)] bg-panel pb-[calc(4rem+1.5rem+32px)] pt-16 text-ink md:-mb-[calc(2.5rem+48px)] md:pb-[calc(5rem+2.5rem+48px)] md:pt-24"
      >
        <div className="container-site flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="sol-quote" className="text-h1 max-w-[18ch]">
              <span className="font-bold">Tell us</span> <span className="font-light">what you need.</span>
            </h2>
            <p className="mt-5 max-w-[40ch] text-[18px] leading-snug text-grey-ink md:text-[20px]">
              We will take it from there. Prefer to talk? Call{" "}
              <a href={site.contact.phoneHref} className="whitespace-nowrap border-b-2 border-orange font-semibold text-ink">
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
          </div>
          <ButtonLink href={`${site.cta.href}?family=${s.slug}`} size="lg" className="self-start md:self-end">
            {site.cta.label}
            <ArrowRight size={18} weight="bold" />
          </ButtonLink>
        </div>

        <nav aria-labelledby="sol-others" className="container-site mt-12 md:mt-16">
          <h2
            id="sol-others"
            className="flex items-center gap-3 border-t border-grey-soft pt-8 text-[13px] font-semibold uppercase tracking-[0.16em] md:pt-10"
          >
            <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
            Other solutions
          </h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/solutions/${o.slug}`}
                  className="group flex items-center justify-between rounded-card border-2 border-ink bg-white p-5 transition-colors duration-300 hover:bg-ink hover:text-white"
                >
                  <span className="text-[20px]">
                    <span className="font-bold">{o.titleBold}</span> <span className="font-light">{o.titleRest}</span>
                  </span>
                  <ArrowRight size={20} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1 reduced:transform-none" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <SectionMotion />
    </div>
  );
}
