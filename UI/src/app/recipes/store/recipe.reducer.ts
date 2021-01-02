import {Recipe} from '../recipe.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as RecipesActions from './recipe.actions';
import {updateRecipe} from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

const _recipeReducer = createReducer(
  initialState,
  on(
    RecipesActions.addRecipe,
    (state, action) => ({
      ...state,
      recipes: [...state.recipes, action.recipe]
    })
  ),

  on(
    RecipesActions.updateRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.map(
        (recipe, index) => index === action.index ? {...action.recipe} : recipe
      )
    })
  ),

  on(
    RecipesActions.deleteRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.filter((recipe, index) => index !== action.index)
    })
  ),


);

export function recipeReducer(state: State, action: Action) {
  return _recipeReducer(state, action);
}
