import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";

// Experience Centre: a dark chamber with the showroom photo in a large rounded frame, address and map link.
export function Experience() {
  const { experience: e, contact } = site;
  return (
    <section data-chamber-in id="experience" aria-labelledby="experience-title" className="chamber-top relative -mt-8 scroll-mt-0 bg-black py-20 text-white md:-mt-16 md:py-28">
      <Reveal stagger className="container-site grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em]">
            <span aria-hidden className="inline-block size-2.5 -rotate-8 bg-orange" />
            {e.label}
          </p>
          <h2 id="experience-title" className="text-h1 mt-5">
            <span className="font-bold">{e.title.bold}</span> <span className="font-light">{e.title.rest}</span>
          </h2>
          <p className="mt-5 max-w-[40ch] text-[18px] leading-snug text-grey-soft md:text-[20px]">{e.line}</p>
          <address className="mt-8 text-[18px] not-italic leading-relaxed md:text-[20px]">
            {contact.addressLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={contact.mapsUrl} target="_blank" rel="noopener" className="group mt-4 inline-flex min-h-11 items-center gap-2 text-[17px] font-semibold">
            <span className="border-b-2 border-orange pb-0.5">View on map</span>
            <ArrowUpRight size={18} weight="bold" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="overflow-hidden rounded-card lg:col-span-7">
          <Image
            src={e.photo.src}
            alt={e.photo.alt}
            width={e.photo.width}
            height={e.photo.height}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}
