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
        width: 360,
        maxWidth: "92vw",
        bgcolor: "#1e293b",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        display: "flex",
        flexDirection: "column",
        maxHeight: 380,
      }}
    >
      {/* Search — filters native picker via query prop */}
      <Box sx={{ p: 1, display: "flex", alignItems: "center", gap: 0.7, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.6, bgcolor: "#0f172a", border: "2px solid #3d7de8", borderRadius: 1.5, px: 1, py: 0.4 }}>
          <SearchIcon sx={{ fontSize: 16, color: "#64748b" }} />
          <InputBase value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search emojis" sx={{ flex: 1, fontSize: 13, color: "#e2e8f0", "& input::placeholder": { color: "#64748b", opacity: 1 } }} autoFocus />
        </Box>
        <Box sx={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#facc15" }}>🖐️</Box>
      </Box>

      {/* Library picker — dark theme, full search/categories */}
      <Box sx={{ flex: 1, overflow: "hidden", bgcolor: "#1e293b", "& .EmojiPickerReact": { "--epr-bg-color": "#1e293b", "--epr-text-color": "#e2e8f0", "--epr-search-input-bg-color": "#0f172a", "--epr-category-label-bg-color": "#1e293b", border: "none", width: "100%", height: 280 } }}>
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

      {/* Preview — mirrors screenshot bottom bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.2, py: 0.7, borderTop: "1px solid rgba(255,255,255,0.06)", bgcolor: "#162032", minHeight: 36 }}>
        <Box sx={{ fontSize: 20 }}>{hoverEmoji}</Box>
        <Typography sx={{ fontSize: 12, color: "#cbd5e1", fontFamily: "monospace" }}>{hoverName}</Typography>
      </Box>
    </Paper>
  );
}
