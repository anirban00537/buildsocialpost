import AuthCheckLayout from "@/components/layout/authCheckLayout";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "BuildCarousel - Generate Linkedin, TikTok, Instagram Carousel",
  description:
    "Create and share your own LinkedIn, TikTok, Instagram and Facebook carousel with ease",
};

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthCheckLayout>{children}</AuthCheckLayout>;
}
