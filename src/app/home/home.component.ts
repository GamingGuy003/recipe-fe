import { RecipeService } from './../shared/recipe-service';
import { RecipeListItem } from './../shared/recipe-list-item';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../shared/globals';

@Component({
  selector: 'rec-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toprecipes: RecipeListItem[] | undefined;
  randomrecipes: RecipeListItem[] | undefined;

  constructor(
    private rs: RecipeService,
    private globals: Globals,
  ) { }

  ngOnInit(): void {
    this.rs.getRecipeList()
      .then(list => {
        this.randomrecipes = list.sort(() => Math.random() - 0.5).slice(0, 3);
      })
      .catch(err => console.error(err));
    this.rs.getRecipeList()
      .then(list => {
        list = list.sort((a, b) => b.avgrating - a.avgrating);
        this.toprecipes = list.slice(0, 3);
      })
      .catch(err => console.error(err))
  }

  getLang(recipe: RecipeListItem) {
    if (!recipe.languages.includes(this.globals.lang)) {
      return recipe.languages?.[0];
    } else {
      return this.globals.lang;
    }
  }
}
