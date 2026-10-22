import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider, TranslationNotice } from "@/components/language-provider";
import { SupportChat } from "@/components/storefront-services";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart-context";
import { SiteEntryGate } from "@/components/site-entry-gate";
import { Suspense } from "react";
import { AnalyticsNavigation } from "@/components/analytics-navigation";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.saltnpeplabs.com"),
  title: "SALT N’ PEP | Research Compounds",
  openGraph: {
    title: "SALT N’ PEP | Research Compounds",
    description: "Research compounds. For laboratory research only.",
    siteName: "SALT N’ PEP",
    type: "website",
    images: [{ url: "/images/salt-n-pep-contact-logo.png", width: 1086, height: 1448, alt: "Salt N’ Pep black-and-white vial logo" }],
  },
  twitter: {
    card: "summary",
    title: "SALT N’ PEP | Research Compounds",
    description: "Research compounds. For laboratory research only.",
    images: ["/images/salt-n-pep-contact-logo.png"],
  },
  description:
    "A considered collection of research compounds. Explore compound details and laboratory documentation with SALT N’ PEP. For laboratory research only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col font-sans text-foreground">
        <LanguageProvider><CartProvider>
          <SiteEntryGate>
            <Suspense fallback={null}><AnalyticsNavigation /></Suspense>
            <Header /><TranslationNotice />
            <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
            <Footer /><SupportChat />
          </SiteEntryGate>
        </CartProvider></LanguageProvider>
      </body>
    </html>
  );
}
