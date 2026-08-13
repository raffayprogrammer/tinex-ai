import { CallDemo } from "@/components/CallDemo";
import { Close } from "@/components/Close";
import { Custom } from "@/components/Custom";
import { EstimateDemo } from "@/components/EstimateDemo";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { Hiring } from "@/components/Hiring";
import { LaborAnchor } from "@/components/LaborAnchor";
import { Marquee } from "@/components/Marquee";
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
        <Marquee />
        {/* the two demos run back to back: Maya takes the call, Eli prices it.
            The handoff between them is the argument for buying a team. */}
        <CallDemo />
        <EstimateDemo />
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
