import { ButtonLink } from "@/components/ui/Button";
import { Plinth } from "@/components/ui/Plinth";

// Scratch page: every design primitive in one place. Not linked from the site.
export const metadata = { title: "Primitives", robots: { index: false } };

export default function Primitives() {
  return (
    <main className="bg-canvas">
      <section className="container-site space-y-6 py-16">
        <p className="text-display">Display</p>
        <h1 className="text-h1">Heading one</h1>
        <h2 className="text-h2">Heading two</h2>
        <p className="text-body">Body text in Outfit at 18px.</p>
        <p className="text-small text-grey-ink">Small text.</p>
        <div className="flex gap-3">
          <ButtonLink href="#" variant="primary" size="lg">Primary</ButtonLink>
          <ButtonLink href="#" variant="outline" size="lg">Outline</ButtonLink>
        </div>
        <div className="grid max-w-3xl grid-cols-2 gap-4">
          <Plinth src="/images/solutions/trophies.webp" />
          <Plinth src="/images/solutions/awards.webp" tone="dark" />
        </div>
      </section>
      <section className="chamber-top bg-black px-8 py-16 text-white">
        <p className="text-h2">Curved top: 48px desktop, 32px mobile.</p>
      </section>
    </main>
  );
}
