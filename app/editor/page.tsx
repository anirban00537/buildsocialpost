"use client";
import EditorBody from "@/components/editor/body/body.editor";
import React from "react";
import MainSidebar from "@/components/editor/sidebar/main.sidebar";
import EditorNavbar from "@/components/editor/navbar/navbar.editor";
function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <EditorNavbar />
        <div className="md:flex flex-col items-center justify-center md:items-start md:justify-start md:flex-grow-0 md:flex-basis-1/3 md:mt-[63px] md:fixed md:top-0 md:left-0 md:h-screen z-30">
          <MainSidebar />
        </div>
        <main className="flex-1 max-h-full p-5 ml-[390px]  overflow-hidden overflow-y-scroll">
          <div>
            <EditorBody />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
