import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppState} from './app.reducer';

const selectAppState = createFeatureSelector<AppState>('app');

export const getLang = createSelector(selectAppState, state => state.lang)
