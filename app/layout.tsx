import { Poppins } from "next/font/google";
import "./globals.css";
import DefaultLayout from "@/components/layout/default.layout";
import AuthCheckLayout from "@/components/layout/authCheckLayout";
const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BuildCarousel - Linkedin Carousel Magic",
  description:
    "Create Linkedin Carousel with ease using this tool, no need to Design or Code",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.className} `}>
      <body className="">
        <DefaultLayout>
          <AuthCheckLayout>{children}</AuthCheckLayout>
        </DefaultLayout>
      </body>
    </html>
  );
}
