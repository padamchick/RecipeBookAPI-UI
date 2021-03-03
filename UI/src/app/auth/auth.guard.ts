import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Injectable} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {getCurrentUser} from '../store/auth/auth.selectors';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.store.select(getCurrentUser).pipe(
      take(1),
      map((currentUser) => {
        if(currentUser != null) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
