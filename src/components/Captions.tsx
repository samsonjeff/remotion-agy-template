import React from "react";
import { COLORS, FONTS } from "../styles/tokens";

export const Captions: React.FC<{
  text: string;
  highlightWords?: string[];
  bottom?: number;
  fontSize?: number;
  /** 0..1 kinetic sweep across words; when omitted all words render at full opacity. */
  progress?: number;
}> = ({
  text,
  highlightWords = [],
  bottom = 60,
  fontSize = 30,
  progress,
}) => {
  if (!text) return null;

  const words = text.split(" ");
  const sweepAt = (idx: number): number => {
    if (progress === undefined) return 1;
    const pos = (idx + 1) / words.length;
    return pos <= progress ? 1 : 0.32;
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 40px",
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(18, 19, 23, 0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 16,
          padding: "14px 28px",
          maxWidth: 1100,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.sans,
            fontSize,
            fontWeight: "600",
            lineHeight: 1.4,
            color: COLORS.canvasWhite,
            letterSpacing: "-0.01em",
          }}
        >
          {words.map((word, idx) => {
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const isHighlighted = highlightWords.some(
              (hw) => hw.toLowerCase() === cleanWord
            );
            const dim = sweepAt(idx);

            return (
              <span
                key={idx}
                style={{
                  color: isHighlighted ? COLORS.electricBlue : COLORS.canvasWhite,
                  textShadow: isHighlighted
                    ? `0 0 12px ${COLORS.electricBlueGlow}`
                    : "none",
                  marginRight: 6,
                  display: "inline-block",
                  opacity: dim,
                }}
              >
                {word}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
