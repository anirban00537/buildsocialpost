import { Theme } from "@/lib/theme";
import React from "react";

interface SlideProps {
  slide: any;
  index: number;
  updateSlide: (index: number, updatedSlide: any) => void;
  deleteSlide: (index: number, updatedSlide: any) => void;
  customStyles?: Theme;
}

const IntroSlideComponent: React.FC<SlideProps> = ({
  slide,
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
        <div style={{ marginBottom: "1rem", width: "100%" }}>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, tagline: e.target.innerText })
            }
            style={{
              width: "100%",
              padding: "0.5rem",
              marginBottom: "0.5rem",
              fontSize: "1.5rem",
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
            {slide.title || "Your Title Here"}
          </div>
          <div
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) =>
              updateSlide(index, { ...slide, paragraph: e.target.innerText })
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
              ...customStyles.paragraph,
            }}
          >
            {slide.paragraph ||
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

export default IntroSlideComponent;
