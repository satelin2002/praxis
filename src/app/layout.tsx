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
  "https://buildroom.ai";

const DEFAULT_TITLE =
  "buildroom.ai — AI automation for small businesses";
const DEFAULT_DESCRIPTION =
  "Buildroom builds and runs AI automations for small businesses — answering calls, handling leads, replying to customers, booking appointments, processing paperwork. One flat monthly fee. Cancel anytime.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s · buildroom.ai",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "buildroom.ai",
  authors: [{ name: "buildroom.ai" }],
  creator: "buildroom.ai",
  publisher: "buildroom.ai",
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
    siteName: "buildroom.ai",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/images/buildroom-og.png",
        width: 1200,
        height: 630,
        alt: "buildroom.ai — AI automation for small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/images/buildroom-og.png"],
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
      className={cn("antialiased", fontSans.variable, fontMono.variable)}
    >
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=excon@500,700,800&display=swap"
        />
      </head>
      <body className="min-h-svh bg-background font-sans text-foreground">
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
