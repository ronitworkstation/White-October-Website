// The four solution families and their items, exactly as listed in the company profile (pages 5-8).
// Item lines are draft copy for Medhansh to approve. Images: see docs/asset-requests.md (slots S*, B*, I*).

export type SolutionItem = { name: string; line: string; image?: string };
export type Solution = {
  slug: string;
  titleBold: string;
  titleRest: string;
  short: string;
  summary: string;
  cardImage?: string;
  items: SolutionItem[];
};

export const solutions: Solution[] = [
  {
    slug: "corporate-gifting",
    titleBold: "Corporate",
    titleRest: "Gifting",
    short: "Hampers, executive gifts, welcome kits and branded merchandise.",
    summary: "Gifts curated around your brand and the people receiving them, from first-day welcome kits to year-end hampers.",
    items: [
      { name: "Premium Gift Hampers", line: "Curated hampers for clients, partners and festive moments." },
      { name: "Executive Gifts", line: "Considered gifts for leadership, clients and milestones." },
      { name: "Welcome Kits", line: "First-day kits that make new joiners feel expected." },
      { name: "Lifestyle & Utility Products", line: "Bottles, bags, desk sets and everyday pieces people keep using." },
      { name: "Branded Merchandise", line: "Apparel and merch that carries your brand well." },
      { name: "Office Branding", line: "Your identity carried across the workspace." },
    ],
  },
  {
    slug: "recognition",
    titleBold: "Recognition",
    titleRest: "Solutions",
    short: "Awards, trophies, medals, plaques and name badges.",
    summary: "Recognition pieces designed for the moment someone's work is seen.",
    items: [
      { name: "Awards", line: "Custom awards designed around your brand and the occasion." },
      { name: "Trophies", line: "Trophies for annual days, sports meets and milestones." },
      { name: "Medals", line: "Medals for events, runs and achievements." },
      { name: "Plaques", line: "Plaques that mark long service and big wins." },
      { name: "Name Badges", line: "Badges for teams, events and front desks." },
    ],
  },
  {
    slug: "event-branding",
    titleBold: "Event &",
    titleRest: "Branding",
    short: "ID cards, lanyards, banners, standees and conference kits.",
    summary: "Everything an event needs to look like one brand, printed and customised in-house.",
    items: [
      { name: "ID Cards", line: "Printed ID cards for teams, visitors and events." },
      { name: "Lanyards", line: "Branded lanyards to match your cards and colours." },
      { name: "Banners", line: "Banners for stages, entrances and storefronts." },
      { name: "Standees", line: "Standees that guide and welcome people." },
      { name: "Event Branding", line: "Stage, venue and backdrop branding." },
      { name: "Conference Kits", line: "Kits handed to every attendee at the door." },
    ],
  },
  {
    slug: "build-for-you",
    titleBold: "Built",
    titleRest: "For You",
    short: "Personalised merch, swag boxes, custom packaging and festive kits.",
    summary: "When nothing off the shelf fits, we build it: the product, the box and the way it opens.",
    items: [
      { name: "Personalised Merchandise", line: "Merchandise made around a name, a team or a story." },
      { name: "Swag Boxes", line: "Boxes for launches, communities and campaigns." },
      { name: "Custom Packaging", line: "Packaging designed for the moment it's opened." },
      { name: "Festive Kits", line: "Kits for Diwali, New Year and the occasions you celebrate." },
      { name: "Occasional Kits", line: "Kits built for one-off moments and milestones." },
    ],
  },
];
