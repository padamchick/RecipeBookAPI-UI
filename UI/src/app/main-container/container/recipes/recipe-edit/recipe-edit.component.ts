import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducer';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {combineLatest, Subject} from 'rxjs';
import {RecipeService} from '../recipe.service';
import {Category} from '../models/category.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe = new Recipe(0, '', '', '', [], null);
  categories: Category[] = [];
  selectedValue: string;

  ngUnsubscribe = new Subject();

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params.pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes')
        }),
        map(state => state.recipes.find(recipe => recipe.id === this.id))),
      this.recipeService.getCategories()
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([recipe, categories]:[Recipe, Category[]]) => {
        this.recipe = {...recipe};
        this.categories = categories;
      })
  }

  onSubmit() {

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}
