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
import {
  List,
  Plus,
  Menu,
  X,
  Edit,
  LogOut,
  ArrowLeft,
  ListIcon,
} from "lucide-react";
import { setNewCarousel, setProperty } from "@/state/slice/carousel.slice";
import FullScreenLoading from "@/components/utils-components/loading/Fullscreen.loading.comp";
import Image from "next/image";
import { logout } from "@/state/slice/user.slice";
import Cookies from "js-cookie";
import UserDropdown from "./User-Dropdown.comp";
import DownloadDropdown from "./Download-Dropdown.comp";
import CarouselSizeDropdown from "./Carousel-Size-Dropdown.comp";
import { scheduleCarouselPdf } from "@/services/carousels.service";
import { toast } from "react-hot-toast";

const EditorNavbar: React.FC = () => {
  const {
    exportSlidesToPDF,
    exportSlidesToZip,
    pdfLoading,
    zipLoading,
    exportSlidesToPDFThenSchedule,
  } = useCarousel();
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

  const handlePostCarousel = useCallback(async () => {
    if (!carouselId) {
      toast.error("Please save the carousel first");
      return;
    }

    try {
      // Generate PDF
      const pdfOutput = await exportSlidesToPDFThenSchedule();
      
      // Create FormData and append the PDF
      const formData = new FormData();
      formData.append('file', pdfOutput, 'carousel.pdf');
      formData.append('carouselId', carouselId);
      
      // Send to API
      const response = await scheduleCarouselPdf(formData);
      console.log(response, "response");
      
      if (response.success) {
        const postId = response.data.post.post.id;
        toast.success("Carousel scheduled successfully!");
        // Redirect to compose page with draft_id
        router.push(`/compose?draft_id=${postId}`);
      } else {
        toast.error("Failed to schedule carousel");
      }
    } catch (error) {
      console.error("Error posting carousel:", error);
      toast.error("Failed to schedule carousel");
    }
  }, [carouselId, exportSlidesToPDF, router]);

  if (isFetchingAll) {
    return <FullScreenLoading />;
  }

  return (
    <header className="bg-background sticky top-0 z-40 border-b border-gray-200">
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
                <Link href="/ai-writer">
                  <Button
                    className="flex-1 sm:flex-initial h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-gray-200  hover:ring-blue-200 hover:text-blue-700  rounded-lg transition-all duration-200"
                    variant="ghost"
                    size="sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2 " />
                    <span>Back to Dashboard</span>
                  </Button>
                </Link>
              </div>
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button
                  onClick={handleAddNew}
                  className="flex-1 sm:flex-initial h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-gray-200 hover:ring-blue-200 hover:text-blue-700 rounded-lg transition-all duration-200"
                  variant="ghost"
                  size="sm"
                  disabled={isCreatingOrUpdating}
                >
                  <Plus className="w-4 h-4 mr-2 " />
                  <span>New</span>
                </Button>
              </div>
              <div className="flex items-center bg-white ring-1 ring-gray-200 rounded-lg h-9 w-full sm:w-auto transition-all duration-200 focus-within:ring-blue-200">
                <Edit className="w-4 h-4 mr-2 text-gray-500 ml-3" />
                <input
                  type="text"
                  placeholder="Carousel Name"
                  className="w-full sm:w-auto border-none bg-transparent text-gray-700 px-2 focus:outline-none rounded-lg text-sm"
                  value={name}
                  onChange={handleNameChange}
                  aria-label="Carousel name"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <Link href="/carousels">
              <Button
                className="flex-1 sm:flex-initial h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-700 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
                variant="ghost"
                size="sm"
              >
                <ListIcon className="w-4 h-4 mr-2 text-gray-500 hover:text-blue-700" />
                <span>{"All Carousels"}</span>
              </Button>
            </Link>{" "}
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
              className="h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 transition-all duration-200 rounded-lg"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save Progress"}
            </Button>
            <Button
              onClick={handlePostCarousel}
              disabled={!carouselId || !isAuthenticated}
              className="h-9 bg-green-50 hover:bg-green-100 text-green-700 ring-1 ring-green-200 hover:ring-green-300 transition-all duration-200 rounded-lg"
            >
              Schedule Post
            </Button>
            <SubscriptionInfo />
            {!user || !user.email ? (
              <Button
                variant="ghost"
                className="h-9 bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
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
              className="text-gray-700 hover:bg-gray-50 rounded-lg"
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
        <div className="lg:hidden bg-background border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 space-y-2">
            <CarouselSizeDropdown className="w-full h-9" />
            <DownloadDropdown
              onDownloadPDF={exportSlidesToPDF}
              onDownloadZip={exportSlidesToZip}
              pdfLoading={pdfLoading}
              zipLoading={zipLoading}
              className="w-full h-9"
              isAuthenticated={isAuthenticated}
              onLoginRequired={handleLoginRequired}
            />
            <Button
              onClick={handleSaveCarousel}
              disabled={isCreatingOrUpdating}
              className="w-full h-9 bg-blue-50 hover:bg-blue-100 text-blue-700 ring-1 ring-blue-200 hover:ring-blue-300 rounded-lg transition-all duration-200"
            >
              {isCreatingOrUpdating ? "Saving..." : "Save Carousel"}
            </Button>
            <Button
              onClick={handlePostCarousel}
              disabled={!carouselId || !isAuthenticated}
              className="w-full h-9 bg-green-50 hover:bg-green-100 text-green-700 ring-1 ring-green-200 hover:ring-green-300 rounded-lg transition-all duration-200"
            >
              Schedule Post
            </Button>
            <SubscriptionInfo />
            {/* {!user || !user.email ? (
              <Button
                variant="ghost"
                className="w-full h-9 bg-white hover:bg-gray-50 text-gray-700 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
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
                className="w-full h-9 justify-start text-gray-700 bg-white hover:bg-gray-50 ring-1 ring-gray-200 hover:ring-blue-200 rounded-lg transition-all duration-200"
                variant="ghost"
              >
                <LogOut className="w-4 h-4 mr-2 text-gray-500" />
                Logout
              </Button>
            )} */}
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
