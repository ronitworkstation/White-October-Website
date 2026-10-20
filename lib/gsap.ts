// One place where GSAP plugins are registered. Import gsap, ScrollTrigger, SplitText and useGSAP from here,
// never straight from the packages, so registration always happens first (client components only).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// Motion identity (docs/DESIGN.md): one curve, three durations, one entrance (lines rise out of a mask).
export const EASE = "expo.out"; // ~ cubic-bezier(0.16, 1, 0.3, 1), the site's CSS --ease-out-expo
export const DUR = { quick: 0.3, standard: 0.6, slow: 0.9 } as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
