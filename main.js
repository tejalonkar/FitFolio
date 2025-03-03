const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { nodeIntegration: true }
    });
    win.loadURL("http://localhost:3000"); // Change to file path if needed
}

app.whenReady().then(createWindow);
