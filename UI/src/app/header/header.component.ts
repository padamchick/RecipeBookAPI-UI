import {Component, OnInit, OnDestroy} from '@angular/core';

import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription, Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay, tap} from 'rxjs/operators';
import {RecipeService} from '../recipes/recipe.service';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  routes = [
    {name: 'Authentication', route: '/auth', needAuthentication: false},
    {name: 'Recipes', route: '/recipes', needAuthentication: true},
    {
      name: 'Shopping List',
      route: '/shopping-list',
      needAuthentication: true,
    },
  ];
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
    public recipeService: RecipeService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.select('auth').pipe(
      map(state => state.user)
    ).subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
  }


  onLogout() {
    this.store.dispatch(authActions.logOut());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
