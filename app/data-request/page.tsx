import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import DataRequestForm from "@/components/DataRequestForm";
import { RIGHTS_REQUEST_ACK_DAYS } from "@/lib/compliance";

export const metadata: Metadata = {
  title: "Data Rights Request",
  description: "Request access, correction, erasure, or nomination under the DPDP Act.",
  alternates: { canonical: "/data-request" },
};

export default function DataRequestPage() {
  return (
    <LegalPage
      title="Data Rights Request"
      updated="June 17, 2026"
      intro={
        <>
          Use this form to exercise your rights as a Data Principal under India&apos;s
          Digital Personal Data Protection Act, 2023 — including access, correction,
          erasure, consent withdrawal, and nomination.
        </>
      }
      sections={[
        {
          heading: "What you will need",
          body: [
            <>
              <ul>
                <li>Your full name and registered email address.</li>
                <li>
                  An account identifier — your account ID, workspace name, or
                  registered mobile number — so we can locate your data.
                </li>
                <li>A clear description of your request.</li>
              </ul>
            </>,
            `We acknowledge all rights requests within ${RIGHTS_REQUEST_ACK_DAYS} business days. To withdraw cookie consent instantly, use Manage consent in the site footer.`,
          ],
        },
        {
          heading: "Submit your request",
          body: [<DataRequestForm key="form" />],
        },
        {
          heading: "Other channels",
          body: [
            <>
              You may also email{" "}
              <a href="mailto:revoca.ai@gmail.com">revoca.ai@gmail.com</a> or file a{" "}
              <Link href="/grievance">grievance</Link> if your concern is not resolved.
              See our <Link href="/privacy">Privacy Policy</Link> for full details on
              your rights.
            </>,
          ],
        },
      ]}
      contactLabel="Questions about data rights?"
    />
  );
}
