import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from './../shared/api-response';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Globals } from '../shared/globals';

@Component({
  selector: 'rec-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {

  error!: string | null;
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

  async login() {
    this.error = null;
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    if (username && password) {
      let ret = await this.globals.login(this.http, this.cookieService, username, password);
      if (ret) {
        this.error = ret;
      } else {
        this.dialogRef.close();
        this._snackBar.open('Successfully logged in!', 'Okay' , { duration: 3000 })
      }
    }
  }

}
