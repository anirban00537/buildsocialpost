"use client";
import React, { useEffect, useState, FC } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  User,
  LogOut,
  CreditCard,
  Download,
  Edit,
  FileText,
  Image,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubscriptionInfo from "@/components/subscription/status";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { useLogout } from "@/hooks/useAuth";
import useCarousel from "@/hooks/useCarousel";
import { setName } from "@/state/slice/carousel.slice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getInitials = (email: string): string =>
  email ? email.charAt(0).toUpperCase() : "U";

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
  const dispatch = useDispatch();
  const [selectedCarousel, setSelectedCarousel] = useState<any | null>(null);
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (carouselId) getCarouselDetailsById(carouselId);
  }, [carouselId, getCarouselDetailsById]);

  useEffect(() => {
    getAllCarousels();
  }, [getAllCarousels]);

  const handleOpenCarousel = (carousel: any) => {
    router.push(`?id=${carousel.id}`);
    setIsViewAllModalOpen(false);
  };

  const handleEditCarousel = (carousel: any) => {
    setSelectedCarousel(carousel);
    dispatch(setName(carousel.data.name));
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedCarousel) {
      createOrUpdateCarousel(name, selectedCarousel.id);
      setIsEditModalOpen(false);
      setSelectedCarousel(null);
    }
  };

  const handleDeleteCarousel = (carouselId: string) => {
    deleteCarousel(carouselId);
    setSelectedCarousel(null);
    setIsViewAllModalOpen(true); // Refresh the list
  };

  return (
    <header className="bg-white sticky top-0 h-[65px] flex items-center justify-between border-b border-gray-200 z-40 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-14 object-cover" />
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
        <Button variant="outline" size="sm" onClick={exportSlidesToPDF}>
          <Download className="w-4 h-4 mr-2" />
          {pdfLoading ? "Downloading PDF..." : "Download PDF"}
        </Button>

        <Button variant="outline" size="sm" onClick={exportSlidesToZip}>
          <Image className="w-4 h-4 mr-2" />
          {zipLoading ? "Downloading Zip..." : "Download Zip"}
        </Button>

        <Button
          onClick={() => createOrUpdateCarousel(name, carouselId ?? undefined)}
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
                    {initials}
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
              <DropdownMenuItem
                onClick={() => logout()}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login" className="text-sm">
            <Button variant="outline" size="sm">
              Sign in
            </Button>
          </Link>
        )}
      </div>

      {/* View All Carousels Modal */}
      <Dialog open={isViewAllModalOpen} onOpenChange={setIsViewAllModalOpen}>
        <DialogContent>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">All Carousels</h2>
            {carousels.length === 0 && (
              <div className="flex justify-center items-center h-16">
                <p>No carousels found</p>
              </div>
            )}
            {carousels.map((carousel) => (
              <div
                key={carousel.id}
                className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-100 rounded"
              >
                <span>{carousel.data.name || "Unnamed Carousel"}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenCarousel(carousel)}
                  >
                    <FileText className="w-4 h-4" />
                    Open
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditCarousel(carousel)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteCarousel(carousel.id)}
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Carousel Name Modal */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={() => setIsEditModalOpen(false)}
      >
        <DialogContent>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-medium">Edit Carousel Name</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              className="border px-2 py-1 rounded"
              placeholder="Carousel Name"
            />
            <Button
              onClick={handleSaveEdit}
              disabled={saveLoading}
              className="ml-auto flex items-center gap-2 px-4 text-sm text-white bg-gradient-to-r from-primary to-teal-500 hover:from-blue-600 hover:to-teal-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default EditorNavbar;
