import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginFormComponent } from '../login-form/login-form.component';
import { ApiResponse } from '../shared/api-response';
import { Globals } from '../shared/globals';

@Component({
  selector: 'rec-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  error!: string | null;
  form: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    private globals: Globals,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signup() {
    this.error = null;
    let formData = new FormData();
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (username && password) {
      formData.append('cuser', username);
      formData.append('cpass', password);
      this.http.post<ApiResponse>(this.globals.apiurl + '/createuser', formData).subscribe(response => {
        if (response.response_code === 200) {
          formData = new FormData();
          formData.append('user', username);
          formData.append('pass', password);
          this.http.post<ApiResponse>(this.globals.apiurl + '/auth', formData).subscribe(response => {
            if (response.response_code === 200) {
              this.globals.authkey = response.payload;
              this.dialogRef.close();
              this._snackBar.open('Successfully created user!', 'Okay' , { duration: 3000 });
            } else {
              this.error = response.payload;
            }
          }, error => {
            this.error = error.message;
          });
        } else {
          this.error = response.payload;
        }
      }, error => {
        this.error = error.message;
      });
    }
  }
}
