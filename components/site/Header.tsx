"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DUR, EASE, gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappHref } from "@/content/site";
import { solutions } from "@/content/solutions";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Logo left; "Send a Quote" and a Menu pill right. The menu is a full-screen black chamber on every screen size.
// The bar hides while scrolling down past the hero and returns on scroll up, so content gets the full screen.
export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const lenis = useLenis(({ scroll, direction }) => {
    setScrolled(scroll > 24);
    setHidden(scroll > 160 && direction === 1 && !menuOpen);
  });

  // A reload can restore the page mid-scroll before Lenis emits anything: start from the real position.
  useEffect(() => {
    const id = requestAnimationFrame(() => setScrolled(window.scrollY > 24));
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll lock: Lenis stops while the menu is open (useLenis(), never a ref: see START-HERE gotchas).
  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
  }, [menuOpen, lenis]);

  const close = useCallback(() => {
    setMenuOpen(false);
    openerRef.current?.focus();
  }, []);

  // Focus moves into the menu on open. Esc closes. Tab and Shift+Tab loop inside the menu.
  useEffect(() => {
    if (!menuOpen) return;
    // A hidden element cannot take focus and the menu turns visible only as its transition starts: retry briefly.
    let tries = 0;
    const raf = window.setInterval(() => {
      closeRef.current?.focus();
      if (document.activeElement === closeRef.current || ++tries > 10) window.clearInterval(raf);
    }, 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const els = [...menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      // Focus escaped the menu (e.g. it had not landed yet): pull it back in.
      if (!menuRef.current.contains(document.activeElement)) {
        e.preventDefault();
        (e.shiftKey ? last : first).focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearInterval(raf);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, close]);

  // Menu items rise in one after another when it opens (reason: a list of destinations, read in order).
  useGSAP(
    () => {
      if (!menuOpen || !menuRef.current || prefersReducedMotion()) return;
      gsap.fromTo(
        menuRef.current.querySelectorAll(".menu-item"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: DUR.slow, ease: EASE, stagger: 0.05, delay: 0.15, clearProps: "transform,opacity" },
      );
    },
    { dependencies: [menuOpen], scope: menuRef },
  );

  const otherNav = site.nav.filter((n) => !("hasMenu" in n && n.hasMenu));

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={`fixed inset-x-0 top-0 z-40 px-3 pt-3 transition-transform duration-500 ease-out-expo md:px-6 md:pt-5 ${
          hidden ? "-translate-y-[130%]" : "translate-y-0"
        }`}
      >
        <div
          // At the top the bar dissolves into the hero (logo sits straight on its white floor);
          // once the page moves it becomes a solid white pill, so it reads over any section.
          className={`mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full border-2 pl-5 pr-2 transition-[background-color,border-color] duration-500 ease-out-expo md:pl-6 ${
            scrolled ? "border-ink bg-white" : "border-transparent bg-transparent"
          }`}
        >
          {/* Portrait logo: full size on the hero's white floor, scaled into the pill once the page moves */}
          <Link href="/" aria-label="White October home" className="relative block h-[60px] w-[53px] shrink-0 md:h-[84px] md:w-[74px]">
            <span
              className={`absolute inset-0 origin-left transition-transform duration-500 ease-out-expo ${
                scrolled ? "scale-[0.85] md:scale-[0.62]" : ""
              }`}
            >
              <Logo variant="portrait-black" height={84} priority className="h-full w-auto" />
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <ButtonLink href={site.cta.href} className="hidden sm:inline-flex">
              {site.cta.label}
            </ButtonLink>
            <button
              ref={openerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-white px-4 text-[15px] font-semibold leading-none text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              Menu
              <List size={18} weight="bold" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu: a black chamber. Closed = invisible, so nothing inside is focusable. */}
      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-50 flex flex-col bg-black text-white transition-[opacity,transform,visibility] duration-500 ease-out-expo ${
          menuOpen ? "visible pointer-events-auto opacity-100" : "invisible pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex h-[88px] shrink-0 items-center justify-between px-6 md:px-10">
          <Logo variant="portrait-white" height={56} />
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-white px-4 text-[15px] font-semibold leading-none transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            Close
            <X size={18} weight="bold" aria-hidden />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8 md:px-10" data-lenis-prevent>
          <div className="mx-auto grid max-w-[1240px] gap-10 pt-4 md:grid-cols-[1.6fr_1fr] md:gap-16 md:pt-10">
            <nav aria-label="Solutions">
              <p className="mb-3 text-[13px] uppercase tracking-[0.14em] text-grey-soft">Solutions</p>
              <ul className="divide-y divide-line border-y border-line">
                {solutions.map((s, i) => (
                  <li key={s.slug} className="menu-item">
                    <Link
                      href={`/solutions/${s.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center gap-4 py-4 md:gap-6 md:py-6"
                    >
                      <span aria-hidden className="w-8 font-display text-[16px] font-bold text-grey-soft md:text-[20px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[26px] font-bold leading-tight md:text-[44px]">
                          {s.titleBold} <span className="font-normal">{s.titleRest}</span>
                        </span>
                        <span className="mt-1 hidden text-[15px] text-grey-soft md:block">{s.short}</span>
                      </span>
                      <ArrowUpRight
                        size={28}
                        weight="bold"
                        aria-hidden
                        className="text-orange transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-8">
              <nav aria-label="Pages">
                <ul className="space-y-1">
                  {otherNav.map((n) => (
                    <li key={n.label} className="menu-item">
                      <Link href={n.href} onClick={() => setMenuOpen(false)} className="block py-1.5 text-[22px] md:text-[26px]">
                        {n.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <address className="menu-item space-y-1 text-[15px] not-italic text-grey-soft">
                <a href={site.contact.phoneHref} className="block text-[22px] font-semibold text-white">
                  {site.contact.phoneDisplay}
                </a>
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>

        <div
          className="menu-item grid shrink-0 grid-cols-2 gap-3 border-t border-line p-6 md:flex md:justify-end md:px-10"
         
        >
          <ButtonLink href={site.cta.href} size="lg" onClick={() => setMenuOpen(false)} className="w-full md:w-auto">
            {site.cta.label}
          </ButtonLink>
          <ButtonLink href={whatsappHref()} variant="outline-light" size="lg" target="_blank" rel="noopener" className="w-full md:w-auto">
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
