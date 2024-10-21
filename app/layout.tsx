import { Poppins } from "next/font/google";
import "./globals.css";
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BuildSocialPost - AI Carousel Maker for Social Media",
  description:
    "Create and share stunning carousels for LinkedIn, TikTok, Instagram, and Facebook with our AI-powered tool. Boost your social media engagement effortlessly.",
  keywords:
    "AI carousel maker, social media content, LinkedIn carousel, TikTok slides, Instagram carousel, Facebook carousel, content creation tool",
  authors: [{ name: "Your Company Name" }],
  creator: "Your Company Name",
  publisher: "Your Company Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    title: "BuildSocialPost - AI-Powered Social Media Carousel Creator",
    description:
      "Elevate your social media presence with AI-generated carousels for LinkedIn, TikTok, Instagram, and Facebook. Create engaging content in minutes.",
    siteName: "BuildSocialPost",
    images: [
      {
        url: "https://www.buildsocialpost.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "BuildSocialPost - AI Carousel Maker for Social Media",
      },
      {
        url: "https://www.buildsocialpost.com/og-image.png",
        width: 1800,
        height: 1200,
        alt: "BuildSocialPost - AI Carousel Maker for Social Media",
      },
      {
        url: "https://www.buildsocialpost.com/creators.jpg",
        width: 800,
        height: 600,
        alt: "BuildSocialPost - AI Carousel Maker for Social Media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildSocialPost - AI Carousel Maker for Social Media",
    description:
      "Create engaging carousels for LinkedIn, TikTok, Instagram, and Facebook with our AI-powered tool. Boost your social media presence today!",
    images: ["/creators.jpg"],
    creator: "@anirban00537",
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
  verification: {
    google: "your-google-site-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
