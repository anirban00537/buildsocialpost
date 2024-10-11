import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { setHandle, setHeadshot, setName } from "@/state/slice/branding.slice";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useBranding = () => {
  const dispatch = useDispatch();
  const { name, handle, headshot } = useSelector(
    (state: RootState) => state.branding
  );
  const { data: session } = useSession();
  const [originalHeadshot, setOriginalHeadshot] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Fetch branding data
  const { data: brandingData, isLoading: isFetchingBranding } = useQuery(
    "branding",
    async () => {
      const response = await axios.get("/api/branding");
      return response.data;
    },
    {
      onSuccess: (data) => {
        dispatch(setName(data.name));
        dispatch(setHandle(data.handle));
        dispatch(setHeadshot(data.headshot));
        setOriginalHeadshot(data.headshot);
      },
    }
  );

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(event.target.value));
  };

  const handleHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setHandle(event.target.value));
  };

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
      dispatch(setHeadshot(URL.createObjectURL(file)));
    }
  };

  const { mutate: saveBrandingData, isLoading: isSaving } = useMutation(
    async (brandingData: {
      name: string;
      handle: string;
      headshot: string | null;
    }) => {
      const formData = new FormData();
      formData.append('name', brandingData.name);
      formData.append('handle', brandingData.handle);
      
      if (imageFile) {
        formData.append('headshot', imageFile);
      } else if (brandingData.headshot) {
        formData.append('headshot', brandingData.headshot);
      }

      const response = await axios.post("/api/branding", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Branding data saved successfully!");
        setImageFile(null); // Reset the image file after successful upload
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
    loading: isFetchingBranding || isSaving,
    session,
    imageFile,
    previewImage,
    setPreviewImage,
  };
};

export default useBranding;
