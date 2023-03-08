import { RecipeDetailItem } from './../shared/recipe-detail-item';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe-service';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../shared/globals';
import { RecipeListItem } from '../shared/recipe-list-item';

@Component({
  selector: 'rec-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: RecipeDetailItem | undefined;

  constructor(
    private rec: RecipeService,
    private route: ActivatedRoute,
    private globals: Globals,
  ) { }

  ngOnInit(): void {
    this.rec.getDetail(this.route.snapshot.params.id).then(recipe => {
      this.recipe = recipe;
    })
    .catch(err => console.error(err));
  }

  getRating() {
    return 0
  }

  getLang(recipe: RecipeDetailItem | undefined) {
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
