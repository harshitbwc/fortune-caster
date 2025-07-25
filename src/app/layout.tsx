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
        url: "/home.png",
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
    images: ["https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg"],
    creator: "@fortunecaster",
  },
  // Farcaster Frame metadata
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "/home.png",
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

/**"name": "FortuneCookieCaster",
    "version": "1",
    "iconUrl": "https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg",
    "homeUrl": "https://fortune-caster.vercel.app",
    "imageUrl": "https://fortune-caster.vercel.app/cookie-open.png",
    "buttonTitle": "Break Fortune Cookie",
    "splashImageUrl": "https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg",
    "splashBackgroundColor": "#f5f0ec",
    "webhookUrl": "https://fortune-caster.vercel.app/api/webhook",
    "subtitle": "Fortune Cookie Caster",
    "description": "Break open beautiful 3D fortune cookies to reveal mystical messages and share them with Farcaster.",
    "primaryCategory": "entertainment",
    "screenshotUrls": [
      "https://fortune-caster.vercel.app/home.png"
    ],
    "heroImageUrl": "https://fortune-caster.vercel.app/home.png",
    "tags": [
      "fortune",
      "cookie",
      "future",
      "destiny",
      "mystical"
    ],
    "tagline": "Fortune cookies for destiny",
    "ogTitle": "Fortune Cookie Caster",
    "ogDescription": "Break open beautiful 3D fortune cookies to reveal mystical messages and share them with Farcaster",
    "ogImageUrl": "https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg", */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="fc:miniapp" content='{"version":"1","imageUrl":"https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg","button":{"title":"Break Fortune Cookie","action":{"type":"launch_miniapp","name":"FortuneCookieCaster","url":"https://fortune-caster.vercel.app","splashImageUrl":"https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg","splashBackgroundColor":"#65d3ffff"}}}' />
        <meta name="fc:frame" content='{"version":"1","imageUrl":"https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg","button":{"title":"Break Fortune Cookie","action":{"type":"launch_miniapp","name":"FortuneCookieCaster","url":"https://fortune-caster.vercel.app","splashImageUrl":"https://iaprodbucket.blob.core.windows.net/iaprod/static/img/icons/tarot/fortune-cookie.svg","splashBackgroundColor":"#65d3ffff"}}}' />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Fortune Cookie Caster" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Farcaster Frame Meta Tags */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/og-image.png" />
        <meta property="fc:frame:image:aspect_ratio" content="1.91:1" />
        <meta property="fc:frame:button:1" content="🥠 Get Your Fortune" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content="/" />
        <meta property="fc:frame:post_url" content="/api/frame" />

        {/* Farcaster Mini App Meta Tags */}
        <meta property="of:version" content="vNext" />
        <meta property="of:accepts:farcaster" content="vNext" />
        <meta property="of:image" content="/home.png" />
        <meta property="og:image" content="/cookie-open.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Fortune Caster - Cosmic Fortune Cookies" />

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
