import * as fromRecipes from './recipe/recipe.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromApp from './app/app.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  recipes: fromRecipes.RecipeState;
  auth: fromAuth.AuthState;
  app: fromApp.AppState;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipes.recipeReducer,
  auth: fromAuth.authReducer,
  app: fromApp.appReducer
};
