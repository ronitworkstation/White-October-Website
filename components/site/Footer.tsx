import Image from "next/image";
import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { LogoMark } from "@/components/brand/LogoMark";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappHref } from "@/content/site";

// Footer: Async-style contact block, then the giant WO mark cropped by the page edge (like the email signature).
// The mark smiles when it scrolls into view.
const socials = [
  { name: "Instagram", icon: "/social/instagram.png", href: site.contact.social.instagram },
  { name: "WhatsApp", icon: "/social/whatsapp.png", href: whatsappHref() },
  { name: "Facebook", icon: "/social/facebook.png", href: site.contact.social.facebook },
];

export function Footer() {
  const { contact } = site;
  return (
    <footer className="relative mt-6 overflow-hidden md:mt-10">
      {/* Phones: room under the cropped mark for the sticky MobileBar (black, so no white strip; none on /quote). */}
      <div className="chamber-top bg-black text-white max-md:[footer:has(~[data-mobile-bar])_&]:pb-[calc(50px+env(safe-area-inset-bottom))]">
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
            <nav aria-label="Company" className="md:col-span-3 md:col-start-10">
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

          {/* Bottom bar: copyright on the left, social icons on the right */}
          <div className="mt-20 flex items-center justify-between gap-4 border-t border-line pt-6 text-[14px] text-grey-soft">
            <p>© {site.year} White October. Bengaluru, India.</p>
            <div className="flex shrink-0 items-center gap-2 md:gap-3">
              {/* Social icons in their own brand colours (logos are the palette-lock exception), 44px.
                  Instagram and Facebook link only once their URLs are filled in content/site.ts (awaiting Medhansh). */}
              {socials.map((s) =>
                s.href ? (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="block size-11 shrink-0 transition-transform duration-300 hover:-translate-y-0.5 reduced:transform-none">
                    <Image src={s.icon} alt="" width={44} height={44} className="size-11 shrink-0" />
                  </a>
                ) : (
                  <Image key={s.name} src={s.icon} alt="" width={44} height={44} className="size-11 shrink-0" />
                ),
              )}
            </div>
          </div>
        </div>

        {/* Giant mark, full bleed, cropped to match the "Thank you" PDF from Aziz: square cut by the left edge,
            ball touching the right edge, bottom edge cutting through the smile. Window in mark units (viewBox
            146.33 138.82 177.21 92.75): x 154.5 to 315.5, y 138.82 to 214.1, so aspect 161 / 75.3. */}
        <div aria-hidden className="relative mt-12 w-full overflow-hidden md:mt-20" style={{ aspectRatio: "161 / 75.3" }}>
          <LogoMark
            smileOnView
            className="absolute top-0"
            style={{ width: `${(177.21 / 161) * 100}%`, left: `${(-(154.5 - 146.33) / 161) * 100}%` }}
            title=""
          />
        </div>
      </div>
    </footer>
  );
}
