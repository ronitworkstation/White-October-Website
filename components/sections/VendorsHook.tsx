// The brochure's hook: one partner instead of ten vendors.
// Phase 1: static composition. Phase 2: on scroll, the ten vendor chips collapse into the single WO ball.
const vendors = [
  "Gift supplier",
  "Printer",
  "Trophy maker",
  "Packaging vendor",
  "Merch supplier",
  "Engraver",
  "Hamper curator",
  "Signage printer",
  "Designer",
  "Courier",
];

export function VendorsHook() {
  return (
    <section
      aria-labelledby="vendors-title"
      className="chamber-top relative -mt-8 bg-canvas py-24 md:-mt-16 md:py-36"
    >
      <div className="container-site">
      <ul aria-label="The vendors you no longer need to chase" className="mx-auto flex max-w-[880px] flex-wrap justify-center gap-2.5 md:gap-3">
        {vendors.map((v, i) => (
          <li
            key={v}
            className="rounded-full border-2 border-ink/80 px-4 py-2 text-[15px] font-medium text-grey-ink md:text-[17px]"
            style={{ transform: `rotate(${((i * 37) % 9) - 4}deg)` }}
          >
            {v}
          </li>
        ))}
      </ul>
      <h2
        id="vendors-title"
        className="mx-auto mt-14 max-w-[18ch] text-balance text-center text-[44px] font-bold leading-[1.02] tracking-[-0.02em] text-ink md:mt-20 md:text-[84px]"
      >
        <span className="font-light">Why chase 10 vendors when you can just </span>
        <span className="whitespace-nowrap text-orange-ink">call us?</span>
      </h2>
      <p className="mx-auto mt-6 max-w-[40ch] text-center text-[19px] text-grey-ink md:text-[22px]">
        Everything you need. One partner. Zero hassle.
      </p>
      </div>
    </section>
  );
}
