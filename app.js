const { app, globalShortcut, BrowserWindow } = require('electron');
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		}
	});

	mainWindow.loadFile('index.html');
	mainWindow.setFullScreen(true);
}

app.on('ready', () => {
	createWindow();

	globalShortcut.register('Command+Control+Shift+k', () => {
		mainWindow.setFullScreen(!mainWindow.isFullScreen());
	});

	globalShortcut.register('Command+Control+Shift+p', () => {
		mainWindow.webContents.executeJavaScript('togglePlay()');
	});

	globalShortcut.register('Command+Control+Shift+r', () => {
		mainWindow.webContents.executeJavaScript('toggleReverse()');
	});

	globalShortcut.register('Command+Control+Shift+Up', () => {
		mainWindow.webContents.executeJavaScript('adjustSpeed(0.2)');
	});

	globalShortcut.register('Command+Control+Shift+Down', () => {
		mainWindow.webContents.executeJavaScript('adjustSpeed(-0.2)');
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

