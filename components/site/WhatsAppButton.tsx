"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { useLenis } from "lenis/react";
import { useState } from "react";
import { whatsappHref } from "@/content/site";

// Site-wide chat button. Appears once the hero is scrolled past, so it never covers the hero CTA.
// Black with an orange ring on hover (WhatsApp green would break the palette lock).
export function WhatsAppButton() {
  const [shown, setShown] = useState(false);
  useLenis(({ scroll }) => setShown(scroll > window.innerHeight * 0.7));

  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener"
      aria-label="Chat with White October on WhatsApp"
      tabIndex={shown ? 0 : -1}
      className={`fixed bottom-4 right-4 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-white bg-black text-white transition-[transform,opacity,box-shadow] duration-500 ease-out-expo hover:shadow-[0_0_0_3px_var(--color-orange)] md:bottom-6 md:right-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <WhatsappLogo size={28} weight="fill" />
    </a>
  );
}
