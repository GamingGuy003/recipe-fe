import { RecipeComponent } from './../recipe/recipe.component';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from './../shared/globals';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../shared/api-response';
import { RecipeDetailItem } from '../shared/recipe-detail-item';

@Component({
  selector: 'rec-rating-form',
  templateUrl: './rating-form.component.html',
  styleUrls: ['./rating-form.component.scss']
})
export class RatingFormComponent implements OnInit {

  rating = 1;
  error!: string | null;

  constructor(
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<RatingFormComponent>,
    private http: HttpClient,
    private globals: Globals,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  submitRating() {
    let formData = new FormData();
    let authkey = this.globals.getAuthkey(this.cookieService);
    authkey ? formData.append('authkey', authkey) : {};
    this.http.post<ApiResponse>(this.globals.apiurl + '/checkauth', formData).toPromise().then(response => {
      if (response.response_code !== 200) {
        this.error = response.payload;
        return;
      }
      if (this.globals.logged(this.cookieService)) {
        formData = new FormData();

        let uname = this.globals.getUname(this.cookieService);
        let authkey = this.globals.getAuthkey(this.cookieService);
        if (uname && authkey) {
          formData.append('author', uname);
          formData.append('rating', this.rating.toString());
          formData.append('id', this.route.root.firstChild?.snapshot.params.id);
          formData.append('authkey', authkey)
        }

        this.http.post<ApiResponse>(this.globals.apiurl + '/addrating', formData).subscribe(response => {
            if (response.response_code !== 200) {
              this.error = response.payload;
              return;
            }
            this.dialogRef.close();
            this._snackBar.open(response.payload, 'Okay' , { duration: 3000 })
          }
        );
      }
    });
  }
}
