import {Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';

import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription, Observable, combineLatest} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay, takeUntil, tap} from 'rxjs/operators';
import {OldRecipeService} from '../main-container/container/old-recipes/old-recipe.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import * as authActions from '../store/auth/auth.actions';
import * as appActions from '../store/app/app.actions';
import {TranslateService} from '@ngx-translate/core';
import {getCurrentUser} from '../store/auth/auth.selectors';
import {getLang} from '../store/app/app.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  currentLang: string;
  ngUnsubscribe = new EventEmitter()


  // routes = [
  //   {name: 'Authentication', route: '/auth', needAuthentication: false},
  //   {name: 'Recipes', route: '/recipes', needAuthentication: true},
  //   {
  //     name: 'Shopping List',
  //     route: '/shopping-list',
  //     needAuthentication: true,
  //   },
  // ];
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver,
    public recipeService: OldRecipeService,
    private store: Store<AppState>,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    console.log("beofre combineLatest")
    combineLatest([
      this.store.select(getCurrentUser),
      this.store.select(getLang)
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([user, lang]) => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
        this.translate.use(lang);
      this.currentLang = lang;
    });
  }


  onLogout() {
    this.store.dispatch(authActions.logOut());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onToggle(e) {
    this.switchLang(e.value);
    if(this.isAuthenticated) {
      this.store.dispatch(appActions.saveLang({lang: e.value}));
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
