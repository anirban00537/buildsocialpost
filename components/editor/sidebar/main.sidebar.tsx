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
    <div className="fixed inset-y-0 z-10 flex flex-shrink-0 w-96 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none">
      {/* Vertical Tab Navigation */}
      <aside className="flex flex-col items-center bg-white border-r shadow-lg w-16 py-4">
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
      </aside>

      <aside className="flex-1 bg-white overflow-hidden transition-all transform">
        {activeTab === "settings" && <SettingsComponent />}
        {activeTab === "templates" && <TemplateSection />}
        {activeTab === "text" && <TextSettingsSection />}
      </aside>
    </div>
  );
};

export default MainSidebar;
