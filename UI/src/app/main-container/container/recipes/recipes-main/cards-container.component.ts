import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {NgxMasonryAnimations, NgxMasonryOptions} from 'ngx-masonry';
import {animate, style} from '@angular/animations';
import {combineLatest, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import {ActivatedRoute, Params} from '@angular/router';
import {first, map, takeUntil, filter, switchMap} from 'rxjs/operators';
import * as recipesActions from '../../../../store/store/recipe.actions';
import {ConfirmDialogComponent} from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {State} from '../../../../store/store/recipe.reducer';
import {getRecipes, getSelectedIds} from '../../../../store/store/recipe.selectors';

@Component({
  selector: 'app-cards-container',
  templateUrl: './cards-container.component.html',
  styleUrls: ['./cards-container.component.less']
})
export class CardsContainerComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  selectionMode: boolean = false;
  selected: number[];
  category: string;

  animations: NgxMasonryAnimations = {
    show: [
      style({opacity: 0}),
      animate('500ms ease-in', style({opacity: 1})),
    ],
    hide: [
      style({opacity: '*'}),
      animate('500ms ease-in', style({opacity: 0})),
    ]
  };
  masonryOptions: NgxMasonryOptions = {
    itemSelector: '.masonry-item',
    horizontalOrder: true,
    originLeft: true,
    gutter: 6,
    animations: this.animations,
  };

  ngUnsubscribe = new Subject();

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.store.select(getRecipes),
      this.store.select(getSelectedIds)
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([params, recipes, selected]: [Params, Recipe[], number[]]) => {
        this.category = params['category'];
        if (this.category === 'all' || this.category == null || this.category === '') {
          this.recipes = recipes;
        } else {
          this.recipes = recipes.filter(recipe => recipe.category.urlSuffix === this.category);
        }
        this.selected = selected;
        this.selectionMode = selected.length > 0;
      });
  }

  filter(criteriaWord: string) {
    combineLatest([
      this.route.params,
      this.store.select(getRecipes)
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([params, recipes]: [Params, Recipe[]]) => {
        const category = params['category'];
        if (category === 'all') {
          this.recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(criteriaWord.toLowerCase()));
        } else {
          this.recipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(criteriaWord.toLowerCase()) && recipe.category.urlSuffix === category);
        }
      });
  }

  onDeleteSelected() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        width: 400, title: `Delete recipe${this.selected.length > 1 ? 's':''}` , button1Label: 'Cancel', button2Label: 'Delete', button2Class: 'theme-accent-danger',
        message: `Are you sure you want to delete selected recipe${this.selected.length > 1 ? 's':''}?`
      },
      autoFocus: false,

    });
    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(() => this.store.select(getSelectedIds).pipe(
        first()
      )))
      .subscribe(ids => {
        this.store.dispatch(recipesActions.bulkDeleteRecipes({ids}));
        this.store.dispatch(recipesActions.unselectAllRecipes());
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
