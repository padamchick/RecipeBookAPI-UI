import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/app.reducer';
import * as authActions from './store/auth/auth.actions';
import * as appActions from './store/app/app.actions';
import {TranslateService} from '@ngx-translate/core';
import {AccountService} from './shared/services/account.service';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {Actions, ofType} from '@ngrx/effects';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store<AppState>,
              private accountService: AccountService,
              private actions$: Actions,
              public translate: TranslateService) {
    translate.addLangs(['en', 'pl']);
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngUnsubscribe = new EventEmitter();

  ngOnInit(): void {
    this.store.dispatch(authActions.autoLogIn());

    this.actions$.pipe(
      ofType(authActions.logInSuccess),
      switchMap(() => {
        return this.accountService.getMe().pipe(
          filter(account => !!account));
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe(account => {
        if(account.userData.language) {
          this.store.dispatch(appActions.setLang({lang: account.userData.language}));
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
