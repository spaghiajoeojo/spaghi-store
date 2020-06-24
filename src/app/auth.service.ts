import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { ElectronService } from './core/services/electron/electron.service';
import { NbDialogService } from '@nebular/theme';
import { LoginComponent } from './login/login.component';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private currentUser: { name: string, email: string, tag: Number, avatar: { data: Buffer, contentType: string } }
  userObs: Subject<any>;

  constructor(private webService: WebService, private electronService: ElectronService, private dialogService: NbDialogService) {

    webService.setToken(this.electronService.readFile('token'));

    this.getCurrentUser();

  }

  refresh() {
    this.webService.get('api/users/current').then((data: any) => {
      this.currentUser = data;
      this.userObs.next(data);
    }).catch(() => {
      this.currentUser = null;
      this.userObs.next({});
    });
  }

  getCurrentUser(): Observable<any> {

    if (!this.userObs) {
      let sub = new Subject();
      this.refresh();
      this.userObs = sub;
    }
    return this.userObs;
  }

  getAvatarDataUrl() {
    let url = ""
    if (this.currentUser && this.currentUser.avatar && this.currentUser.avatar.data) {
      let prefix = "data:" + this.currentUser.avatar.contentType + ";base64,"
      url = prefix + Buffer.from(this.currentUser.avatar.data).toString('base64');
    }
    return url;

  }

  signup(name: string, email: string, password: string) {
    return this.webService.auth({ 'name': name, 'email': email, 'password': password }, 'api/users/signup').then(((token: string) => {
      this.saveToken(token);
      this.refresh();
    }));
  }

  login(email: string, password: string) {
    return this.webService.auth({ 'email': email, 'password': password }, 'api/users/login').then(((token: string) => {
      this.saveToken(token);
      this.refresh();
    }));
  }

  saveToken(token: string) {
    this.electronService.saveFile('token', token);
    this.webService.setToken(token);
  }

  logout() {
    this.electronService.deleteFile('token');
    this.webService.removeToken();;
    this.refresh();
  }

  isLoggedIn(): Boolean {
    return !!this.webService.hasToken();
  }
}
