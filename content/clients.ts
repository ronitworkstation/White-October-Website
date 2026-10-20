// Client logos, in the order of the company profile (page 11).
// Files: public/clients/<slug>.webp (original colours) and <slug>-mono.webp (grey silhouette).
// Extracted from the profile PDF; the low-res ones are listed in docs/asset-requests.md.

export type Client = { slug: string; name: string; w: number; h: number };

export const clients: Client[] = [
  { slug: "surtec", name: "SurTec", w: 107, h: 107 },
  { slug: "bechem", name: "Bechem Lubrication Technology", w: 124, h: 94 },
  { slug: "hdfc-bank", name: "HDFC Bank", w: 114, h: 126 },
  { slug: "target", name: "Target", w: 132, h: 180 },
  { slug: "jiohotstar", name: "JioHotstar", w: 222, h: 59 },
  { slug: "bread-financial", name: "Bread Financial", w: 292, h: 94 },
  { slug: "united-healthcare", name: "UnitedHealthcare", w: 240, h: 75 },
  { slug: "jw-marriott", name: "JW Marriott", w: 183, h: 77 },
  { slug: "lululemon", name: "lululemon", w: 147, h: 147 },
  { slug: "inquisitive-digital", name: "Inquisitive Digital", w: 181, h: 62 },
  { slug: "hdfc-life", name: "HDFC Life", w: 121, h: 78 },
  { slug: "marriott", name: "Marriott", w: 123, h: 97 },
  { slug: "ageas-federal-life", name: "Ageas Federal Life", w: 255, h: 84 },
  { slug: "tvs", name: "TVS", w: 178, h: 106 },
  { slug: "canara-bank", name: "Canara Bank", w: 170, h: 135 },
  { slug: "tresvista", name: "TresVista", w: 131, h: 59 },
  { slug: "essae", name: "Essae", w: 202, h: 94 },
  { slug: "coverself", name: "CoverSelf", w: 360, h: 67 },
  { slug: "pocket-fm", name: "Pocket FM", w: 92, h: 101 },
  { slug: "delhi-public-school", name: "Delhi Public School", w: 120, h: 151 },
  { slug: "aptean", name: "Aptean", w: 144, h: 41 },
  { slug: "eltai", name: "ELTAI", w: 220, h: 82 },
  { slug: "epsilon", name: "Epsilon", w: 311, h: 87 },
  { slug: "traana", name: "Traana", w: 115, h: 106 },
  { slug: "client-f", name: "", w: 229, h: 200 }, // TODO: name this logo
  { slug: "lilly", name: "Lilly", w: 254, h: 141 },
  { slug: "stixis", name: "Stixis", w: 173, h: 57 },
  { slug: "renaissance", name: "Renaissance Hotels", w: 413, h: 200 },
  { slug: "zeomega", name: "ZeOmega", w: 407, h: 82 },
  { slug: "client-pica", name: "", w: 129, h: 115 }, // TODO: name this logo
  { slug: "nu-hospitals", name: "NU Hospitals", w: 160, h: 160 },
  { slug: "mathco", name: "MathCo", w: 205, h: 49 },
  { slug: "pes-university", name: "PES University", w: 199, h: 91 },
  { slug: "jgi", name: "JGI", w: 100, h: 98 },
  { slug: "client-crest", name: "", w: 167, h: 167 }, // TODO: name this logo
  { slug: "motmans", name: "Motmans", w: 174, h: 25 },
  { slug: "ansr", name: "ANSR", w: 196, h: 73 },
  { slug: "burlington-english", name: "Burlington English", w: 98, h: 104 },
  { slug: "hackculture", name: "HackCulture", w: 154, h: 21 },
  { slug: "st-josephs-university", name: "St Joseph’s University", w: 143, h: 137 },
  { slug: "christ-university", name: "Christ University", w: 236, h: 97 },
  { slug: "st-lawrence-college", name: "St. Lawrence College", w: 283, h: 166 },
  { slug: "the-hindu", name: "The Hindu", w: 322, h: 144 },
  { slug: "247-ai", name: "[24]7.ai", w: 165, h: 47 },
  { slug: "bosch", name: "Bosch", w: 883, h: 200 },
  { slug: "bata", name: "Bata", w: 212, h: 52 },
  { slug: "chem-trend", name: "Chem-Trend", w: 155, h: 66 },
  { slug: "courtyard-marriott", name: "Courtyard by Marriott", w: 256, h: 41 },
  { slug: "kluber-lubrication", name: "Klüber Lubrication", w: 306, h: 109 },
  { slug: "insenses", name: "Insenses", w: 113, h: 42 },
];
