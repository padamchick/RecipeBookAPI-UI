import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../../store/app.reducer'
import {Store} from '@ngrx/store';
import {Recipe} from '../recipes/recipe.model';
import {NgxMasonryAnimations, NgxMasonryOptions} from 'ngx-masonry';
import {animate, style} from '@angular/animations';

@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
  styleUrls: ['./new-recipes.component.less']
})
export class NewRecipesComponent implements OnInit {

  recipes: Recipe[] = [];
  animations: NgxMasonryAnimations = {
    show: [
      style({opacity: 0}),
      animate('500ms ease-in', style({opacity: 1})),
    ],
    hide: [
      style({opacity: '*'}),
      animate('500ms ease-in', style({opacity: 0})),
    ]
  }
  public masonryOptions: NgxMasonryOptions = {
    itemSelector: '.masonry-item',
    // horizontalOrder: true,
    // originLeft: true,
    gutter: 6,
    animations: this.animations,
    //  transitionDuration: '0.1s' Too fast sorting switching fix
  };

  updateMasonryLayout;

  constructor(private store: Store<fromApp.AppState>,) { }

  ngOnInit(): void {
    // this.store.dispatch(RecipesActions.fetchRecipes());
    this.store.select('recipes').subscribe(({recipes}) => {
      this.recipes = recipes;
      console.log('Recipes', recipes);
    });
  }

}
