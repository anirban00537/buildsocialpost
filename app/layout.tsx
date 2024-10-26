import { Poppins } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/layout/default.layout";
import Script from "next/script";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const defaultUrl = "https://buildsocialpost.com";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title:
    "Free LinkedIn Carousel Maker | Professional Carousel Creator | BuildSocialPost",
  description:
    "Create professional LinkedIn carousels in seconds. Transform your ideas into engaging LinkedIn posts. No design skills needed. Free tool with instant generation and professional templates.",
  keywords: [
    // Primary Keywords
    "LinkedIn carousel maker",
    "LinkedIn carousel generator",
    "free carousel maker",
    "professional carousel creator",
    // Feature-based Keywords
    "LinkedIn content creator",
    "social media carousel templates",
    "professional carousel maker",
    "free LinkedIn carousel tool",
    // Long-tail Keywords
    "create LinkedIn carousels easily",
    "convert ideas to carousel posts",
    "professional LinkedIn carousel templates",
    "instant carousel generator for LinkedIn",
    // Intent-based Keywords
    "how to make LinkedIn carousels",
    "best carousel maker for LinkedIn",
    "free LinkedIn content creator",
  ].join(", "),
  authors: [{ name: "Anirban Roy" }],
  creator: "Anirban Roy",
  publisher: "Anirban Roy",
  alternates: {
    canonical: defaultUrl,
    languages: {
      "en-US": "/en-us",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title:
      "LinkedIn Carousel Maker | Create Professional Carousels Instantly",
    description:
      "Transform your content into engaging carousels for LinkedIn. No design skills needed. Features: instant generation, professional templates. Start creating for free!",
    siteName: "BuildSocialPost",
    images: [
      {
        url: `${defaultUrl}/og/hero-image.png`,
        width: 1200,
        height: 630,
        alt: "BuildSocialPost - Professional LinkedIn Carousel Generator",
      },
      {
        url: `${defaultUrl}/og/feature-showcase.png`,
        width: 1800,
        height: 1200,
        alt: "LinkedIn Carousel Creation Tools",
      },
      {
        url: `${defaultUrl}/og/templates-preview.jpg`,
        width: 800,
        height: 600,
        alt: "Professional LinkedIn Carousel Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Professional LinkedIn Carousels | BuildSocialPost",
    description:
      "Transform your content into engaging carousels for LinkedIn. Professional templates, instant generation. Start free!",
    images: [`${defaultUrl}/og/twitter-card.jpg`],
    creator: "@buildsocialpost",
    site: "@buildsocialpost",
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
    nocache: true,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },
  applicationName: "BuildSocialPost",
  category: "Technology",
  classification: "Social Media Tools",
  // Additional metadata for rich results
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "BuildSocialPost",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    features: [
      "Professional content creation",
      "LinkedIn-optimized templates",
      "Instant carousel generation",
      "No design skills required",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Analytics Script */}
        <Script
          defer
          src="https://umami.buildsocialpost.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          data-host-url="https://umami.buildsocialpost.com"
          strategy="afterInteractive"
        />
        {/* Preconnect to key domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* manifest.json provides metadata used when your web app is installed on a user's mobile device or desktop */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
