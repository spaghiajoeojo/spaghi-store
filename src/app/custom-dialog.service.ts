import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

import { WaitDialogComponent } from './wait-dialog/wait-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(private dialogService: NbDialogService) { }

  waitDialog(message: string) {
    this.dialogService.open(WaitDialogComponent, {
      context: {
        message
      },
      closeOnBackdropClick: false
    });
  }
}
