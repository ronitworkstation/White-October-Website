// Single source of truth for "should this animate?" on the client. Mirrors <html data-motion> (see app/layout.tsx).
export function prefersReducedMotion(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.motion === "reduce";
}
