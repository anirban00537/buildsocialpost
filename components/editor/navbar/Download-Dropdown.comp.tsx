import React from "react";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface DownloadDropdownProps {
  onDownloadPDF: () => void;
  onDownloadZip: () => void;
  pdfLoading: boolean;
  zipLoading: boolean;
  className?: string;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
}

const DownloadDropdown: React.FC<DownloadDropdownProps> = React.memo(
  ({
    onDownloadPDF,
    onDownloadZip,
    pdfLoading,
    zipLoading,
    className,
    isAuthenticated,
    onLoginRequired,
  }) => {
    const isDownloading = pdfLoading || zipLoading;
    const { toast } = useToast();

    const handleDownload = (action: () => void) => {
      if (!isAuthenticated) {
        toast({
          title: "Login Required",
          description: "Please log in to download your carousel.",
          variant: "destructive",
        });
        onLoginRequired();
      } else {
        action();
      }
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200 ${className}`}
          >
            <Download className="w-4 h-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">
              {isDownloading ? "Downloading..." : "Download"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-0 ring-1 ring-gray-200 rounded-lg p-1 shadow-lg">
          <DropdownMenuItem
            onClick={() => handleDownload(onDownloadPDF)}
            disabled={pdfLoading}
            className="flex items-center h-9 px-3 text-sm text-gray-700 rounded-md transition-colors hover:bg-gray-50 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            {pdfLoading ? "Downloading PDF..." : "Download PDF"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownload(onDownloadZip)}
            disabled={zipLoading}
            className="flex items-center h-9 px-3 text-sm text-gray-700 rounded-md transition-colors hover:bg-gray-50 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          >
            {zipLoading ? "Downloading Zip..." : "Download Zip"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default DownloadDropdown;
