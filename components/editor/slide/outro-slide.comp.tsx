import React from "react";
import { generalSettings, Slide } from "@/types";

interface SlideProps {
  slide: Slide;
  generalSettings: generalSettings;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number) => void;
  customStyles?: {
    container?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    button?: React.CSSProperties;
    headshot?: React.CSSProperties;
    authorName?: React.CSSProperties;
    authorHandle?: React.CSSProperties;
  };
}

const OutroSliderComponent: React.FC<SlideProps> = ({
  slide,
  generalSettings,
  index,
  updateSlide,
  deleteSlide,
  customStyles = {},
}) => {
  const backgroundImageStyle = slide.imageUrl
    ? { backgroundImage: `url(${slide.imageUrl})` }
    : { background: "#feb47b" };

  return (
    <div
      style={{
        position: "relative",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        ...backgroundImageStyle,
        ...customStyles.container,
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div style={{ marginBottom: "1rem", width: "100%", maxWidth: "768px" }}>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, subtitle: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "1.125rem",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word",
              whiteSpace: "normal",
              resize: "none",
              ...customStyles.subtitle,
            }}
          >
            {slide.subtitle || "Your guide to finding balance in life"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, title: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "2.25rem",
              fontWeight: "bold",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word",
              whiteSpace: "normal",
              resize: "none",
              ...customStyles.title,
            }}
          >
            {slide.title || "Focus on Balance"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, description: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              fontSize: "1rem",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word",
              whiteSpace: "normal",
              resize: "none",
              ...customStyles.description,
            }}
          >
            {slide.description ||
              "It's important to prioritize balance in your life. With some intentional planning, you can find balance and enjoy more peace of mind."}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <button
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#fbbf24",
                color: "black",
                fontWeight: "bold",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                ...customStyles.button,
              }}
            >
              Start creating balance today!
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          display: "flex",
          alignItems: "center",
          padding: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {generalSettings.headshotUrl && (
          <img
            src={generalSettings.headshotUrl}
            alt="Headshot"
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              marginRight: "1rem",
              ...customStyles.headshot,
            }}
          />
        )}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "0.875rem",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word",
              whiteSpace: "normal",
              resize: "none",
              ...customStyles.authorName,
            }}
          >
            {generalSettings.name || "Anirban Roy"}
          </div>
          <div
            style={{
              padding: "0.25rem",
              fontSize: "0.875rem",
              color: "#9ca3af",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              wordBreak: "break-word",
              whiteSpace: "normal",
              resize: "none",
              ...customStyles.authorHandle,
            }}
          >
            {generalSettings.handle || "@anirban00537"}
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          fontSize: "0.75rem",
          padding: "0.25rem",
        }}
      >
        Created by{" "}
        <a
          href="https://buildcarousel.com"
          style={{ color: "white", textDecoration: "underline" }}
        >
          buildcarousel.com
        </a>
      </div>
    </div>
  );
};

export default OutroSliderComponent;
