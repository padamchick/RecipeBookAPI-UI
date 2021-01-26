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

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.store.select('auth').pipe(
      take(1),
      map((authState) => {
        if(authState.user != null) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
