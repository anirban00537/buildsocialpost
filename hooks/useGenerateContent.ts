import { addAllSlides } from "@/state/slice/carousel.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useGenerateContent = () => {
  const [topic, setTopic] = useState("");
  const [numSlides, setNumSlides] = useState(5);
  const [maxTokens, setMaxTokens] = useState(600);
  const [temperature, setTemperature] = useState(0.2);
  const [language, setLanguage] = useState("en");
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [mood, setMood] = useState("neutral");
  const dispatch = useDispatch();

  const generateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/create-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          numSlides,
          maxTokens,
          temperature,
          language,
          model,
          mood,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch(addAllSlides(data.response));
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  return {
    generateContent,
    setTopic,
    topic,
    setNumSlides,
    numSlides,
    setMaxTokens,
    maxTokens,
    setTemperature,
    temperature,
    setLanguage,
    language,
    setModel,
    model,
    setMood,
    mood,
  };
};
