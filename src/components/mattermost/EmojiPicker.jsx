import { useState, useMemo } from "react";
import { Box, Typography, InputBase, Paper, IconButton, Tooltip, Divider } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

const EMOJI_DATA = {
  "RECENTLY USED": ["😂", "👍", "😅", "✅", "❤️", "✨", "👀", "🙏", "🤝"],
  "SMILEYS & EMOTION": [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
    "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬",
    "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
  ],
  "PEOPLE & BODY": ["👍", "👎", "👌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "✋", "🤚", "🖐️", "🖖", "👋", "🤏", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠"],
};

const CATEGORY_ICONS = ["🕒", "😊", "👤", "🐻", "🍔", "⚽", "💡", "🔣", "🚩"];

const EMOJI_NAMES = {
  "😂": ":joy:", "👍": ":thumbsup:", "😅": ":sweat_smile:", "✅": ":white_check_mark:", "❤️": ":heart:", "✨": ":sparkles:", "👀": ":eyes:", "🙏": ":pray:", "🤝": ":handshake:",
  "💀": ":skull_and_crossbones:", "😀": ":grinning:", "😃": ":smiley:", "😄": ":smile:",
};

export default function EmojiPicker({ onSelect, anchor = "composer" }) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("RECENTLY USED");
  const [hoverEmoji, setHoverEmoji] = useState("💀");

  const filtered = useMemo(() => {
    if (!query.trim()) return EMOJI_DATA;
    const q = query.toLowerCase();
    const out = {};
    Object.entries(EMOJI_DATA).forEach(([cat, arr]) => {
      const filteredArr = arr.filter((e) => (EMOJI_NAMES[e] || e).toLowerCase().includes(q));
      if (filteredArr.length) out[cat] = filteredArr;
    });
    return out;
  }, [query]);

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
      {/* Search */}
      <Box sx={{ p: 1, display: "flex", alignItems: "center", gap: 0.7, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 0.6, bgcolor: "#0f172a", border: "2px solid #3d7de8", borderRadius: 1.5, px: 1, py: 0.4 }}>
          <SearchIcon sx={{ fontSize: 16, color: "#64748b" }} />
          <InputBase value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search emojis" sx={{ flex: 1, fontSize: 13, color: "#e2e8f0", "& input::placeholder": { color: "#64748b", opacity: 1 } }} autoFocus />
        </Box>
        <Box sx={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#facc15" }}>🖐️</Box>
      </Box>

      {/* Category bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.2, px: 0.8, py: 0.5, borderBottom: "1px solid rgba(255,255,255,0.06)", overflowX: "auto", "&::-webkit-scrollbar": { height: 0 } }}>
        {CATEGORY_ICONS.map((c, i) => (
          <IconButton key={i} size="small" onClick={() => setActiveCat(Object.keys(EMOJI_DATA)[i] || "RECENTLY USED")} sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: i === 0 ? "rgba(61,125,232,0.18)" : "transparent", color: i === 0 ? "#5aa9ff" : "#9aa4b2", borderBottom: i === 0 ? "2px solid #5aa9ff" : "2px solid transparent", fontSize: 14 }}>{c}</IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Tooltip title="Clear recent"><Box sx={{ fontSize: 12, color: "#64748b", cursor: "pointer" }}>⋯</Box></Tooltip>
      </Box>

      {/* Grid */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 1, py: 0.8, "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.14)", borderRadius: 3 } }}>
        {Object.entries(filtered).map(([cat, emojis]) => (
          <Box key={cat} sx={{ mb: 1.2 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#9aa4b2", letterSpacing: 0.5, mb: 0.6 }}>{cat}</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", gap: 0.3 }}>
              {emojis.map((e) => (
                <Box
                  key={cat + e}
                  onClick={() => onSelect(e)}
                  onMouseEnter={() => setHoverEmoji(e)}
                  sx={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", fontSize: 18, bgcolor: hoverEmoji === e ? "rgba(255,255,255,0.08)" : "transparent", "&:hover": { bgcolor: "rgba(255,255,255,0.08)" } }}
                >
                  {e}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
        {Object.keys(filtered).length === 0 && <Typography sx={{ fontSize: 12, color: "#64748b", textAlign: "center", py: 2 }}>No emojis found for “{query}”</Typography>}
      </Box>

      {/* Preview */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.2, py: 0.7, borderTop: "1px solid rgba(255,255,255,0.06)", bgcolor: "#162032", minHeight: 36 }}>
        <Box sx={{ fontSize: 20 }}>{hoverEmoji}</Box>
        <Typography sx={{ fontSize: 12, color: "#cbd5e1", fontFamily: "monospace" }}>{EMOJI_NAMES[hoverEmoji] || ":emoji:"}</Typography>
      </Box>
    </Paper>
  );
}
