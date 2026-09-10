const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendMessage: (message) => {
    ipcRenderer.send("send-message", message);
  },
});