import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State} from './auth.reducer';

const selectAuthState = createFeatureSelector<State>('authReducer');

export const getCurrentUser = createSelector(selectAuthState, (state: State) => state.user);
export const getAuthState = createSelector(selectAuthState, (state: State) => state);
