import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rec-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() rating: number | undefined;
  full: number = 0;
  half: number = 0;
  empty: number = 5;

  constructor() { }

  ngOnInit(): void {
    this.rating ? this.full = Math.floor(this.rating) : {};
    this.rating ? this.rating % 1 == 0 ? {} : this.half = 1 : {};
    this.empty = this.empty - this.full - this.half;
  }

  toArr(n: number) {
    return new Array(n)
  }


}
