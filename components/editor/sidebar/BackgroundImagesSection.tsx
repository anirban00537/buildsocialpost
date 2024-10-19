import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundImageToAllSlides } from "@/state/slice/carousel.slice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import { X, Upload, Check } from "lucide-react";
import ImageUploadModal from "@/components/editor/ImageUploadModal";

const backgroundImages = [
  "https://images.unsplash.com/photo-1589810264340-0ce27bfbf751?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579546928937-641f7ac9bced?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1668359407785-ac5dca1de611?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1579547944212-c4f4961a8dd8?q=80&w=2139&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710162734220-d543f0dff259?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1644426358808-d5db8b4735a0?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710162734239-f2368bc6fae1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184713246-91865a6123dc?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184121903-64d5fdf9f603?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184122027-bdd5ac4675bd?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710184122196-e47fdcb8631d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1710166755608-58b3d62db3a8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1618397746666-63405ce5d015?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const BackgroundImagesSection = () => {
  const dispatch = useDispatch();
  const { globalBackground } = useSelector((state: RootState) => state.slides);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBackgroundImageSelect = (imageUrl: string) => {
    dispatch(setBackgroundImageToAllSlides(imageUrl));
  };

  const handleImageUpload = (url: string) => {
    handleBackgroundImageSelect(url);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Background Image
      </h2>

      {globalBackground ? (
        <div className="mb-4 flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="relative w-20 h-20 rounded-md overflow-hidden shadow-md mr-3">
            <Image
              src={globalBackground}
              alt="Current Background"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-grow">
            <p className="text-sm font-medium text-gray-700 mb-1">Current background</p>
            <Button
              size="sm"
              variant="outline"
              className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
              onClick={() => dispatch(setBackgroundImageToAllSlides(null))}
            >
              <X size={14} className="mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex items-center justify-center w-full h-20 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-sm text-gray-500">No background selected</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700">Choose an image</h3>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center hover:bg-gray-50 transition-colors"
        >
          <Upload size={14} className="mr-2" />
          Upload
        </Button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
        {backgroundImages.map((imageUrl, index) => (
          <div
            key={index}
            className="relative aspect-square cursor-pointer rounded-md overflow-hidden transition-all hover:scale-105 shadow-sm hover:shadow-md group"
            onClick={() => handleBackgroundImageSelect(imageUrl)}
          >
            <Image
              src={imageUrl}
              alt={`Background ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity" />
            {globalBackground === imageUrl && (
              <div className="absolute top-2 right-2 bg-white rounded-full p-1">
                <Check size={12} className="text-green-500" />
              </div>
            )}
          </div>
        ))}
      </div>

      <ImageUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onImageSelect={handleImageUpload}
      />
    </div>
  );
};

export default BackgroundImagesSection;
