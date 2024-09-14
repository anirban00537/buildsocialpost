import React from "react";

interface ImageProps {
  imageUrl: string | null;
}

const Image: React.FC<ImageProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexShrink: 1,
        overflow: "hidden",
        borderRadius: "3px",
        padding: "7px",
        width: "auto",
        height: "auto",
        backgroundColor: "rgba(128, 128, 128, 0.7)", // Always visible transparent gray background
      }}
    >
      <img
        src={imageUrl}
        alt="Slide image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderRadius: "3px",
        }}
      />
    </div>
  );
};

export default Image;
