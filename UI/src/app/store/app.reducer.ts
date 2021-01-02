import * as fromRecipes from '../recipes/store/recipe.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  recipes: fromRecipes.recipeReducer
}
