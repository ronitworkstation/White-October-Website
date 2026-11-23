// Natural pixel sizes of the item photos (generated; used so plinth tiles never upscale a photo).
export const imageSizes: Record<string, [number, number]> = {
  "/images/solutions/awards.webp": [516, 516],
  "/images/solutions/banners.webp": [736, 414],
  "/images/solutions/branded-merchandise.webp": [447, 447],
  "/images/solutions/conference-kits.webp": [350, 480],
  "/images/solutions/custom-packaging.webp": [614, 720],
  "/images/solutions/event-branding.webp": [564, 322],
  "/images/solutions/executive-gifts.webp": [450, 600],
  "/images/solutions/festive-kits.webp": [432, 576],
  "/images/solutions/id-cards.webp": [410, 512],
  "/images/solutions/lanyards.webp": [442, 645],
  "/images/solutions/lifestyle-utility-products.webp": [444, 444],
  "/images/solutions/medals.webp": [589, 589],
  "/images/solutions/name-badges.webp": [442, 442],
  "/images/solutions/occasional-kits.webp": [472, 504],
  "/images/solutions/office-branding.webp": [432, 577],
  "/images/solutions/personalised-merchandise.webp": [368, 460],
  "/images/solutions/plaques.webp": [442, 442],
  "/images/solutions/premium-gift-hampers.webp": [447, 447],
  "/images/solutions/standees.webp": [378, 567],
  "/images/solutions/swag-boxes.webp": [589, 442],
  "/images/solutions/trophies.webp": [736, 364],
  "/images/solutions/welcome-kits.webp": [400, 533],
};

export function sizeOf(src: string): [number, number] {
  return imageSizes[src] ?? [480, 480];
}
