import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NbMenuService, NbDialogService } from '@nebular/theme';
import { UploadComponent } from '../upload/upload.component';
import { ElectronService } from '../core/services';
import * as coinImg from '../pasta-coin.json';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
  host: { class: 'w-100' }
})
export class UserNavComponent implements OnInit {

  public user: { name?: string, email?: string, tag?: number, avatar?: string, currency?: number, vip?: boolean } = {};

  public coinPath: string = coinImg.data;

  protected contextMenuItems;

  constructor(private authService: AuthService, private nbMenuService: NbMenuService, private dialogService: NbDialogService, private electronService: ElectronService) {

    this.contextMenuItems = [
      {
        title: 'Change avatar',
        click: () => { this.dialogService.open(UploadComponent); }
      },
      {
        title: 'Logout',
        click: () => {
          this.authService.logout();
        }
      },
    ];
  }

  getAvatar(): string {
    return this.authService.getAvatarDataUrl();
  }

  getUsername(): string {
    return this.user.name + "#" + this.pad(this.user.tag)
  }

  pad(num): string {
    let s = "0000" + num;
    return s.substr(s.length - 4);
  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.user = user;
      this.user.avatar = this.getAvatar();
    });



    this.nbMenuService.onItemClick().subscribe((ev) => {
      let item: any = ev.item;
      if (ev.tag === 'user-nav-menu') {
        item.click();
      }
    });
  }



}
