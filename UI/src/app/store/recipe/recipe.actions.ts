import {createAction, props} from '@ngrx/store';
import {Recipe} from '../../main-container/container/old-recipes/old-recipe.model';

export const addRecipe = createAction('[Recipe] Add Recipe', props<{ recipe: Recipe }>())
export const addRecipeSuccess = createAction('[Recipe] Add Recipe Success', props<{ recipe: Recipe }>());
export const updateRecipe = createAction('[Recipe] Update Recipe', props<{ recipe: Recipe }>());
export const updateRecipeSuccess = createAction('[Recipe] Update Recipe Success', props<{ recipe: Recipe }>());
export const deleteRecipe = createAction('[Recipe] Delete Recipe', props<{ index: number, }>())
export const deleteRecipeSuccess = createAction('[Recipe] Delete Recipe Success', props<{ index: number, }>());
export const fetchRecipes = createAction('[Recipe] Fetch Recipes');
export const fetchRecipesSuccess = createAction('[Recipe] Fetch Recipes Success', props<{ recipes: Recipe[] }>())
export const bulkDeleteIngredients = createAction('[Recipe] Bulk Delete Ingredients', props<{ ids: number[] }>())
export const bulkDeleteIngredientsSuccess = createAction('[Recipe] Bulk Delete Ingredients Success')
export const selectRecipe = createAction('[Recipe] Select Recipe', props<{id: number}>())
export const unselectRecipe = createAction('[Recipe] Unselect Recipe', props<{id: number}>())
export const selectAllRecipes = createAction('[Recipe] Select All Recipes', props<{category: string}>())
export const unselectAllRecipes = createAction('[Recipe] Unselect All Recipes')
export const bulkDeleteRecipes = createAction('[Recipe] Bulk Delete Recipes', props<{ ids: number[] }>())
export const bulkDeleteRecipesSuccess = createAction('[Recipe] Bulk Delete Recipes Success', props<{ ids: number[] }>())


