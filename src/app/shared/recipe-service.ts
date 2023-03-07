import { RecipeDetailItem } from './recipe-detail-item';
import { RecipeListItem } from './recipe-list-item';
import { ApiResponse } from './api-response';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

const API = "http://localhost:8080";

@Injectable()
export class RecipeService {

  constructor (private http: HttpClient) {}

  async getRecipeList(): Promise<RecipeListItem[]> {
    try {
      const response = await this.http.get<ApiResponse>(API + '/recipelist').toPromise();
      var ret: RecipeListItem[] = new Array();
      if (!Array.isArray(response.payload)) {
        throw new Error("Received unexpected RecipeDetail")
      }

      response.payload.forEach(element => {
        let item: RecipeListItem = new RecipeListItem(0, new Map<string, string>(), '', '', [], new Map<string, string>());

        Object.assign(item, element);
        item.description = new Map();
        item.title = new Map();

        for(let desc of Object.entries((element as RecipeListItem).description.valueOf())) {
          item.description.set(desc[0], desc[1])
        }
        for(let title of Object.entries((element as RecipeListItem).title.valueOf())) {
          item.title.set(title[0], title[1])
        }

        ret.push(item);
      });
      return ret;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getDetail(id: string) {
    try {
      const response = await this.http.get<ApiResponse>(API + '/?getdetail=' + id).toPromise();
      var ret: RecipeDetailItem = new RecipeDetailItem(new Array(), new Map<string, string>(), new Map<string, string>(), new Map<string, string>(), new Map<string, string>(), "");
      if (Array.isArray(response.payload)) {
        throw new Error("Received unexpected RecipeList")
      }

      ret.imagelink = (response.payload as RecipeDetailItem).imagelink;
      for(let lang of Object.entries((response.payload as RecipeDetailItem).languages.valueOf())) {
        ret.languages.push(lang[1])
      }

      for(let title of Object.entries((response.payload as RecipeDetailItem).title.valueOf())) {
        ret.title.set(title[0], title[1])
      }

      for(let recipetext of Object.entries((response.payload as RecipeDetailItem).recipetext.valueOf())) {
        ret.recipetext.set(recipetext[0], recipetext[1])
      }

      for(let ingredients of Object.entries((response.payload as RecipeDetailItem).ingredients.valueOf())) {
        ret.ingredients.set(ingredients[0], ingredients[1])
      }

      for(let tipp of Object.entries((response.payload as RecipeDetailItem).tipptext.valueOf())) {
        ret.tipptext.set(tipp[0], tipp[1])
      }

      /*
      .forEach(element => {
        let item: RecipeListItem = new RecipeListItem(0, new Map<string, string>(), '', '', [], new Map<string, string>());

        Object.assign(item, element);
        item.description = new Map();
        item.title = new Map();

        for(let desc of Object.entries((element as RecipeListItem).description.valueOf())) {
          item.description.set(desc[0], desc[1])
        }
        for(let title of Object.entries((element as RecipeListItem).title.valueOf())) {
          item.title.set(title[0], title[1])
        }

        ret.push(item);
      });
      */
      return ret;
    }  catch (err) {
      console.log(err);
      throw err;
    }
  }
}
