import { Box, Typography, IconButton, InputBase, Paper, Avatar, Divider, Tooltip } from "@mui/material";
import { AttachFile as AttachFileIcon, SentimentSatisfiedAltOutlined as EmojiIcon, Send as SendIcon } from "@mui/icons-material";
import { C } from "../../theme/mattermost";

/**
 * Composer: handles text, mentions, emoji, file attach
 * Backend: onSend -> POST /channels/:id/messages ; onFile -> POST /files
 */
export default function MessageInput({
  value, onChange, onSend, onKeyDown, inputRef, fileRef,
  placeholder, mentionOpen, users, onMentionSelect, showEmojiPicker, setShowEmojiPicker, onAttach,
}) {
  return (
    <Box sx={{ p: { xs: 1, md: 1.2 }, bgcolor: C.channelHeaderBg, borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
      {mentionOpen && (
        <Paper sx={{ mb: 0.8, p: 0.6, borderRadius: 1.5, maxHeight: 160, overflowY: "auto" }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#64748b", px: 1, py: 0.3 }}>MENTION SOMEONE</Typography>
          {users.filter((u) => u.name.toLowerCase().includes(value.slice(value.lastIndexOf("@") + 1).toLowerCase())).map((u) => (
            <Box key={u.id} onClick={() => onMentionSelect(u.name)} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1, py: 0.6, borderRadius: 1, cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" } }}>
              <Avatar sx={{ width: 22, height: 22, fontSize: 11, bgcolor: u.color }}>{u.display[0]}</Avatar>
              <Typography sx={{ fontSize: 12.5, fontWeight: 600 }}>{u.name}</Typography>
              <Typography sx={{ fontSize: 11, color: "#64748b" }}>{u.display}</Typography>
            </Box>
          ))}
        </Paper>
      )}
      <Paper sx={{ display: "flex", alignItems: "flex-end", gap: 0.6, px: 1, py: 0.6, bgcolor: C.inputBg, borderRadius: 2, border: "1px solid rgba(255,255,255,0.08)", boxShadow: "none", "&:focus-within": { borderColor: "rgba(61,125,232,0.5)" } }}>
        <InputBase inputRef={inputRef} value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} multiline maxRows={5} sx={{ flex: 1, fontSize: 13.2, color: C.textPrimary, "& textarea::placeholder": { color: C.textMuted, opacity: 1 } }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2, color: C.textMuted, flexShrink: 0, mb: 0.2 }}>
          <Tooltip title="Formatting help: **bold**, `code`, @mention"><Typography sx={{ fontSize: 11.5, cursor: "pointer", px: 0.5, userSelect: "none", display: { xs: "none", sm: "block" } }}>Aa</Typography></Tooltip>
          <Divider orientation="vertical" flexItem sx={{ mx: 0.4, borderColor: C.border, height: 16, alignSelf: "center", display: { xs: "none", sm: "block" } }} />
          <input ref={fileRef} type="file" hidden onChange={onAttach} />
          <Tooltip title="Attach file"><IconButton size="small" onClick={() => fileRef.current?.click()} sx={{ color: C.textMuted, width: 28, height: 28 }}><AttachFileIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
          <Tooltip title="Emoji"><IconButton size="small" onClick={() => setShowEmojiPicker((v) => !v)} sx={{ color: C.textMuted, width: 28, height: 28 }}><EmojiIcon sx={{ fontSize: 16 }} /></IconButton></Tooltip>
          <Box component="button" onClick={onSend} disabled={!value.trim()} aria-label="Send" style={{ minWidth: 28, width: 28, height: 28, borderRadius: 8, border: "none", background: value.trim() ? C.accent : "#3a455c", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: value.trim() ? "pointer" : "default" }}><SendIcon sx={{ fontSize: 14 }} /></Box>
        </Box>
      </Paper>
      {showEmojiPicker && (
        <Paper sx={{ mt: 0.6, p: 0.8, display: "flex", gap: 0.4, flexWrap: "wrap", borderRadius: 1.5 }}>
          {["😀", "😂", "❤️", "👍", "🎉", "✅", "👀", "🙏", "🔥", "💯", "🤔", "👏"].map((e) => (
            <Box key={e} onClick={() => { onChange({ target: { value: value + e } }); setShowEmojiPicker(false); }} sx={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 1, cursor: "pointer", "&:hover": { bgcolor: "#f1f5f9" }, fontSize: 18 }}>{e}</Box>
          ))}
        </Paper>
      )}
      <Typography sx={{ fontSize: 10, color: C.textMuted, mt: 0.6, px: 0.5, display: { xs: "none", sm: "block" } }}><Box component="span" sx={{ fontWeight: 700 }}>Shift + Enter</Box> for new line · <Box component="span" sx={{ fontWeight: 700 }}>@</Box> to mention · <Box component="span" sx={{ fontWeight: 700 }}>**bold**</Box> · <Box component="span" sx={{ fontWeight: 700 }}>`code`</Box></Typography>
    </Box>
  );
}
