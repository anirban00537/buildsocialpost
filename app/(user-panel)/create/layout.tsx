import Sidebar from "@/components/user-panel-sidebar/Sidebar.comp";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className=" mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
