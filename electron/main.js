const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (!app.isPackaged) {
    const tryLoad = (port) => {
      mainWindow.loadURL(`http://localhost:${port}`).catch(() => {
        if (port === 5173) setTimeout(() => tryLoad(5174), 800);
      });
    };
    tryLoad(5173);
    mainWindow.webContents.on("did-fail-load", (_e, _code, _desc, url) => {
      if (url.includes("5173")) setTimeout(() => mainWindow.loadURL("http://localhost:5174").catch(() => {}), 800);
    });
  } else {
    mainWindow.loadFile(
      path.join(__dirname, "../dist/index.html")
    );
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});