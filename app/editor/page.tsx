import EditorBody from "@/components/editor/body/editor.body";
import EditorNavbar from "@/components/editor/navbar/editor.navbar";
import MainSidebar from "@/components/editor/sidebar/main.sidebar";

function Dashboard() {
  return (
    <div>
      <EditorNavbar />
      <main className="grid grid-cols-12 h-screen bg-slate-100 overflow-auto">
        <div className="col-span-2 h-full">
          <MainSidebar />
        </div>
        <div className="col-span-10">
          <EditorBody />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
