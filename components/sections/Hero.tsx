import { getImageProps } from "next/image";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { ButtonLink } from "@/components/ui/Button";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { site } from "@/content/site";

// Hero: the brochure hook over the handover photo, which runs up behind the see-through nav.
// Two framings, chosen by screen orientation (art direction: only one photo downloads):
// - Landscape (laptops, desktops): the outpainted wide photo spans the full width. It sits on the bottom edge
//   when the screen is taller than 16:9 (the white floor above blends into the page) and hangs from just
//   below the top when the screen is wider, so a little empty floor is cropped at the bottom. Either way the
//   people stay below the text. CTA bottom-right (giftative arrangement).
// - Portrait (phones, upright tablets): text first, then the tall photo pulled up under it at its natural
//   height. Its top 40% is empty floor, so the people always start just below the words.
export function Hero() {
  const { hero, cta } = site;
  const img = hero.image;

  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ alt: img.alt, ...img.desktop, sizes: "100vw" });
  const {
    props: { srcSet: mobileSet, ...imgProps },
  } = getImageProps({ alt: img.alt, ...img.mobile, sizes: "100vw" });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white landscape:h-[100svh] landscape:min-h-[640px]"
    >
      {/* Landscape: not positioned, so the CTA anchors to the section's bottom-right corner and the photo
          sits behind (-z-10). Portrait: the text is lifted above the photo that is pulled up under it.
          Short laptop screens (1366x768): the headline moves up and shrinks so it clears the people. */}
      <div className="px-4 pt-[108px] text-center portrait:relative portrait:z-10 md:pt-[124px] lg:pt-[120px] lg:[@media(max-height:820px)]:pt-[100px]">
        {/* Reason: the hook is the page's first promise; it lands line by line before anything else moves */}
        <SplitReveal
          as="h1"
          id="hero-title"
          trigger="load"
          delay={0.15}
          className="mx-auto max-w-[1240px] text-[38px] font-light leading-[1.04] tracking-[-0.025em] text-ink sm:text-[52px] md:text-[54px] lg:text-[72px] xl:text-[84px] lg:[@media(max-height:820px)]:text-[64px]"
        >
          <span className="md:block">{hero.headline.lineOne} </span>
          <span className="md:block">
            {hero.headline.lineTwo}{" "}
            <span className="whitespace-nowrap font-bold text-orange-ink">{hero.headline.accent}</span>
          </span>
        </SplitReveal>
        <p data-hero-sub className="hero-rise-late mx-auto mt-4 max-w-[34ch] text-[17px] leading-snug text-grey-ink md:mt-5 md:text-[21px]">
          {hero.subline}
        </p>
        <div data-hero-cta className="hero-rise-late mt-6 flex justify-center landscape:absolute landscape:bottom-8 landscape:right-6 landscape:mt-0 md:landscape:right-8 lg:landscape:bottom-10 lg:landscape:right-12">
          <ButtonLink href={cta.href} size="lg">
            {cta.label}
            <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </ButtonLink>
        </div>
      </div>

      {/* 56.28vw = the wide photo's height at full width (3840x2161). The top edge fades out so the photo's slightly
          greyer corner never shows a seam against the white page. */}
      <div data-hero-photo className="relative -mt-[71vw] min-h-[178vw] flex-1 landscape:absolute landscape:inset-x-0 landscape:top-[max(48px,calc(100%-56.28vw))] landscape:-z-10 landscape:mt-0 landscape:aspect-[3840/2161] landscape:min-h-0 landscape:flex-none landscape:[mask-image:linear-gradient(to_bottom,transparent,#000_12%)]">
        <picture>
          <source media="(orientation: landscape)" srcSet={desktopSet} sizes="100vw" />
          <img
            {...imgProps}
            srcSet={mobileSet}
            alt={img.alt}
            fetchPriority="high"
            loading="eager"
            className="hero-photo absolute inset-0 h-full w-full object-cover object-[50%_100%]"
          />
        </picture>
      </div>
    </section>
  );
}
