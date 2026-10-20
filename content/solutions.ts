// The four solution families and their items, exactly as listed in the company profile (pages 5-8).
// Item lines are draft copy for Medhansh to approve. Images: see docs/asset-requests.md (slots S*, B*, I*).

// boldWords: how many leading words are set Bold (profile pairing "**Premium** Gift Hampers"). Default 1.
export type SolutionItem = { name: string; line: string; image?: string; boldWords?: number };
export type Solution = {
  slug: string;
  titleBold: string;
  titleRest: string;
  short: string;
  summary: string;
  /** Photo on the tilted thumbnail in the home Solutions list */
  cover: string;
  items: SolutionItem[];
};

export const solutions: Solution[] = [
  {
    slug: "corporate-gifting",
    cover: "/images/solutions/premium-gift-hampers.webp",
    titleBold: "Corporate",
    titleRest: "Gifting",
    short: "Hampers, executive gifts, welcome kits and branded merchandise.",
    summary: "Gifts curated around your brand and the people receiving them, from first-day welcome kits to year-end hampers.",
    items: [
      { name: "Premium Gift Hampers", line: "Curated hampers for clients, partners and festive moments.", image: "/images/solutions/premium-gift-hampers.webp" },
      { name: "Executive Gifts", line: "Considered gifts for leadership, clients and milestones.", image: "/images/solutions/executive-gifts.webp" },
      { name: "Welcome Kits", line: "First-day kits that make new joiners feel expected.", image: "/images/solutions/welcome-kits.webp" },
      { name: "Lifestyle & Utility Products", boldWords: 3, line: "Bottles, bags, desk sets and everyday pieces people keep using.", image: "/images/solutions/lifestyle-utility-products.webp" },
      { name: "Branded Merchandise", line: "Apparel and merch that carries your brand well.", image: "/images/solutions/branded-merchandise.webp" },
      { name: "Office Branding", line: "Your identity carried across the workspace.", image: "/images/solutions/office-branding.webp" },
    ],
  },
  {
    slug: "recognition",
    cover: "/images/solutions/trophies.webp",
    titleBold: "Recognition",
    titleRest: "Solutions",
    short: "Awards, trophies, medals, plaques and name badges.",
    summary: "Recognition pieces designed for the moment someone's work is seen.",
    items: [
      { name: "Awards", line: "Custom awards designed around your brand and the occasion.", image: "/images/solutions/awards.webp" },
      { name: "Trophies", line: "Trophies for annual days, sports meets and milestones.", image: "/images/solutions/trophies.webp" },
      { name: "Medals", line: "Medals for events, runs and achievements.", image: "/images/solutions/medals.webp" },
      { name: "Plaques", line: "Plaques that mark long service and big wins.", image: "/images/solutions/plaques.webp" },
      { name: "Name Badges", line: "Badges for teams, events and front desks.", image: "/images/solutions/name-badges.webp" },
    ],
  },
  {
    slug: "event-branding",
    cover: "/images/solutions/lanyards.webp",
    titleBold: "Event &",
    titleRest: "Branding",
    short: "ID cards, lanyards, banners, standees and conference kits.",
    summary: "Everything an event needs to look like one brand, printed and customised in-house.",
    items: [
      { name: "ID Cards", boldWords: 2, line: "Printed ID cards for teams, visitors and events.", image: "/images/solutions/id-cards.webp" },
      { name: "Lanyards", line: "Branded lanyards to match your cards and colours.", image: "/images/solutions/lanyards.webp" },
      { name: "Banners", line: "Banners for stages, entrances and storefronts.", image: "/images/solutions/banners.webp" },
      { name: "Standees", line: "Standees that guide and welcome people.", image: "/images/solutions/standees.webp" },
      { name: "Event Branding", line: "Stage, venue and backdrop branding.", image: "/images/solutions/event-branding.webp" },
      { name: "Conference Kits", line: "Kits handed to every attendee at the door.", image: "/images/solutions/conference-kits.webp" },
    ],
  },
  {
    slug: "build-for-you",
    cover: "/images/solutions/swag-boxes.webp",
    titleBold: "Built",
    titleRest: "For You",
    short: "Personalised merch, swag boxes, custom packaging and festive kits.",
    summary: "When nothing off the shelf fits, we build it: the product, the box and the way it opens.",
    items: [
      { name: "Personalised Merchandise", line: "Merchandise made around a name, a team or a story.", image: "/images/solutions/personalised-merchandise.webp" },
      { name: "Swag Boxes", line: "Boxes for launches, communities and campaigns.", image: "/images/solutions/swag-boxes.webp" },
      { name: "Custom Packaging", line: "Packaging designed for the moment it's opened.", image: "/images/solutions/custom-packaging.webp" },
      { name: "Festive Kits", line: "Kits for Diwali, New Year and the occasions you celebrate.", image: "/images/solutions/festive-kits.webp" },
      { name: "Occasional Kits", line: "Kits built for one-off moments and milestones.", image: "/images/solutions/occasional-kits.webp" },
    ],
  },
];
