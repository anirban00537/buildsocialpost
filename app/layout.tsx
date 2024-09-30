import { Poppins } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/layout/default.layout";
import AuthCheckLayout from "@/components/layout/authCheckLayout";
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
  title: "BuildCarousel - Generate Linkedin, TikTok, Instagram Carousel",
  description:
    "Create and share your own LinkedIn, TikTok, Instagram and Facebook carousel with ease",
  openGraph: {
    images: ['/preview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
