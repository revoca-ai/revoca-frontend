import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import CostOfLostContext from "@/components/CostOfLostContext";
import Pipeline from "@/components/Pipeline";
import Offer from "@/components/Offer";
import Connectors from "@/components/Connectors";
import Security from "@/components/Security";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <Nav />
      <main>
        <Hero />
        <Pillars />
        <CostOfLostContext />
        <Pipeline />
        <Offer />
        <Connectors />
        <Security />
        <Roadmap />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
