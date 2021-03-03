import {Action, ActionReducer, createReducer, INIT, MetaReducer, on} from '@ngrx/store';
import * as authActions from './auth.actions';
import {User} from '../../auth/auth.model';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

const _authReducer = createReducer(
  initialState,
  on(authActions.logInSuccess,
    (state, action) => ({
      ...state,
      user: { username: action.username, token: action.token, expirationDate: action.expirationDate }
    })),

  on(authActions.logOut,
    (state) => ({
      ...state,
      user: null
    }))
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if ( action != null && action.type === authActions.logOut.type) {
      return reducer( {}, {type: INIT});
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [clearState]
