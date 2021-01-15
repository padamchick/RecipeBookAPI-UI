import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {Ingredient} from 'src/app/shared/ingredient.model';
import {DataStorageService} from 'src/app/shared/data-storage.service';
import {AuthService} from 'src/app/auth/auth.service';
import {Subscription} from 'rxjs';
import {map, filter, switchMap} from 'rxjs/operators';
import {
  ConfirmationDialogModel,
  ConfirmationDialogComponent,
} from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe(0, '', '', '', []);
  id: number;
  displayedColumns: string[] = ['name', 'amount', 'unit'];
  dataSource: MatTableDataSource<Ingredient>;
  adminModeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataStorageService,
    private authService: AuthService,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {

    this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }),
      map(recipeState => recipeState.recipes.find(recipe => {
        return recipe.id === this.id;
      })),
    ).subscribe((recipe: Recipe) => {
      if (recipe) {
        this.recipe = recipe;
        this.dataSource = new MatTableDataSource(this.recipe.ingredients);
      }
    });

    // sprawdzenie czy wlaczony tryb admina
    // this.authService.user
    //   .pipe(filter((user) => !!user && !!user.username))
    //   .subscribe((user) => {
    //     user.username === 'guest'
    //       ? (this.isAdminMode = false)
    //       : (this.isAdminMode = true);
    //   });
  }

  onAddToShoppingList() {
    this.dataService.storeIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    const message = 'Are you sure you want to delete this recipe?';

    const dialogData = new ConfirmationDialogModel('Confirm Delete', message, 'Delete');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(result => result === true))
      .subscribe(() => {
        this.store.dispatch(RecipesActions.deleteRecipe({index: this.recipe.id}));
      });
  }
}
