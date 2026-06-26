import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import GrievanceForm from "@/components/GrievanceForm";
import {
  DPB_PORTAL_NOTE,
  DPB_PORTAL_URL,
  DPO_EMAIL,
  DPO_NAME,
  DPO_PHONE,
  GRIEVANCE_ACK_HOURS,
  GRIEVANCE_RESOLUTION_DAYS,
} from "@/lib/compliance";

export const metadata: Metadata = {
  title: "Grievance Redressal",
  description: "Submit a data protection grievance to Revoca.",
  alternates: { canonical: "/grievance" },
};

export default function GrievancePage() {
  return (
    <LegalPage
      title="Grievance Redressal"
      updated="June 17, 2026"
      intro={
        <>
          If you have a concern about how Revoca processes your personal data, use
          this page to submit a grievance. Our Data Protection Officer ({DPO_NAME})
          will review your complaint.
        </>
      }
      sections={[
        {
          heading: "How it works",
          body: [
            <>
              <ul>
                <li>
                  Submit your grievance using the form below or email{" "}
                  <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>.
                </li>
                <li>
                  We acknowledge receipt within {GRIEVANCE_ACK_HOURS} hours.
                </li>
                <li>
                  We aim to resolve all grievances within {GRIEVANCE_RESOLUTION_DAYS}{" "}
                  days of receipt.
                </li>
                <li>
                  If unresolved, you may escalate to the Data Protection Board of
                  India. {DPB_PORTAL_NOTE}{" "}
                  <a href={DPB_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                    Visit MeitY for filing instructions
                  </a>
                  .
                </li>
              </ul>
            </>,
            `Grievance Officer: ${DPO_NAME} · ${DPO_EMAIL} · ${DPO_PHONE}`,
          ],
        },
        {
          heading: "Submit a grievance",
          body: [<GrievanceForm key="form" />],
        },
        {
          heading: "Related links",
          body: [
            <>
              <Link href="/data-request">Exercise your data rights</Link>
              {" · "}
              <Link href="/privacy">Privacy Policy</Link>
              {" · "}
              <Link href="/cookies">Cookie Policy</Link>
            </>,
          ],
        },
      ]}
      contactLabel="Prefer email?"
    />
  );
}
