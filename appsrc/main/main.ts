/// <reference path="../../typings/bundle.d.ts"/>

import {app} from 'electron';
import {ready, execute} from './mainWindow';

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function appReady() {
  return new Promise((resolve, reject) => {
    app.on('ready', () => ready().then(resolve))
  })
}

function handleOpenUri() {
  return new Promise((resolve, reject) => {
    app.on('will-finish-launching', () => {
      // For OSX
      app.on('open-url', (e, url) => {
        e.preventDefault();
        resolve(url)
      })

      // For Windows
      process.argv.forEach(arg => {
        if (/myapp:\/\//.test(arg)) {
          resolve(arg)
        }
      })
    });
  })
}

Promise.all([appReady(), handleOpenUri()]).then(([, uri]) => execute(uri));
