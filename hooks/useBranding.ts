import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import toast from "react-hot-toast";
import { RootState } from "@/state/store";
import { setHandle, setHeadshot, setName } from "@/state/slice/branding.slice";
import { useMutation } from "react-query";

const useBranding = () => {
  const dispatch = useDispatch();
  const { name, handle, headshot } = useSelector(
    (state: RootState) => state.branding
  );
  const user = useSelector((state: RootState) => state.user.userinfo);

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
      if (user && user.uid) {
        await setDoc(
          doc(db, "user_branding", user.uid),
          { branding: brandingData },
          { merge: true }
        );
      } else {
        throw new Error("User not authenticated");
      }
    },
    {
      onSuccess: () => {
        toast.success("Branding data saved successfully!");
      },
      onError: (error: any) => {
        console.error("Error saving branding data: ", error);
        toast.error("Failed to save branding data.");
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveBrandingData({ name, handle, headshot });
  };

  return {
    name,
    handle,
    headshot,
    loading,
    handleNameChange,
    handleHandleChange,
    handleImageUpload,
    handleSubmit,
    user,
  };
};

export default useBranding;
