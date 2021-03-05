import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducer';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {combineLatest, Observable, Observer, of, Subject} from 'rxjs';
import {RecipeService} from '../recipe.service';
import {Category} from '../models/category.model';
import {Ingredient} from '../../../../shared/ingredient.model';
import {MatDialog} from '@angular/material/dialog';
import {IngredientDialogComponent} from '../../../../shared/dialogs/ingredient-dialog/ingredient-dialog.component';
import {cloneDeep, isEqual} from 'lodash';
import * as recipesActions from '../../../../store/recipe/recipe.actions'
import {Actions, ofType} from '@ngrx/effects';
import * as RecipesActions from '../../../../store/recipe/recipe.actions';
import {CanComponentDeactivate} from '../../../../shared/can-deactivate.guard';
import {ConfirmDialogComponent} from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import {getRecipes} from '../../../../store/recipe/recipe.selectors';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.less']
})
export class RecipeEditComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  id: number;
  recipe: Recipe = new Recipe(null, '', '', '', [], {id: null, name: '', iconName: '', urlSuffix: '', sortIndex: null}, null, null, '', null);
  originalRecipe: Recipe;
  categories: Category[] = [];
  editMode: boolean;
  selected;

  displayedColumns: string[] = ['name', 'amount', 'unit', 'action'];
  dataSource: MatTableDataSource<Ingredient> = new MatTableDataSource<Ingredient>();

  ngUnsubscribe = new Subject();

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              public dialog: MatDialog,
              private actions$: Actions) {
  }

  ngOnInit(): void {
    combineLatest([
      this.route.params.pipe(
        map(params => +params['id']),
        switchMap(id => {
          this.id = id;
          this.editMode = !!id;
          return this.store.select(getRecipes);
        }),
        map(recipes => recipes.find(recipe => recipe.id === this.id))),
      this.recipeService.getCategories()
    ]).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(([recipe, categories]: [Recipe, Category[]]) => {
        this.categories = categories;
        if(this.editMode) {
          this.recipe = cloneDeep(recipe);
          this.originalRecipe = recipe;
        } else {
          this.recipe = new Recipe(null, '', '', '', [], this.categories[0], null, null, '', null);
        }

        this.dataSource = new MatTableDataSource(this.recipe.ingredients);
      });
  }

  compareCategories(o1: Category, o2: Category) {
    return o1.name === o2.name;
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
      },
      autoFocus: false
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
        width: 300, title: 'Add ingredient', button1Label: 'Cancel', button2Label: 'Submit', button1Class: 'theme-accent-danger',
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

  deleteIngredient(i: number) {
    this.recipe.ingredients.splice(i, 1);
    this.dataSource = new MatTableDataSource(this.recipe.ingredients);
  }


  onDiscard() {
    this.recipe = cloneDeep(this.originalRecipe);
    this.dataSource = new MatTableDataSource<Ingredient>(this.recipe.ingredients);
  }

  onSave() {
    if(this.editMode) {
      let idsToDelete = this.originalRecipe.ingredients.map(ing => ing.id)
        .filter(id => !this.recipe.ingredients.map(ing => ing.id).includes(id));

      if(idsToDelete.length > 0) {
        this.store.dispatch(recipesActions.bulkDeleteIngredients({ids: idsToDelete}))
      }
      this.store.dispatch(recipesActions.updateRecipe({recipe: this.recipe}))

      this.actions$.pipe(
        ofType(RecipesActions.updateRecipeSuccess),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(() => {
        this.editMode = false;
        this.router.navigate(['../'], {relativeTo: this.route});
      });
    } else {
      this.store.dispatch(recipesActions.addRecipe({recipe: this.recipe}));

      this.actions$.pipe(
        ofType(RecipesActions.addRecipeSuccess),
        takeUntil(this.ngUnsubscribe)
      ).subscribe(({recipe}) => {
        console.log("after dispatch", recipe)
        this.editMode = false;
        this.router.navigate(['../all', recipe.id], {relativeTo: this.route});
      });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.originalRecipe) {
      return true;
    }

    if (isEqual(this.originalRecipe, this.recipe)) {
      return true;
    } else {
      return new Observable((observer: Observer<boolean>) => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            width: 400, title: 'Confirm Exit', button1Label: 'Cancel', button2Label: 'Discard', button2Class: 'theme-accent-dark',
            message: `Are you sure you want to discard all changes?`
          },
          autoFocus: false,
        })
        dialogRef.afterClosed()
          .subscribe(res => {
            observer.next(res);
            observer.complete();
          }, (err) => {
            observer.next(false);
            observer.complete();
          })
      })
    }
  }

  // log(e: any) {
  //   console.log('Select', e);
  //   console.log('This recipe.category', this.recipe.category);
  //   // console.log('selected', this.selected);
  //   // this.recipe.category = e;
  //   // console.log('This recipe.category2', this.recipe.category);
  //
  // }
}
