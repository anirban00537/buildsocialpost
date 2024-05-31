import EditorNavbar from "@/components/editor/navbar/navbar.editor";
import AsideSidebar from "@/components/editor/sidebar/asideSidebar.editor";
import MainSidebar from "@/components/editor/sidebar/main.sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <AsideSidebar />
      <div className="flex flex-col">
        <EditorNavbar />
        <main className="grid   flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
          <MainSidebar />
          <div className="relative flex  min-h-[100vh]  flex-col rounded-xl bg-muted/50 p-4 lg:col-span-3">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
