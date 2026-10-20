import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { Clients } from "@/components/sections/Clients";
import { VendorsHook } from "@/components/sections/VendorsHook";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions />
      <Clients />
      <VendorsHook />
    </>
  );
}
