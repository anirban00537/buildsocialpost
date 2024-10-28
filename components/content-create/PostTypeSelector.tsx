import { FileText, Layout, Wand2, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-1">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
          Post Type
        </span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-1.5 p-1 bg-card rounded-lg w-fit">
          {["text", "carousel"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ease-in-out
                ${
                  activeTab === tab
                    ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              {tab === "text" ? (
                <FileText
                  className={`h-4 w-4 ${activeTab === tab ? "text-blue-500" : ""}`}
                />
              ) : (
                <Layout
                  className={`h-4 w-4 ${activeTab === tab ? "text-blue-500" : ""}`}
                />
              )}
              {tab === "text" ? "Single Post" : "Carousel Post"}
            </button>
          ))}
        </div>

        {activeTab === "carousel" && (
          <div className="flex gap-1.5 p-1 bg-card rounded-lg w-fit">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className={`flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-all duration-300 ease-in-out
                    w-[200px] hover:bg-gray-50 group
                    ${
                      selectedTemplate
                        ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200/50"
                        : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-200/50"
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Wand2
                      className={`h-4 w-4 ${
                        selectedTemplate ? "text-blue-500" : "text-gray-400"
                      }`}
                    />
                    <span className="font-medium">
                      {selectedTemplate
                        ? carouselTemplates.find((t) => t.id === selectedTemplate)
                            ?.name
                        : "Select Template"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400 transition-transform group-hover:text-gray-500" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold mb-4">
                    Choose a Template
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 p-1">
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
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all
                        ${
                          selectedTemplate === template.id
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-gray-200 hover:border-blue-200 hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-2xl">{template.icon}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {template.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {template.slides} slides
                      </span>
                    </button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
};
