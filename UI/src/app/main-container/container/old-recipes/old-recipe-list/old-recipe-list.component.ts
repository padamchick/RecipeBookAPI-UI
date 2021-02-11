import { Component, OnInit, EventEmitter, Output, OnDestroy, Input } from '@angular/core';
import { Recipe } from '../old-recipe.model';
import { OldRecipeService } from '../old-recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {filter, map} from 'rxjs/operators';
import * as fromApp from '../../../../store/app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-old-recipe-list',
  templateUrl: './old-recipe-list.component.html',
  styleUrls: ['./old-recipe-list.component.less']
})
export class OldRecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  recipeSub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {



  this.recipeSub = this.store.select('recipes').pipe(
    map(recipesState => recipesState.recipes)
  ).subscribe(recipes => this.recipes = recipes);


  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
  }

}
