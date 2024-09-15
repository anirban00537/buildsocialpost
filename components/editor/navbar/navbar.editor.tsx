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
  ArrowRight,
  ArrowDown,
  ChevronDown,
  List,
  Plus,
  Menu,
  X,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";
import {
  setLayoutHeightAndWidth,
  setProperty,
} from "@/state/slice/carousel.slice";
import BillingModal from "@/components/subscription/billingModal";
import FullScreenLoading from "@/components/loading/fullscreen.loading";

const getInitials = (email: string): string =>
  email ? email.charAt(0).toUpperCase() : "U";

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
            className="h-7 w-8 p-0 border border-primary rounded-full overflow-hidden"
          >
            {user.photoURL && !imageError ? (
              <img
                className="h-full w-full object-cover"
                src={user.photoURL}
                alt="User Avatar"
                onError={handleImageError}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary text-textColor text-sm font-medium">
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
  className?: string;
}> = React.memo(
  ({ onDownloadPDF, onDownloadZip, pdfLoading, zipLoading, className }) => {
    const isDownloading = pdfLoading || zipLoading;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="xs"
            className={`bg-cardBackground text-textColor hover:bg-primary/50 border border-borderColor ${className}`}
          >
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
  }
);
const CarouselSizeDropdown: React.FC<{ className?: string }> = ({
  className,
}) => {
  const dispatch = useDispatch();
  const { height, width } = useSelector(
    (state: RootState) => state.slides.layout
  );

  const sizes = [
    {
      name: "Square",
      ratio: "1:1",
      width: 600,
      height: 600,
      icons: [FaInstagram, FaLinkedinIn, FaFacebookF],
    },
    {
      name: "Portrait",
      ratio: "3:4",
      width: 540,
      height: 720,
      icons: [FaInstagram, FaTiktok],
    },
    {
      name: "Carousel",
      ratio: "4:5",
      width: 576,
      height: 720,
      icons: [FaInstagram, FaFacebookF],
    },
    {
      name: "Story Carousel",
      ratio: "9:16",
      width: 540,
      height: 960,
      icons: [FaInstagram, FaFacebookF, FaTiktok],
    },
    {
      name: "Landscape",
      ratio: "4:3",
      width: 720,
      height: 540,
      icons: [FaInstagram, FaFacebookF],
    },
    {
      name: "Presentation",
      ratio: "16:9",
      width: 800,
      height: 450,
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
        <Icon key={index} className="w-3 h-3 mr-1 text-textColor" />
      ))}
    </div>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`w-48 h-7 px-2 justify-start overflow-hidden bg-cardBackground text-textColor hover:bg-primary/50 border border-borderColor ${className}`}
        >
          <div className="flex items-center w-full">
            <div className="flex items-center mr-2 min-w-[48px]">
              {currentSize ? (
                renderIcons(currentSize.icons)
              ) : (
                <FaInstagram className="w-4 h-4" />
              )}
            </div>
            <span className="truncate">{currentSize?.name || "Custom"}</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 p-2 bg-cardBackground border border-borderColor">
        <DropdownMenuLabel className="text-xs font-semibold bg-cardBackground text-textColor mb-2">
          Choose size
        </DropdownMenuLabel>
        {sizes.map((size) => (
          <DropdownMenuItem
            key={size.ratio}
            onClick={() => handleSizeChange(size.width, size.height)}
            className="flex items-center py-2 px-1 bg-cardBackground text-textColor hover:bg-cardBackground rounded-md cursor-pointer"
          >
            <div className="flex-1 flex items-center">
              <div className="w-24 flex items-center">
                {renderIcons(size.icons)}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{size.name}</span>
                <span className="text-xs text-textColor">
                  {size.width} x {size.height}px
                </span>
              </div>
            </div>
            <span className="text-sm font-semibold text-textColor ml-auto">
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
    deleteCarousel,
    isCreatingOrUpdating,
    isFetchingDetails,
    isDeleting,
    isFetchingAll,
  } = useCarouselManager();
  const { logout } = useLogout();
  const user = useSelector((state: RootState) => state.user.userinfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const searchParams = useSearchParams();
  const carouselId = searchParams.get("id");
  const dispatch = useDispatch();
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleAddNew = useCallback(() => {
    createOrUpdateCarousel("New Carousel");
  }, [createOrUpdateCarousel]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const memoizedCarousels = useMemo(() => carousels, [carousels]);
  if (isFetchingAll) {
    return <FullScreenLoading />;
  }
  return (
    <header className="bg-background sticky top-0 z-40 border-b border-borderColor shadow-sm">
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <img
                src="/logo.svg"
                alt="Logo"
                className="h-9 object-cover mr-4"
              />
            </Link>
            <input
              type="text"
              placeholder="Carousel Name"
              className="border border-borderColor bg-cardBackground text-textColor px-2 h-7 rounded-md text-sm hidden md:block"
              value={name}
              onChange={handleNameChange}
              aria-label="Carousel name"
              disabled={isFetchingDetails}
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <CarouselSizeDropdown />
            <DownloadDropdown
              onDownloadPDF={exportSlidesToPDF}
              onDownloadZip={exportSlidesToZip}
              pdfLoading={pdfLoading}
              zipLoading={zipLoading}
            />
            <Button
              onClick={handleSaveCarousel}
              disabled={isCreatingOrUpdating}
              size="sm"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save Progress"}
            </Button>
            <SubscriptionInfo />
            {user && user.email ? (
              <UserDropdown user={user} onLogout={logout} />
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-textColor"
              size="sm"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Collapsible menu for mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-borderColor">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <input
              type="text"
              placeholder="Carousel Name"
              className="w-full border border-borderColor bg-cardBackground text-textColor px-2 h-7 rounded-md text-sm"
              value={name}
              onChange={handleNameChange}
              aria-label="Carousel name"
              disabled={isFetchingDetails}
            />
            <Button
              onClick={() => setIsViewAllModalOpen(true)}
              className="w-full h-7 justify-start text-textColor"
              variant="ghost"
              disabled={isFetchingAll}
            >
              <List className="w-4 h-4 mr-2" />
              {isFetchingAll ? "Loading..." : "All Carousels"}
            </Button>
            <Button
              onClick={handleAddNew}
              className="w-full h-7 justify-start text-textColor"
              variant="ghost"
              disabled={isCreatingOrUpdating}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Carousel
            </Button>
            <CarouselSizeDropdown className="w-full h-7" />
            <DownloadDropdown
              onDownloadPDF={exportSlidesToPDF}
              onDownloadZip={exportSlidesToZip}
              pdfLoading={pdfLoading}
              zipLoading={zipLoading}
              className="w-full h-7"
            />
            <Button
              onClick={handleSaveCarousel}
              disabled={isCreatingOrUpdating}
              className="w-full h-7"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save Carousel"}
            </Button>
            <SubscriptionInfo />

            {user && user.email ? (
              <Button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start text-textColor"
                variant="ghost"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  Sign in
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}

      <CarouselListModal
        carousels={memoizedCarousels}
        isViewAllModalOpen={isViewAllModalOpen}
        setIsViewAllModalOpen={setIsViewAllModalOpen}
        createOrUpdateCarousel={createOrUpdateCarousel}
        deleteCarousel={deleteCarousel}
        isCreatingOrUpdating={isCreatingOrUpdating}
        isDeleting={isDeleting}
        isFetchingAll={isFetchingAll}
      />
    </header>
  );
};

export default React.memo(EditorNavbar);
