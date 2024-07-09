import React from "react";

interface TextProps {
  content: string;
  onBlur: (event: React.FocusEvent<HTMLDivElement>) => void;
  fontSize: number;
  fontStyle: string;
  fontWeight: string | number;
  alignment: "left" | "center" | "right";
  placeholder: string;
}

const Text: React.FC<TextProps> = ({
  content,
  onBlur,
  fontSize,
  fontStyle,
  fontWeight,
  alignment,
  placeholder,
}) => {
  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onBlur={onBlur}
      style={{
        width: "100%",
        marginBottom: "8px",
        fontSize: `${fontSize}px`,
        fontStyle: fontStyle,
        fontWeight: fontWeight,
        backgroundColor: "transparent",
        border: "none",
        color: "inherit",
        outline: "none",
        wordBreak: "break-word",
        whiteSpace: "normal",
        resize: "none",
        textAlign: alignment,
      }}
    >
      {content || placeholder}
    </div>
  );
};

export default Text;
