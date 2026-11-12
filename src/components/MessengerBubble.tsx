import React from "react";
import { COLORS } from "../styles/tokens";

export const MessengerBubble: React.FC<{
  senderName: string;
  avatarText?: string;
  message: string;
  timeAgo?: string;
  unread?: boolean;
}> = ({ senderName, avatarText = "C", message, timeAgo = "Just now", unread = true }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 16px",
        backgroundColor: COLORS.canvasWhite,
        borderRadius: 18,
        border: `1px solid ${unread ? COLORS.electricBlue : COLORS.hairlineGrey}`,
        boxShadow: unread
          ? "0 8px 24px rgba(50, 121, 249, 0.12)"
          : "0 2px 8px rgba(0, 0, 0, 0.04)",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: "#3279F9",
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {avatarText}
      </div>

      {/* Message Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontWeight: "600", fontSize: 14, color: COLORS.textPrimary }}>
            {senderName}
          </span>
          <span style={{ fontSize: 11, color: COLORS.textMuted }}>{timeAgo}</span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            lineHeight: "1.4",
            color: unread ? COLORS.textPrimary : COLORS.textSecondary,
            fontWeight: unread ? "500" : "400",
          }}
        >
          {message}
        </p>
      </div>

      {unread && (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: COLORS.electricBlue,
            marginTop: 6,
            flexShrink: 0,
          }}
        />
      )}
    </div>
  );
};
