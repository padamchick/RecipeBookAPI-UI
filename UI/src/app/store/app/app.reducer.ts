import {Action, createReducer, on} from '@ngrx/store';
import * as appActions from './app.actions'
import {state} from '@angular/animations';

export interface AppState {
  lang: string;
}

const initialState: AppState = {
  lang: 'en'
}

const _appReducer = createReducer(
  initialState,
  on(appActions.setLang, (state, {lang}) => ({
    ...state,
    lang: lang
  }))
)

export function appReducer(state: AppState, action: Action) {
  return _appReducer(state, action);
}
