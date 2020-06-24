import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NbDialogService } from '@nebular/theme';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private dialogService: NbDialogService) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (!user._id) {
        this.dialogService.open(LoginComponent, { closeOnBackdropClick: false });
      }
    });
  }

  ngOnInit(): void {


  }

}
