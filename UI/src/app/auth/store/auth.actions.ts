import {createAction, props} from '@ngrx/store';
import {LoginForm, RegisterForm, User} from '../auth.model';

export const signUp = createAction('[Auth] Log Up', props<{username: string, password: string}>());
export const signUpSuccess = createAction('[Auth] Log Up Success')
export const signUpFail = createAction('[Auth] Log Up Fail', props<{error: any}>());
export const logIn = createAction('[Auth] Log In', props<{username: string, password: string, toRemember: boolean}>());
export const logInSuccess = createAction('[Auth] Log In Success',
  props<{username: string, token: string, expirationDate: Date, redirect: boolean, toRemember: boolean}>());
export const logInFail = createAction('[Auth] Log In Fail', props<{error: any}>());
export const logOut = createAction('[Auth] Log Out');
export const autoLogIn = createAction('[Auth] Auto Log In');

