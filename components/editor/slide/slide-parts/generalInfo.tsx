import React from "react";

interface GeneralInfoProps {
  headshot: string | null;
  name: string;
  handle: string;
  color2: string;
  color4: string;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
  headshot = "images/headshot.png",
  name,
  handle,
  color2,
  color4,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        left: "16px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {headshot && (
        <img
          src={headshot}
          alt="Headshot"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: `2px solid ${color4}`,
          }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: `14px`,
            fontWeight: "600",
            color: color2,
          }}
        >
          {name || "Anirban Roy"}
        </div>
        <div
          style={{
            fontSize: `12px`,
            fontStyle: "italic",
            color: color2,
          }}
        >
          {handle || "@anirban00537"}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
