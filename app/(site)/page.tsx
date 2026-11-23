import { ViewTransition } from "react";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients";
import { Statement } from "@/components/sections/Statement";
import { Solutions } from "@/components/sections/Solutions";
import { Facts } from "@/components/sections/Facts";
import { Process } from "@/components/sections/Process";
import { Experience } from "@/components/sections/Experience";
import { Faq } from "@/components/sections/Faq";

export default function Home() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>
      <Hero />
      <Clients />
      <Statement />
      <Solutions />
      <div className="bg-white">
        <Facts />
      </div>
      <Process />
      <Experience />
      <Faq />
      </div>
    </ViewTransition>
  );
}
