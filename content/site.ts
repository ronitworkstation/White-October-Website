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
    // Brochure page 1, word for word. Desktop breaks after "vendors"; "call us?" is the bold orange accent.
    // (No eyebrow: the search keywords live in the page title and description.)
    headline: { lineOne: "Why chase 10 vendors", lineTwo: "when you can just", accent: "call us?" },
    subline: "Everything you need. One partner. Zero hassle.",
    image: {
      alt: "Seen from above, one colleague hands another a black gift box tied with an orange ribbon, standing on a floor mark shaped like the White October logo",
      // Landscape screens: Aziz's outpainted wide version (floor and strips extended on every side).
      desktop: { src: "/images/hero-desktop.jpg", width: 3840, height: 2161 },
      // Phones and upright tablets: the tall version with open floor above the people for the headline.
      mobile: { src: "/images/hero-mobile.jpg", width: 2000, height: 3554 },
    },
  },

  // "Why White October" (Benzai10 layout): one statement, then a row of real facts.
  // Sources: profile p2 (moments of recognition), p3 (consultation, pan-India delivery), p9 (in-house
  // printing and customisation facility); brochure (20+ years, 50+ industries); profile p11 (logo wall).
  // Draft copy: Medhansh approves before launch. Add numbers only when he confirms them.
  whyUs: {
    label: "Why White October",
    statement: {
      before: "White October designs",
      emphasis: "moments of recognition",
      after:
        ": the gifts, awards, print and event branding companies give their people. Beyond the product, we bring personal consultation, our own in-house printing and customisation, and reliable pan-India delivery, so every piece carries your brand the way you meant it.",
    },
    facts: [
      { value: 20, suffix: "+", label: "Years in business" },
      { value: 50, suffix: "+", label: "Industries served" },
      { value: 50, suffix: "+", label: "Brands that trust us" },
      { text: "In-house", label: "Printing and customisation" },
    ] as ({ value: number; suffix: string; label: string } | { text: string; label: string })[],
  },

  clients: {
    eyebrow: "Trusted by 50+ brands across India",
  },

  // Process: four steps. DRAFT lines built only from facts already in the profile (personal consultation,
  // in-house printing and customisation, pan-India delivery). Medhansh approves or rewrites before launch.
  process: {
    label: "How it works",
    title: { bold: "Four steps,", rest: "one partner." },
    steps: [
      { title: "Understand", line: "A personal consultation about your brand, your people and the occasion." },
      { title: "Curate", line: "We shortlist pieces from our four solution families to fit the brief." },
      { title: "Customize", line: "Printing and customisation happen in-house, so every piece carries your brand." },
      { title: "Deliver", line: "Reliable delivery across India, to your door or your team's." },
    ],
  },

  // Experience centre: photo is public/images/experience-centre.jpg (profile p12). Opening hours: TODO from Medhansh.
  experience: {
    label: "Experience Centre",
    title: { bold: "See it", rest: "in person." },
    line: "Visit our experience centre in Jayanagar to see and handle the work before you decide.",
    photo: { src: "/images/experience-centre.jpg", width: 2400, height: 1600, alt: "The White October experience centre in Jayanagar, Bengaluru" },
  },

  // FAQ: questions come from docs/asset-requests.md. Answers stay unpublished until Medhansh confirms the facts.
  faq: {
    label: "FAQ",
    title: { bold: "Questions", rest: "we get asked." },
    pending: "We are confirming this detail. Message us on WhatsApp and we will answer straight away.",
    items: [
      { q: "What is the minimum order quantity?", a: "" },
      { q: "How long does an order take?", a: "" },
      { q: "Can you handle rush orders?", a: "" },
      { q: "Can we see a sample or mock-up first?", a: "" },
      { q: "Do you deliver across India?", a: "" },
      { q: "Do you provide GST invoices?", a: "" },
      { q: "How do you customise products?", a: "" },
    ] as { q: string; a: string }[],
  },

  footer: {
    lead: "Let's create experiences that people remember.",
  },
} as const;

export const whatsappHref = (text = "Hi White October, I'd like a quote for corporate gifts.") =>
  `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
