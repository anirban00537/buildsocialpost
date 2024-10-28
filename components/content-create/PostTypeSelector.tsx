import { FileText, Layout, Wand2, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PostTypeSelectorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTemplate: number | null;
  setSelectedTemplate: (id: number | null) => void;
  carouselTemplates: Array<{
    id: number;
    name: string;
    slides: number;
    icon: string;
  }>;
}

export const PostTypeSelector = ({
  activeTab,
  setActiveTab,
  selectedTemplate,
  setSelectedTemplate,
  carouselTemplates,
}: PostTypeSelectorProps) => {
  return (
    <div className="space-y-3">
      {/* Header with better visual hierarchy */}
      <div className="flex items-center gap-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">
            Post Type
          </span>
          {activeTab === "carousel" && !selectedTemplate && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-50 text-amber-600 rounded-full">
              Select template required
            </span>
          )}
        </div>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Main selection area */}
      <div className="flex flex-col gap-3">
        {/* Post type buttons with improved visual feedback */}
        <div className="inline-flex items-center gap-2 p-1 bg-gray-50/50 rounded-xl">
          {["text", "carousel"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab === "text") setSelectedTemplate(null);
              }}
              className={`flex items-center gap-2.5 px-4 h-10 text-sm rounded-lg transition-all duration-200
                ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50 font-medium"
                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                }`}
            >
              {tab === "text" ? (
                <FileText
                  className={`h-4 w-4 transition-colors duration-200 ${
                    activeTab === tab ? "text-blue-500" : "text-gray-400"
                  }`}
                />
              ) : (
                <Layout
                  className={`h-4 w-4 transition-colors duration-200 ${
                    activeTab === tab ? "text-blue-500" : "text-gray-400"
                  }`}
                />
              )}
              {tab === "text" ? "Single Post" : "Carousel Post"}
            </button>
          ))}
        </div>

        {/* Template selector with improved visibility */}
        {activeTab === "carousel" && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className={`flex items-center justify-between px-4 h-10 text-sm rounded-lg 
                  transition-all duration-200 w-full sm:w-[280px]
                  ${
                    selectedTemplate
                      ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                      : "bg-white text-gray-600 shadow-sm ring-1 ring-amber-200/50 hover:ring-amber-300/50"
                  }
                  hover:bg-gray-50/50 group`}
              >
                <div className="flex items-center gap-2.5">
                  <Wand2
                    className={`h-4 w-4 transition-colors duration-200 ${
                      selectedTemplate ? "text-blue-500" : "text-amber-500"
                    }`}
                  />
                  <span className={selectedTemplate ? "font-medium" : ""}>
                    {selectedTemplate
                      ? carouselTemplates.find((t) => t.id === selectedTemplate)
                          ?.name
                      : "Choose a template"}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 group-hover:-translate-y-0.5" />
              </button>
            </DialogTrigger>

            {/* Template selection dialog with improved layout */}
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Choose Your Template
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Select a template that best fits your content structure
                </p>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-3 p-1 mt-2">
                {carouselTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      const closeButton = document.querySelector(
                        '[aria-label="Close"]'
                      );
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    }}
                    className={`flex flex-col items-center gap-2.5 p-4 rounded-lg border transition-all duration-200
                      ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-100"
                          : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-2xl">{template.icon}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {template.name}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100/50 px-2 py-1 rounded-full">
                      {template.slides} slides
                    </span>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};
