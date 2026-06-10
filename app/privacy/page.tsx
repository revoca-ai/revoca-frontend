import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Revoca",
  description: "How Revoca collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 10, 2026"
      intro="Revoca exists to keep your company's knowledge safe and useful. That only works if you can trust how we handle data. This policy describes what we collect, why we collect it, and the choices you have."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "Account information: when you sign up or book a demo, we collect your name, email address, and company details you choose to share.",
            "Connected workspace data: when your team connects sources such as Slack, GitHub, Discord, or documentation, Revoca processes that content solely to build and serve your company's private context graph.",
            "Usage data: we collect analytics about how the product and website are used (pages visited, features used) to improve the service.",
          ],
        },
        {
          heading: "How we use information",
          body: [
            "We use your information to operate and improve Revoca, answer your team's queries from your own knowledge base, communicate with you about the service, and keep the platform secure.",
            "We do not sell your personal information, and we do not use one customer's private workspace data to serve another customer.",
          ],
        },
        {
          heading: "Data isolation and security",
          body: [
            "Isolation is the core of Revoca's architecture. Each customer's knowledge base is segregated, and agents operate with strictly scoped access — a customer-facing agent cannot reach internal proprietary data.",
            "We apply industry-standard safeguards to protect data in transit and at rest, and we limit internal access to what is necessary to operate the service.",
          ],
        },
        {
          heading: "Data retention and deletion",
          body: [
            "We retain workspace data only while your account is active or as needed to provide the service. You may request export or deletion of your data at any time by contacting us, and we will honor the request within a reasonable period.",
          ],
        },
        {
          heading: "Third-party services",
          body: [
            "We rely on a small set of processors to run Revoca — for example hosting, authentication, and product analytics providers. These services process data on our behalf under their own contractual safeguards.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We may update this policy as the product evolves. Material changes will be reflected on this page with an updated date above.",
          ],
        },
      ]}
    />
  );
}
