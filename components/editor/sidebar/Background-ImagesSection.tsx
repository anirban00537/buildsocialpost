import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBackgroundImageToAllSlides } from "@/state/slice/carousel.slice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RootState } from "@/state/store";
import { X, Upload, Check, Image as ImageIcon } from "lucide-react";
import ImageUploadModal from "@/components/editor/Image_upload_modal/Image-Upload-Modal.comp";
import { motion } from "framer-motion";

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
    <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-sm">
      <div className="p-6 border-b border-borderColor/20">
        <h2 className="text-xl font-semibold text-textColor flex items-center gap-2">
          <ImageIcon className="w-6 h-6 text-primary" />
          Background Image
        </h2>
      </div>

      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {globalBackground ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center bg-background/70 p-4 rounded-lg border border-borderColor/50 shadow-sm"
          >
            <div className="relative w-24 h-24 rounded-md overflow-hidden shadow-md mr-4">
              <Image
                src={globalBackground}
                alt="Current Background"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-textColor mb-2">
                Current background
              </p>
              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={() => dispatch(setBackgroundImageToAllSlides(null))}
              >
                <X size={14} className="mr-2" />
                Remove
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center w-full h-24 bg-background/70 rounded-lg border border-dashed border-borderColor/50"
          >
            <p className="text-sm text-textColor/60">No background selected</p>
          </motion.div>
        )}

        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-textColor">
            Choose an image
          </h3>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center hover:bg-background/70 transition-colors"
          >
            <Upload size={14} className="mr-2" />
            Upload
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pb-6">
          {backgroundImages.map((imageUrl, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-square cursor-pointer rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => handleBackgroundImageSelect(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={`Background ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-200" />
              {globalBackground === imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-20">
                  <Check size={24} className="text-primary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
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
