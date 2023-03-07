import { RecipeService } from './shared/recipe-service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListCardComponent } from './recipe-list-card/recipe-list-card.component';
import { HomeComponent } from './home/home.component';
import { NavComponentComponent } from './nav-component/nav-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeComponent,
    RecipeListCardComponent,
    HomeComponent,
    NavComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonToggleModule
  ],
  providers: [
    RecipeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
