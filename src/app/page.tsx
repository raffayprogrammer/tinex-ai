import { Close } from "@/components/Close";
import { Custom } from "@/components/Custom";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Hiring } from "@/components/Hiring";
import { LaborAnchor } from "@/components/LaborAnchor";
import { Nav } from "@/components/Nav";
import { NeighborReach } from "@/components/NeighborReach";
import { Pricing } from "@/components/Pricing";
import { Roster } from "@/components/Roster";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <LaborAnchor />
        <Roster />
        <Hiring />
        <NeighborReach />
        <Custom />
        <Pricing />
        <Faq />
      </main>
      <Close />
    </>
  );
}
