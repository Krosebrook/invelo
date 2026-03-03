import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "InVelo | Mission-Complete AI Services | INT Inc.",
  description:
    "INT Inc. builds catalyst tools that solve one problem fast—compliance dashboards, onboarding accelerators, crisis response systems—then hands you the keys. No lock-in. No consultant debt. Just outcomes.",
  keywords: [
    "AI services",
    "SOC 2 compliance",
    "enterprise AI",
    "catalyst builds",
    "INT Inc",
    "InVelo",
    "managed AI services",
  ],
  authors: [{ name: "INT Inc." }],
  openGraph: {
    title: "InVelo | Mission-Complete AI Services",
    description:
      "Purpose-built AI tools that deliver results in weeks, not months. Full ownership. No lock-in.",
    type: "website",
    locale: "en_US",
    siteName: "InVelo by INT Inc.",
  },
  twitter: {
    card: "summary_large_image",
    title: "InVelo | Mission-Complete AI Services",
    description:
      "Purpose-built AI tools that deliver results in weeks, not months.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A5F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
