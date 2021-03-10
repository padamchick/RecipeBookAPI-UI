import {Action, createReducer, on} from '@ngrx/store';
import * as appActions from './app.actions'
import {state} from '@angular/animations';

export interface AppState {
    lang: string;
    navbarVisible: boolean;
}

const initialState: AppState = {
    lang: 'en',
    navbarVisible: true
}

const _appReducer = createReducer(
    initialState,
    on(appActions.setLang, (state, {lang}) => ({
        ...state,
        lang: lang
    })),
    on(appActions.hideNavBar, state => ({
        ...state,
        navbarVisible: false
    })),
    on(appActions.showNavBar, state => ({
        ...state,
        navbarVisible: true
    }))
)

export function appReducer(state: AppState, action: Action) {
    return _appReducer(state, action);
}
