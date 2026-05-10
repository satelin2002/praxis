import type { Metadata, Viewport } from "next";
import { Inter, Spline_Sans_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-inter",
});

const fontMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-mono-spline",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://tryworkflowcrew.com";

const DEFAULT_TITLE =
  "Workflow Crew — AI automation for small businesses";
const DEFAULT_DESCRIPTION =
  "Workflow Crew builds and runs AI automations for small businesses — lead follow-up, customer support, booking, review requests, inbox triage, and other repeatable work. Save time, reduce manual work, recover revenue. One flat monthly fee. Cancel anytime.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · Workflow Crew",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Workflow Crew",
  authors: [{ name: "Workflow Crew" }],
  creator: "Workflow Crew",
  publisher: "Workflow Crew",
  keywords: [
    "AI automation for small business",
    "AI receptionist",
    "AI lead capture",
    "AI appointment booking",
    "small business AI subscription",
    "AI customer support",
    "review automation",
    "phone answering AI",
  ],
  openGraph: {
    type: "website",
    siteName: "Workflow Crew",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/workflowcrew-og.png",
        width: 1200,
        height: 630,
        alt: "Workflow Crew — AI automation for small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/workflowcrew-og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "overflow-x-clip antialiased",
        fontSans.variable,
        fontMono.variable,
      )}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=excon@500,700,800&display=swap"
        />
      </head>
      <body className="min-h-svh overflow-x-clip bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster
          position="bottom-right"
          richColors
          closeButton
          theme="light"
        />
        <Analytics />
      </body>
    </html>
  );
}
