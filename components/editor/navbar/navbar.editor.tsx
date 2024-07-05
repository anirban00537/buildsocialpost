"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  LogOut,
  CreditCard,
  Download,
  ChevronsUpDown,
  Edit,
  FileText,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubscriptionInfo from "@/components/subscription/status";
import useCarousel from "@/hooks/useCarousel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useCarouselManager } from "@/hooks/useCarouselManager";
import { useLogout } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const getInitials = (email: string): string => {
  return email ? email.charAt(0).toUpperCase() : "U";
};

const EditorNavbar: React.FC = () => {
  const { exportSlidesToPDF, exportSlidesToZip, pdfLoading, zipLoading } =
    useCarousel();
  const {
    createOrUpdateCarousel,
    getCarouselDetailsById,
    getAllCarousels,
    carousels,
    loading: saveLoading,
  } = useCarouselManager();
  const { logout } = useLogout();
  const user = useSelector((state: RootState) => state.user.userinfo);
  const { name } = useSelector((state: RootState) => state.slides);
  const initials = user?.email ? getInitials(user.email) : null;
  const searchParams = useSearchParams();
  const carouselId = searchParams.get("id");
  const router = useRouter();
  const dispatch = useDispatch();
  const [carouselName, setCarouselName] = useState("");
  const [editCarouselId, setEditCarouselId] = useState<string | null>(null);

  useEffect(() => {
    if (carouselId) {
      getCarouselDetailsById(carouselId);
    }
  }, [carouselId, getCarouselDetailsById]);

  useEffect(() => {
    getAllCarousels();
  }, [getAllCarousels]);

  const handleCarouselSelect = (id: string) => {
    router.push(`?id=${id}`);
  };

  const handleEditClick = (id: string, currentName: string) => {
    setEditCarouselId(id);
    setCarouselName(currentName);
  };

  const handleSaveEdit = () => {
    if (editCarouselId) {
      createOrUpdateCarousel(carouselName, editCarouselId);
      setEditCarouselId(null);
    }
  };

  return (
    <header className="bg-white sticky top-0 h-[65px] flex items-center justify-between border-b border-gray-200 z-40 px-4 shadow-sm">
      <div className="flex items-center gap-4">
        <Link href="/">
          <img src="/logo.svg" alt="Logo" className="h-14 object-cover" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="border border-gray-200 flex items-center gap-2 hover:bg-primary/50"
            >
              <ChevronsUpDown className="w-4 h-4 text-gray-400" />
              {name || "Unnamed Carousel"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select a Carousel</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {carousels.map((carousel) => (
              <div
                key={carousel.id}
                className="flex justify-between items-center"
              >
                <DropdownMenuItem
                  onClick={() => handleCarouselSelect(carousel.id)}
                >
                  {carousel.data.name || "Unnamed Carousel"}
                </DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-2"
                      onClick={() =>
                        handleEditClick(carousel.id, carousel.data.name || "")
                      }
                    >
                      <Edit className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex flex-col gap-4">
                      <h2 className="text-lg font-medium">
                        Edit Carousel Name
                      </h2>
                      <input
                        type="text"
                        value={carouselName}
                        onChange={(e) => setCarouselName(e.target.value)}
                        className="border px-2 py-1 rounded"
                        placeholder="Carousel Name"
                      />
                      <Button onClick={handleSaveEdit} disabled={saveLoading}>
                        Save
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={exportSlidesToPDF} disabled={pdfLoading}>
              <FileText className="w-4 h-4 mr-2" />
              {pdfLoading ? "Downloading PDF..." : "Download PDF"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={exportSlidesToZip} disabled={zipLoading}>
              <Image className="w-4 h-4 mr-2" />
              {zipLoading ? "Downloading Zip..." : "Download Zip"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() => {
            //@ts-ignore
            createOrUpdateCarousel(name, carouselId);
          }}
          disabled={saveLoading}
          className="flex items-center gap-2"
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
            <Button variant="outline">Sign in</Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default EditorNavbar;
