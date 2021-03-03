import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RecipeState} from './recipe.reducer';

const selectRecipeState = createFeatureSelector<RecipeState>('recipes')

export const getRecipes = createSelector(selectRecipeState, (state: RecipeState) => state.recipes);
export const getSelectedIds = createSelector(selectRecipeState, (state: RecipeState) => state.selected);
