import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';


@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  public username: string = "";
  public error: string;
  public success: string;

  // public friends = [{ name: "ciccio", avatar: null, online: true }, { name: "pluto", avatar: null, online: false }]
  public friends = [];

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(): void {
    this.webService.get('api/users/friends').then((data: any) => {
      this.friends = data.friends;
      this.friends.forEach(f => {
        f.avatarUrl = this.webService.getAvatarDataUrl(f.avatar);
      })
      console.log(this.friends);
    });
  }

  search() {
    this.error = null;
    let name = this.username.split("#")[0];
    let tag = this.username.split("#")[1];
    this.webService.post({ name: name, tag: tag }, 'api/users/friendRequest').then((data: any) => {
      //console.log(data);
      this.username = "";
      this.success = data.msg;
      this.getFriends();
    }).catch((err) => {
      //console.log(err);
      this.error = err.error;
    });
  }

  getPlaceholder() {

    let placeholder: string = this.username ? this.username : "username";
    if (this.username.indexOf('#') === -1) {
      placeholder += "#0000"
    } else {
      placeholder += "0".repeat(4 - this.username.split("#")[1].length)
    }
    return placeholder;
  }

  closeWarning() {
    this.error = null;
    this.success = null;
  }

}
