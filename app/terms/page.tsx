import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Revoca",
  description: "The terms that govern your use of Revoca.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 10, 2026"
      intro="These terms govern your access to and use of Revoca, including our website, beta products, and integrations. By using Revoca you agree to these terms."
      sections={[
        {
          heading: "The service",
          body: [
            "Revoca provides a context layer for organizations: it connects to the tools your team already uses, builds a private knowledge graph of decisions and reasoning, and makes that knowledge queryable through agents and integrations.",
            "Parts of Revoca are currently offered as a beta. Beta features are provided as-is, may change without notice, and may be discontinued.",
          ],
        },
        {
          heading: "Your account",
          body: [
            "You are responsible for the accuracy of the information you provide and for safeguarding access to your account. You must have the authority to connect any workspace or data source you link to Revoca.",
          ],
        },
        {
          heading: "Your data",
          body: [
            "You retain all rights to the content you connect to Revoca. You grant us only the limited rights needed to process that content to provide the service to you. Our handling of personal information is described in our Privacy Policy.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "You agree not to misuse the service — including attempting to access another customer's data, circumventing access controls, reverse engineering the platform, or using Revoca in violation of applicable law.",
          ],
        },
        {
          heading: "Disclaimers and liability",
          body: [
            "Revoca is provided on an as-is and as-available basis. To the maximum extent permitted by law, we disclaim implied warranties and our aggregate liability arising out of the service is limited to the amounts you paid us in the twelve months preceding the claim.",
            "AI-generated answers can be imperfect. Revoca cites its sources and confidence so your team can verify — you remain responsible for decisions made using the service.",
          ],
        },
        {
          heading: "Termination",
          body: [
            "You may stop using Revoca at any time. We may suspend or terminate access for breach of these terms. Upon termination, you may request deletion of your data as described in our Privacy Policy.",
          ],
        },
        {
          heading: "Changes to these terms",
          body: [
            "We may update these terms from time to time. Continued use of the service after changes take effect constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  );
}
