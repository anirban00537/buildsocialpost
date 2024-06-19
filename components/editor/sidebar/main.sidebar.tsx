import React, { useState } from "react";
import { Settings, FileText, Text, Columns2Icon } from "lucide-react";
import AiSettingsComponent from "./ai.main";
import TemplateSection from "./template.main";
import SettingsSection from "./settings.main";
import BackgroundColorssSection from "./background.main";

const MainSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("ai-settings");

  return (
    <aside className="flex flex-col md:flex-row h-screen w-full md:w-[420px] bg-gray-50">
      <div className="md:sticky md:top-0 w-full md:w-[100px] order-first md:order-first bg-white shadow-md">
        <div className="flex md:flex-col w-full h-full justify-start items-center md:border-r border-b md:border-b-0 border-gray-200">
          {[
            { name: "ai-settings", icon: <Settings size={24} /> },
            { name: "templates", icon: <FileText size={24} /> },
            { name: "settings", icon: <Text size={24} /> },
            { name: "background", icon: <Columns2Icon size={24} /> },
          ].map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center justify-center p-4 w-full md:w-auto transition-colors my-2 rounded-lg duration-200 ${
                activeTab === tab.name
                  ? "bg-blue-100  text-blue-500"
                  : "text-gray-500 hover:text-blue-500"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              <span className="md:hidden ml-2 capitalize">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
      <aside className="flex-1 border bg-white overflow-hidden transition-all transform">
        {activeTab === "ai-settings" && <AiSettingsComponent />}
        {activeTab === "templates" && <TemplateSection />}
        {activeTab === "settings" && <SettingsSection />}
        {activeTab === "background" && <BackgroundColorssSection />}
      </aside>
    </aside>
  );
};

export default MainSidebar;
