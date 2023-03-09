import { CookieService } from 'ngx-cookie-service';
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

  error!: string | undefined;
  form: FormGroup = new FormGroup({});

  constructor(
    private dialogRef: MatDialogRef<LoginFormComponent>,
    private http: HttpClient,
    private fb: FormBuilder,
    private globals: Globals,
    private _snackBar: MatSnackBar,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async signup() {
    let uname = this.form.get('username')?.value;
    let passw = this.form.get('password')?.value;
    if (uname && passw) {
      this.error = await this.globals.signup(this.http, this.cookieService, uname, passw);
      if (!this.error) {
        this.dialogRef.close();
        this._snackBar.open('Successfully created user!', 'Okay' , { duration: 3000 });
      }
    }
  }
}
