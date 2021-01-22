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
    RecipesActions.addRecipeSuccess,
    (state, action) => ({
      ...state,
      recipes: [...state.recipes, action.recipe]
    })
  ),

  on(
    RecipesActions.updateRecipeSuccess,
    (state, action) => ({
      ...state,
      recipes: state.recipes.map(
        (recipe) => recipe.id === action.recipe.id ? {...action.recipe} : recipe
      )
    })
  ),

  on(
    RecipesActions.deleteRecipeSuccess,
    (state, action) => ({
      ...state,
      recipes: state.recipes.filter((recipe) => recipe.id !== action.index)
    })
  ),

  on(
    RecipesActions.fetchRecipesSuccess,
    (state, action) => ({
      ...state,
      recipes: [...action.recipes]
    })
  )

);

export function recipeReducer(state: State, action: Action) {
  return _recipeReducer(state, action);
}
