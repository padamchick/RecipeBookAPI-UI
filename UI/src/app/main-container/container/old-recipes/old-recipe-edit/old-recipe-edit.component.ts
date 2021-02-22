import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../old-recipe.model';
import {Ingredient} from 'src/app/shared/ingredient.model';
import {DataStorageService} from 'src/app/shared/data-storage.service';
import {CanComponentDeactivate} from '../../../../shared/can-deactivate.guard';
import {Observable, Observer, of} from 'rxjs';
import {
  ConfirmationDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {IngredientEditModel, IngredientEditComponent} from 'src/app/shared/ingredient-edit/ingredient-edit.component';
import { filter, map } from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as _ from 'lodash';
import {Actions, ofType} from '@ngrx/effects';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-old-recipe-edit',
  templateUrl: './old-recipe-edit.component.html',
  styleUrls: ['./old-recipe-edit.component.less'],
})
export class OldRecipeEditComponent implements OnInit, CanComponentDeactivate {
  id: number;
  editMode = false;
  recipe: Recipe = {id: 0, name: '', description: '', imagePath: '', ingredients: [], category: null, creationDate: null, kcal: null, preparationTime: '', servings: null};
  originalRecipe: Recipe;
  displayedColumns: string[] = ['name', 'amount', 'unit', 'action'];
  dataSource: MatTableDataSource<Ingredient>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !!params['id'];
      this.initForm();
    });

    this.store.select('recipes').pipe(
      map(recipesState => recipesState.recipes),
      map(recipes => recipes.find((recipe) => recipe && recipe.id === this.recipe.id))
    ).subscribe(recipe => this.originalRecipe = recipe);

    this.dataSource = new MatTableDataSource(this.recipe.ingredients);
  }

  private initForm() {
    if (this.editMode) {
      this.store.select('recipes').pipe(
        map(recipesState => recipesState.recipes.find(recipe => recipe.id === this.id)),
      ).subscribe(recipe => this.recipe = _.cloneDeep(recipe));
    }
  }

  onSubmit() {

    if (this.editMode) {
      let toDelete = this.originalRecipe.ingredients.map(ing => ing.id)
        .filter(id => !this.recipe.ingredients.map(ing => ing.id).includes(id));

      if (toDelete.length > 0) {
        // this.store.dispatch(RecipesActions.updateRecipe({recipe: this.recipe, toDelete: toDelete}));
      } else {
        this.store.dispatch(RecipesActions.updateRecipe({recipe: this.recipe}));
      }

      this.actions$.pipe(
        ofType(RecipesActions.updateRecipeSuccess)
      ).subscribe(() => {
        this.editMode = false;
        this.router.navigate(['../'], {
          relativeTo: this.route,
          queryParamsHandling: 'preserve',
        });
      });


    } else {
      this.store.dispatch(RecipesActions.addRecipe({recipe: this.recipe}));

      this.actions$.pipe(
        ofType(RecipesActions.addRecipeSuccess)
      ).subscribe((recipe) => {
        this.editMode = false;
        this.router.navigate(['../', recipe.recipe.id], {
          relativeTo: this.route,
          queryParamsHandling: 'preserve',
        });
      });
    }
  }

  addIngredient() {
    const dialogData: IngredientEditModel = { title: 'Add Ingredient', name: '', amount: null, unit: '' };
    const dialogRef = this.dialog.open(IngredientEditComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((result) => {
        this.recipe.ingredients.push(result);
        this.dataSource = new MatTableDataSource(this.recipe.ingredients);
      });
  }

  editIngredient(el: Ingredient, i: number) {
    const dialogData: IngredientEditModel = { title: 'Edit Ingredient', name: el.name, amount: el.amount, unit: el.unit };
    const dialogRef = this.dialog.open(IngredientEditComponent, {

      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((result) => {
        el.name = result.name;
        el.amount = result.amount;
        el.unit = result.unit;
      });
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  deleteIngredient(el: Ingredient, i: number) {
    this.recipe.ingredients.splice(i, 1);
    this.dataSource = new MatTableDataSource(this.recipe.ingredients);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.originalRecipe) {
      return true;
    }

    if (_.isEqual(this.originalRecipe, this.recipe)) {
      return true;
    } else {
      // jesli nastapila zmiana w formularzu:
      // return new Observable((observer: Observer<boolean>) => {
        // const message = 'Are you sure you want to discard all changes?';
        const message = this.translate.instant("[Recipes]DiscardDialogText");
        const dialogData = new ConfirmationDialogModel(
          this.translate.instant("[Recipes]DiscardDialogTitle"),
          message,
          this.translate.instant("[Recipes]DiscardDialogDiscardBtn")
        );
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          maxWidth: '400px',
          data: dialogData,
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
          return of(result);
            // observer.next(result);
            // observer.complete();
          },
          () => {
          return of(false);
            // observer.next(false);
            // observer.complete();
          }
        );
      // });
    }
  }
}
