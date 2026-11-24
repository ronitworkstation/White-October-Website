"use client";

import { Phone, WhatsappLogo, ChatCircleText } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site, whatsappHref } from "@/content/site";

// Sticky action bar for phones: Call, WhatsApp, Quote. The three actions buyers take most, one thumb away.
// Appears once the first screen is scrolled past (so it never covers the hero actions), and hides on /quote
// (the form is the page). Desktop keeps the floating WhatsApp button instead.
export function MobileBar() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);
  useLenis(({ scroll }) => setShown(scroll > window.innerHeight * 0.7));
  if (pathname === "/quote") return null;

  const item =
    "flex min-h-12 flex-1 items-center justify-center gap-2 text-[15px] font-semibold leading-none";
  return (
    <div
      role="region"
      aria-label="Contact actions"
      className={`fixed inset-x-0 bottom-0 z-30 flex border-t-2 border-ink bg-white pb-[env(safe-area-inset-bottom)] transition-transform duration-500 ease-out-expo md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a href={site.contact.phoneHref} tabIndex={shown ? 0 : -1} className={`${item} text-ink`}>
        <Phone size={20} weight="bold" aria-hidden />
        Call
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener"
        tabIndex={shown ? 0 : -1}
        className={`${item} border-x-2 border-ink text-ink`}
      >
        <WhatsappLogo size={20} weight="bold" aria-hidden />
        WhatsApp
      </a>
      <a href={site.cta.href} tabIndex={shown ? 0 : -1} className={`${item} bg-orange text-ink`}>
        <ChatCircleText size={20} weight="bold" aria-hidden />
        Quote
      </a>
    </div>
  );
}
