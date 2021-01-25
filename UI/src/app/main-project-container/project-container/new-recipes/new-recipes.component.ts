import { Component, OnInit } from '@angular/core';
import * as RecipesActions from '../recipes/store/recipe.actions';
import * as fromApp from '../../../store/app.reducer'
import {Store} from '@ngrx/store';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
  styleUrls: ['./new-recipes.component.less']
})
export class NewRecipesComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>,) { }

  ngOnInit(): void {
    this.store.dispatch(RecipesActions.fetchRecipes());
    this.store.select('recipes').subscribe(({recipes}) => this.recipes = recipes);
  }

}
