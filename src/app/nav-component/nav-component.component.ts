import { CookieService } from 'ngx-cookie-service';
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
    private _snackBar: MatSnackBar,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.globals.checkApiAuth(this.http, this.cookieService)
      .then(value => {
        !value ? this.globals.reset(this.cookieService) : {};
      })
      .catch(err => console.error(err));
  }

  changeLang(lang: string) {
    this.globals.lang = lang;
  }

  getLang() {
    return this.globals.lang
  }

  checkSearch() {
    return this.router.url !== '/list'
  }

  logged() {
    return this.globals.logged(this.cookieService)
  }

  loginUI() {
    this.dialog.open(LoginFormComponent)
  }

  signUpUI() {
    this.dialog.open(SignUpFormComponent)
  }

  async logoff() {
    await this.globals.logoff(this.http, this.cookieService);
    this._snackBar.open('Successfully logged out!', 'Okay' , { duration: 2000 })
  }
}
