// components/Layout.tsx
import EditorNavbar from "@/components/editor/navbar/editor.navbar";
import AsideSidebar from "@/components/editor/sidebar/aside.sidebar";
import MainSidebar from "@/components/editor/sidebar/main.sidebar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <EditorNavbar />
      <main className="grid grid-cols-12 h-screen bg-slate-100 overflow-auto  pl-[56px]">
        <AsideSidebar />
        <MainSidebar />
        <div className="col-span-10">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
