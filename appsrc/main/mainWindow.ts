import {join} from 'path';
import {app, BrowserWindow} from 'electron';

let mainWindow: Electron.BrowserWindow = null;

export function ready() {
  return new Promise((resolve, reject) => {
    mainWindow = new BrowserWindow({
      width: 480,
      height: 320
    });
    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.loadURL(`file://${join(app.getAppPath(), 'app', 'renderer.html') }`);
    mainWindow.webContents.on('did-finish-load', resolve)
  })
}

export function execute(uri) {
  mainWindow.webContents.executeJavaScript(`handle(${JSON.stringify({ uri }) })`)
}
