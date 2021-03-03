import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AuthState} from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getCurrentUser = createSelector(selectAuthState, (state: AuthState) => state.user);
export const getAuthState = createSelector(selectAuthState, (state: AuthState) => state);
