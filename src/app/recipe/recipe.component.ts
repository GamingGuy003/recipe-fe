import { CookieService } from 'ngx-cookie-service';
import { RatingDialogComponent } from './../rating-dialog/rating-dialog.component';
import { RatingFormComponent } from './../rating-form/rating-form.component';
import { RecipeDetailItem } from './../shared/recipe-detail-item';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/recipe-service';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '../shared/globals';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'rec-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipe!: RecipeDetailItem;

  constructor(
    public dialog: MatDialog,
    private rec: RecipeService,
    private route: ActivatedRoute,
    private globals: Globals,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.rec.getDetail(this.route.snapshot.params.id).then(recipe => {
      this.recipe = recipe;
    })
    .catch(err => console.error(err));
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

  logged() {
    return this.globals.logged(this.cookieService)
  }

  rate() {
    let ref = this.dialog.open(RatingFormComponent);
    ref.afterClosed().subscribe(_ => {
      this.rec.getDetail(this.route.snapshot.params.id).then(recipe => {
        this.recipe = recipe;
      })
      .catch(err => console.error(err));
    })
  }

  showRatings() {
    this.dialog.open(RatingDialogComponent, {data: this.recipe?.ratings})
  }
}
