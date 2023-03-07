import { ActivatedRoute } from '@angular/router';
import { RecipeService } from './../shared/recipe-service';
import { RecipeListItem } from './../shared/recipe-list-item';
import { Component, OnInit } from '@angular/core';

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rs.getRecipeList()
      .then(list => {
        this.randomrecipes = list.sort(() => Math.random() - 0.5).slice(0, 3);
      })
      .catch(err => console.error(err));
    this.rs.getRecipeList()
      .then(list => {
        list = list.sort((a, b) => a.avgrating - b.avgrating);
        this.toprecipes = list.slice(0, 3);
      })
      .catch(err => console.error(err))
  }

  getLang(recipe: RecipeListItem) {
    if (!this.route.snapshot.params['lang']) {
      if (recipe.languages?.[0]) {
        return recipe.languages?.[0];
      }
    } else {
      return this.route.snapshot.params.lang;
    }
  }

}
