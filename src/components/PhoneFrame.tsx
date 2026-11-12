import React from "react";
import { COLORS } from "../styles/tokens";

export const PhoneFrame: React.FC<{
  children: React.ReactNode;
  width?: number;
  height?: number;
  scale?: number;
  translateY?: number;
  translateX?: number;
  glowColor?: string;
  glowOpacity?: number;
}> = ({
  children,
  width = 430,
  height = 890,
  scale = 1,
  translateY = 0,
  translateX = 0,
  glowColor = COLORS.electricBlue,
  glowOpacity = 0.18,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        borderRadius: 52,
        padding: 12,
        backgroundColor: "#1C1E26",
        boxShadow: `
          0 32px 80px rgba(0, 0, 0, 0.42),
          0 0 0 2px #2E3240,
          0 0 64px ${glowColor}${Math.round(glowOpacity * 255)
            .toString(16)
            .padStart(2, "0")}
        `,
        transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        transformOrigin: "center center",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Dynamic Island / Camera Cutout */}
      <div
        style={{
          position: "absolute",
          top: 22,
          left: "50%",
          transform: "translateX(-50%)",
          width: 112,
          height: 26,
          borderRadius: 14,
          backgroundColor: "#090A0D",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 10,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#182238",
            border: "1.5px solid #253559",
          }}
        />
      </div>

      {/* Inner Viewport */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: 40,
          overflow: "hidden",
          backgroundColor: COLORS.canvasGrey,
        }}
      >
        {children}
      </div>
    </div>
  );
};
