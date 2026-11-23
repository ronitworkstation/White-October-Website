import Image from "next/image";
import { sizeOf } from "@/content/image-sizes";

// A staged product tile: soft grey or black panel with the photo centred at (at most) its natural size.
// Keeps low-res item photos (350-740px) from being stretched full-bleed. The panel has a fixed aspect, so
// grids stay even whatever shape the photo is.
export function Plinth({
  src,
  alt = "",
  tone = "light",
  aspect = "aspect-[4/5]",
  className = "",
  sizes = "(min-width: 1024px) 30vw, 50vw",
  priority = false,
}: {
  src: string;
  alt?: string;
  tone?: "light" | "dark";
  aspect?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [width, height] = sizeOf(src);
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-tile p-5 md:p-8 ${aspect} ${
        tone === "light" ? "bg-panel" : "bg-black"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={priority}
        style={{ maxWidth: width, maxHeight: height }}
        className="h-auto max-h-full w-auto max-w-full rounded-[16px] object-contain"
      />
    </div>
  );
}
