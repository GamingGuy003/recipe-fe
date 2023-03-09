export class RecipeListItem {
  constructor(
    public avgrating: number,
    public ratingcount: number,
    public description: Map<string, string>,
    public id: string,
    public imagelink: string,
    public languages: Array<string>,
    public title: Map<string, string>,
  ) {}
}
