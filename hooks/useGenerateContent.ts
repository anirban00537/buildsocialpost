import { addAllSlides, setBackground } from "@/state/slice/carousel.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGenerateContent = () => {
  const [topic, setTopic] = useState("");
  const [numSlides, setNumSlides] = useState(5);
  const [temperature, setTemperature] = useState(0.2);
  const [language, setLanguage] = useState("en");
  // const [model, setModel] = useState("gpt-3.5-turbo");
  const [mood, setMood] = useState("Neutral");
  const [loading, setLoading] = useState(false);
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
          temperature,
          language,
          // model,
          mood,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response;
      const dataJson = await data.json();
      const { carousels, colorPalette } = dataJson;
      dispatch(addAllSlides(carousels));
      dispatch(
        setBackground({
          color1: colorPalette.color1,
          color2: colorPalette.color2,
          color3: colorPalette.color3,
          color4: colorPalette.color4,
        })
      );
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    generateContent,
    setTopic,
    topic,
    setNumSlides,
    numSlides,
    setTemperature,
    temperature,
    setLanguage,
    language,
    // setModel,
    // model,
    setMood,
    mood,
    loading,
  };
};
