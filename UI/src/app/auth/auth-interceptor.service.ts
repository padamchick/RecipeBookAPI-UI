import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import * as authActions from '../store/auth/auth.actions'
import {getCurrentUser} from '../store/auth/auth.selectors';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<import("@angular/common/http").HttpEvent<any>> {

    return this.store.select(getCurrentUser).pipe(
      take(1),
      exhaustMap((user) => {

        if(!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({

          setHeaders: {
            Authorization: 'Bearer ' + user.token
          }

        })
        return next.handle(modifiedReq);
      })
    );
  }
}
