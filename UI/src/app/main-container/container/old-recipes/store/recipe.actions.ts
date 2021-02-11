import {createAction, props} from '@ngrx/store';
import {Recipe} from '../old-recipe.model';

export const addRecipe = createAction(
  '[Recipe] Add Recipe',
  props<{ recipe: Recipe }>()
)

export const addRecipeSuccess = createAction(
  '[Recipe] Add Recipe Success',
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  '[Recipe] Update Recipe',
  props<{
    recipe: Recipe,
    toDelete?: number[]
  }>()
);

export const updateRecipeSuccess = createAction(
  '[Recipe] Update Recipe Success',
  props<{ recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[Recipe] Delete Recipe',
  props<{
    index: number,
  }>()
)

export const deleteRecipeSuccess = createAction(
  '[Recipe] Delete Recipe Success',
  props<{
    index: number,
  }>()
);

export const fetchRecipes = createAction(
  '[Recipe] Fetch Recipes'
);

export const fetchRecipesSuccess = createAction(
  '[Recipe] Fetch Recipes Success',
  props<{ recipes: Recipe[] }>()
)
