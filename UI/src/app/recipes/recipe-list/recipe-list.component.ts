import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {filter, map} from 'rxjs/operators';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.less']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeSub: Subscription;
  isAdminMode: boolean;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {

  this.recipeSub = this.store.select('recipes').pipe(
    map(recipesState => recipesState.recipes)
  ).subscribe(recipes => this.recipes = recipes);

// sprawdzenie czy wlaczony tryb admina
    this.authService.user.pipe(
      filter(user => !!user && !!user.username)
    ).subscribe(user => {
      user.username === 'guest'
          ? (this.isAdminMode = false)
          : (this.isAdminMode = true);
    })

  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

}
