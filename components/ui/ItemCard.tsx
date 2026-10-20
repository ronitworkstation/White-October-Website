import Image from "next/image";
import Link from "next/link";
import type { SolutionItem } from "@/content/solutions";

// Company-profile card: black tile, photo on the right half, "**Bold** Regular" name over a short orange rule.
// Used in the home Solutions panels (and later the solution pages).
export function ItemCard({ item, href, number }: { item: SolutionItem; href: string; number: string }) {
  const words = item.name.split(" ");
  const n = item.boldWords ?? 1;
  const bold = words.slice(0, n).join(" ");
  const rest = words.slice(n).join(" ");
  return (
    <Link
      href={href}
      className="group relative block h-[220px] overflow-hidden rounded-[24px] bg-black text-white outline-offset-4 md:h-[240px]"
    >
      {item.image && (
        <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden rounded-[24px]">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 200px, (min-width: 768px) 25vw, 42vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]"
          />
        </div>
      )}
      <span aria-hidden className="absolute left-4 top-4 font-display text-[14px] font-bold tracking-[0.06em] text-grey-soft md:left-6">
        {number}
      </span>
      {/* Text owns the left half only; long words hyphenate rather than run into the photo */}
      <span className="absolute inset-y-0 left-4 right-[calc(50%+12px)] flex flex-col justify-center hyphens-auto break-words md:left-6">
        <span className="text-[19px] leading-[1.1] md:text-[22px]">
          <span className="font-bold">{bold}</span>
          {rest && (
            <>
              {" "}
              <span className="block font-light">{rest}</span>
            </>
          )}
        </span>
        <span
          aria-hidden
          className="mt-3 block h-[3px] w-10 origin-left bg-orange transition-transform duration-500 ease-out-expo group-hover:scale-x-[1.8]"
        />
      </span>
    </Link>
  );
}
