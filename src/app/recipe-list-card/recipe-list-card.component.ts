import { RecipeListItem } from './../shared/recipe-list-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rec-recipe-list-card',
  templateUrl: './recipe-list-card.component.html',
  styleUrls: ['./recipe-list-card.component.scss']
})
export class RecipeListCardComponent implements OnInit {

  @Input() lang: string | undefined;
  @Input() recipe: RecipeListItem | undefined;
  displaylang: string = '';

  constructor() { }

  ngOnInit(): void {
    if (typeof this.lang === 'undefined' || !this.recipe?.languages.includes(this.lang)) {
      if (typeof this.recipe?.languages.entries().next().value[1] !== 'undefined') {
        this.displaylang = this.recipe?.languages.entries().next().value[1];
      }
    } else {
      this.displaylang = this.lang;
    };
  }

}
