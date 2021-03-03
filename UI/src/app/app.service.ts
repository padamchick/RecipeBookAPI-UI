import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {OldRecipeService} from './main-container/container/old-recipes/old-recipe.service';
import {Store} from '@ngrx/store';
import * as fromApp from './store/app.reducer';

@Injectable({ providedIn: "root" })
export class AppService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private recipeService: OldRecipeService,
              private store: Store<fromApp.AppState>) {
  }



}
