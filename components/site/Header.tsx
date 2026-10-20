"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CaretDown, List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappHref } from "@/content/site";
import { solutions } from "@/content/solutions";

// Floating nav pill (Wispr structure): logo left, nav centre, "Send a Quote" right.
// Hides while scrolling down past the hero, returns on scroll up, so content gets the full screen.
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solOpen, setSolOpen] = useState(false);
  const solRef = useRef<HTMLLIElement>(null);
  const lenis = useLenis(({ scroll, direction }) => {
    const past = scroll > 160;
    setScrolled(scroll > 24);
    setHidden(past && direction === 1 && !menuOpen && !solOpen);
  });

  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSolOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (solRef.current && !solRef.current.contains(e.target as Node)) setSolOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 ease-out-expo md:px-6 md:pt-5 ${
          hidden ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div
          className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border-2 border-ink pl-5 pr-2 transition-colors duration-300 md:pl-6 ${
            scrolled ? "bg-white" : "bg-white/85 backdrop-blur-md"
          }`}
        >
          <Link href="/" aria-label="White October home" className="shrink-0">
            <Logo variant="landscape-black" height={38} priority />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) =>
                "hasMenu" in item && item.hasMenu ? (
                  <li key={item.label} className="relative" ref={solRef} onMouseLeave={() => setSolOpen(false)}>
                    <button
                      type="button"
                      aria-expanded={solOpen}
                      aria-controls="solutions-menu"
                      // Mouse: hover already opened it, so a click keeps it open. Keyboard (detail 0): toggle.
                      onClick={(e) => setSolOpen((v) => (e.detail === 0 ? !v : true))}
                      onMouseEnter={() => setSolOpen(true)}
                      className="flex items-center gap-1.5 rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-panel"
                    >
                      {item.label}
                      <CaretDown
                        size={14}
                        weight="bold"
                        className={`transition-transform duration-300 ${solOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      id="solutions-menu"
                      className={`absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-[opacity,transform,visibility] duration-300 ease-out-expo ${
                        solOpen
                          ? "visible pointer-events-auto translate-y-0 opacity-100"
                          : "invisible pointer-events-none -translate-y-2 opacity-0"
                      }`}
                    >
                      <ul className="grid grid-cols-2 gap-2 rounded-[28px] border-2 border-ink bg-white p-3">
                        {solutions.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/solutions/${s.slug}`}
                              onClick={() => setSolOpen(false)}
                              className="group block rounded-[20px] p-4 transition-colors hover:bg-panel"
                            >
                              <span className="flex items-center justify-between text-[17px] font-bold leading-tight text-ink">
                                <span>
                                  {s.titleBold} <span className="font-normal">{s.titleRest}</span>
                                </span>
                                <ArrowUpRight
                                  size={16}
                                  weight="bold"
                                  className="text-ink opacity-0 transition-opacity group-hover:opacity-100"
                                />
                              </span>
                              <span className="mt-1 block text-[14px] leading-snug text-grey-ink">{s.short}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="rounded-full px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:bg-panel"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href={site.cta.href} className="hidden sm:inline-flex">
              {site.cta.label}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white text-ink lg:hidden"
            >
              <List size={20} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu: a full-screen dark chamber */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-black text-white transition-[opacity,transform,visibility] duration-500 ease-out-expo lg:hidden ${
          menuOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-[88px] items-center justify-between px-6">
          <Logo variant="landscape-white" height={36} />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white"
          >
            <X size={20} weight="bold" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 pb-8" data-lenis-prevent>
          <p className="mb-3 mt-4 text-[13px] uppercase tracking-[0.14em] text-grey-soft">Solutions</p>
          <ul className="space-y-1">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/solutions/${s.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-[28px] font-bold leading-tight"
                >
                  {s.titleBold} <span className="font-normal">{s.titleRest}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-1 border-t border-line pt-6">
            {site.nav
              .filter((n) => !("hasMenu" in n))
              .map((n) => (
                <li key={n.label}>
                  <Link href={n.href} onClick={() => setMenuOpen(false)} className="block py-2 text-[22px]">
                    {n.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        <div className="grid grid-cols-2 gap-3 border-t border-line p-6">
          <ButtonLink href={site.cta.href} size="lg" onClick={() => setMenuOpen(false)} className="w-full">
            {site.cta.label}
          </ButtonLink>
          <ButtonLink href={whatsappHref()} variant="outline-light" size="lg" target="_blank" rel="noopener" className="w-full">
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
