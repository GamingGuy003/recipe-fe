import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'rec-rating-dialog',
  templateUrl: './rating-dialog.component.html',
  styleUrls: ['./rating-dialog.component.scss']
})
export class RatingDialogComponent implements OnInit {

  ratings: {key: string, value: number}[] = new Array();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Map<string, number>
 ) { }

 ngOnInit() {
   this.ratings = Array.from(this.data, ([key, value]) => ({ key, value }));
 }

}
