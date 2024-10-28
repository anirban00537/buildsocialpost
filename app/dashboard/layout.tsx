import Navbar from "@/components/dashboard/dashboardNav/Nav.comp";
import Sidebar from "@/components/dashboard/dashboardSidebar/Sidebar.comp";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Navbar - now full width */}
      <Navbar />

      {/* Main area - sidebar and content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className=" mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
