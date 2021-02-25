import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import * as fromApp from '../../../../../store/app.reducer';
import * as recipesActions from '../../../old-recipes/store/recipe.actions'
import {Store} from '@ngrx/store';
import {combineLatest, Observable} from 'rxjs';
import {map, filter, startWith, takeUntil} from 'rxjs/operators';
import {Recipe} from '../../../old-recipes/old-recipe.model';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-recipes',
  templateUrl: './top-bar-recipes.component.html',
  styleUrls: ['./top-bar-recipes.component.less']
})
export class TopBarRecipesComponent implements OnInit, OnDestroy {
  @Output() searchCriteria = new EventEmitter<string>();
  @ViewChild('input') searchInput: ElementRef;
  ngUnsubscribe: EventEmitter<any> = new EventEmitter<any>()

  searchWord: string;
  recipes;
  category;
  searchMode: boolean = false;
  selectionMode: boolean = true;

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: NavigationEnd) => {
        this.store.dispatch(recipesActions.unselectAllRecipes());
      });
  }

  ngOnInit(): void {
    combineLatest([
      this.store.select('recipes').pipe(
        map(state => state.selected.length > 0)),
      this.route.params.pipe(
        map(params => params['category']))
    ]).pipe(takeUntil(this.ngUnsubscribe)
    ).subscribe(([isSelectionMode, category]:[boolean, string]) => {
      this.selectionMode = isSelectionMode;
      this.category = category;
    });
  }

  doFilter() {
    this.searchThis();
    this.recipes = this.store.select('recipes')
      .pipe(
        map(state => state.recipes),
        map(recipes => this.filter(recipes)),
      )
  }

  filter(values) {
    return values.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchWord))
  }


  searchThis() {
    this.searchCriteria.emit(this.searchWord)
  }

  switchSearchMode() {
    this.searchMode = !this.searchMode;
  }

  selectAll() {
    this.store.dispatch(recipesActions.selectAllRecipes({category: this.category}));
  }

  unselectAll() {
    this.store.dispatch(recipesActions.unselectAllRecipes());
  }

  ngOnDestroy(): void {
    this.store.dispatch(recipesActions.unselectAllRecipes());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
