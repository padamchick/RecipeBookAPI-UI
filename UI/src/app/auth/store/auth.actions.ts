import {createAction, props} from '@ngrx/store';
import {LoginForm, RegisterForm, User} from '../auth.model';

export const signUp = createAction('[Auth] Log Up', props<{username: string, password: string}>());
export const signUpSuccess = createAction('[Auth] Log Up Success')
export const signUpFail = createAction('[Auth] Log Up Fail');
export const logIn = createAction('[Auth] Log In', props<{username: string, password: string}>());
export const logInSuccess = createAction('[Auth] Log In Success', props<{username: string, token: string, expirationDate: Date, redirect: boolean}>());
export const logInFail = createAction('[Auth] Log In Fail');
export const logOut = createAction('[Auth] Log Out');
export const autoLogIn = createAction('[Auth] Auto Log In');

