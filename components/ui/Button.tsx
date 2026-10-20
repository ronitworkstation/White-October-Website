import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "outline-light";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 font-semibold leading-none transition-[transform,background-color,color,border-color] duration-300 ease-out-expo active:scale-[0.98] select-none";

const variants: Record<Variant, string> = {
  // Orange fill + ink text (7.7:1). The one action colour on the site.
  primary: "border-ink bg-orange text-ink hover:bg-ink hover:text-white",
  outline: "border-ink bg-transparent text-ink hover:bg-ink hover:text-white",
  "outline-light": "border-white bg-transparent text-white hover:bg-white hover:text-ink",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-[17px]",
};

type Props = ComponentProps<typeof Link> & { variant?: Variant; size?: keyof typeof sizes };

export function ButtonLink({ variant = "primary", size = "md", className = "", children, ...rest }: Props) {
  return (
    <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
