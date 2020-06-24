import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: { name?: string, email: string, password: string } = { email: null, password: null, name: null };

  constructor(private authService: AuthService, public dialogRef: NbDialogRef<LoginComponent>) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user.email, this.user.password).then(() => {
      this.dialogRef.close();
    });
  }

  signUp() {
    this.authService.signup(this.user.name, this.user.email, this.user.password).then(() => {
      this.dialogRef.close();
    });
  }

}
