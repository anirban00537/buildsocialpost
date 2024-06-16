import { Theme } from "@/lib/theme";
import React from "react";

interface SlideProps {
  slide: any;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  customStyles?: Theme;
}

const IntroSlideComponent: React.FC<SlideProps> = ({
  slide,
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
        }}
      >
        <div style={{ marginBottom: "16px", width: "100%" }}>
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
              fontSize: "24px",
              fontStyle: "italic",
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
            {slide.tagline || "Your Tagline Here"}
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
            {slide.title || "Your Title Here"}
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
              "Your introductory paragraph here. Describe your content briefly."}
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

export default IntroSlideComponent;
