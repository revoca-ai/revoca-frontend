import type { Metadata } from "next";
import { Schibsted_Grotesk, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import PHProvider from "@/components/PostHogProvider";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "technology",
  keywords: [
    "context layer",
    "institutional knowledge",
    "AI memory layer",
    "AI brain for business",
    "enterprise knowledge management",
    "institutional memory",
    "tribal knowledge",
    "decision intelligence",
    "knowledge graph",
    "AI agent for Slack",
    "MCP server",
    "developer onboarding automation",
    "Revoca",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description:
      "Every decision, the reasoning behind it, and the context around it — captured, preserved, and always one question away. The enterprise that never forgets.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "The AI context layer that preserves your company's institutional knowledge — every decision and the reasoning behind it, queryable 24/7.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "msapplication-TileImage", url: "/mstile-144x144.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#22d3ee",
          colorBackground: "#0e1318",
          colorInputBackground: "#131a21",
          colorInputText: "#f2f6f8",
          colorText: "#f2f6f8",
          colorTextSecondary: "#9aa7b2",
          colorNeutral: "#9aa7b2",
          colorDanger: "#f87171",
          colorSuccess: "#34d399",
          colorWarning: "#fbbf24",
          borderRadius: "10px",
          fontFamily: "'Schibsted Grotesk', -apple-system, system-ui, sans-serif",
          fontFamilyButtons: "'Schibsted Grotesk', -apple-system, system-ui, sans-serif",
          fontSize: "14px",
        },
        elements: {
          card: "!bg-[#0e1318] !border !border-[rgba(151,168,184,0.13)] !shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
          headerTitle: "!text-[#f2f6f8]",
          headerSubtitle: "!text-[#9aa7b2]",
          socialButtonsBlockButton:
            "!bg-[#131a21] !border !border-[rgba(151,168,184,0.13)] hover:!bg-[#18212a] hover:!border-[rgba(151,168,184,0.24)] !text-[#dbe4ea] !transition-all",
          socialButtonsBlockButtonText: "!text-[#dbe4ea] !text-[13px]",
          socialButtonsBlockButtonArrow: "!text-[#9aa7b2]",
          dividerLine: "!bg-[rgba(151,168,184,0.13)]",
          dividerText: "!text-[#5d6b77] !text-[12px]",
          formFieldLabel: "!text-[#9aa7b2] !text-[13px]",
          formFieldInput:
            "!bg-[#131a21] !border-[rgba(151,168,184,0.13)] !text-[#f2f6f8] focus:!border-[#22d3ee]/60 focus:!ring-1 focus:!ring-[#22d3ee]/20",
          formFieldInputShowPasswordButton: "!text-[#9aa7b2] hover:!text-[#dbe4ea]",
          formButtonPrimary:
            "!bg-[#22d3ee] hover:!bg-[#4adef2] !text-[#04181d] !font-semibold !text-[14px] !shadow-none !transition-all",
          formButtonReset: "!text-[#9aa7b2] hover:!text-[#dbe4ea]",
          footerActionText: "!text-[#9aa7b2]",
          footerActionLink: "!text-[#22d3ee] hover:!text-[#67e8f9]",
          identityPreviewText: "!text-[#dbe4ea]",
          identityPreviewEditButton: "!text-[#22d3ee]",
          userButtonPopoverCard:
            "!bg-[#0e1318] !border !border-[rgba(151,168,184,0.13)] !shadow-[0_24px_80px_rgba(0,0,0,0.6)]",
          userButtonPopoverActionButton:
            "hover:!bg-[#131a21] !text-[#dbe4ea] hover:!text-[#f2f6f8] !transition-colors",
          userButtonPopoverActionButtonText: "!text-[13px]",
          userButtonPopoverActionButtonIcon: "!text-[#9aa7b2]",
          userButtonPopoverFooter: "!border-t !border-[rgba(151,168,184,0.13)]",
          userPreviewMainIdentifier: "!text-[#f2f6f8] !text-[14px]",
          userPreviewSecondaryIdentifier: "!text-[#9aa7b2] !text-[12px]",
          avatarBox: "!ring-1 !ring-[#22d3ee]/25",
          badge: "!bg-[#22d3ee]/15 !text-[#22d3ee]",
          navbar: "!bg-[#0e1318] !border-r !border-[rgba(151,168,184,0.13)]",
          navbarButton:
            "!text-[#9aa7b2] hover:!text-[#f2f6f8] hover:!bg-[#131a21] !transition-colors",
          navbarButtonActive: "!text-[#22d3ee] !bg-[#22d3ee]/10",
          pageScrollBox: "!bg-[#0e1318]",
          profileSectionTitle: "!text-[#f2f6f8] !border-b !border-[rgba(151,168,184,0.13)]",
          profileSectionContent: "!text-[#dbe4ea]",
          profileSectionPrimaryButton:
            "!text-[#22d3ee] hover:!bg-[#22d3ee]/10 !border !border-[#22d3ee]/30",
          formFieldSuccessText: "!text-[#34d399]",
          formFieldErrorText: "!text-[#f87171] !text-[12px]",
          formFieldWarningText: "!text-[#fbbf24] !text-[12px]",
          otpCodeFieldInput:
            "!border-[rgba(151,168,184,0.13)] !bg-[#131a21] !text-[#f2f6f8] focus:!border-[#22d3ee]/60",
          alertText: "!text-[13px]",
          alert: "!border-[rgba(151,168,184,0.13)] !bg-[#131a21]",
          clerkInternalA11yText: "!text-[#9aa7b2]",
        },
      }}
    >
      <html
        lang="en"
        className={`${schibsted.variable} ${instrument.variable} ${jetbrains.variable}`}
      >
        <body className="antialiased" suppressHydrationWarning>
          <PHProvider>{children}</PHProvider>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-4X74NH0PC4"
            strategy="afterInteractive"
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-4X74NH0PC4');
              `,
            }}
          />
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  if (!i) { console.error("[Clarity] NEXT_PUBLIC_CLARITY_PROJECT_ID is missing"); return; }
                  console.log("[Clarity] Initializing project:", i);
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  t.onload=function(){console.log("[Clarity] Tag loaded. window.clarity typeof:", typeof c.clarity);};
                  t.onerror=function(){console.error("[Clarity] Tag failed to load (network blocked, ad blocker, or invalid ID)");};
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || ''}");
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
