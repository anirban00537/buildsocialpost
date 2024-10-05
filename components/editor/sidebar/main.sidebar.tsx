import React, { useEffect, useState } from "react";
import {
  Wand2,
  User,
  Type,
  Image,
  ChevronLeft,
  ChevronRight,
  Shapes,
} from "lucide-react";
import AiSettingsComponent from "./ai.main";
import BrandingSection from "./branding.main";
import TextSettingsSection from "./text-settings.main";
import BackgroundColorsSection from "./background.main";
import BackgroundPatternsAndElements from "./background-patterns-elements";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface MainSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("ai-settings");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsCollapsed]);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
      setIsCollapsed(false);
    }
  }, [searchParams, setIsCollapsed]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsCollapsed(false);

    // Create a new URLSearchParams object with the current query parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    // Update or add the 'tab' parameter
    newSearchParams.set("tab", tab);

    // Construct the new URL with updated query parameters
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    
    // Use router.push to navigate to the new URL
    router.push(newUrl);
  };

  return (
    <>
      <aside
        className={`flex flex-col md:flex-row h-screen transition-all duration-300 ${
          isCollapsed ? "w-[70px]" : "w-full md:w-[420px]"
        } border border-borderColor bg-background`}
      >
        <div className="sticky top-0 w-full md:w-[70px] order-first md:order-first border-r border-borderColor bg-background shadow-md">
          <div className="flex flex-wrap md:flex-col w-full h-full justify-start items-center md:border-r border-b md:border-b-0 border-borderColor">
            {[
              { name: "ai-settings", icon: <Wand2 size={20} /> },
              { name: "branding", icon: <User size={20} /> },
              { name: "text-settings", icon: <Type size={20} /> },
              { name: "background", icon: <Image size={20} /> },
              { name: "patterns-elements", icon: <Shapes size={20} /> },
            ].map((tab) => (
              <button
                key={tab.name}
                className={`flex flex-col items-center justify-center p-6 w-1/5 md:w-full transition-colors my-1 md:my-2 rounded-lg duration-200 ${
                  activeTab === tab.name
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => handleTabClick(tab.name)}
              >
                {tab.icon}
              </button>
            ))}
          </div>
        </div>
        <div
          className={`flex-1 border border-borderColor border-l-0 bg-background overflow-hidden transition-all transform ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          {activeTab === "ai-settings" && <AiSettingsComponent />}
          {activeTab === "branding" && <BrandingSection />}
          {activeTab === "text-settings" && <TextSettingsSection />}
          {activeTab === "background" && <BackgroundColorsSection />}
          {activeTab === "patterns-elements" && <BackgroundPatternsAndElements />}
        </div>
      </aside>
    </>
  );
};

export default MainSidebar;
