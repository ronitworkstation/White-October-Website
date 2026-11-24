import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Statement } from "@/components/sections/Statement";
import { Solutions } from "@/components/sections/Solutions";
import { ItemsBand } from "@/components/sections/ItemsBand";
import { Facts } from "@/components/sections/Facts";
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
      <div className="bg-white">
        <Facts />
      </div>
      <Process />
      <Experience />
      <Faq />
    </div>
  );
}
