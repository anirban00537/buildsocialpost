"use client";
import React, { useEffect, useState, FC, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionInfo from "@/components/subscription/status";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { useLogout } from "@/hooks/useAuth";
import useCarousel from "@/hooks/useCarousel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CarouselListModal from "@/components/editor/CarouselListModal";
import { Download, Image, User, CreditCard, LogOut } from "lucide-react";

// Utility function to get user initials
const getInitials = (email: string): string =>
  email ? email.charAt(0).toUpperCase() : "U";

// UserDropdown Component
const UserDropdown: FC<{ user: any; onLogout: () => void }> = ({
  user,
  onLogout,
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <span>
        {user.photoURL ? (
          <img
            className="w-8 h-8 rounded-full"
            src={user.photoURL}
            alt="User Avatar"
          />
        ) : (
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-white">
            {getInitials(user.email)}
          </div>
        )}
      </span>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="flex items-center gap-2">
        <User className="w-4 h-4" />
        Profile
      </DropdownMenuItem>
      <DropdownMenuItem className="flex items-center gap-2">
        <CreditCard className="w-4 h-4" />
        Billing
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2">
        <LogOut className="w-4 h-4" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// DownloadDropdown Component
const DownloadDropdown: FC<{
  onDownloadPDF: () => void;
  onDownloadZip: () => void;
  pdfLoading: boolean;
  zipLoading: boolean;
}> = ({ onDownloadPDF, onDownloadZip, pdfLoading, zipLoading }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (pdfLoading || zipLoading) {
      setIsDownloading(true);
    } else {
      setIsDownloading(false);
    }
  }, [pdfLoading, zipLoading]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          {isDownloading ? "Downloading..." : "Download"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onDownloadPDF} disabled={pdfLoading}>
          {pdfLoading ? "Downloading PDF..." : "Download PDF"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDownloadZip} disabled={zipLoading}>
          {zipLoading ? "Downloading Zip..." : "Download Zip"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const EditorNavbar: FC = () => {
  const { exportSlidesToPDF, exportSlidesToZip, pdfLoading, zipLoading } =
    useCarousel();
  const {
    createOrUpdateCarousel,
    getCarouselDetailsById,
    getAllCarousels,
    carousels,
    loading: saveLoading,
    deleteCarousel,
  } = useCarouselManager();
  const { logout } = useLogout();
  const user = useSelector((state: RootState) => state.user.userinfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const initials = user?.email ? getInitials(user.email) : null;
  const searchParams = useSearchParams();
  const carouselId = searchParams.get("id");
  const router = useRouter();
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  useEffect(() => {
    if (carouselId) {
      getCarouselDetailsById(carouselId);
    }
  }, [carouselId, getCarouselDetailsById]);

  useEffect(() => {
    getAllCarousels();
  }, [getAllCarousels]);

  const handleSaveCarousel = useCallback(() => {
    createOrUpdateCarousel(name, carouselId ?? undefined);
  }, [name, carouselId, createOrUpdateCarousel]);

  return (
    <header className="bg-white sticky top-0 h-[65px] flex items-center justify-between border-b border-gray-200 z-40 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-9 object-cover" />
        </Link>
        <Button
          onClick={() => setIsViewAllModalOpen(true)}
          className="border border-gray-200 flex items-center gap-2 hover:bg-primary/50"
          variant="outline"
        >
          {name || "Unnamed Carousel"}
        </Button>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DownloadDropdown
          onDownloadPDF={exportSlidesToPDF}
          onDownloadZip={exportSlidesToZip}
          pdfLoading={pdfLoading}
          zipLoading={zipLoading}
        />

        <Button
          onClick={handleSaveCarousel}
          disabled={saveLoading}
          className="flex items-center gap-2"
          size="sm"
        >
          {saveLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </div>
          ) : (
            "Save Carousel"
          )}
        </Button>

        <SubscriptionInfo />
        {user && user.email ? (
          <UserDropdown user={user} onLogout={logout} />
        ) : (
          <Link href="/login" className="text-sm">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
          </Link>
        )}
      </div>

      {/* View All Carousels Modal */}
      <CarouselListModal
        carousels={carousels}
        isViewAllModalOpen={isViewAllModalOpen}
        setIsViewAllModalOpen={setIsViewAllModalOpen}
        createOrUpdateCarousel={createOrUpdateCarousel}
        deleteCarousel={deleteCarousel}
        saveLoading={saveLoading}
      />
    </header>
  );
};

export default EditorNavbar;
