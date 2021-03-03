import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../old-recipes/old-recipe.model';
import {Observable, of} from 'rxjs';
import {AppState} from '../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {first, switchMap} from 'rxjs/operators';
import * as recipesActions from '../../../store/recipe/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';
import {getRecipes} from '../../../store/recipe/recipe.selectors';

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<{recipes: Recipe[]}> {
  constructor(private store: Store<AppState>,
              private actions$: Actions) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ recipes: Recipe[] }> | Promise<{ recipes: Recipe[] }> | { recipes: Recipe[] } {
    return this.store.select(getRecipes).pipe(
      first(),
      switchMap((recipes)=> {
        if (recipes.length === 0) {
          this.store.dispatch(recipesActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(recipesActions.fetchRecipesSuccess),
            first()
          );
        } else {
          return of({recipes});
        }
      })
    );
  }

}
