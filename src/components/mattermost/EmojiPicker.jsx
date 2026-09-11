import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import Picker from "emoji-picker-react";

/**
 * Emoji picker — now powered by `emoji-picker-react` (installed via npm)
 * Replaces hardcoded EMOJI_DATA with full library (1500+ emojis, search, categories)
 * Kept Mattermost dark wrapper to match screenshot; `onSelect` receives native emoji char.
 */
export default function EmojiPicker({ onSelect }) {
  const [hoverEmoji, setHoverEmoji] = useState("💀");
  const [hoverName, setHoverName] = useState(":skull_and_crossbones:");

  return (
    <Paper
      sx={{
        width: 320,
        maxWidth: "92vw",
        bgcolor: "#1e293b",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        display: "flex",
        flexDirection: "column",
        maxHeight: 340,
      }}
    >
      {/* Library picker — single search — further decreased headings & emojis */}
      <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "#1e293b", "& .EmojiPickerReact": { "--epr-bg-color": "#1e293b", "--epr-text-color": "#e2e8f0", "--epr-search-input-bg-color": "#0f172a", "--epr-category-label-bg-color": "#1e293b", "--epr-emoji-size": "16px", "--epr-category-label-height": "18px", border: "none", width: "100%", height: 260, "--epr-font-size": "9px", "--epr-category-navigation-button-size": "22px" }, "& .epr-emoji": { fontSize: "15px" }, "& .epr-category-nav": { padding: "2px 4px", gap: "2px" }, "& .epr-category-nav button": { width: "22px", height: "22px" }, "& .epr-category-nav button svg": { width: "14px", height: "14px" }, "& .epr-emoji-category-label": { fontSize: "9px", fontWeight: 600, padding: "2px 8px" } }}>
        <Picker
          onEmojiClick={(emojiData) => {
            onSelect(emojiData.emoji);
            setHoverEmoji(emojiData.emoji);
            setHoverName(`:${emojiData.emoji.replace(/:/g, "")}:`);
          }}
          onReactionClick={(emojiData) => onSelect(emojiData.emoji)}
          autoFocusSearch={false}
          searchDisabled={false}
          theme="dark"
          previewConfig={{ showPreview: false }}
          searchPlaceholder="Search emojis"
          suggestedEmojisMode="recent"
        />
      </Box>

      {/* Preview — smaller text/emoji */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, px: 1, py: 0.5, borderTop: "1px solid rgba(255,255,255,0.06)", bgcolor: "#162032", minHeight: 30 }}>
        <Box sx={{ fontSize: 16 }}>{hoverEmoji}</Box>
        <Typography sx={{ fontSize: 10.5, color: "#cbd5e1", fontFamily: "monospace" }}>{hoverName}</Typography>
      </Box>
    </Paper>
  );
}
