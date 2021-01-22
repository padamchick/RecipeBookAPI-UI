import * as fromRecipes from '../main-project-container/project-container/recipes/store/recipe.reducer';
import * as fromAuth from '../main-project-container/project-container/auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  recipes: fromRecipes.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipes.recipeReducer,
  auth: fromAuth.authReducer
};
