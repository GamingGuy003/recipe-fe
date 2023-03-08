import { Globals } from './shared/globals';
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
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms'
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListCardComponent } from './recipe-list-card/recipe-list-card.component';
import { HomeComponent } from './home/home.component';
import { NavComponentComponent } from './nav-component/nav-component.component';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeComponent,
    RecipeListCardComponent,
    HomeComponent,
    NavComponentComponent,
    LoginFormComponent
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
    MatButtonToggleModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    RecipeService,
    Globals,
    FormBuilder,
    MatSnackBarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
