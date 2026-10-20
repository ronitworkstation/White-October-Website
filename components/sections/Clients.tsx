import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { clients, type Client } from "@/content/clients";
import { site } from "@/content/site";

// Optical sizing: every logo gets roughly the same ink area, so square crests and long wordmarks feel equal.
const AREA = 4300;
function displaySize(c: Client) {
  const aspect = c.w / c.h;
  let h = Math.min(62, Math.max(24, Math.sqrt(AREA / aspect)));
  let w = h * aspect;
  if (w > 164) {
    w = 164;
    h = w / aspect;
  }
  return { w: Math.round(w), h: Math.round(h) };
}

function Tile({ c, hidden }: { c: Client; hidden?: boolean }) {
  const { w, h } = displaySize(c);
  const label = c.name || "Client logo";
  return (
    <li
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : label}
      className={`${hidden ? "reduced:hidden" : ""} group/logo relative mx-1.5 grid h-[88px] w-[176px] shrink-0 place-items-center rounded-[22px] outline-none transition-[background-color,box-shadow] duration-500 ease-out-expo hover:bg-white hover:shadow-[0_0_0_2px_var(--color-orange),0_0_44px_rgb(255_114_0/0.5)] focus-visible:bg-white focus-visible:shadow-[0_0_0_2px_var(--color-orange),0_0_44px_rgb(255_114_0/0.5)] md:mx-2 md:h-[104px] md:w-[208px]`}
    >
      {/* Idle: the logo's ink used as a luminance mask over the brand's soft grey */}
      <span
        aria-hidden
        className="absolute bg-grey-soft opacity-75 transition-opacity duration-500 group-hover/logo:opacity-0 group-focus-visible/logo:opacity-0"
        style={{
          width: w,
          height: h,
          maskImage: `url(/clients/${c.slug}-mask.webp)`,
          maskMode: "luminance",
          maskSize: "100% 100%",
          // No -webkit-mask fallback on purpose: prefixed masks are alpha-only and would show a grey block.
        }}
      />
      <Image
        src={`/clients/${c.slug}.webp`}
        alt=""
        width={w}
        height={h}
        unoptimized
        fetchPriority="low"
        className="absolute opacity-0 transition-opacity duration-500 group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
        style={{ width: w, height: h }}
      />
    </li>
  );
}

function Row({ items, direction, duration }: { items: Client[]; direction: "left" | "right"; duration: number }) {
  return (
    <div className="group/row overflow-hidden mask-x-from-90% mask-x-to-100% reduced:mask-none">
      <ul
        className={`flex w-max py-3 ${
          direction === "left" ? "animate-[marquee-left_var(--d)_linear_infinite]" : "animate-[marquee-right_var(--d)_linear_infinite]"
        } group-hover/row:[animation-play-state:paused] group-focus-within/row:[animation-play-state:paused] reduced:w-full reduced:animate-none reduced:flex-wrap reduced:justify-center`}
        style={{ "--d": `${duration}s` } as React.CSSProperties}
      >
        {items.map((c) => (
          <Tile key={c.slug} c={c} />
        ))}
        {items.map((c) => (
          <Tile key={`${c.slug}-dup`} c={c} hidden />
        ))}
      </ul>
    </div>
  );
}

// Dark curved chamber directly under the hero: proof before pitch.
// Idle: logos as quiet grey silhouettes. Hover / focus / tap: tile turns white, orange glow, original colours.
export function Clients() {
  const half = Math.ceil(clients.length / 2);
  return (
    <section aria-labelledby="clients-title" className="mt-6 md:mt-10">
      <div className="chamber-top bg-black pb-24 pt-16 text-white md:pb-36 md:pt-24">
        <Eyebrow as="h2" id="clients-title" tone="light">
          {site.clients.eyebrow}
        </Eyebrow>
        <div className="mt-10 space-y-2 md:mt-14 md:space-y-3">
          <Row items={clients.slice(0, half)} direction="left" duration={70} />
          <Row items={clients.slice(half)} direction="right" duration={80} />
        </div>
      </div>
    </section>
  );
}
