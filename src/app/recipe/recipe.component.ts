import { RecipeDetailItem } from './../shared/recipe-detail-item';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rec-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe: RecipeDetailItem | undefined;
  displaylang: string = '';

  constructor(
    private rec: RecipeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.rec.getDetail(this.route.snapshot.params.id).then(recipe => {
      this.recipe = recipe;
      if (!this.route.snapshot.params['lang']) {
        if (this.recipe?.languages[0]) {
          this.displaylang = this.recipe?.languages[0];
        }
      } else {
        this.displaylang = this.route.snapshot.params.lang;
      }
    })
    .catch(err => console.error(err));
  }

  getRating() {
    return 0
  }

}
