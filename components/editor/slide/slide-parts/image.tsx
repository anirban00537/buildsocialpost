import React from "react";

interface ImageProps {
  imageUrl: string | null;
}

const Image: React.FC<ImageProps> = ({ imageUrl }) => {
  if (!imageUrl) return null;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        flexShrink: 1,
        overflow: "hidden",
      }}
    >
      <img
        src={imageUrl}
        alt="Slide image"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)",
          padding: "8px",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default Image;
