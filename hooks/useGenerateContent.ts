import { addAllSlides, setBackground } from "@/state/slice/carousel.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGenerateContent = () => {
  const [topic, setTopic] = useState("");
  const [numSlides, setNumSlides] = useState(5);
  const [language, setLanguage] = useState("en");
  const [mood, setMood] = useState("Neutral");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("light");
  const [contentStyle, setContentStyle] = useState("Professional");
  const [targetAudience, setTargetAudience] = useState("General");
  const [themeActive, setThemeActive] = useState(false);
  const dispatch = useDispatch();

  const generateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    } catch (error) {
      console.error("Error generating content:", error);
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
  };
};
