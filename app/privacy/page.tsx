import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import {
  BREACH_NOTIFICATION_HOURS,
  COOKIE_CATEGORIES,
  DPB_PORTAL_NOTE,
  DPB_PORTAL_URL,
  DPO_ADDRESS,
  DPO_EMAIL,
  DPO_NAME,
  DPO_PHONE,
  GRIEVANCE_RESOLUTION_DAYS,
  RIGHTS_REQUEST_ACK_DAYS,
  DATA_PROCESSING_LOCATIONS,
  THIRD_PARTY_PROCESSORS,
} from "@/lib/compliance";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Revoca collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 17, 2026"
      intro={
        <>
          Revoca exists to keep your company&apos;s knowledge safe and useful. That
          only works if you can trust how we handle data. This notice describes what
          personal data we collect, why we process it, your rights as a Data
          Principal under India&apos;s Digital Personal Data Protection Act, 2023
          (DPDP Act), and how to contact us.
        </>
      }
      sections={[
        {
          heading: "Data Protection Officer",
          body: [
            <>
              <strong className="font-medium text-ink">{DPO_NAME}</strong> serves as
              our Data Protection Officer and Grievance Officer.
              <ul>
                <li>Email: <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a></li>
                <li>Phone: {DPO_PHONE}</li>
                <li>Postal address: {DPO_ADDRESS}</li>
              </ul>
            </>,
          ],
        },
        {
          heading: "Information we collect",
          body: [
            <>
              We collect the following categories of personal data:
              <ul>
                <li>
                  <strong className="font-medium text-ink">Account information</strong>{" "}
                  — name, email address, company name, and authentication identifiers
                  when you sign up, log in, or book a demo.
                </li>
                <li>
                  <strong className="font-medium text-ink">Connected workspace data</strong>{" "}
                  — content from tools you connect (e.g. Slack, GitHub, Discord,
                  documentation) to build your private context graph.
                </li>
                <li>
                  <strong className="font-medium text-ink">Usage and analytics data</strong>{" "}
                  — pages visited, features used, device/browser metadata, and
                  interaction events (only when you consent to analytics cookies).
                </li>
                <li>
                  <strong className="font-medium text-ink">Support and grievance data</strong>{" "}
                  — information you submit through contact forms, grievance forms, or
                  data-rights requests.
                </li>
              </ul>
            </>,
          ],
        },
        {
          heading: "Purposes of processing",
          body: [
            "We process personal data to operate and improve Revoca, authenticate users, build and serve your company's private context graph, respond to inquiries and grievances, comply with law, and keep the platform secure.",
            "We do not sell your personal information, and we do not use one customer's private workspace data to serve another customer.",
          ],
        },
        {
          heading: "Legal basis and consent",
          body: [
            <>
              We process personal data based on your consent, contractual necessity,
              and legitimate uses permitted under the DPDP Act. Non-essential cookies
              and analytics tools are loaded only after you provide affirmative consent
              through our{" "}
              <Link href="/cookies">cookie banner</Link>. You may withdraw consent at
              any time using <strong className="font-medium text-ink">Manage consent</strong>{" "}
              in the site footer or by submitting a{" "}
              <Link href="/data-request">data rights request</Link>.
            </>,
          ],
        },
        {
          heading: "Your rights as a Data Principal",
          body: [
            <>
              Under the DPDP Act, you have the following rights:
              <ul>
                <li>
                  <strong className="font-medium text-ink">Right of access</strong> —
                  request a copy of personal data we hold about you. Submit via our{" "}
                  <Link href="/data-request">data request form</Link> or email{" "}
                  <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>.
                </li>
                <li>
                  <strong className="font-medium text-ink">Right to correction</strong> —
                  request correction of inaccurate or incomplete data. Provide your
                  registered email or account ID and the correction needed via the{" "}
                  <Link href="/data-request">data request form</Link>.
                </li>
                <li>
                  <strong className="font-medium text-ink">Right to erasure</strong> —
                  request deletion of your personal data when it is no longer needed.
                  Submit via the <Link href="/data-request">data request form</Link>;
                  we will acknowledge within {RIGHTS_REQUEST_ACK_DAYS} business days
                  and complete erasure within a reasonable period.
                </li>
                <li>
                  <strong className="font-medium text-ink">Right to withdraw consent</strong>{" "}
                  — withdraw consent for non-essential processing at any time with equal
                  ease through <strong className="font-medium text-ink">Manage consent</strong>{" "}
                  in the footer or a <Link href="/data-request">withdraw-consent request</Link>.
                </li>
                <li>
                  <strong className="font-medium text-ink">Right to grievance redressal</strong>{" "}
                  — raise a complaint through our{" "}
                  <Link href="/grievance">Grievance Redressal</Link> mechanism. We
                  acknowledge grievances within 48 hours and aim to resolve them within{" "}
                  {GRIEVANCE_RESOLUTION_DAYS} days.
                </li>
                <li>
                  <strong className="font-medium text-ink">Right to nominate</strong> —
                  nominate another individual to exercise your data-protection rights in
                  the event of your death or incapacity. Register a nominee via our{" "}
                  <Link href="/data-request">data request form</Link> (select
                  &quot;Register a nominee&quot;).
                </li>
                <li>
                  <strong className="font-medium text-ink">Right to complain to the Board</strong>{" "}
                  — if your grievance is not resolved satisfactorily, you may file a
                  complaint with the Data Protection Board of India. {DPB_PORTAL_NOTE}{" "}
                  Refer to{" "}
                  <a href={DPB_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                    MeitY
                  </a>{" "}
                  for current filing instructions.
                </li>
              </ul>
            </>,
          ],
        },
        {
          heading: "Grievance redressal",
          body: [
            <>
              We maintain a dedicated grievance redressal mechanism at{" "}
              <Link href="/grievance">/grievance</Link>. You may also email{" "}
              <a href={`mailto:${DPO_EMAIL}`}>{DPO_EMAIL}</a>. We acknowledge all
              grievances within 48 hours and resolve them within{" "}
              {GRIEVANCE_RESOLUTION_DAYS} days of receipt, unless a longer period is
              required and communicated to you.
            </>,
          ],
        },
        {
          heading: "Children's data",
          body: [
            "Revoca may be used by individuals of all ages, including those under 18. Where a user is under 18, we process personal data only with verifiable consent of a parent or legal guardian, as required under the DPDP Act.",
            "We do not undertake behavioural monitoring, tracking, or targeted advertising directed at children. Non-essential analytics and session-recording tools load only after affirmative consent is given.",
            "Parents or guardians may contact our Data Protection Officer to provide consent, review a child's data, or request its deletion.",
          ],
        },
        {
          heading: "Cookies and similar technologies",
          body: [
            <>
              We use cookies and similar technologies as described in our{" "}
              <Link href="/cookies">Cookie Policy</Link>. Categories include:
              <ul>
                {COOKIE_CATEGORIES.map((c) => (
                  <li key={c.id}>
                    <strong className="font-medium text-ink">{c.name}</strong> —{" "}
                    {c.description}
                  </li>
                ))}
              </ul>
            </>,
          ],
        },
        {
          heading: "Third-party processors and trackers",
          body: [
            <>
              We use the following third-party services that may process personal data
              on our behalf:
              <ul>
                {THIRD_PARTY_PROCESSORS.map((p) => (
                  <li key={p.name}>
                    <strong className="font-medium text-ink">{p.name}</strong> —{" "}
                    {p.purpose}. Data shared: {p.dataShared}. Primary processing
                    location: {p.location}.
                  </li>
                ))}
              </ul>
              Analytics trackers (PostHog, Google Analytics) and functional tools
              (Microsoft Clarity) load only after you consent to the relevant cookie
              category.
            </>,
          ],
        },
        {
          heading: "Cross-border data transfers",
          body: [
            `Personal data is processed in ${DATA_PROCESSING_LOCATIONS.join(" and ")}. Primary operations and customer data may be stored in India; certain processors (such as authentication and analytics providers) operate in the United States.`,
            "We transfer data only to jurisdictions permitted under the DPDP Act and apply contractual and technical safeguards — including encryption in transit, access controls, and data-processing agreements — to protect your information.",
          ],
        },
        {
          heading: "Data retention and deletion",
          body: [
            <>
              <ul>
                <li>
                  <strong className="font-medium text-ink">Account and workspace data</strong>{" "}
                  — retained while your account is active and for up to 90 days after
                  account closure to honour deletion requests and resolve disputes.
                </li>
                <li>
                  <strong className="font-medium text-ink">Usage and analytics data</strong>{" "}
                  — retained for up to 26 months in aggregated form, or deleted sooner
                  upon withdrawal of consent.
                </li>
                <li>
                  <strong className="font-medium text-ink">Grievance and rights-request records</strong>{" "}
                  — retained for up to 3 years to demonstrate compliance with the DPDP
                  Act.
                </li>
                <li>
                  <strong className="font-medium text-ink">Server and security logs</strong>{" "}
                  — retained for up to 90 days for security and fraud prevention.
                </li>
              </ul>
              You may request export or deletion at any time via the{" "}
              <Link href="/data-request">data request form</Link>.
            </>,
          ],
        },
        {
          heading: "Security safeguards",
          body: [
            "Isolation is the core of Revoca's architecture. Each customer's knowledge base is segregated, and agents operate with strictly scoped access.",
            "We apply encryption in transit (HTTPS/TLS), access controls, and industry-standard safeguards. We regularly review our security posture and limit internal access to what is necessary.",
          ],
        },
        {
          heading: "Personal data breach notification",
          body: [
            `In the event of a personal data breach likely to affect Data Principals, we will notify the Data Protection Board and affected individuals as required under the DPDP Rules. We aim to intimate the Board within ${BREACH_NOTIFICATION_HOURS} hours of becoming aware of the breach, and affected Data Principals without undue delay.`,
            "Notifications will describe the nature of the breach, data affected, likely consequences, and measures taken or proposed to address it.",
          ],
        },
        {
          heading: "Changes to this notice",
          body: [
            "We may update this notice as the product or law evolves. Material changes will be reflected on this page with an updated date. Where required, we will seek fresh consent for new processing purposes.",
          ],
        },
      ]}
    />
  );
}
