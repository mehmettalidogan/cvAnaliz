const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Güvenlik için true olması önerilir ama basitlik için şimdilik false
      enableRemoteModule: true,
    },
    autoHideMenuBar: true, // Menü çubuğunu gizle
  });

  if (isDev) {
    // Geliştirme modu: Vite sunucusunu bekle (biraz gecikme ekleyebiliriz veya wait-on zaten hallediyor)
    mainWindow.loadURL('http://localhost:5173');
    // mainWindow.webContents.openDevTools(); // Konsolu açmak isterseniz
  } else {
    // Üretim modu
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
