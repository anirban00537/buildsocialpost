import React, { useEffect, useState } from "react";
import { Wand2, User, Type, Image, Shapes, Palette } from "lucide-react";
import AiSettingsComponent from "./ai.main";
import BrandingSection from "./branding.main";
import TextSettingsSection from "./text-settings.main";
import BackgroundColorsSection from "./background.main";
import BackgroundPatternsAndElements from "./background-patterns-elements";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import BackgroundImagesSection from "./BackgroundImagesSection";
import { FaPallet } from "react-icons/fa";

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
  const [activeTab, setActiveTab] = useState("background");

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
    const tab = searchParams?.get("tab");
    if (tab) {
      setActiveTab(tab);
      setIsCollapsed(false);
    }
  }, [searchParams, setIsCollapsed]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsCollapsed(false);

    // Create a new URLSearchParams object with the current query parameters
    const newSearchParams = new URLSearchParams(searchParams?.toString());

    // Update or add the 'tab' parameter
    newSearchParams?.set("tab", tab);

    // Construct the new URL with updated query parameters
    const newUrl = `${pathname}?${newSearchParams.toString()}`;

    // Use router.push to navigate to the new URL
    router.push(newUrl);
  };

  return (
    <>
      <div
        className={`flex flex-col md:flex-row h-screen transition-all duration-300 ${
          isCollapsed ? "w-[80px]" : "w-full md:w-[420px]"
        } border border-borderColor/50 bg-background`}
      >
        <div className="sticky top-0 w-full md:w-[80px] order-first md:order-first border-r border-borderColor/50 bg-background ">
          <div className="flex flex-wrap md:flex-col w-full h-full justify-start items-center md:border-r border-b md:border-b-0 border-borderColor/50">
            {[
              // { name: "ai-settings", icon: <Wand2 size={20} />, label: "AI" },
              { name: "background", icon: <Palette size={20} />, label: "Color" },
              { name: "branding", icon: <User size={20} />, label: "Brand" },
              { name: "text-settings", icon: <Type size={20} />, label: "Text" },
              { name: "patterns-elements", icon: <Shapes size={20} />, label: "Elements" },
              { name: "background-images", icon: <Image size={20} />, label: "Images" },
            ].map((tab) => (
              <button
                key={tab.name}
                className={`flex flex-col items-center justify-center p-2 m-1 transition-all rounded-lg w-[60px] h-[60px] ${
                  activeTab === tab.name
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                onClick={() => handleTabClick(tab.name)}
              >
                {tab.icon}
                <span className="text-[9px] mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`flex-1 border border-borderColor border-l-0 bg-background overflow-hidden transition-all transform ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          {/* {activeTab === "ai-settings" && <AiSettingsComponent />} */}
          {activeTab === "background" && <BackgroundColorsSection />}
          {activeTab === "branding" && <BrandingSection />}
          {activeTab === "text-settings" && <TextSettingsSection />}
          {activeTab === "patterns-elements" && (
            <BackgroundPatternsAndElements />
          )}
          {activeTab === "background-images" && <BackgroundImagesSection />}
        </div>
      </div>
    </>
  );
};

export default MainSidebar;
