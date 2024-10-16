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
            variant="outline"
            size="xs"
            className={`bg-gradient-to-t from-cardBackground to-background text-textColor/85 hover:bg-primary/50 border border-borderColor ${className}`}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gradient-to-t from-cardBackground to-background text-textColor/85 hover:bg-primary/50 border border-borderColor">
          <DropdownMenuItem
            onClick={() => handleDownload(onDownloadPDF)}
            disabled={pdfLoading}
          >
            {pdfLoading ? "Downloading PDF..." : "Download PDF"}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDownload(onDownloadZip)}
            disabled={zipLoading}
          >
            {zipLoading ? "Downloading Zip..." : "Download Zip"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

export default DownloadDropdown;
