import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { COOKIE_CATEGORIES } from "@/lib/compliance";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Revoca uses cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="June 17, 2026"
      intro={
        <>
          This policy explains how Revoca uses cookies and similar technologies on
          revocaai.xyz. Non-essential cookies are disabled by default and only set
          after you provide consent through our cookie banner. You can change your
          preferences at any time via <strong className="font-medium text-ink">Manage consent</strong>{" "}
          in the site footer.
        </>
      }
      sections={[
        {
          heading: "What are cookies?",
          body: [
            "Cookies are small text files stored on your device when you visit a website. They help sites function, remember preferences, and understand how visitors use the service.",
          ],
        },
        {
          heading: "Cookie categories we use",
          body: COOKIE_CATEGORIES.map((category) => (
            <div key={category.id}>
              <p>
                <strong className="font-medium text-ink">{category.name}</strong>
                {category.required ? " (always active)" : " (requires consent)"}
              </p>
              <p className="mt-2">{category.description}</p>
              <p className="mt-2 text-[14px] text-faint">
                Examples: {category.examples.join(", ")}
              </p>
            </div>
          )),
        },
        {
          heading: "How to manage cookies",
          body: [
            <>
              Use <strong className="font-medium text-ink">Manage consent</strong> in
              the site footer to accept, reject, or customise cookie categories. You
              can also submit a{" "}
              <Link href="/data-request">withdraw-consent request</Link>. Strictly
              necessary cookies cannot be disabled because the site will not function
              without them.
            </>,
          ],
        },
        {
          heading: "Third-party cookies",
          body: [
            "When you consent to analytics or functional cookies, third-party services such as Google Analytics, PostHog, or Microsoft Clarity may set cookies on your device. These are disclosed in our Privacy Policy and controlled by your consent preferences.",
          ],
        },
      ]}
      contactLabel="Questions about cookies?"
    />
  );
}
