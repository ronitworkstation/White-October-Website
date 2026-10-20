import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

// Hero: full-bleed photo running up behind the see-through nav (giftative arrangement).
// The photo's open white floor carries the eyebrow + headline at the top; the people and the
// floor mark (square, ball, smile) stay clear in the middle. Subtext bottom-left, the one CTA bottom-right.
export function Hero() {
  const { hero, cta } = site;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[640px] flex-col overflow-hidden bg-white h-[100svh] md:min-h-[680px]"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="hero-photo -z-10 object-cover object-[50%_60%]"
      />

      {/* Short laptop screens (1366x768): the photo has no spare height, so the headline moves up and shrinks to clear the heads */}
      <div className="px-4 pt-[104px] md:pt-[128px] lg:pt-[136px] lg:[@media(max-height:820px)]:pt-[108px]">
        <div className="hero-rise">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>
        <h1
          id="hero-title"
          className="mx-auto mt-3 overflow-hidden pb-[0.08em] text-center text-[48px] font-bold leading-[0.98] tracking-[-0.025em] text-ink sm:text-[68px] md:mt-4 lg:text-[88px] xl:text-[96px] lg:[@media(max-height:820px)]:text-[72px]"
        >
          <span className="hero-line block">
            {/* Phones break as "More than / the gift." so the key words never strand */}
            <span className="block font-light sm:inline">More than </span>
            <span className="whitespace-nowrap">
              the gift<span className="text-orange-ink">.</span>
            </span>
          </span>
        </h1>
      </div>

      <div className="mt-auto flex flex-col items-start gap-4 px-4 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:px-8 md:pb-8 lg:px-12 lg:pb-10">
        <p className="hero-rise-late max-w-[380px] rounded-[20px] bg-white/85 px-5 py-4 text-[16px] leading-snug text-ink backdrop-blur-md md:text-[17px]">
          {hero.subtext}
        </p>
        <ButtonLink href={cta.href} size="lg" className="hero-rise-late">
          {cta.label}
          <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover/btn:translate-x-1" />
        </ButtonLink>
      </div>
    </section>
  );
}
