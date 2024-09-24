import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { setHandle, setHeadshot, setName } from "@/state/slice/branding.slice";
import { useMutation } from "react-query";
import { uploadImage, deleteImage } from "@/services/storage";
import { updateBrandingSettings, fetchBrandingSettings } from "@/services/firestore";

const useBranding = () => {
  const dispatch = useDispatch();
  const { name, handle, headshot } = useSelector(
    (state: RootState) => state.branding
  );
  const user = useSelector((state: RootState) => state.user.userinfo);
  const [originalHeadshot, setOriginalHeadshot] = useState<string | null>(null);

  useEffect(() => {
    if (headshot && !headshot.startsWith("blob:")) {
      setOriginalHeadshot(headshot);
    }
  }, [headshot]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHandle(event.target.value));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch(setHeadshot(URL.createObjectURL(file)));
    }
  };

  const { mutate: saveBrandingData, isLoading: loading } = useMutation(
    async (brandingData: {
      name: string;
      handle: string;
      headshot: string | null;
    }) => {
      if (!user?.uid) throw new Error("User not authenticated");

      let finalHeadshot = brandingData.headshot;

      console.log("Starting branding data save process");
      console.log("Current branding data:", brandingData);

      // Check if user already has branding data with a headshot
      const existingBrandingData = await fetchBrandingSettings(user.uid);
      const existingHeadshot = existingBrandingData.headshot;

      console.log("Existing headshot:", existingHeadshot);

      const deleteExistingHeadshot = async () => {
        if (existingHeadshot) {
          console.log("Attempting to delete existing headshot:", existingHeadshot);
          try {
            // Extract the path from the full URL
            const url = new URL(existingHeadshot);
            const pathWithToken = url.pathname.split('/o/')[1];
            const path = decodeURIComponent(pathWithToken.split('?')[0]);
            
            if (path) {
              await deleteImage(path);
              console.log("Successfully deleted old image");
            } else {
              console.log("Could not extract path from existing headshot URL");
            }
          } catch (error) {
            console.error("Error deleting old image:", error);
          }
        } else {
          console.log("No existing headshot to delete");
        }
      };

      if (brandingData.headshot && brandingData.headshot.startsWith("blob:")) {
        console.log("New blob image detected, preparing to upload");
        
        // Delete the existing headshot before uploading a new one
        await deleteExistingHeadshot();

        try {
          const response = await fetch(brandingData.headshot);
          const blob = await response.blob();
          
          // Generate a unique filename for the image
          const filename = `${user.uid}_${Date.now()}.${blob.type.split('/')[1]}`;
          const path = `user_headshots/${filename}`;
          
          console.log("Uploading new image to:", path);
          finalHeadshot = await uploadImage(blob, path);
          console.log("New image uploaded successfully:", finalHeadshot);
        } catch (error) {
          console.error("Error uploading new image:", error);
          throw error;
        }
      } else if (brandingData.headshot !== existingHeadshot) {
        console.log("Headshot URL changed, deleting old image");
        await deleteExistingHeadshot();
      } else if (!brandingData.headshot && existingHeadshot) {
        console.log("Headshot removed, deleting old image");
        await deleteExistingHeadshot();
        finalHeadshot = null;
      } else {
        console.log("No changes to headshot detected");
      }

      console.log("Updating branding settings with finalHeadshot:", finalHeadshot);
      await updateBrandingSettings(user.uid, {
        ...brandingData,
        headshot: finalHeadshot,
      });
      console.log("Branding settings updated successfully");
    },
    {
      onSuccess: () => {
        console.log("Mutation completed successfully");
        toast.success("Branding data saved successfully!");
      },
      onError: (error: Error) => {
        console.error("Error in mutation:", error);
        toast.error(error.message || "Failed to save branding data.");
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveBrandingData({ name, handle, headshot });
  };

  return {
    name,
    handle,
    headshot,
    handleNameChange,
    handleHandleChange,
    handleImageUpload,
    handleSubmit,
    loading,
    user,
  };
};

export default useBranding;
