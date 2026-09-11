import { useState } from "react";
import { Box, Typography, InputBase, Paper, IconButton, Tooltip } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import Picker from "emoji-picker-react";

/**
 * Emoji picker — now powered by `emoji-picker-react` (installed via npm)
 * Replaces hardcoded EMOJI_DATA with full library (1500+ emojis, search, categories)
 * Kept Mattermost dark wrapper to match screenshot; `onSelect` receives native emoji char.
 */
export default function EmojiPicker({ onSelect }) {
  const [query, setQuery] = useState("");
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
      {/* Search — filters native picker via query prop */}
      <Box sx={{ p: 0.8, display: "flex", alignItems: "center", gap: 0.6, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.5, bgcolor: "#0f172a", border: "1.5px solid #3d7de8", borderRadius: 1.2, px: 0.8, py: 0.3 }}>
          <SearchIcon sx={{ fontSize: 14, color: "#64748b" }} />
          <InputBase value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search emojis" sx={{ flex: 1, fontSize: 11.5, color: "#e2e8f0", "& input::placeholder": { color: "#64748b", opacity: 1 } }} autoFocus />
        </Box>
        <Box sx={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: "#facc15" }}>🖐️</Box>
      </Box>

      {/* Library picker — dark theme, full search/categories — sizes decreased */}
      <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "#1e293b", "& .EmojiPickerReact": { "--epr-bg-color": "#1e293b", "--epr-text-color": "#e2e8f0", "--epr-search-input-bg-color": "#0f172a", "--epr-category-label-bg-color": "#1e293b", "--epr-emoji-size": "20px", "--epr-category-label-height": "22px", border: "none", width: "100%", height: 240, "--epr-font-size": "11px" }, "& .epr-emoji": { fontSize: "18px" }, "& .epr-category-nav": { padding: "4px" } }}>
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
