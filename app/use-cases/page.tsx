import type { Metadata } from "next";
import Nav from "@/components/Nav";
import UseCases from "@/components/UseCases";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Use Cases — Critical Questions Revoca Answers for Every Team",
  description:
    "See the high-stakes questions Revoca answers for engineering, product, sales, support, leadership, and operations — the context your company can't afford to lose.",
  alternates: {
    canonical: "/use-cases",
  },
};

export default function UseCasesPage() {
  return (
    <>
      <Nav />
      <main>
        <UseCases />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
