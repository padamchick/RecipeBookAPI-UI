import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './old-recipe.model';
import {Store} from '@ngrx/store';
import * as RecipesActions from '../../../store/recipe/recipe.actions';
import * as fromApp from '../../../store/app.reducer';
import {of} from 'rxjs';
import {first, map, switchMap} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';

@Injectable({providedIn: 'root'})
export class OldRecipesResolverService implements Resolve<{ recipes: Recipe[] }> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      first(),
      // map(recipesState => recipesState.recipes),
      switchMap(({recipes}) => {
        if(recipes.length === 0) {
          this.store.dispatch(RecipesActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipesActions.fetchRecipesSuccess),
            first()
          );
        } else {
          return of({recipes})
        }
      })
    )
  }
}
