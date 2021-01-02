import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions'
import {map, switchMap, tap} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {

  private apiUrl = environment.apiUrl;

  fetchRecipes$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipesActions.fetchRecipes),
    tap(() => {
      console.log('Effect');
    }),
    switchMap(() => {
      return this.httpClient.get<Recipe[]>(`${this.apiUrl}/recipes/all`);
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        }
      })
    }),

    map(recipes => {
      return RecipesActions.setRecipes({ recipes: recipes });
    })
  ));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {
  }
}
