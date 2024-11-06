import React, { useState, useCallback, useMemo, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SubscriptionInfo from "@/components/subscription/Status.comp";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { signOut } from "@/services/auth";
import useCarousel from "@/hooks/useCarousel";
import LoginModal from "@/components/auth/login.modal";
import CarouselListModal from "@/components/editor/Carousel-List-Modal.comp";
import { List, Plus, Menu, X, Edit, LogOut } from "lucide-react";
import { setNewCarousel, setProperty } from "@/state/slice/carousel.slice";
import FullScreenLoading from "@/components/utils-components/loading/Fullscreen.loading.comp";
import Image from "next/image";
import { logout } from "@/state/slice/user.slice";
import Cookies from "js-cookie";
import UserDropdown from "./User-Dropdown.comp";
import DownloadDropdown from "./Download-Dropdown.comp";
import CarouselSizeDropdown from "./Carousel-Size-Dropdown.comp";

const EditorNavbar: React.FC = () => {
  const { exportSlidesToPDF, exportSlidesToZip, pdfLoading, zipLoading } =
    useCarousel();
  const {
    isFetchingAll,
    isAuthenticated,
    createOrUpdateCarousel,
    isCreatingOrUpdating,
    refetchCarousels,
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
    router.replace("/carousel-editor");
  }, [dispatch, router]);
  const handleOpenCarouselModal = useCallback(() => {
    refetchCarousels();
    setIsViewAllModalOpen(true);
  }, [refetchCarousels]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginRequired = () => {
    setIsLoginModalOpen(true);
  };

  if (isFetchingAll) {
    return <FullScreenLoading />;
  }

  return (
    <header className="fixed top-0 left-[288px] right-0 z-50 bg-white border-b border-gray-200">
      <div className="px-4">
        <div className="flex h-14 items-center justify-end">
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleAddNew}
              className="h-8 text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
              variant="ghost"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span className="text-xs font-medium">New</span>
            </Button>

            <div className="flex items-center bg-white ring-1 ring-gray-200 rounded-lg h-8 w-[180px] transition-all duration-200 focus-within:ring-blue-200">
              <Edit className="w-3.5 h-3.5 text-gray-400 ml-2.5" />
              <input
                type="text"
                placeholder="Carousel Name"
                className="w-full border-none bg-transparent text-gray-700 px-2 focus:outline-none rounded-lg text-xs"
                value={name}
                onChange={handleNameChange}
              />
            </div>

            <div className="h-5 w-px bg-gray-200 mx-2" />

            <CarouselSizeDropdown className="h-8" />

            <DownloadDropdown
              onDownloadPDF={exportSlidesToPDF}
              onDownloadZip={exportSlidesToZip}
              pdfLoading={pdfLoading}
              zipLoading={zipLoading}
              isAuthenticated={isAuthenticated}
              onLoginRequired={handleLoginRequired}
              className="h-8"
            />

            <Button
              onClick={handleSaveCarousel}
              disabled={isCreatingOrUpdating || !isAuthenticated}
              className="h-8 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-medium ring-1 ring-blue-200 hover:ring-blue-300 transition-all duration-200 rounded-lg whitespace-nowrap"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save"}
            </Button>

            <div className="h-5 w-px bg-gray-200 mx-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditorNavbar;
