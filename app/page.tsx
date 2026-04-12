import BorderFrame from "@/components/BorderFrame";
import SideElements from "@/components/SideElements";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Pipeline from "@/components/Pipeline";
import BotShowcase from "@/components/BotShowcase";
import Connectors from "@/components/Connectors";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <BorderFrame />
      <SideElements />
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <Pipeline />
        <BotShowcase />
        <Connectors />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
