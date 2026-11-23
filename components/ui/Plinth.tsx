import Image from "next/image";

// A staged product tile: soft grey or black panel with the photo centred at (at most) its natural size.
// Keeps low-res item photos (350-740px) from being stretched full-bleed. Pass natural width/height.
export function Plinth({
  src,
  alt = "",
  width,
  height,
  tone = "light",
  className = "",
  sizes,
}: {
  src: string;
  alt?: string;
  width: number;
  height: number;
  tone?: "light" | "dark";
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-tile p-6 md:p-10 ${
        tone === "light" ? "bg-panel" : "bg-black"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        style={{ maxWidth: width }}
        className="h-auto w-full rounded-[16px] object-contain"
      />
    </div>
  );
}
