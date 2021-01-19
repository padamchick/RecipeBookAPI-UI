import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authActions from '../store/auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthResponseData,  User} from '../auth.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotifyService} from '../../shared/services/notify.service';


@Injectable()
export class AuthEffects {

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUp),
      switchMap(({username, password} ) => {
         return this.authService.signUp(username, password).pipe(
           map(res => authActions.signUpSuccess()),
           catchError(err => of(authActions.signUpFail({error: err})))
         );
      })
    ));

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUpSuccess),
      tap(() => {
        console.warn("SIGN UP SUCCEEDED");
        // TODO
        // wyswietl toasta
        this.spinner.hide()
      })
    ), {dispatch: false});

  signUpFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUpFail),
      tap(() => {
        console.warn("SIGN UP FAILED");
        // TODO
        // wyswietl toasta
        // zatrzymaj ladowanie
        // wyswietl errory na stronie rejestracji
      })
    ), {dispatch: false});

  logIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logIn),
      switchMap(({username, password, toRemember}) => {
        return this.authService.login(username, password).pipe(
          map((res: AuthResponseData) => {
            return authActions.logInSuccess({username: res.username, token: res.jwttoken, expirationDate: new Date(res.expirationDate), redirect: true, toRemember: toRemember});
          }),
          catchError(err => of(authActions.logInFail({error: err})))
        );
      })
    ));

  handleAuthError = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.logInFail),
    tap(({error}) => {
      this.spinner.hide();
      if(error && error.error) {
        if(error.error.message === 'INVALID_CREDENTIALS') {
          this.notify.badCredentialsError();
        } else {
          this.notify.loginFailError();
        }
      }
    })
  ), {dispatch: false})

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logInSuccess),
      tap(({redirect}) =>  {
        this.spinner.hide()
        if(redirect) {
          this.router.navigate(['/'])
        }
      })
    ), { dispatch: false }
  );

  saveToLocalStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logInSuccess),
      tap(({username, token, expirationDate, toRemember}) => {
        if(toRemember) {
          const user:User = { username, token, expirationDate };
          this.authService.storeUserData(user);
        }
      })
    ), { dispatch: false }
  )

  saveToSessionStorage$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.logInSuccess),
    tap(({username, token, expirationDate, toRemember}) => {
      if(!toRemember) {
        const user:User = { username, token, expirationDate };
        this.authService.storeUserDataInSessionStorage(user);
      }
    })
  ), { dispatch: false })

  setAutoLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logInSuccess),
      tap(user => {
        const expirationTime = user.expirationDate.getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expirationTime);
      })
    ), { dispatch: false }
  )

  autoLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(authActions.autoLogIn),
    map(() => {
      const user = this.authService.getUserData();
      console.log(user)
      if (user != null && new Date() < user.expirationDate) {
        return authActions.logInSuccess({username: user.username, token: user.token, expirationDate: user.expirationDate, redirect: false, toRemember: true})
      } else {
        const userFromSS = this.authService.getUserDataFromSessionStorage();
        console.log(userFromSS)
        if (userFromSS != null && new Date() < userFromSS.expirationDate) {
          console.log(userFromSS != null && new Date() < userFromSS.expirationDate)
          return authActions.logInSuccess({username: userFromSS.username, token: userFromSS.token, expirationDate: userFromSS.expirationDate, redirect: false, toRemember: false})
        }
        return {type: '[Auth] AutoLogin Failed'}
      }
    })
  ))

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logOut),
      tap(() => {
        this.authService.removeUserData();
        this.authService.removeUserDataFromSessionStorage();
        this.router.navigate(["/auth"]);
        this.authService.clearLogoutTimer();
      })
    ), { dispatch: false })



  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private notify: NotifyService) {}

}
