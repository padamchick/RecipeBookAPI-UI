import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';



export interface AuthResponseData {
  jwttoken: string;
  username: string;
  expirationDate: string;
  // authorities: string[];
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private apiUrl = environment.apiUrl;
  user = new BehaviorSubject<User>(null);
  isLoading = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private recipeService: RecipeService) {}

  signup(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${this.apiUrl}/register`,
        {
          username: username,
          password: password
        }
      )
      .pipe(catchError(this.handleError));
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `${this.apiUrl}/authenticate`,
        {
          username: username,
          password: password
        }
      )
      .pipe(
        catchError(this.handleError),
        // tap(this.handleAuthentication)
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.jwttoken,
            resData.username,
            resData.expirationDate

            // resData.expirationDate
          );
        })
      );
  }

  private handleAuthentication(
    token: string,
    username: string,
    expDate: string
  ) {
    // aktualna data (w ms) + expiresIn * 1000 (aby tez w ms)
    const expirationDate = new Date(expDate);
    let tokenId = "Bearer " + token;
    const user = new User(username, tokenId, expirationDate);
    this.user.next(user);
    const expirationTime = expirationDate.getTime() - new Date().getTime();
    this.autoLogout(expirationTime);
    localStorage.setItem("userData", JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      username: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.username,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    // console.log(`Token expires in: ${expirationDuration/1000} s`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    this.router.navigate(["/auth"]);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.recipeService.setRecipes([]);
  }



  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occurred!";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    errorMessage = errorResponse.error.error.message;
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct";
        break;
    }
    return throwError(errorMessage);
  }
}
