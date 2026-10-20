import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Urbanist, Antonio } from "next/font/google";

// Internal lab page: compares free Gilroy lookalikes against crops of the real PDF text.
// Delete this route before launch.

export const metadata: Metadata = { title: "Font lab", robots: { index: false } };

const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });
const urbanist = Urbanist({ subsets: ["latin"], display: "swap" });
const antonio = Antonio({ subsets: ["latin"], weight: "700", display: "swap" });

const candidates = [
  { name: "Urbanist", font: urbanist },
  { name: "Outfit", font: outfit },
  { name: "Plus Jakarta Sans", font: jakarta },
];

function Sample({ className }: { className: string }) {
  return (
    <div className={className}>
      <p style={{ fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: "-0.01em" }}>
        <span style={{ fontWeight: 400 }}>From Idea to </span>
        <span style={{ fontWeight: 700, color: "#FF7200" }}>Impact</span>
      </p>
      <p style={{ fontSize: 56, lineHeight: 1.05, margin: "16px 0 0", letterSpacing: "-0.01em" }}>
        <span style={{ fontWeight: 700 }}>Brand Experience</span> <span style={{ fontWeight: 400 }}>Solutions</span>
      </p>
      <p style={{ fontSize: 44, lineHeight: 1.1, margin: "16px 0 0" }}>
        <span style={{ fontWeight: 300 }}>Every Great Gift</span>
        <br />
        <span style={{ fontWeight: 700, color: "#FF7200" }}>Begins with a Feeling</span>
      </p>
      <p style={{ fontSize: 19, lineHeight: 1.6, margin: "16px 0 0", maxWidth: 420 }}>
        We begin by understanding your objectives, audience, and gifting requirements.
      </p>
    </div>
  );
}

export default function FontLab() {
  return (
    <main style={{ background: "#fff", color: "#111", padding: 48, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#797676" }}>
        Real Gilroy (from the company profile PDF)
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 48 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lab/pdf-heading.png" alt="Gilroy: From Idea to Impact" style={{ height: 92, width: "auto", alignSelf: "flex-start" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lab/pdf-heading2.png" alt="Gilroy: Brand Experience Solutions" style={{ height: 88, width: "auto", alignSelf: "flex-start" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lab/pdf-heading3.png" alt="Gilroy: Every Great Gift Begins with a Feeling" style={{ height: 108, width: "auto", alignSelf: "flex-start", background: "#111" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/lab/pdf-body.png" alt="Gilroy body text" style={{ height: 84, width: "auto", alignSelf: "flex-start" }} />
      </div>
      {candidates.map((c) => (
        <section key={c.name} style={{ borderTop: "2px solid #111", padding: "24px 0 40px" }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#797676" }}>{c.name}</h2>
          <Sample className={c.font.className} />
        </section>
      ))}
      <section style={{ borderTop: "2px solid #111", padding: "24px 0 40px" }}>
        <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: "0.1em", color: "#797676" }}>Antonio Bold (display)</h2>
        <p className={antonio.className} style={{ fontSize: 120, lineHeight: 0.9, margin: 0 }}>
          <span style={{ color: "#797676" }}>0</span>
          <span style={{ color: "#FF7200" }}>1</span> MEDHANSH PODDAR
        </p>
      </section>
    </main>
  );
}
