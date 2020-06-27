import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, app } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { AppConfig } from '../../../../environments/environment';
import { AppSettings } from '../../../app.settings';
import { NbToastrService, NbToastRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { CustomDialogService } from '../../../custom-dialog.service';




@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  path: typeof path;
  app: typeof app;


  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor(private toastrService: NbToastrService, private customDialogService: CustomDialogService) {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.path = window.require('path');
      this.app = remote.app;



      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      if (!AppConfig.production) {
        this.contextMenu();
      }

      // const toastRef: NbToastRef = this.toastrService.show("");
      // toastRef.close();

      ipcRenderer.send('app_version');

      ipcRenderer.on('app_version', (event, arg) => {
        ipcRenderer.removeAllListeners('app_version');
        console.log('Version ' + arg.version);
      });

      ipcRenderer.on('update_available', this.notifyUpdate);

      ipcRenderer.on('update_downloaded', () => {
        ipcRenderer.removeAllListeners('update_downloaded');
        this.onUpdateReady();
      });

    }
  }

  onUpdateReady() {
    this.customDialogService.waitDialog("Spaghi Store will restart in 5 seconds...");
    setTimeout(this.restartApp, 5000);
  }

  notifyUpdate() {
    ipcRenderer.removeAllListeners('update_available');
    let toast: NbToastRef = this.toastrService.show("Downloading...", "Update available", { icon: "arrow-alt-circle-down", status: "control", duration: 10000, position: NbGlobalPhysicalPosition.BOTTOM_RIGHT });
  }

  restartApp() {
    ipcRenderer.send('restart_app');
  }

  reload() {
    window.location.reload();
  }

  contextMenu() {
    let rightClickPosition = null;

    const menu = new remote.Menu();
    const menuItem = new remote.MenuItem({
      label: 'Inspect Element',
      click: () => {
        remote.getCurrentWindow().webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
      }
    });
    menu.append(menuItem)
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      rightClickPosition = { x: e.x, y: e.y };
      menu.popup();
    }, false);
  }

  saveFile(filename, content) {
    fs.writeFileSync(this.getUserPath(filename), JSON.stringify(content), {
      encoding: 'utf8'
    });
  }
  readFile(filename) {
    try {
      let file = JSON.parse(fs.readFileSync(this.getUserPath(filename), {
        encoding: 'utf8'
      }).toString());
      //console.log(file);
      return file;
    } catch (error) {
      //console.log(error);
      return "";
    }
  }

  deleteFile(filename) {
    fs.unlinkSync(this.getUserPath(filename));
  }

  getUserDirectory() {
    let dir = path.join(this.app.getPath('appData'), AppSettings.APP_NAME);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return dir;
  }

  getUserPath(filename: string) {
    return path.join(this.getUserDirectory(), filename);
  }
}
