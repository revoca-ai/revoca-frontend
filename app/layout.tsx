import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import PHProvider from "@/components/PostHogProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revoca AI — The Context Layer for Enterprises",
  description:
    "Your team's knowledge, always on. Revoca builds a living context graph of decisions, reasoning, and expertise — so your devs are never out of office.",
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
          colorBackground: "#0f0f0f",
          colorInputBackground: "#1a1a1a",
          colorInputText: "#f0f9ff",
          colorText: "#e8f5f8",
          colorTextSecondary: "#8fa8b2",
          colorNeutral: "#8fa8b2",
          colorDanger: "#f87171",
          colorSuccess: "#34d399",
          colorWarning: "#fbbf24",
          borderRadius: "6px",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontFamilyButtons: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "13px",
        },
        elements: {
          card: "!bg-[#0f0f0f] !border !border-[#2a2a2a] !shadow-[0_0_80px_rgba(34,211,238,0.08),0_32px_64px_rgba(0,0,0,0.9)]",
          headerTitle: "!text-[#f0f9ff]",
          headerSubtitle: "!text-[#8fa8b2]",
          socialButtonsBlockButton: "!bg-[#1a1a1a] !border !border-[#2e2e2e] hover:!bg-[#222] hover:!border-[#22d3ee]/30 !text-[#c8d8de] !transition-all",
          socialButtonsBlockButtonText: "!text-[#c8d8de] !text-[12px]",
          socialButtonsBlockButtonArrow: "!text-[#8fa8b2]",
          dividerLine: "!bg-[#2a2a2a]",
          dividerText: "!text-[#8fa8b2] !text-[11px]",
          formFieldLabel: "!text-[#8fa8b2] !text-[11px] !tracking-wider !uppercase",
          formFieldInput: "!bg-[#1a1a1a] !border-[#2e2e2e] !text-[#f0f9ff] focus:!border-[#22d3ee]/60 focus:!ring-1 focus:!ring-[#22d3ee]/20",
          formFieldInputShowPasswordButton: "!text-[#8fa8b2] hover:!text-[#c8d8de]",
          formButtonPrimary: "!bg-[#22d3ee] hover:!bg-[#06b6d4] !text-black !font-bold !text-[13px] hover:!shadow-[0_0_24px_rgba(34,211,238,0.35)] !transition-all",
          formButtonReset: "!text-[#8fa8b2] hover:!text-[#c8d8de]",
          footerActionText: "!text-[#8fa8b2]",
          footerActionLink: "!text-[#22d3ee] hover:!text-[#67e8f9]",
          identityPreviewText: "!text-[#c8d8de]",
          identityPreviewEditButton: "!text-[#22d3ee]",
          userButtonPopoverCard: "!bg-[#0f0f0f] !border !border-[#2a2a2a] !shadow-[0_0_60px_rgba(0,0,0,0.9)]",
          userButtonPopoverActionButton: "hover:!bg-[#1a1a1a] !text-[#c8d8de] hover:!text-[#f0f9ff] !transition-colors",
          userButtonPopoverActionButtonText: "!text-[12px]",
          userButtonPopoverActionButtonIcon: "!text-[#8fa8b2]",
          userButtonPopoverFooter: "!border-t !border-[#2a2a2a]",
          userPreviewMainIdentifier: "!text-[#f0f9ff] !text-[13px]",
          userPreviewSecondaryIdentifier: "!text-[#8fa8b2] !text-[11px]",
          avatarBox: "!ring-1 !ring-[#22d3ee]/25",
          badge: "!bg-[#22d3ee]/15 !text-[#22d3ee]",
          navbar: "!bg-[#0f0f0f] !border-r !border-[#2a2a2a]",
          navbarButton: "!text-[#8fa8b2] hover:!text-[#f0f9ff] hover:!bg-[#1a1a1a] !transition-colors",
          navbarButtonActive: "!text-[#22d3ee] !bg-[#22d3ee]/10",
          pageScrollBox: "!bg-[#0f0f0f]",
          profileSectionTitle: "!text-[#f0f9ff] !border-b !border-[#2a2a2a]",
          profileSectionContent: "!text-[#c8d8de]",
          profileSectionPrimaryButton: "!text-[#22d3ee] hover:!bg-[#22d3ee]/10 !border !border-[#22d3ee]/30",
          formFieldSuccessText: "!text-[#34d399]",
          formFieldErrorText: "!text-[#f87171] !text-[11px]",
          formFieldWarningText: "!text-[#fbbf24] !text-[11px]",
          otpCodeFieldInput: "!border-[#2e2e2e] !bg-[#1a1a1a] !text-[#f0f9ff] focus:!border-[#22d3ee]/60",
          alertText: "!text-[12px]",
          alert: "!border-[#2a2a2a] !bg-[#141414]",
          clerkInternalA11yText: "!text-[#8fa8b2]",
        },
      }}
    >
      <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
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
            src={`https://www.clarity.ms/tag/${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}`}
            strategy="afterInteractive"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
