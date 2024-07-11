import { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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
      let finalHeadshot = brandingData.headshot;

      // Check if the headshot is a local URL and upload to Firebase Storage if necessary
      if (brandingData.headshot && brandingData.headshot.startsWith("blob:")) {
        if (user && user.uid) {
          const response = await fetch(brandingData.headshot);
          const blob = await response.blob();
          const storage = getStorage();
          const storageRef = ref(
            storage,
            `headshots/${user.uid}/${Date.now()}`
          );
          await uploadBytes(storageRef, blob);
          finalHeadshot = await getDownloadURL(storageRef);

          // Delete the old image from Firebase Storage if it exists
          if (originalHeadshot) {
            const oldImageRef = ref(storage, originalHeadshot);
            await deleteObject(oldImageRef);
          }
        } else {
          throw new Error("User not authenticated");
        }
      }

      if (user && user.uid) {
        await setDoc(
          doc(db, "user_branding", user.uid),
          { branding: { ...brandingData, headshot: finalHeadshot } },
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
