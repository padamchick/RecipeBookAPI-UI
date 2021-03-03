import {createAction, props} from '@ngrx/store';

export const saveLang = createAction('[App] Save Lang', props<{lang: string}>())
export const saveLangError = createAction('[App] Save Lang Error')
export const setLang =  createAction('[App] Set Lang', props<{lang: string}>())
