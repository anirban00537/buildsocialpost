import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
import { MyFirebaseProvider } from "@/components/firebase-providers";

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
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <MyFirebaseProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </MyFirebaseProvider>
        </main>
      </body>
    </html>
  );
}
