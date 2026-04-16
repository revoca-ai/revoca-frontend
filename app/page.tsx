import BorderFrame from "@/components/BorderFrame";
import SideElements from "@/components/SideElements";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Pipeline from "@/components/Pipeline";
import Offer from "@/components/Offer";
import BotShowcase from "@/components/BotShowcase";
import Connectors from "@/components/Connectors";
import Roadmap from "@/components/Roadmap";
import CTA from "@/components/CTA";
import FullPageScroll from "@/components/FullPageScroll";

export default function Home() {
  return (
    <>
      <FullPageScroll />
      <BorderFrame />
      <SideElements />
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Pipeline />
        <BotShowcase />
        <Offer />
        <Connectors />
        <Roadmap />
        <CTA />
      </main>
    </>
  );
}
