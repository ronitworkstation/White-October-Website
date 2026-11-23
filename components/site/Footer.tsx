import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappHref } from "@/content/site";
import { solutions } from "@/content/solutions";

// Footer: Async-style contact block, then the giant WO mark cropped by the page edge (like the email signature).
// The mark smiles when it scrolls into view.
export function Footer() {
  const { contact } = site;
  return (
    <footer className="relative mt-6 overflow-hidden md:mt-10">
      <div className="chamber-top bg-black text-white">
        <div className="container-site pt-20 md:pt-28">
          <p className="text-[15px] text-grey-soft">Start a conversation</p>
          <a
            href={contact.phoneHref}
            className="group mt-3 inline-block border-b-2 border-line pb-3 font-display text-[44px] font-bold leading-none tracking-[0.01em] transition-colors hover:border-orange sm:text-[64px] md:text-[96px]"
          >
            {contact.phoneDisplay}
          </a>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Magnetic>
              <ButtonLink href={site.cta.href} size="lg">
                {site.cta.label}
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={whatsappHref()} variant="outline-light" size="lg" target="_blank" rel="noopener">
              <WhatsappLogo size={20} weight="bold" />
              WhatsApp us
            </ButtonLink>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <h2 className="text-[15px] text-grey-soft">Visit the experience centre</h2>
              <address className="mt-4 text-[20px] not-italic leading-relaxed md:text-[22px]">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener"
                className="group mt-3 inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold text-white"
              >
                <span className="border-b-2 border-orange pb-0.5">View on map</span>
                <ArrowUpRight size={18} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <p className="mt-6 text-[17px]">
                <a href={`mailto:${contact.email}`} className="inline-block border-b border-line py-2.5 transition-colors hover:border-orange">
                  {contact.email}
                </a>
              </p>
            </div>
            <nav aria-label="Solutions" className="md:col-span-3 md:col-start-7">
              <h2 className="text-[15px] text-grey-soft">Solutions</h2>
              <ul className="mt-2 text-[18px]">
                {solutions.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/solutions/${s.slug}`} className="block py-2.5 transition-colors hover:text-orange">
                      {s.titleBold} {s.titleRest}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Company" className="md:col-span-3">
              <h2 className="text-[15px] text-grey-soft">White October</h2>
              <ul className="mt-2 text-[18px]">
                {site.nav
                  .filter((n) => !("hasMenu" in n))
                  .map((n) => (
                    <li key={n.label}>
                      <Link href={n.href} className="block py-2.5 transition-colors hover:text-orange">
                        {n.label}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link href={site.cta.href} className="block py-2.5 transition-colors hover:text-orange">
                    {site.cta.label}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-20 flex flex-col gap-2 border-t border-line pt-6 text-[14px] text-grey-soft md:flex-row md:items-center md:justify-between">
            <p>
              <span className="font-semibold text-white">White October</span>
              <span className="mx-2 text-grey">/</span>
              {site.tagline}
            </p>
            <p>© {site.year} White October. Bengaluru, India.</p>
          </div>
        </div>

        {/* Giant mark, cropped by the bottom edge of the page just below the smile (as in the email signature).
            Mark aspect is 177.21 x 92.75, so a crop at 95% of its height = width x 0.497. */}
        <div
          aria-hidden
          className="relative mx-auto mt-12 overflow-hidden md:mt-20"
          style={{ width: "min(1180px, 90vw)", height: "calc(min(1180px, 90vw) * 0.497)" }}
        >
          <LogoMark smileOnView className="absolute inset-x-0 top-0 w-full" title="" />
        </div>
      </div>
    </footer>
  );
}
