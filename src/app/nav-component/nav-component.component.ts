import { SignUpFormComponent } from './../sign-up-form/sign-up-form.component';
import { ApiResponse } from './../shared/api-response';
import { HttpClient } from '@angular/common/http';
import { LoginFormComponent } from './../login-form/login-form.component';
import { Router } from '@angular/router';
import { Globals } from './../shared/globals';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rec-nav-component',
  templateUrl: './nav-component.component.html',
  styleUrls: ['./nav-component.component.scss']
})
export class NavComponentComponent implements OnInit {

  home: boolean = false;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private globals: Globals,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  changeLang(lang: string) {
    this.globals.lang = lang;
  }

  getLang() {
    return this.globals.lang
  }

  checkHome() {
    return this.router.url === '/home'
  }

  logged() {
    return this.globals.logged()
  }

  loginUI() {
    this.dialog.open(LoginFormComponent)
  }

  signUpUI() {
    this.dialog.open(SignUpFormComponent)
  }

  logoff() {
    let formdata = new FormData();
    formdata.append('authkey', this.globals.authkey)
    this.http.post<ApiResponse>(this.globals.apiurl + '/logoff', formdata).subscribe(response => {
      if (response.response_code === 200) {
        this.globals.authkey = "";
        this.globals.username = "";
        this._snackBar.open('Successfully logged out!', 'Okay' , { duration: 2000 })
      } else {
        console.error(response.payload)
      }
    });
  }
}
