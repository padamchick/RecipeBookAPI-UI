import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import {Observable} from 'rxjs';
import {AppState} from '../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {getCurrentUser} from '../../../store/auth/auth.selectors';

@Injectable({ providedIn: 'root' })
export class OldRoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.store.select(getCurrentUser).pipe(
      // pobierz wartosc tylko raz i od razu odsubscribuj
      take(1),
      map((currentUser) => {
        if (!!currentUser && currentUser.username !== 'guest') {
          return true;
        }
        return this.router.createUrlTree(['../']);
      })
    );
  }
}
