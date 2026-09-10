/**
 * Mattermost theme constants
 * Centralizes colors so backend/frontend teams share the same design tokens.
 * Replace with MUI createTheme when migrating to design system.
 */
export const C = {
  tabBg: "#e5e7eb",
  headerBg: "#0f1e33",
  serverBg: "#0a182e",
  sidebarBg: "#1a2e4d",
  sidebarHover: "rgba(255,255,255,0.08)",
  sidebarActive: "rgba(255,255,255,0.14)",
  mainBg: "#1c1e2a",
  channelHeaderBg: "#1e2333",
  inputBg: "#262938",
  border: "rgba(255,255,255,0.06)",
  textMuted: "#9aa4b2",
  textPrimary: "#e2e8f0",
  link: "#5aa9ff",
  accent: "#3d7de8",
};

export const LAYOUT = {
  serverBarWidth: 56,
  sidebarWidth: 256,
  rightPanelWidth: 360,
  headerHeight: 48,
  tabBarHeight: 34,
};

/**
 * Responsive breakpoints helper
 * Usage: sx={{ width: { xs: "100%", md: LAYOUT.sidebarWidth } }}
 */
export const breakpoints = {
  mobileSidebarHidden: "900px", // md
};
