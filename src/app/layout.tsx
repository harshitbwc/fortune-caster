import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fortune Caster - Cosmic Fortune Cookies",
  description: "Discover your cosmic destiny with interactive 3D fortune cookies in space! Click, break, and share your fortune on Farcaster.",
  keywords: ["fortune", "cookie", "farcaster", "destiny", "cosmic", "3D", "interactive", "space", "mini-app"],
  authors: [{ name: "Fortune Caster" }],
  creator: "Fortune Caster",
  publisher: "Fortune Caster",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://fortune-caster.vercel.app'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fortune Caster - Cosmic Fortune Cookies",
    description: "Discover your cosmic destiny with interactive 3D fortune cookies in space! Click, break, and share your fortune on Farcaster.",
    url: "/",
    siteName: "Fortune Caster",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fortune Caster - Cosmic Fortune Cookies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortune Caster - Cosmic Fortune Cookies",
    description: "Discover your cosmic destiny with interactive 3D fortune cookies in space!",
    images: ["/og-image.png"],
    creator: "@fortunecaster",
  },
  // Farcaster Frame metadata
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "/og-image.png",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:button:1": "🥠 Get Your Fortune",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "/",
    "fc:frame:post_url": "/api/frame",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Fortune Caster",
  },
  applicationName: "Fortune Caster",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fortune Caster" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/og-image.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🥠 Get Your Fortune" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="/" />
        <meta property="fc:frame:post_url" content="/api/frame" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://warpcast.com" />
        <link rel="dns-prefetch" href="https://warpcast.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
