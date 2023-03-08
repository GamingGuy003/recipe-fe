import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Globals } from './../shared/globals';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../shared/api-response';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  submitRating() {
    let formData = new FormData();
    formData.append('authkey', this.globals.authkey);
    this.http.post<ApiResponse>(this.globals.apiurl + '/checkauth', formData).toPromise().then(response => {
      if (response.response_code !== 200) {
        this.error = response.payload;
        return;
      }
      if (this.globals.authkey.length > 0) {
        formData = new FormData();
        formData.append('author', this.globals.username);
        formData.append('rating', this.rating.toString());
        formData.append('id', this.route.snapshot.params.id);
        formData.append('authkey', this.globals.authkey)

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
