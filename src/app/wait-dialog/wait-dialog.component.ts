import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-dialog',
  templateUrl: './wait-dialog.component.html',
  styleUrls: ['./wait-dialog.component.css']
})
export class WaitDialogComponent implements OnInit {

  public message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
