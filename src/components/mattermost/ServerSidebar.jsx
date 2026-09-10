import { Box, Divider, IconButton, Tooltip } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { C, LAYOUT } from "../../theme/mattermost";

/**
 * Narrow server rail (IPS / USA teams)
 * Backend: fetchTeams() -> [{id, name, icon}]
 * Props: onTeamSelect, selectedTeam
 */
export default function ServerSidebar() {
  return (
    <Box
      sx={{
        width: LAYOUT.serverBarWidth,
        bgcolor: C.serverBg,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        py: 1,
        gap: 1,
        borderRight: `1px solid ${C.border}`,
        flexShrink: 0,
      }}
    >
      <Tooltip title="IPS" placement="right">
        <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: "#1e3a5f", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, border: "2px solid #3d7de8", cursor: "pointer" }}>IPS</Box>
      </Tooltip>
      <Tooltip title="USA" placement="right">
        <Box sx={{ width: 38, height: 38, borderRadius: 2, bgcolor: "#2a3a5a", color: "#cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, cursor: "pointer", "&:hover": { bgcolor: "#34486e" } }}>USA</Box>
      </Tooltip>
      <Divider sx={{ width: 28, borderColor: C.border }} />
      <IconButton aria-label="Add team" sx={{ width: 38, height: 38, borderRadius: 2, border: "1px dashed rgba(255,255,255,0.18)", color: C.textMuted }}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
