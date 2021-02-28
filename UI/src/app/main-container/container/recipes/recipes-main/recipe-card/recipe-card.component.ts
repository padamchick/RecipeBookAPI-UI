import {Component, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {Recipe} from '../../../old-recipes/old-recipe.model';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../../store/app.reducer';
import * as recipesActions from '../../../old-recipes/store/recipe.actions';
import {map, takeUntil} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.less']
})
export class RecipeCardComponent implements OnInit, OnDestroy {



  @Input() recipe: Recipe;
  @Input() selectionMode: boolean;
  @Input() category: string;
  checked;

  ngUnsubscribe: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.store.select('recipes').pipe(
        map(res => !!res.selected.find(id => id === this.recipe.id)))
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([params, checked]: [any, boolean]) => {
        this.category = params['category'];
        this.checked = checked;
      });
  }

  selectCard() {
    this.store.dispatch(recipesActions.selectRecipe({id: this.recipe.id}));
  }

  unselectCard() {
    this.store.dispatch(recipesActions.unselectRecipe({id: this.recipe.id}));
  }

  toggleCard() {
    if (this.checked) {
      this.unselectCard();
    } else {
      this.selectCard();
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
