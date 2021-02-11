import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as RecipesActions from './recipe.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {environment} from '../../../../../environments/environment';
import {Recipe} from '../old-recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Injectable()
export class RecipeEffects {

  private apiUrl = environment.apiUrl;

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
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
        return RecipesActions.fetchRecipesSuccess({recipes: recipes});
      })
    ));

  updateRecipe$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipesActions.updateRecipe),
    tap(action => {
      if(action.toDelete) {
        action.toDelete.forEach(id => {
          this.httpClient.delete(`${this.apiUrl}/recipes/ingredients/${id}`)
            .pipe(
              tap(()=> console.log('Deleting', id))
            ).subscribe();
        });
      }
    }),
    switchMap(action => {
      return this.httpClient.put<Recipe>(`${this.apiUrl}/recipes`, action.recipe
      )
    }),
    map(recipe => RecipesActions.updateRecipeSuccess({recipe: recipe})),
  ));

  addRecipe$ = createEffect(() =>
  this.actions$.pipe(
    ofType(RecipesActions.addRecipe),
    switchMap(action => {
      return this.httpClient.post<Recipe>(`${this.apiUrl}/recipes`, action.recipe)
    }),
    map(recipe => RecipesActions.addRecipeSuccess({recipe: recipe}))
  ));

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.deleteRecipe),
      switchMap(action => {
        return this.httpClient.delete<Recipe>(`${this.apiUrl}/recipes/${action.index}`)
      }),
      tap(() => this.router.navigate(['/recipes'])),
      map(recipe => RecipesActions.deleteRecipeSuccess({index: recipe.id}))
  ));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private router: Router
  ) {
  }
}
