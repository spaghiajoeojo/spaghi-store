import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  form: FormGroup;
  userId: number = 1;


  constructor(private formBuilder: FormBuilder, private webService: WebService, protected dialogRef: NbDialogRef<UploadComponent>, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.webService.post(formData, 'api/users/upload/avatar').then(() => {
      this.dialogRef.close();
      this.authService.refresh();
    }).catch((e) => { console.log("error", e) });
  }

}
