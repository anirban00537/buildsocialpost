import React, { useState } from "react";
import {
  Settings,
  FileText,
  Zap,
  Brain,
  Shield,
  User,
  Text,
} from "lucide-react";
import SettingsComponent from "./settings.main";
import TemplateSection from "./template.main";
import TextSettingsSection from "./text.main";

const MainSidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <aside className="flex flex-col md:px-0 md:flex-row h-screen w-full md:w-[420px] bg-colorTwo no-scrollbar">
      {/* Vertical Tab Navigation */}
      <div className="md:sticky md:top-0 w-full md:w-[100px] order-first md:order-first ">
        <div className="flex flex-grow md:flex-col w-full md:w-[100px] bg-colorTwo h-full justify-start border items-center md:border-0 rounded-md border-l-0 border-t-0  transition-all duration-300 ease-in-out">
          <button
            className={`mb-4 p-2 ${
              activeTab === "settings" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <Settings size={24} />
          </button>
          <button
            className={`mb-4 p-2 ${
              activeTab === "templates" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("templates")}
          >
            <FileText size={24} />
          </button>
          <button
            className={`mb-4 p-2 ${
              activeTab === "text" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("text")}
          >
            <Text size={24} />
          </button>
        </div>
      </div>

      <aside className="flex-1 border bg-white overflow-hidden transition-all transform">
        {activeTab === "settings" && <SettingsComponent />}
        {activeTab === "templates" && <TemplateSection />}
        {activeTab === "text" && <TextSettingsSection />}
      </aside>
    </aside>
  );
};

export default MainSidebar;
