// Small uppercase label flanked by short orange rules, the same motif as "MORE THAN THE GIFT" in the logo.
// Budget: max 4 on the home page (hero, clients, process, FAQ).
export function Eyebrow({
  children,
  tone = "dark",
  align = "center",
  as: Tag = "p",
  id,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  align?: "center" | "left";
  as?: "p" | "h2";
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={`flex items-center gap-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] sm:gap-3 sm:text-[13px] sm:tracking-[0.16em] md:text-[14px] ${
        align === "center" ? "justify-center text-center" : ""
      } ${tone === "dark" ? "text-ink" : "text-white"}`}
    >
      <span aria-hidden className="h-[2px] w-4 shrink-0 bg-orange sm:w-6" />
      <span>{children}</span>
      {align === "center" && <span aria-hidden className="h-[2px] w-4 shrink-0 bg-orange sm:w-6" />}
    </Tag>
  );
}
