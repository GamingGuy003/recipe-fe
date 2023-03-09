export class RecipeDetailItem {
  constructor (
    public languages: Array<string>,
    public title: Map<string, string>,
    public ingredients: Map<string, string>,
    public recipetext: Map<string, string>,
    public tipptext: Map<string, string>,
    public imagelink: string,
    public ratings: Map<string, number>,
    public avgrating: number,
  ) {}
}
