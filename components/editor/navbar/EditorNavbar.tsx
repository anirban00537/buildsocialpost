import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionInfo from "@/components/subscription/status";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { signOut } from "@/services/auth";
import useCarousel from "@/hooks/useCarousel";
import LoginModal from "@/components/auth/login.modal";
import CarouselListModal from "@/components/editor/CarouselListModal";
import { List, Plus, Menu, X, Edit, LogOut } from "lucide-react";
import { setNewCarousel, setProperty } from "@/state/slice/carousel.slice";
import FullScreenLoading from "@/components/loading/fullscreen.loading";
import Image from "next/image";
import { logout } from "@/state/slice/user.slice";
import Cookies from "js-cookie";
import UserDropdown from "./UserDropdown";
import DownloadDropdown from "./DownloadDropdown";
import CarouselSizeDropdown from "./CarouselSizeDropdown";

const EditorNavbar: React.FC = () => {
  const { exportSlidesToPDF, exportSlidesToZip, pdfLoading, zipLoading } =
    useCarousel();
  const {
    carousels,
    isFetchingAll,
    isAuthenticated,
    createOrUpdateCarousel,
    isCreatingOrUpdating,
  } = useCarouselManager();
  const user = useSelector((state: RootState) => state.user.userinfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const searchParams = useSearchParams();
  const carouselId = searchParams?.get("id");
  const dispatch = useDispatch();
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLogout = async () => {
    const refreshToken = Cookies.get("refreshToken");
    if (refreshToken) {
      await signOut(refreshToken);
    }
    dispatch(logout());
    Cookies.remove("token");
    Cookies.remove("refreshToken");
  };

  const handleSaveCarousel = useCallback(() => {
    if (createOrUpdateCarousel) {
      createOrUpdateCarousel({
        newName: name || "Default Carousel",
        id: carouselId ?? undefined,
      });
    } else {
      console.error("createOrUpdateCarousel function is not available");
    }
  }, [name, carouselId, createOrUpdateCarousel]);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setProperty({ key: "name", value: e.target.value }));
    },
    [dispatch]
  );

  const handleAddNew = useCallback(() => {
    dispatch(setNewCarousel());
    router.replace("/editor");
  }, [dispatch, router]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginRequired = () => {
    setIsLoginModalOpen(true);
  };

  if (isFetchingAll) {
    return <FullScreenLoading />;
  }

  return (
    <header className="bg-background sticky top-0 z-40 border-b border-borderColor/50">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/single-logo.svg"
                height={40}
                width={40}
                alt="Buildsocialpost.com"
              />
            </Link>

            <div className="hidden lg:flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button
                  onClick={() => setIsViewAllModalOpen(true)}
                  className="flex-1 sm:flex-initial h-8 justify-start text-textColor/85 bg-cardBackground hover:bg-primary/80 border  hover:text-white border-borderColor"
                  variant="outline"
                  size="sm"
                  disabled={isFetchingAll}
                >
                  <List className="w-4 h-4 mr-2 " />
                  <span>{isFetchingAll ? "Loading..." : "All Carousels"}</span>
                </Button>

                <Button
                  onClick={handleAddNew}
                  className="flex-1 sm:flex-initial h-8 justify-start text-textColor/85 bg-cardBackground  hover:bg-primary/80 border border-borderColor"
                  variant="outline"
                  size="sm"
                  disabled={isCreatingOrUpdating}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span>New</span>
                </Button>
              </div>
              <div className="flex items-center bg-cardBackground border border-borderColor/50 rounded-md h-8 w-full sm:w-auto">
                <Edit className="w-4 h-4 mr-2 text-textColor/85 ml-2" />
                <input
                  type="text"
                  placeholder="Carousel Name"
                  className="w-full sm:w-auto  border-none bg-transparent text-textColor/85 px-2 focus:outline-none rounded-md text-sm"
                  value={name}
                  onChange={handleNameChange}
                  aria-label="Carousel name"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <CarouselSizeDropdown className="w-48" />
            <DownloadDropdown
              onDownloadPDF={exportSlidesToPDF}
              onDownloadZip={exportSlidesToZip}
              pdfLoading={pdfLoading}
              zipLoading={zipLoading}
              isAuthenticated={isAuthenticated}
              onLoginRequired={handleLoginRequired}
            />
            <Button
              onClick={handleSaveCarousel}
              disabled={isCreatingOrUpdating || !isAuthenticated}
              size="xs"
              className="whitespace-nowrap h-8"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save Progress"}
            </Button>
            <SubscriptionInfo />
            {!user || !user.email ? (
              <Button
                variant="outline"
                size="xs"
                className="bg-cardBackground hover:bg-primary/80 border border-borderColor text-textColor/85"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Sign in
              </Button>
            ) : (
              <UserDropdown user={user} handleLogout={handleLogout} />
            )}
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              className="text-textColor/85"
              size="sm"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Collapsible menu for mobile and tablet */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-t border-borderColor">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <CarouselSizeDropdown className="w-full h-8" />
            <DownloadDropdown
              onDownloadPDF={exportSlidesToPDF}
              onDownloadZip={exportSlidesToZip}
              pdfLoading={pdfLoading}
              zipLoading={zipLoading}
              className="w-full h-8"
              isAuthenticated={isAuthenticated}
              onLoginRequired={handleLoginRequired}
            />
            <Button
              onClick={handleSaveCarousel}
              disabled={isCreatingOrUpdating}
              className="w-full h-8"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save Carousel"}
            </Button>
            <SubscriptionInfo />
            {!user || !user.email ? (
              <Button
                variant="outline"
                className="w-full bg-cardBackground hover:bg-primary/80 border border-borderColor/50 text-textColor/85"
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                Sign in
              </Button>
            ) : (
              <Button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start text-textColor/85"
                variant="ghost"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      )}

      <CarouselListModal
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </header>
  );
};

export default EditorNavbar;
