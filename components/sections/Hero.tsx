import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { site } from "@/content/site";

// Hero: eyebrow + headline on clean canvas, then the framed photo with the subtext bottom-left and the
// one CTA bottom-right (giftative arrangement). The box in the photo carries the logo, so no text sits on it.
// Desktop: everything fits the first screen. Mobile: subtext + CTA drop below the photo.
export function Hero() {
  const { hero, cta } = site;
  return (
    <section aria-labelledby="hero-title" className="px-3 pt-[104px] md:px-6 md:pt-[128px]">
      <div className="hero-rise">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
      </div>
      <h1
        id="hero-title"
        className="mx-auto mt-4 overflow-hidden pb-[0.08em] text-center text-[52px] font-bold leading-[0.98] tracking-[-0.025em] text-ink sm:text-[72px] lg:text-[104px]"
      >
        <span className="hero-line block">
          {/* Phones break as "More than / the gift." so the key words never strand */}
          <span className="block font-light sm:inline">More than </span>
          <span className="whitespace-nowrap">
            the gift<span className="text-orange-ink">.</span>
          </span>
        </span>
      </h1>

      <div className="relative mx-auto mt-6 aspect-[4/3] max-w-[1600px] overflow-hidden rounded-[24px] bg-panel sm:aspect-auto sm:h-[max(420px,calc(100dvh-300px))] md:mt-8 md:h-[max(460px,calc(100dvh-344px))] md:rounded-[32px] lg:h-[max(480px,calc(100dvh-372px))]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="(min-width: 1600px) 1600px, 100vw"
          className="hero-photo object-cover object-[50%_45%]"
        />
        <div className="absolute inset-x-6 bottom-6 hidden items-end justify-between gap-6 sm:flex">
          <p className="hero-rise-late max-w-[400px] rounded-[20px] bg-white/90 px-5 py-4 text-[17px] leading-snug text-ink backdrop-blur-md">
            {hero.subtext}
          </p>
          <ButtonLink href={cta.href} size="lg" className="hero-rise-late">
            {cta.label}
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </ButtonLink>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 px-1 sm:hidden">
        <p className="text-[17px] leading-snug text-ink">{hero.subtext}</p>
        <ButtonLink href={cta.href} size="lg" className="self-start">
          {cta.label}
          <ArrowRight size={18} weight="bold" />
        </ButtonLink>
      </div>
    </section>
  );
}
