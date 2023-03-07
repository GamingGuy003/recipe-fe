import { RecipeListItem } from './../shared/recipe-list-item';
import { RecipeService } from './../shared/recipe-service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rec-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes!: RecipeListItem[];
  lang!: string;

  constructor(
    private rec: RecipeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.snapshot.params.lang !== null ? this.lang = this.route.snapshot.params.lang : {};
    this.rec.getRecipeList()
      .then(res => this.recipes = res)
      .catch(err => console.error(err));
  }

}
