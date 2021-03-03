import {Injectable} from '@angular/core';
import * as appActions from './app.actions';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authActions from '../auth/auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {NotifyService} from '../../shared/services/notify.service';
import {AuthService} from '../../auth/auth.service';
import {AccountService} from '../../shared/services/account.service';
import {of} from 'rxjs';

@Injectable()
export class AppEffects {

  saveLang$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.saveLang),
      switchMap(({lang}) => {
        return this.accountService.updateAccount({language: lang}).pipe(
          map(() => appActions.setLang({lang: lang})),
          catchError(() => of(appActions.saveLangError()))
        );
      })
    ));

  saveLangError = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.saveLangError),
      tap(() => {
        this.notify.setLangError();
      })
    ), {dispatch: false});

  setLang$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.setLang)
    ), {dispatch: false});


  constructor(
    private actions$: Actions,
    private notify: NotifyService,
    private accountService: AccountService
  ) {
  }
}
