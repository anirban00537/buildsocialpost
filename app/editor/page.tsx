import EditorBody from "@/components/editor/body/editor.body";
import EditorNavbar from "@/components/editor/navbar/editor.navbar";

function Dashboard() {
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <EditorNavbar />
        <EditorBody />
      </div>
    </div>
  );
}

export default Dashboard;
