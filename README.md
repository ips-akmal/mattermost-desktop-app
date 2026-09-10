# Mattermost Desktop App — Professional Clone

Electron + React desktop client that replicates Mattermost UI (IPS-USA/IPS-UNI) with full messaging functionalities, modular architecture and responsive layout for backend integration.

![React](https://img.shields.io/badge/React-19-61DAFB) ![MUI](https://img.shields.io/badge/MUI-9-007FFF) ![Electron](https://img.shields.io/badge/Electron-44-47848F) ![Vite](https://img.shields.io/badge/Vite-8-646CFF)

**Live:** `npm run dev` → `http://localhost:5173/#/login` → Login → `/#/home`  
**Repo:** `https://github.com/ips-akmal/mattermost-desktop-app`

---

## Features
- **Layout:** Tab bar (IPS-USA/IPS-UNI), App header (search Ctrl+K, user menu), Server rail (56px), Channel sidebar (256px), Main chat, Right drawer (Thread/Members/Pinned/Files/Search)
- **Messaging:** send/edit/delete, reactions (👍❤️😂), threads (Follow, reply count), pin/save, markdown (`**bold**`, ``code``, `@mention`), image attachments (credentialing-course, dish), date dividers (Today/February 25)
- **Sidebar:** channels + DMs, unread badges, favorite ★, filters, create channel/DM dialogs
- **Menus:** User status (Online/Away/DND/Offline), Profile modal (Full Name/Username/Nickname/Position/Email/Picture inline edit), Settings modal (Notifications/Display/Sidebar/Advanced)
- **Responsive:** `useMediaQuery(md)` — Drawer temporary on mobile (280px), hide server rail/tips, `100dvh`, `96vw` dialogs, `flexDirection column→row`
- **Router:** `HashRouter` for Electron `file://` (`/#` routes)

---

## Quick Start

```bash
git clone https://github.com/ips-akmal/mattermost-desktop-app.git
cd mattermost-desktop-app
npm install
npm run dev        # Vite + Electron (http://localhost:5173)
npm run build      # production `dist/` (~600kB)
npm run dist       # electron-builder
```

Login is mock — click **Login** or **Skip to Home** → `/#/home` (IPS-FOODO thread open by default). Switch channels/DMs in sidebar, `Shift+Enter` new line, `@` triggers mention dropdown.

---

## Project Structure

```
src/theme/mattermost.js          # C colors, LAYOUT constants
src/data/mockMattermost.js       # USERS, INITIAL_CHANNELS, INITIAL_MESSAGES, THREAD_REPLIES, getUser(), renderMessageHtml()
src/services/mattermostService.js # channelService/messageService/userService — replace delay() with apiClient
src/hooks/useMattermost.js       # central hook (20+ state, useCallback guards, rightSearch vs searchQuery split)
src/components/mattermost/
  ServerSidebar.jsx              # Team rail
  AppHeader.jsx                  # Logo, global search (Ctrl+K), user Menu
  ChannelSidebar.jsx             # Channels + DMs, a11y ListItemButton
  ChannelHeader.jsx              # Favorite, members, actions
  MessageList.jsx                # DM intro header every DM, system, dish/image, replyMeta
  MessageInput.jsx               # Composer
  RightPanel.jsx                 # Drawer persistent/temp
  ProfileDialog.jsx / SettingsDialog.jsx
src/pages/Home/index.jsx         # ~210 LOC orchestrator (was 1558)
electron/main.js                 # BrowserWindow 1400x900, strictPort 5173 fallback 5174
```

---

## Backend Integration

1. **API client** `src/services/apiClient.js`:
```js
import axios from "axios";
export default axios.create({ baseURL: import.meta.env.VITE_API_URL, headers: { Authorization: `Bearer ${localStorage.token}` }});
```
2. Replace `src/services/mattermostService.js` mocks:
```js
// from
async list(){ await delay(); return [...INITIAL_CHANNELS] }
// to
async list(){ return (await apiClient.get("/channels")).data }
```
3. `useMattermost` already guards `prev[channel]||[]`, handles `dm_` ids, clears stale `threadFor` on channel switch — keep guards when moving to React Query:
```js
const { data: messages } = useQuery(["messages", channelId], () => messageService.list(channelId))
```
4. Validation: `channelService.create` checks length 22, unique; `messageService.send` 4000; `userService.updateProfile` email regex.
5. Realtime: add `socket.io-client` → `realtimeService.subscribe(channelId, (msg)=> setMessagesByChannel(...))`
6. Files: `fileRef` currently `onChange={()=>{}}` → `POST /files` multipart → attach URL to `hasImage`.

Schema (migrate to TypeScript):
```ts
type Message = { id:string; channelId:string; userId:string; text:string; time?:string; reactions?:{emoji:string;count:number;me:boolean}[]; replies?:number; pinned?:boolean; saved?:boolean; hasImage?:boolean; hasDishImage?:boolean; divider?:string; replyMeta?:{count:number}; system?:boolean }
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite + wait-on + Electron |
| `npm run build` | `vite build` → `dist/` |
| `npm run preview` | `vite preview` |
| `npm run lint` | ESLint |
| `npm run dist` | `electron-builder` |

---

## Fixes from Audit

- `avatarUrl` → `color`, `u.display?.[0]`, `msgMenu?.id` null guards, `prev[channel]||[]`, `sys` sentinel, XSS escape in `renderMessageHtml`, `searchQuery`/`rightSearch` split, `key={cid-id}`, `100dvh`, Drawer `temporary` on `md`, `slotProps.paper`, inline handlers extracted.

---

## License

Free Edition — internal IPS use.
