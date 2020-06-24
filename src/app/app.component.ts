import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { NbIconLibraries } from '@nebular/theme';
import * as path from 'path';
import * as logo from './logo.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public logoPath: string;

  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private iconLibraries: NbIconLibraries
  ) {
    this.logoPath = logo.data;

    this.iconLibraries.registerFontPack('font-awesome', { packClass: 'fa', iconClassPrefix: 'fa' });
    this.iconLibraries.setDefaultPack('font-awesome');



    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      //console.log(process.env);
      //console.log('Mode electron');
      //console.log('Electron ipcRenderer', electronService.ipcRenderer);
      //console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      //console.log('Mode web');
    }



  }
}
