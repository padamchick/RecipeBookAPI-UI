import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as authActions from '../store/auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthResponseData, LoginForm, RegisterForm, User} from '../auth.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';


@Injectable()
export class AuthEffects {

  TODO
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUp),
      switchMap(({username, password} ) => {
         return this.authService.signUp(username, password).pipe(
           map(res => authActions.signUpSuccess()),
           catchError(err => of(authActions.signUpFail()))
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
      tap(() => console.log('LOG IN')),
      switchMap((form: LoginForm) => {
        return this.authService.login(form.username, form.password).pipe(
          map((res: AuthResponseData) => {
            return authActions.logInSuccess({username: res.username, token: res.jwttoken, expirationDate: new Date(res.expirationDate), redirect: true});
          }),
          catchError(err => of(authActions.logInFail()))
        );
      })
    ));

  authRedirect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logInSuccess),
      tap(({redirect}) =>  {
        console.log('Redirect', redirect);
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
      tap(({username, token, expirationDate}) => {
        const user:User = { username, token, expirationDate };
        this.authService.storeUserData(user);
      })
    ), { dispatch: false }
  )

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
      if (user != null && new Date() < user.expirationDate) {
        return authActions.logInSuccess({username: user.username, token: user.token, expirationDate: user.expirationDate, redirect: false})
      } else {
        return {type: '[Auth] AutoLogin Failed'}
      }
    })
  ))

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logOut),
      tap(() => {
        this.authService.removeUserData();
        this.router.navigate(["/auth"]);
        this.authService.clearLogoutTimer();
      })
    ), { dispatch: false })



  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService) {}

}
