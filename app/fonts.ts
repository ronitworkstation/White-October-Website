import { Antonio, Outfit } from "next/font/google";

// Outfit stands in for Gilroy (closest free match, see /lab/fonts). To switch to licensed Gilroy later:
// replace `Outfit(...)` with `localFont({ src: [...gilroy woff2 files], variable: "--font-outfit" })`.
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Antonio Bold: the brand's condensed display face (email signature, name lettering).
export const antonio = Antonio({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-antonio",
  display: "swap",
});
