import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { setHandle, setHeadshot, setName } from "@/state/slice/branding.slice";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

const useBranding = () => {
  const dispatch = useDispatch();
  const { name, handle, headshot } = useSelector(
    (state: RootState) => state.branding
  );
  const [originalHeadshot, setOriginalHeadshot] = useState<string | null>(null);

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
      dispatch(setHeadshot(URL.createObjectURL(file)));
    }
  };

  const { mutate: saveBrandingData, isLoading: isSaving } = useMutation(
    async (brandingData: {
      name: string;
      handle: string;
      headshot: string | null;
    }) => {
      let finalHeadshot = brandingData.headshot;

      if (brandingData.headshot && brandingData.headshot.startsWith("blob:")) {
        // Here you would typically upload the file to your storage solution
        // and get back a URL. For this example, we'll assume it's done and
        // we have a URL.
        finalHeadshot = "https://example.com/uploaded-image.jpg";
      }

      const response = await axios.post("/api/branding", {
        ...brandingData,
        headshot: finalHeadshot,
      });

      return response.data;
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
    loading: isFetchingBranding || isSaving,
  };
};

export default useBranding;
