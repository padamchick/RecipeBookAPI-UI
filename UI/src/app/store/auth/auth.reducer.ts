import {Action, createReducer, on} from '@ngrx/store';
import * as authActions from './auth.actions';
import {User} from '../../auth/auth.model';

export interface State {
  user: User;
}

const initialState: State = {
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

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
