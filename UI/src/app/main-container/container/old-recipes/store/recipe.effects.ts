import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as recipesActions from './recipe.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {Recipe} from '../old-recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable()
export class RecipeEffects {

  private apiUrl = environment.apiUrl;

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipesActions.fetchRecipes),
      switchMap(() => {
        return this.httpClient.get<Recipe[]>(`${this.apiUrl}/recipes/all`);
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),

      map(recipes => {
        return recipesActions.fetchRecipesSuccess({recipes: recipes});
      })
    ));

  updateRecipe$ = createEffect(() =>
  this.actions$.pipe(
    ofType(recipesActions.updateRecipe),
    switchMap(action => {
      return this.httpClient.put<Recipe>(`${this.apiUrl}/recipes`, action.recipe
      )
    }),
    map(recipe => recipesActions.updateRecipeSuccess({recipe: recipe})),
  ));

  addRecipe$ = createEffect(() =>
  this.actions$.pipe(
    ofType(recipesActions.addRecipe),
    switchMap(action => {
      return this.httpClient.post<Recipe>(`${this.apiUrl}/recipes`, action.recipe)
    }),
    map(recipe => recipesActions.addRecipeSuccess({recipe: recipe}))
  ));

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(recipesActions.deleteRecipe),
      switchMap(action => {
        return this.httpClient.delete<Recipe>(`${this.apiUrl}/recipes/${action.index}`)
      }),
      tap(() => this.router.navigate(['/recipes'])),
      map(recipe => recipesActions.deleteRecipeSuccess({index: recipe.id}))
  ));

  bulkDeleteIngredients$ = createEffect(() =>
  this.actions$.pipe(
    ofType(recipesActions.bulkDeleteIngredients),
    switchMap(({ids})=> {
      return this.httpClient.post(`${this.apiUrl}/recipes/ingredients/bulkDelete`, ids).pipe(
        map(() => recipesActions.bulkDeleteIngredientsSuccess())
      )
    })
  ))

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {
  }
}
