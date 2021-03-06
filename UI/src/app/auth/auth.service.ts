import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import {OldRecipeService} from '../main-container/container/old-recipes/old-recipe.service';
import {AuthResponseData, User} from './auth.model';
import * as fromApp from '../store/app.reducer'
import * as authActions from '../store/auth/auth.actions'
import {Store} from '@ngrx/store';


@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenExpirationTimer: any;

  private readonly USER_DATA_KEY = 'user_data';

  constructor(private http: HttpClient,
              private router: Router,
              private recipeService: OldRecipeService,
              private store: Store<fromApp.AppState>) {}

  signUp(username: string, password: string, confirmPassword: string, email: string) {
    return this.http.post(`${this.apiUrl}/register`, {username, password, confirmPassword, email});
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponseData>(`${this.apiUrl}/authenticate`, {username: username, password: password})
  }


  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(authActions.logOut());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }



  storeUserData(user: User) {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
  }

  storeUserDataInSessionStorage(user: User) {
    sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
  }

  getUserData(): User {
    const userData = JSON.parse(localStorage.getItem(this.USER_DATA_KEY));
    if(userData) {
      return {username: userData.userData, token: userData.token, expirationDate: new Date(userData.expirationDate)}
    }
    return null;
  }

  getUserDataFromSessionStorage(): User {
    const userData = JSON.parse(sessionStorage.getItem(this.USER_DATA_KEY));
    if(userData) {
      return {username: userData.userData, token: userData.token, expirationDate: new Date(userData.expirationDate)}
    }
    return null;
  }

  removeUserData() {
    localStorage.removeItem(this.USER_DATA_KEY);
  }

  removeUserDataFromSessionStorage() {
    sessionStorage.removeItem(this.USER_DATA_KEY);
  }

  isSignedIn() {
    let user: User = this.getUserData();
    if(!user) {
      user = this.getUserDataFromSessionStorage();
      return user != null;
    }
    return true;
  }

  getToken() {
    let user = this.getUserData();
    if(!user) {
      user = this.getUserDataFromSessionStorage();
      return user != null ? user.token : null;
    }
    return user.token;

  }
}
