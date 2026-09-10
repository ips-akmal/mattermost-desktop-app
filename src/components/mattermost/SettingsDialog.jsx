import { useState } from "react";
import { Box, Typography, IconButton, Divider, Dialog, TextField, Button, Chip } from "@mui/material";
import { Close as CloseIcon, NotificationsNone as BellIcon, EditOutlined as EditIcon } from "@mui/icons-material";

/**
 * Settings modal (Notifications / Display / Sidebar / Advanced)
 * Backend: GET/PATCH /users/me/settings
 */
export default function SettingsDialog({ open, onClose, settingsTab, setSettingsTab, settingsData, setSettingsData }) {
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState("");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{ paper: { sx: { width: { xs: "96vw", md: 780 }, height: { xs: "90vh", md: 560 }, maxHeight: "90vh", bgcolor: "#1e293b", borderRadius: 2, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" } } }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2.5, py: 1.6, borderBottom: "1px solid rgba(255,255,255,0.08)", bgcolor: "#162032", flexShrink: 0 }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Settings</Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: "#9aa4b2" }} aria-label="Close"><CloseIcon sx={{ fontSize: 18 }} /></IconButton>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: { xs: "column", sm: "row" }, overflow: "hidden" }}>
        <Box sx={{ width: { xs: "100%", sm: 190 }, bgcolor: "#162032", borderRight: { sm: "1px solid rgba(255,255,255,0.06)" }, borderBottom: { xs: "1px solid rgba(255,255,255,0.06)", sm: "none" }, p: 1, display: "flex", flexDirection: { xs: "row", sm: "column" }, gap: 0.3, overflowX: { xs: "auto", sm: "visible" } }}>
          {[
            { id: "notifications", label: "Notifications", icon: <BellIcon sx={{ fontSize: 16 }} /> },
            { id: "display", label: "Display", icon: <Box sx={{ fontSize: 14 }}>◉</Box> },
            { id: "sidebar", label: "Sidebar", icon: <Box sx={{ fontSize: 12 }}>▭</Box> },
            { id: "advanced", label: "Advanced", icon: <Box sx={{ fontSize: 12 }}>☰</Box> },
          ].map((tab) => (
            <Box key={tab.id} onClick={() => setSettingsTab(tab.id)} role="button" tabIndex={0} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.2, py: 0.7, borderRadius: 1, cursor: "pointer", bgcolor: settingsTab === tab.id ? "rgba(61,125,232,0.16)" : "transparent", color: settingsTab === tab.id ? "#5aa9ff" : "#9aa4b2", fontSize: 13, fontWeight: settingsTab === tab.id ? 600 : 400, whiteSpace: "nowrap" }}>
              {tab.icon} {tab.label}
            </Box>
          ))}
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 1.5, md: 2.5 }, py: 1.5, bgcolor: "#1e293b", "&::-webkit-scrollbar": { width: 6 }, "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(255,255,255,0.12)", borderRadius: 3 } }}>
          {settingsTab === "notifications" ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1, flexWrap: "wrap", gap: 1 }}>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Notifications</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, color: "#5aa9ff", fontSize: 11, cursor: "pointer" }}><Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: "rgba(90,169,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>💡</Box> Learn more about notifications</Box>
              </Box>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mb: 1 }} />
              {[
                { label: "Desktop and mobile notifications", value: settingsData.desktopNotif, key: "desktopNotif" },
                { label: "Desktop notification sounds", value: settingsData.sound, key: "sound" },
                { label: "Email notifications", value: settingsData.emailEnabled ? "Email notifications are enabled" : "Email notifications are not enabled", key: "emailEnabled" },
                { label: "Keywords that trigger notifications", value: settingsData.keywords, key: "keywords" },
              ].map((row) => (
                <Box key={row.label} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", py: 1.6, borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 2 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#e2e8f0" }}>{row.label}</Typography>
                    {editingField === row.key ? (
                      <Box sx={{ mt: 0.6 }}>
                        <TextField size="small" fullWidth value={editValue} onChange={(e) => setEditValue(e.target.value)} sx={{ "& .MuiOutlinedInput-root": { bgcolor: "#0f172a", color: "#fff", fontSize: 12.5 } }} />
                        <Box sx={{ display: "flex", gap: 1, mt: 0.7, flexWrap: "wrap" }}>
                          <Button size="small" variant="contained" onClick={() => { if (row.key === "emailEnabled") setSettingsData((s) => ({ ...s, emailEnabled: editValue.toLowerCase().includes("enable") })); else setSettingsData((s) => ({ ...s, [row.key]: editValue })); setEditingField(null); }} sx={{ textTransform: "none", fontSize: 12 }}>Save</Button>
                          <Button size="small" onClick={() => setEditingField(null)} sx={{ textTransform: "none", fontSize: 12, color: "#9aa4b2" }}>Cancel</Button>
                        </Box>
                      </Box>
                    ) : (
                      <Typography sx={{ fontSize: 12.5, color: "#9aa4b2", mt: 0.2, wordBreak: "break-word" }}>{row.value}</Typography>
                    )}
                  </Box>
                  {editingField !== row.key && (
                    <Box onClick={() => { setEditingField(row.key); setEditValue(row.key === "emailEnabled" ? (settingsData.emailEnabled ? "enabled" : "not enabled") : settingsData[row.key]); }} role="button" tabIndex={0} sx={{ display: "flex", alignItems: "center", gap: 0.3, color: "#5aa9ff", fontSize: 12, cursor: "pointer", flexShrink: 0 }}><EditIcon sx={{ fontSize: 11 }} /> Edit</Box>
                  )}
                </Box>
              ))}
              <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", py: 1.6, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <Box sx={{ flex: 1 }}><Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#e2e8f0" }}>Keywords that get highlighted (without notifications)</Typography><Typography sx={{ fontSize: 12.5, color: "#56647a", mt: 0.2 }}>{settingsData.highlight}</Typography></Box>
                <Chip label="✎ Professional" size="small" sx={{ height: 20, fontSize: 10, fontWeight: 600, bgcolor: "rgba(90,169,255,0.12)", color: "#5aa9ff", borderRadius: 8 }} />
              </Box>
            </>
          ) : (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", textTransform: "capitalize" }}>{settingsTab}</Typography>
              <Typography sx={{ fontSize: 12, color: "#64748b", mt: 0.5 }}>{settingsTab} settings will appear here.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  );
}
