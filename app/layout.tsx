import type { Metadata, Viewport } from "next";
import "./globals.css";
import { antonio, outfit } from "./fonts";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "White October | Corporate Gifts, Awards, Print & Branding in Bengaluru",
    template: "%s | White October",
  },
  description:
    "White October designs corporate gifts, recognition awards, event branding and custom packaging for companies across India. In-house customisation, pan-India delivery.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "White October",
    images: [{ url: "/images/hero-desktop.jpg", width: 3840, height: 2161, alt: "White October: one colleague hands another a gift box" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/hero-desktop.jpg"] },
};

// LocalBusiness structured data. Only facts already in content/site.ts; sameAs/opening hours stay out until confirmed.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  telephone: site.contact.phoneDisplay,
  image: `${site.url}/images/hero-desktop.jpg`,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: "#37, UDBHAV@678, 2nd Floor, 11th Main Rd, 4th Block, Jayanagar",
    addressLocality: "Bengaluru",
    postalCode: "560011",
    addressCountry: "IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
};

// Runs before first paint: sets <html data-motion>. Respects the OS reduced-motion setting;
// localStorage "wo-motion" = "on" forces full motion (testing), "off" forces reduced.
const motionScript = `(function(){try{var o=localStorage.getItem('wo-motion');var r=o==='off'||(o!=='on'&&matchMedia('(prefers-reduced-motion: reduce)').matches);document.documentElement.dataset.motion=r?'reduce':'full'}catch(e){document.documentElement.dataset.motion='full'}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${antonio.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
