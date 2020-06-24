import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { AppSettings } from './app.settings';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  public token: string;
  private requestOptions;

  auth(user: { name?: string; email: string; password: string; }, path: string) {
    return new Promise((resolve, reject) => {
      this.requestOptions = { observe: 'response' };
      this.post(user, path).then((data: any) => {
        let token = data.headers.get('x-auth-token');
        if (token) {

          this.setToken(token);

          resolve(token);
        } else {
          reject("Can't authenticate");
        }
      });
    });
  }

  constructor(private http: HttpClient) { }

  hasToken(): boolean {
    return (this.requestOptions.headers && this.requestOptions.headers['x-access-token']);
  }

  setToken(token: string) {
    const headerDict = {
      'x-access-token': token,
    }
    this.requestOptions = {
      headers: headerDict,
      observe: 'body'
    };
  }

  removeToken() {
    delete this.requestOptions.headers;
    this.token = null;
  }

  get(...params) {
    let finalUrl: string = [AppSettings.API_ENDPOINT, ...params].join('/');
    return this.http.get(finalUrl, this.requestOptions).toPromise();
  }

  post(body, ...params) {
    let finalUrl: string = [AppSettings.API_ENDPOINT, ...params].join('/');
    return this.http.post(finalUrl, body, this.requestOptions).toPromise();
  }

  getAvatarDataUrl(avatar: { data: Buffer, contentType: string }) {
    let url = ""

    let prefix = "data:" + avatar.contentType + ";base64,"
    url = prefix + Buffer.from(avatar.data).toString('base64');

    return url;

  }

}
