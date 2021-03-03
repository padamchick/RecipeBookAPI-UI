import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import * as fromApp from '../../../../../store/app.reducer';
import * as recipesActions from '../../../../../store/store/recipe.actions'
import {Store} from '@ngrx/store';
import {map, filter, takeUntil, first} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-top-bar-recipes',
  templateUrl: './top-bar-recipes.component.html',
  styleUrls: ['./top-bar-recipes.component.less']
})
export class TopBarRecipesComponent implements OnInit, OnDestroy {
  @Input() category;
  @Input() selectionMode: boolean = false;

  @Output() searchCriteria = new EventEmitter<string>();
  @Output('onDelete') onDeleteFn = new EventEmitter();

  @ViewChild('input') searchInput: ElementRef;

  searchWord: string;
  recipes;
  searchMode: boolean = false;

  ngUnsubscribe: EventEmitter<any> = new EventEmitter<any>()

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((event: NavigationEnd) => {
        if(this.selectionMode) {
          this.store.dispatch(recipesActions.unselectAllRecipes());
        }
      });
  }

  ngOnInit(): void {
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
    if(this.searchMode) {
      this.searchWord = '';
      this.searchCriteria.emit('')
    }
    this.searchMode = !this.searchMode;
  }

  selectAll() {
    this.store.dispatch(recipesActions.selectAllRecipes({category: this.category}));
  }

  unselectAll() {
    this.store.dispatch(recipesActions.unselectAllRecipes());
  }

  deleteSelected() {
    this.onDeleteFn.emit();
  }

  ngOnDestroy(): void {
    this.store.dispatch(recipesActions.unselectAllRecipes());
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
