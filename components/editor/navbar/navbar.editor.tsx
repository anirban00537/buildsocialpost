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
  LogOut,
  Save,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import { setProperty } from "@/state/slice/carousel.slice";
import BillingModal from "@/components/subscription/billingModal";
import FullScreenLoading from "@/components/loading/fullscreen.loading";
import { setLayoutHeightAndWidth } from "@/state/slice/carousel.slice";

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

// Add this new component
const CarouselSizeDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const { height, width } = useSelector(
    (state: RootState) => state.slides.layout
  );

  const sizes = [
    {
      name: "Square",
      ratio: "1:1",
      width: 500,
      height: 500,
      icons: [FaInstagram, FaLinkedinIn, FaFacebookF],
    },
    {
      name: "Portrait",
      ratio: "3:4",
      width: 450,
      height: 600,
      icons: [FaInstagram, FaTiktok],
    },
    {
      name: "Carousel",
      ratio: "4:5",
      width: 480,
      height: 600,
      icons: [FaInstagram, FaFacebookF],
    },
    {
      name: "Story Carousel",
      ratio: "9:16",
      width: 480,
      height: 800,
      icons: [FaInstagram, FaFacebookF, FaTiktok],
    },
    {
      name: "Landscape",
      ratio: "4:3",
      width: 600,
      height: 450,
      icons: [FaInstagram, FaFacebookF],
    },
    {
      name: "Presentation",
      ratio: "16:9",
      width: 700,
      height: 438,
      icons: [FaLinkedinIn, FaInstagram],
    },
  ];

  const handleSizeChange = (newWidth: number, newHeight: number) => {
    dispatch(setLayoutHeightAndWidth({ width: newWidth, height: newHeight }));
  };

  const currentRatio = `${width}:${height}`;
  const currentSize = sizes.find(
    (size) => `${size.width}:${size.height}` === currentRatio
  );

  const renderIcons = (icons: any[]) => (
    <div className="flex items-center">
      {icons.map((Icon, index) => (
        <div
          key={index}
          className={`w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full ${
            index > 0 ? "ml-1" : ""
          }`}
        >
          <Icon className="w-3 h-3" />
        </div>
      ))}
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="w-40">
          {currentSize ? (
            renderIcons(currentSize.icons)
          ) : (
            <FaInstagram className="w-4 h-4 mr-2" />
          )}
          <span className="ml-2">{currentSize?.name || "Custom"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2">
        <DropdownMenuLabel className="text-xs font-semibold text-gray-500 mb-2">
          Choose size
        </DropdownMenuLabel>
        {sizes.map((size) => (
          <DropdownMenuItem
            key={size.ratio}
            onClick={() => handleSizeChange(size.width, size.height)}
            className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            <div className="flex items-center flex-1">
              <div className="flex items-center min-w-[60px]">
                {renderIcons(size.icons)}
              </div>
              <div className="flex flex-col ml-2">
                <span className="font-medium text-sm">{size.name}</span>
                <span className="text-xs text-gray-500">
                  {size.width} x {size.height}px
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-blue-500 ml-2">
              {size.ratio}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const EditorNavbar: React.FC = () => {
  const { exportSlidesToPDF, exportSlidesToZip, pdfLoading, zipLoading } =
    useCarousel();
  const {
    createOrUpdateCarousel,
    getCarouselDetailsById,
    getAllCarousels,
    carousels,
    isLoading,
    deleteCarousel,
    error,
    isSaving,
    isDeleting,
  } = useCarouselManager();
  const { logout } = useLogout();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const searchParams = useSearchParams();
  const carouselId = searchParams.get("id");
  const dispatch = useDispatch();
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

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setProperty({ key: "name", value: e.target.value }));
    },
    [dispatch]
  );

  const memoizedCarousels = useMemo(() => carousels, [carousels]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

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
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-200 px-2 h-8 rounded-md text-sm ml-4"
          value={name}
          onChange={handleNameChange}
          aria-label="Search carousels"
        />
      </div>

      <div className="ml-auto flex items-center gap-4">
        <CarouselSizeDropdown />
        <DownloadDropdown
          onDownloadPDF={exportSlidesToPDF}
          onDownloadZip={exportSlidesToZip}
          pdfLoading={pdfLoading}
          zipLoading={zipLoading}
        />

        <Button
          onClick={handleSaveCarousel}
          disabled={isSaving}
          className="flex items-center gap-2"
          size="xs"
        >
          {isSaving ? (
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
        isDeleting={isDeleting}
      />
    </header>
  );
};

export default React.memo(EditorNavbar);
