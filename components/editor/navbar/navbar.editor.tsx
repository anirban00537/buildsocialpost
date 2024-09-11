"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionInfo from "@/components/subscription/status";
import { useDispatch, useSelector } from "react-redux";
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
import {
  Download,
  User,
  CreditCard,
  LogOut,
  Save,
  ArrowRight,
} from "lucide-react";
import { setProperty } from "@/state/slice/carousel.slice";
import BillingModal from "@/components/subscription/billingModal";

// Utility function to get user initials
const getInitials = (email: string): string =>
  email ? email.charAt(0).toUpperCase() : "U";

// UserDropdown Component
const UserDropdown: React.FC<{ user: any; onLogout: () => void }> = React.memo(
  ({ user, onLogout }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
      // Reset image error state when user changes
      setImageError(false);
    }, [user]);

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 border border-primary rounded-full overflow-hidden"
          >
            {user.photoURL && !imageError ? (
              <img
                className="h-full w-full object-cover"
                src={user.photoURL}
                alt="User Avatar"
                onError={handleImageError}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary text-white text-sm font-medium">
                {getInitials(user.displayName || user.email)}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            {user.displayName || user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </DropdownMenuItem>
          <BillingModal />
          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

// DownloadDropdown Component
const DownloadDropdown: React.FC<{
  onDownloadPDF: () => void;
  onDownloadZip: () => void;
  pdfLoading: boolean;
  zipLoading: boolean;
}> = React.memo(({ onDownloadPDF, onDownloadZip, pdfLoading, zipLoading }) => {
  const isDownloading = pdfLoading || zipLoading;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs">
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
});

const EditorNavbar: React.FC = () => {
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
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const searchParams = useSearchParams();
  const carouselId = searchParams.get("id");
  const dispatch = useDispatch();
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  useEffect(() => {
    getAllCarousels();
  }, [getAllCarousels]);

  const handleSaveCarousel = useCallback(() => {
    createOrUpdateCarousel(name, carouselId ?? undefined);
  }, [name, carouselId, createOrUpdateCarousel]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setProperty({ key: "name", value: e.target.value }));
    },
    [dispatch]
  );

  const memoizedCarousels = useMemo(() => carousels, [carousels]);

  return (
    <header className="bg-white sticky top-0 h-[65px] flex items-center justify-between border-b border-gray-200 z-40 px-4 shadow-sm">
      <div className="flex items-center">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-9 object-cover mr-5" />
        </Link>
        <Button
          onClick={() => setIsViewAllModalOpen(true)}
          className="border border-gray-200 flex items-center h-8 gap-2 text-sm hover:bg-primary/50"
          variant="ghost"
        >
          Saved Carousels
        </Button>
        <span className="px-2 rounded-md">
          <ArrowRight className="w-4 h-4" />
        </span>

        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 px-2 h-8 rounded-md text-sm"
          value={name}
          onChange={handleNameChange}
          aria-label="Search carousels"
        />
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
          size="xs"
        >
          {saveLoading ? (
            <div className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4"
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
              <span>Saving...</span>
            </div>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Carousel</span>
            </>
          )}
        </Button>

        <SubscriptionInfo />
        {user && user.email ? (
          <UserDropdown user={user} onLogout={logout} />
        ) : (
          <Link href="/login" className="text-sm">
            <Button variant="outline" size="xs">
              Sign in
            </Button>
          </Link>
        )}
      </div>

      <CarouselListModal
        carousels={memoizedCarousels}
        isViewAllModalOpen={isViewAllModalOpen}
        setIsViewAllModalOpen={setIsViewAllModalOpen}
        createOrUpdateCarousel={createOrUpdateCarousel}
        deleteCarousel={deleteCarousel}
        saveLoading={saveLoading}
      />
    </header>
  );
};

export default React.memo(EditorNavbar);
