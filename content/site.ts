// Site-wide copy and contact details. Edit here; the whole site updates.
// Sources: WO company profile + brochure (2026). Anything marked TODO is unconfirmed: confirm with Medhansh before launch.

export const site = {
  name: "White October",
  tagline: "More than the gift",
  url: "https://whiteoctober.co",
  year: 2026,

  contact: {
    phoneDisplay: "+91 99729 90646",
    phoneHref: "tel:+919972990646",
    whatsappNumber: "919972990646",
    // TODO: whiteoctober.com is held by a domain parker. Confirm this inbox actually reaches WO, or replace it.
    email: "hello@whiteoctober.com",
    emailConfirmed: false,
    addressLines: ["#37, UDBHAV@678, 2nd Floor, 11th Main Rd", "Next to Shanthi Nursing, 4th Block, Jayanagar", "Bengaluru 560011"],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=White+October+UDBHAV+11th+Main+Road+4th+Block+Jayanagar+Bengaluru",
    socialHandle: "@whiteoctober",
    // TODO: exact profile URLs not confirmed yet; icons stay hidden until filled in.
    social: {
      instagram: "",
      linkedin: "",
      youtube: "",
      facebook: "",
    },
  },

  // Quote leads: test inbox until the main one is confirmed.
  leadsInbox: "aziz998787@gmail.com",

  nav: [
    { label: "Solutions", href: "/#solutions", hasMenu: true },
    { label: "Process", href: "/#process" },
    { label: "Experience Centre", href: "/#experience" },
    { label: "FAQ", href: "/#faq" },
  ],

  cta: { label: "Send a Quote", href: "/quote" },

  hero: {
    eyebrow: "Corporate gifts, print and branding",
    // Option A (brand line). Option B kept for checkpoint 1.
    headline: "More than the gift.",
    subtext: "People forget the object. They remember how it made them feel. We design for the feeling.",
    alt: {
      headline: "Why chase 10 vendors? Call one.",
      subtext: "Gifts, awards, print and event branding, made in-house and delivered across India.",
    },
    image: {
      src: "/images/hero-final.jpg",
      alt: "Seen from above, one colleague hands another a black gift box tied with an orange ribbon, standing on a floor mark shaped like the White October logo",
    },
  },

  // Real numbers only (brochure). Add more only when Medhansh confirms them.
  numbers: [
    { value: 20, suffix: "+", label: "years" },
    { value: 50, suffix: "+", label: "industries" },
    { value: 50, suffix: "+", label: "brands trusted us" },
  ],

  clients: {
    eyebrow: "Trusted by 50+ brands across India",
  },

  footer: {
    lead: "Let's create experiences that people remember.",
  },
} as const;

export const whatsappHref = (text = "Hi White October, I'd like a quote for corporate gifts.") =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
