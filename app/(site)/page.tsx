import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { Clients } from "@/components/sections/Clients";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Clients />
      <WhyUs />
    </>
  );
}
