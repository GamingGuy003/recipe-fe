import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rec-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {

  @Input() rating: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  arr(n: number): any[] {
    return Array(Math.floor(n));
  }

}
