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

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            className={`bg-cardBackground text-textColor/85 hover:bg-primary/50 border border-borderColor/50 h-8 ${className}`}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-cardBackground text-textColor/85 hover:bg-primary/50 border border-borderColor">
          <DropdownMenuItem
            onClick={onDownloadPDF}
            disabled={pdfLoading}
            data-umami-event="download_pdf"
          >
            {pdfLoading ? "Downloading PDF..." : "Download PDF"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onDownloadZip}
            disabled={zipLoading}
            data-umami-event="download_zip"
          >
            {zipLoading ? "Downloading Zip..." : "Download Zip"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default DownloadDropdown;
