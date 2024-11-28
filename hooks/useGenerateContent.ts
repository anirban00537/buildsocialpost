import { addAllSlides, setBackground } from "@/state/slice/carousel.slice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementGenerations, setMonthlyGenerations } from "@/state/slice/user.slice";
import { RootState } from "@/state/store";
import toast from "react-hot-toast";
import { updateGenerationCount, getGenerationCount } from "@/services/firestore";

export const useGenerateContent = () => {
  const [topic, setTopic] = useState("");
  const [numSlides, setNumSlides] = useState(5);
  const [language, setLanguage] = useState("en");
  const [mood, setMood] = useState("Neutral");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [contentStyle, setContentStyle] = useState("Professional");
  const [targetAudience, setTargetAudience] = useState("General");
  const [themeActive, setThemeActive] = useState(true);
  const dispatch = useDispatch();
  const { subscribed, monthlyGenerations, userinfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Load initial generation count from Firebase
    const loadGenerationCount = async () => {
      if (userinfo?.uid) {
        const count = await getGenerationCount(userinfo.uid);
        dispatch(setMonthlyGenerations(count));
      }
    };
    
    loadGenerationCount();
  }, [userinfo?.uid]);

  const generateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userinfo?.uid) {
      toast.error("Please login to generate content");
      return;
    }

    // Check generation limits for non-subscribed users
    if (!subscribed && monthlyGenerations >= 5) {
      toast.error("You've reached your monthly limit of 5 generations. Please upgrade to continue.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/create-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          numSlides,
          language,
          mood,
          theme,
          contentStyle,
          targetAudience,
          themeActive,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response;
      const dataJson = await data.json();
      const { carousels, colorPalette } = dataJson;
      dispatch(addAllSlides(carousels));
      
      if (themeActive) {
        dispatch(
          setBackground({
            color1: colorPalette.color1,
            color2: colorPalette.color2,
            color3: colorPalette.color3,
            color4: colorPalette.color4,
          })
        );
      }

      // On successful generation, update both Redux and Firebase
      if (!subscribed) {
        const newCount = monthlyGenerations + 1;
        dispatch(incrementGenerations());
        await updateGenerationCount(userinfo.uid, newCount);
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast.error("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    generateContent,
    topic,
    setTopic,
    numSlides,
    setNumSlides,
    language,
    setLanguage,
    mood,
    setMood,
    loading,
    theme,
    setTheme,
    contentStyle,
    setContentStyle,
    targetAudience,
    setTargetAudience,
    themeActive,
    setThemeActive,
    remainingGenerations: subscribed ? Infinity : 5 - monthlyGenerations,
  };
};
