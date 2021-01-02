import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import { AuthService } from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as RecipesActions from './store/recipe.actions'
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {}

  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): Recipe[] | import('rxjs').Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();


    if (recipes.length === 0) {
      console.log('Resolver before');
      this.store.dispatch(RecipesActions.fetchRecipes());
      console.log('Resolver after');
      return this.dataStorageService.fetchData();
    } else {
      return recipes;
    }

  }
}
