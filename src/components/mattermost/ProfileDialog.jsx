import { useState } from "react";
import { Box, Typography, IconButton, Divider, Dialog, TextField, Button } from "@mui/material";
import { Close as CloseIcon, SettingsOutlined as SettingsIcon, LockOutlined as LockIcon, EditOutlined as EditIcon } from "@mui/icons-material";

/**
 * Profile settings modal (matches screenshot)
 * Backend: PATCH /users/me {fullName, username, ...}
 */
export default function ProfileDialog({ open, onClose, profileTab, setProfileTab, profileData, setProfileData }) {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  const rows = [
    { key: "fullName", label: "Full Name", value: profileData.fullName },
    { key: "username", label: "Username", value: profileData.username },
    { key: "nickname", label: "Nickname", value: profileData.nickname || "Click 'Edit' to add a nickname", isPlaceholder: !profileData.nickname },
    { key: "position", label: "Position", value: profileData.position },
    { key: "email", label: "Email", value: profileData.email },
    { key: "picture", label: "Profile Picture", value: `Image last updated ${profileData.pictureDate}` },
  ];

  const handleSave = (key) => {
    if (key === "fullName") setProfileData((p) => ({ ...p, fullName: editValue || p.fullName }));
    else if (key === "username") setProfileData((p) => ({ ...p, username: editValue || p.username }));
    else if (key === "nickname") setProfileData((p) => ({ ...p, nickname: editValue }));
    else if (key === "position") setProfileData((p) => ({ ...p, position: editValue || p.position }));
    else if (key === "email") {
      if (editValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editValue)) { alert("Invalid email"); return; }
      setProfileData((p) => ({ ...p, email: editValue || p.email }));
    } else if (key === "picture") setProfileData((p) => ({ ...p, pictureDate: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) }));
    setEditingField(null);
  };

  return (
    <Dialog
      open={open}
      onClose={() => { onClose(); setEditingField(null); }}
      maxWidth={false}
      slotProps={{ paper: { sx: { width: { xs: "96vw", md: 780 }, height: { xs: "90vh", md: 520 }, maxHeight: "90vh", bgcolor: "#1e293b", borderRadius: 2, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" } } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.6, borderBottom: "1px solid rgba(255,255,255,0.08)", bgcolor: "#162032", flexShrink: 0 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Profile</Typography>
        <IconButton size="small" onClick={() => { onClose(); setEditingField(null); }} sx={{ color: "#9aa4b2" }} aria-label="Close"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: "column", sm: "row" }, overflow: "hidden" }}>
        <Box sx={{ width: { xs: "100%", sm: 190 }, bgcolor: "#162032", borderRight: { sm: "1px solid rgba(255,255,255,0.06)" }, borderBottom: { xs: "1px solid rgba(255,255,255,0.06)", sm: "none" }, p: 1, display: "flex", flexDirection: { xs: "row", sm: "column" }, gap: 0.5 }}>
          <Box onClick={() => setProfileTab("profile")} role="button" tabIndex={0} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.2, py: 0.7, borderRadius: 1, cursor: "pointer", bgcolor: profileTab === "profile" ? "rgba(61,125,232,0.16)" : "transparent", color: profileTab === "profile" ? "#5aa9ff" : "#9aa4b2", fontSize: 13, fontWeight: profileTab === "profile" ? 600 : 400 }}><SettingsIcon sx={{ fontSize: 16 }} /> Profile Settings</Box>
          <Box onClick={() => setProfileTab("security")} role="button" tabIndex={0} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.2, py: 0.7, borderRadius: 1, cursor: "pointer", bgcolor: profileTab === "security" ? "rgba(61,125,232,0.16)" : "transparent", color: profileTab === "security" ? "#5aa9ff" : "#9aa4b2", fontSize: 13 }}><LockIcon sx={{ fontSize: 16 }} /> Security</Box>
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 1.5, md: 2.5 }, py: 1.5, bgcolor: "#1e293b", "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.12)", borderRadius: 3 } }}>
          {profileTab === "profile" ? (
            <>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#fff", mb: 1 }}>Profile Settings</Typography>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 1.5 }} />
              {rows.map((row) => (
                <Box key={row.key} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1.6, borderBottom: "1px solid rgba(255,255,255,0.06)", flexWrap: { xs: "wrap", md: "nowrap" }, gap: 1 }}>
                  <Box sx={{ flex: 1, minWidth: 0, pr: 2 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#e2e8f0" }}>{row.label}</Typography>
                    {editingField === row.key ? (
                      <Box sx={{ display: "flex", gap: 1, mt: 0.6, flexWrap: "wrap" }}>
                        <TextField size="small" value={editValue} onChange={(e) => setEditValue(e.target.value)} placeholder={row.label} sx={{ flex: 1, minWidth: 140, "& .MuiOutlinedInput-root": { bgcolor: "#0f172a", color: "#fff", fontSize: 12.5 }, "& .MuiInputBase-input": { py: 0.7 } }} autoFocus />
                        <Button size="small" variant="contained" onClick={() => handleSave(row.key)} sx={{ textTransform: "none", fontSize: 12, minWidth: 56 }}>Save</Button>
                        <Button size="small" onClick={() => setEditingField(null)} sx={{ textTransform: "none", fontSize: 12, color: "#9aa4b2" }}>Cancel</Button>
                      </Box>
                    ) : (
                      <Typography sx={{ fontSize: 12.5, color: row.isPlaceholder ? "#64748b" : "#9aa4b2", mt: 0.2, fontStyle: row.isPlaceholder ? "italic" : "normal", wordBreak: "break-all" }}>{row.value}</Typography>
                    )}
                  </Box>
                  {editingField !== row.key && (
                    <Box onClick={() => { setEditingField(row.key); setEditValue(row.key === "picture" ? "" : profileData[row.key] || ""); }} role="button" tabIndex={0} sx={{ display: "flex", alignItems: "center", gap: 0.4, color: "#5aa9ff", fontSize: 12, cursor: "pointer", flexShrink: 0, "&:hover": { textDecoration: "underline" } }}><EditIcon sx={{ fontSize: 12 }} /> Edit</Box>
                  )}
                </Box>
              ))}
            </>
          ) : (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <LockIcon sx={{ fontSize: 36, color: "#475569" }} />
              <Typography sx={{ mt: 1, fontSize: 13, fontWeight: 600, color: "#e2e8f0" }}>Security</Typography>
              <Typography sx={{ fontSize: 12, color: "#9aa4b2", mt: 0.5 }}>Password, sessions and 2FA settings would appear here.</Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1.5, textTransform: "none", color: "#5aa9ff", borderColor: "rgba(90,169,255,0.35)" }}>Change Password</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
