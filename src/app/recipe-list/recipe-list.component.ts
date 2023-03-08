import { Globals } from './../shared/globals';
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
    private globals: Globals
  ) { }

  ngOnInit(): void {
    this.search("");
  }

  search(searchTerm: string) {
    this.rec.getRecipeList()
      .then(res => this.recipes = res.filter(value => {
        let res = false;
        value.title.forEach((value, key) => {
          value.toLowerCase().includes(searchTerm) ? res = true : {};
        })
        return res;
      }))
      .catch(err => console.error(err));
  }

}
