"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { ButtonLink } from "@/components/ui/Button";
import { site, whatsappHref } from "@/content/site";
import { solutions } from "@/content/solutions";

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "company" | "phone" | "email", string>>;

const field =
  "mt-2 block w-full rounded-input border-2 border-ink bg-white px-4 py-3 text-[17px] text-ink placeholder:text-grey outline-offset-2";

// Quote form. Netlify Forms: the form is declared in public/__forms.html (so Netlify detects it at build time)
// and posted there as urlencoded data. Leads go to the inbox set in the Netlify dashboard (site.leadsInbox is the
// test inbox). WhatsApp opens wa.me prefilled as the alternative.
export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const familyRef = useRef<HTMLSelectElement>(null);

  // Pre-select the family when arriving from a solution page (?family=slug). Set on the DOM node: no re-render.
  useEffect(() => {
    const f = new URLSearchParams(window.location.search).get("family");
    if (f && familyRef.current && solutions.some((s) => s.slug === f)) familyRef.current.value = f;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();

    const next: Errors = {};
    if (!get("name")) next.name = "Please enter your name.";
    if (!get("company")) next.company = "Please enter your company.";
    if (get("phone").replace(/\D/g, "").length < 10) next.phone = "Please enter a phone number with at least 10 digits.";
    if (!/^\S+@\S+\.\S+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    setErrors(next);
    const firstBad = Object.keys(next)[0];
    if (firstBad) {
      // aria-invalid is not rendered yet at this point, so focus the first failing field by name.
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const body = new URLSearchParams();
      body.set("form-name", "quote");
      data.forEach((v, k) => body.set(k, String(v)));
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-card bg-black p-8 text-white md:p-12">
        <h2 className="text-h2 font-bold">Thank you. We have your request.</h2>
        <p className="mt-4 max-w-[44ch] text-[18px] text-grey-soft">
          Someone from White October will get back to you. In a hurry? Message us on WhatsApp.
        </p>
        <div className="mt-8">
          <ButtonLink href={whatsappHref()} variant="outline-light" size="lg" target="_blank" rel="noopener">
            <WhatsappLogo size={20} weight="bold" />
            WhatsApp us
          </ButtonLink>
        </div>
      </div>
    );
  }

  const err = (k: keyof Errors) => (errors[k] ? <p id={`${k}-err`} className="mt-1.5 text-[14px] font-semibold text-ink">{errors[k]}</p> : null);
  const aria = (k: keyof Errors) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-err` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block text-[15px] font-semibold text-ink">
          Name
          <input name="name" autoComplete="name" required className={field} {...aria("name")} />
          {err("name")}
        </label>
        <label className="block text-[15px] font-semibold text-ink">
          Company
          <input name="company" autoComplete="organization" required className={field} {...aria("company")} />
          {err("company")}
        </label>
        <label className="block text-[15px] font-semibold text-ink">
          Phone
          <input name="phone" type="tel" autoComplete="tel" inputMode="tel" required className={field} {...aria("phone")} />
          {err("phone")}
        </label>
        <label className="block text-[15px] font-semibold text-ink">
          Email
          <input name="email" type="email" autoComplete="email" required className={field} {...aria("email")} />
          {err("email")}
        </label>
      </div>
      <label className="block text-[15px] font-semibold text-ink">
        What do you need?
        <select ref={familyRef} name="family" defaultValue="" className={field}>
          <option value="">Not sure yet</option>
          {solutions.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.titleBold} {s.titleRest}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-[15px] font-semibold text-ink">
        Message
        <textarea name="message" rows={5} className={field} placeholder="Occasion, quantity, timeline: whatever you know so far." />
      </label>
      {/* Honeypot: real visitors never see or fill this */}
      <p className="hidden" aria-hidden>
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {status === "error" && (
        <p role="alert" className="rounded-input border-2 border-ink bg-panel p-4 text-[16px] text-ink">
          We could not send your request. Check your connection and try again, or message us on WhatsApp or call {site.contact.phoneDisplay}.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-14 items-center justify-center rounded-full border-2 border-ink bg-orange px-7 text-[17px] font-semibold leading-none text-ink transition-colors duration-300 hover:bg-ink hover:text-white disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send request"}
        </button>
        <ButtonLink href={whatsappHref()} variant="outline" size="lg" target="_blank" rel="noopener">
          <WhatsappLogo size={20} weight="bold" />
          Or WhatsApp us
        </ButtonLink>
      </div>
    </form>
  );
}
