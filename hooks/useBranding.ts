import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { setHandle, setHeadshot, setName } from "@/state/slice/branding.slice";
import { useMutation } from "react-query";
import { uploadImage, deleteImage } from "@/services/storage";
import { updateBrandingSettings } from "@/services/firestore";

const useBranding = () => {
  const dispatch = useDispatch();
  const { name, handle, headshot } = useSelector(
    (state: RootState) => state.branding
  );
  const user = useSelector((state: RootState) => state.user.userInfo);
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

      if (brandingData.headshot && brandingData.headshot.startsWith("blob:")) {
        const response = await fetch(brandingData.headshot);
        const blob = await response.blob();

        // Generate a unique filename for the image
        const filename = `${user.uid}_${Date.now()}.${blob.type.split("/")[1]}`;
        const path = `user_headshots/${filename}`;

        finalHeadshot = await uploadImage(blob, path);

        if (
          originalHeadshot &&
          originalHeadshot.startsWith("https://firebasestorage.googleapis.com")
        ) {
          await deleteImage(originalHeadshot);
        }
      } else if (
        brandingData.headshot &&
        !brandingData.headshot.startsWith(
          "https://firebasestorage.googleapis.com"
        )
      ) {
        // If it's a web URL (like LinkedIn) and not a Firebase Storage URL, just use it as is
        finalHeadshot = brandingData.headshot;
      }

      await updateBrandingSettings(user.uid, {
        ...brandingData,
        headshot: finalHeadshot,
      });
    },
    {
      onSuccess: () => {
        toast.success("Branding data saved successfully!");
      },
      onError: (error: Error) => {
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
