import {Recipe} from '../../main-container/container/old-recipes/old-recipe.model';
import {Action, createReducer, on} from '@ngrx/store';
import * as recipesActions from './recipe.actions';
import {updateRecipe} from './recipe.actions';

export interface State {
  recipes: Recipe[];
  selected: number[];
}

const initialState: State = {
  recipes: [],
  selected: []
};

const _recipeReducer = createReducer(
  initialState,
  on(recipesActions.addRecipeSuccess,
    (state, action) => ({
      ...state,
      recipes: [...state.recipes, action.recipe]
    })),

  on(recipesActions.updateRecipeSuccess,
    (state, action) => ({
      ...state,
      recipes: state.recipes.map(
        (recipe) => recipe.id === action.recipe.id ? {...action.recipe} : recipe
      )
    })),

  on(recipesActions.deleteRecipeSuccess,
    (state, {index}) => ({
      ...state,
      recipes: state.recipes.filter((recipe) => recipe.id !== index)
    })),

  on(recipesActions.fetchRecipesSuccess,
    (state, {recipes}) => ({
      ...state,
      recipes: [...recipes]
    })),
  on(recipesActions.selectRecipe,
    (state, {id}) => ({
      ...state,
      selected: [...state.selected, id]
    })),
  on(recipesActions.unselectRecipe,
    (state, {id}) => ({
      ...state,
      selected: state.selected.filter(cardId => cardId !== id)
    })),
  on(recipesActions.selectAllRecipes,
    (state, {category}) => {
    if(category==='all') {
      return {
        ...state,
        selected: state.recipes.map(recipe => recipe.id)
      }
    } else {
      const filteredRecipes = state.recipes.filter(recipe => recipe.category.urlSuffix === category);
      return {
        ...state,
        selected: filteredRecipes.map(recipe => recipe.id)
      }
    }}),
  on(recipesActions.unselectAllRecipes,
    (state) => ({
      ...state,
      selected: []
    })),
  on(recipesActions.bulkDeleteRecipesSuccess,
    (state, {ids}) => ({
      ...state,
      recipes: state.recipes.filter(recipe => ids.indexOf(recipe.id) === -1 )
    })),
);

export function recipeReducer(state: State, action: Action) {
  return _recipeReducer(state, action);
}
