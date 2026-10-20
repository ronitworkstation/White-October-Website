import Image from "next/image";

// Vector-exact logo files live in public/brand (generated from the logo PDFs).
const files = {
  "landscape-black": { src: "/brand/logo-landscape-black.svg", w: 307, h: 94 },
  "landscape-white": { src: "/brand/logo-landscape-white.svg", w: 307, h: 94 },
  "portrait-black": { src: "/brand/logo-portrait-black.svg", w: 152, h: 173 },
  "portrait-white": { src: "/brand/logo-portrait-white.svg", w: 152, h: 173 },
} as const;

export function Logo({
  variant = "landscape-black",
  height = 40,
  priority = false,
  className = "",
}: {
  variant?: keyof typeof files;
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const f = files[variant];
  return (
    <Image
      src={f.src}
      alt="White October"
      width={Math.round((f.w / f.h) * height)}
      height={height}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
