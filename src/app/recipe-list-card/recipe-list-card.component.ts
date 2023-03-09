import { Globals } from './../shared/globals';
import { RecipeListItem } from './../shared/recipe-list-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rec-recipe-list-card',
  templateUrl: './recipe-list-card.component.html',
  styleUrls: ['./recipe-list-card.component.scss']
})
export class RecipeListCardComponent implements OnInit {

  @Input() recipe: RecipeListItem | undefined;

  constructor(
    private globals: Globals
  ) { }

  ngOnInit(): void {

  }

  getLang(recipe: RecipeListItem | undefined) {
    if (!recipe?.languages.includes(this.globals.lang)) {
      if (typeof recipe === 'undefined') {
        return this.globals.lang;
      }
      return recipe.languages?.[0];
    } else {
      return this.globals.lang;
    }
  }
}
