import React from "react";
import { generalSettings, Slide } from "@/types";

interface SlideProps {
  slide: Slide;
  generalSettings: generalSettings;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  customStyles?: {
    container?: React.CSSProperties;
    tagline?: React.CSSProperties;
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
          padding: "32px",
        }}
      >
        <div style={{ marginBottom: "16px", width: "100%", maxWidth: "768px" }}>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, tagline: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              fontSize: "18px",
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              outline: "none",
              wordBreak: "break-word",
              whiteSpace: "normal",
              resize: "none",
              ...customStyles.tagline,
            }}
          >
            {slide.tagline || "Your guide to finding balance in life"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, title: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              fontSize: "36px",
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
              padding: "8px",
              fontSize: "16px",
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
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          display: "flex",
          alignItems: "center",
          padding: "16px",
          marginBottom: "8px",
        }}
      >
        {generalSettings.headshotUrl && (
          <div
            style={{
              position: "absolute",
              bottom: "32px",
              left: "16px",
              display: "flex",
              alignItems: "center",
              gap: "16px", // Use gap for spacing
              padding: "8px",
              borderRadius: "8px",
            }}
          >
            {generalSettings.headshotUrl && (
              <img
                src={generalSettings.headshotUrl}
                alt="Headshot"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  ...customStyles.headshot,
                }}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  ...customStyles.authorName,
                }}
              >
                {generalSettings.name || "Anirban Roy"}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#d1d5db",
                  ...customStyles.authorHandle,
                }}
              >
                {generalSettings.handle || "@anirban00537"}
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          textAlign: "center",
          fontSize: "12px",
          padding: "4px",
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
