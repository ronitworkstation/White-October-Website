import { SectionMotion } from "@/components/motion/SectionMotion";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Statement } from "@/components/sections/Statement";
import { Solutions } from "@/components/sections/Solutions";
import { ItemsBand } from "@/components/sections/ItemsBand";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <div>
      <Hero />
      <Clients />
      <Statement />
      <Solutions />
      <ItemsBand />
      <Process />
      <Experience />
      <Faq />
      <SectionMotion />
    </div>
  );
}
