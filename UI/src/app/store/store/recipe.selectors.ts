import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './recipe.reducer';

const selectRecipeState = createFeatureSelector<State>('recipeReducer')

export const getRecipes = createSelector(selectRecipeState, (state: State) => state.recipes);
export const getSelectedIds = createSelector(selectRecipeState, (state: State) => state.selected);
