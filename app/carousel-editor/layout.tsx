import AuthCheckLayout from "@/components/layout/authCheckLayout";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthCheckLayout>{children}</AuthCheckLayout>;
}
