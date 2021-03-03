import * as fromRecipes from './store/recipe.reducer';
import * as fromAuth from './auth/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  recipes: fromRecipes.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipes.recipeReducer,
  auth: fromAuth.authReducer
};
