import type { Metadata } from "next";
import { ViewTransition } from "react";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Send a Quote",
  description: "Tell White October what you need: corporate gifts, awards, print or event branding. We will get back to you.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
    <section aria-labelledby="quote-title" className="container-site pb-24 pt-36 md:pb-32 md:pt-48">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h1 id="quote-title" className="text-h1 text-ink">
            <span className="font-bold">Send</span> <span className="font-light">a Quote</span>
          </h1>
          <p className="mt-6 max-w-[38ch] text-[20px] leading-snug text-grey-ink">
            Tell us what you need and we will come back to you. Prefer to talk? Call{" "}
            <a href={site.contact.phoneHref} className="border-b-2 border-orange font-semibold text-ink">
              {site.contact.phoneDisplay}
            </a>
            .
          </p>
        </div>
        <div className="lg:col-span-7">
          <QuoteForm />
        </div>
      </div>
    </section>
    </ViewTransition>
  );
}
