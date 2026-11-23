import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
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
        <h1 id="sol-title" className="text-display mt-6 text-ink">
          <span className="font-bold">{s.titleBold}</span> <span className="font-light">{s.titleRest}</span>
        </h1>
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

      {/* Quote band */}
      <section aria-labelledby="sol-quote" className="chamber-top bg-black py-20 text-white md:py-28">
        <div className="container-site flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 id="sol-quote" className="text-h1 max-w-[18ch]">
            <span className="font-bold">Tell us</span> <span className="font-light">what you need.</span>
          </h2>
          <ButtonLink href={`${site.cta.href}?family=${s.slug}`} size="lg">
            {site.cta.label}
            <ArrowRight size={18} weight="bold" />
          </ButtonLink>
        </div>
      </section>

      {/* Other families */}
      <section aria-label="Other solutions" className="bg-black pb-20 text-white md:pb-28">
        <ul className="container-site grid gap-3 border-t border-line pt-10 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/solutions/${o.slug}`} className="group flex items-center justify-between rounded-card border-2 border-white p-5 transition-colors duration-300 hover:bg-white hover:text-ink">
                <span className="text-[20px]">
                  <span className="font-bold">{o.titleBold}</span> <span className="font-light">{o.titleRest}</span>
                </span>
                <ArrowRight size={20} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
