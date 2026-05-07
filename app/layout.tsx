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
          colorBackground: "#080808",
          colorInputBackground: "#0d0d0d",
          colorInputText: "#f6feff",
          colorText: "#f6feff",
          colorTextSecondary: "#888",
          colorNeutral: "#555",
          colorDanger: "#f87171",
          colorSuccess: "#34d399",
          borderRadius: "0.375rem",
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontFamilyButtons: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: "13px",
        },
        elements: {
          card: "bg-[#080808] border border-[#1a1a1a] shadow-[0_0_80px_rgba(34,211,238,0.06)]",
          headerTitle: "text-[#f6feff] font-mono",
          headerSubtitle: "text-[#555] font-mono",
          socialButtonsBlockButton: "border border-[#1e1e1e] bg-[#0d0d0d] hover:bg-[#111] hover:border-[#22d3ee]/20 text-[#aaa] transition-all",
          socialButtonsBlockButtonText: "font-mono text-[12px]",
          dividerLine: "bg-[#1a1a1a]",
          dividerText: "text-[#333] font-mono text-[11px]",
          formFieldLabel: "text-[#666] font-mono text-[11px] tracking-wider uppercase",
          formFieldInput: "bg-[#0d0d0d] border-[#1e1e1e] text-[#f6feff] font-mono focus:border-[#22d3ee]/50 focus:ring-[#22d3ee]/10",
          formButtonPrimary: "bg-[#22d3ee] hover:bg-[#06b6d4] text-black font-mono font-bold text-[13px] shadow-none hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all",
          footerActionLink: "text-[#22d3ee] hover:text-[#06b6d4] font-mono",
          identityPreviewText: "text-[#aaa] font-mono",
          identityPreviewEditButton: "text-[#22d3ee] font-mono",
          userButtonPopoverCard: "bg-[#080808] border border-[#1a1a1a] shadow-[0_0_60px_rgba(0,0,0,0.8)]",
          userButtonPopoverActionButton: "hover:bg-[#0f0f0f] text-[#aaa] hover:text-[#f6feff] font-mono transition-colors",
          userButtonPopoverActionButtonText: "font-mono text-[12px]",
          userButtonPopoverFooter: "border-t border-[#111]",
          userPreviewMainIdentifier: "text-[#f6feff] font-mono text-[13px]",
          userPreviewSecondaryIdentifier: "text-[#555] font-mono text-[11px]",
          avatarBox: "ring-1 ring-[#22d3ee]/20",
          badge: "bg-[#22d3ee]/10 text-[#22d3ee] font-mono",
          navbar: "bg-[#080808] border-r border-[#1a1a1a]",
          navbarButton: "text-[#666] hover:text-[#f6feff] hover:bg-[#0f0f0f] font-mono transition-colors",
          navbarButtonActive: "text-[#22d3ee] bg-[#22d3ee]/8",
          pageScrollBox: "bg-[#080808]",
          profileSectionTitle: "text-[#f6feff] font-mono border-b border-[#1a1a1a]",
          profileSectionContent: "font-mono",
          formFieldSuccessText: "text-[#34d399] font-mono",
          formFieldErrorText: "text-[#f87171] font-mono text-[11px]",
          otpCodeFieldInput: "border-[#1e1e1e] bg-[#0d0d0d] text-[#f6feff] font-mono focus:border-[#22d3ee]/50",
          alertText: "font-mono text-[12px]",
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
            id="clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
              `,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
