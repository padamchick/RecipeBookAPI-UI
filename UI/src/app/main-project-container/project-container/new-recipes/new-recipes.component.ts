import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../store/app.reducer'
import {Store} from '@ngrx/store';
import {Recipe} from '../recipes/recipe.model';
import {NgxMasonryAnimations, NgxMasonryOptions} from 'ngx-masonry';
import {animate, style} from '@angular/animations';
import {ActivatedRoute, Params} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
  styleUrls: ['./new-recipes.component.less']
})
export class NewRecipesComponent implements OnInit, OnDestroy {

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
  masonryOptions: NgxMasonryOptions = {
    itemSelector: '.masonry-item',
    horizontalOrder: true,
    originLeft: true,
    gutter: 6,
    animations: this.animations,
  };

  ngDestroyed$ = new Subject();

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.store.select('recipes').pipe(takeUntil(this.ngDestroyed$),map(({recipes})=> recipes))
    ]).subscribe((data: [Params, Recipe[]]) => {
      const category = data[0]['category'];
      if(category==='All' || category==null || category ==='') {
        this.recipes = data[1];
      } else {
        this.recipes = data[1].filter(recipe => recipe.category.name === category);
      }
    })
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }

}
