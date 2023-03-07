import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/en/home', pathMatch: 'full' },
  { path: ':lang/list', component: RecipeListComponent },
  { path: ':lang/recipe/:id', component: RecipeComponent },
  { path: ':lang/home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
