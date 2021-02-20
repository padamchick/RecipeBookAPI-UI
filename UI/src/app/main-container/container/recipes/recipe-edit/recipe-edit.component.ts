import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducer';
import {ActivatedRoute} from '@angular/router';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {combineLatest, Subject} from 'rxjs';
import {RecipeService} from '../recipe.service';
import {Category} from '../models/category.model';
import {Ingredient} from '../../../../shared/ingredient.model';
import {MatDialog} from '@angular/material/dialog';
import {IngredientDialogComponent} from '../../../../shared/dialogs/ingredient-dialog/ingredient-dialog.component';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  recipe: Recipe = new Recipe(0, '', '', '', [], {name: '', iconName: '', urlSuffix: '', sortIndex: null});
  categories: Category[] = [];
  selectedValue: string;

  displayedColumns: string[] = ['name', 'amount', 'unit', 'action'];
  dataSource: MatTableDataSource<Ingredient>;

  ngUnsubscribe = new Subject();
  display: boolean = false;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    combineLatest([
      this.route.params.pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(state => state.recipes.find(recipe => recipe.id === this.id))),
      this.recipeService.getCategories()
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([recipe, categories]: [Recipe, Category[]]) => {
        this.recipe = cloneDeep(recipe);
        this.categories = categories;
        this.dataSource = new MatTableDataSource(this.recipe.ingredients);
      });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  editIngredient(ingredient: Ingredient) {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: {
        width: 300, title: 'Edit ingredient', button1Label: 'Cancel', button2Label: 'Submit', button1Class: 'theme-accent-danger',
        name: ingredient.name, amount: ingredient.amount, unit: ingredient.unit
      }
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result))
      .subscribe(result => {
        ingredient.name = result.name;
        ingredient.amount = result.amount;
        ingredient.unit = result.unit;
      })
  }

  addIngredient() {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: {
        width: 300, title: 'Edit ingredient', button1Label: 'Cancel', button2Label: 'Submit', button1Class: 'theme-accent-danger',
        name: '', amount: null, unit: ''
      }
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result))
      .subscribe(result => {
        this.recipe.ingredients.push(result);
        this.dataSource = new MatTableDataSource<Ingredient>(this.recipe.ingredients)
      })
  }



  // deleteIngredient(element, i) {
  //
  // }


  onSubmit() {

  }

  updateIngredient(e: any) {
    console.log('upd', e);
    this.recipe.ingredients[e.id] = e.ingredient;
    // this.recipe.ingredients = this.recipe.ingredients.map(ing => ing.id === ingredient.id ? ingredient : ing);
    this.dataSource = new MatTableDataSource(this.recipe.ingredients);
  }
}
