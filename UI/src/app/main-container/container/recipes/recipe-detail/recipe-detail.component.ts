import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducer';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, map, switchMap} from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {Ingredient} from '../../../../shared/ingredient.model';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import * as recipesActions from '../../../../store/store/recipe.actions';
import {getRecipes} from '../../../../store/store/recipe.selectors';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit {
  // recipe: Recipe;
  id: number;
  recipe: Recipe = new Recipe(0, '', '', '', [], null, null, null, '', null);

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select(getRecipes)
      }),
      map(recipes => recipes.find(recipe => recipe.id === this.id))
    )
      .subscribe(recipe => {
      this.recipe = recipe;
    })
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        width: 400, title: 'Delete recipe', button1Label: 'Cancel', button2Label: 'Delete', button2Class: 'theme-accent-danger',
        message: `Are you sure you want to delete ${this.recipe.name}?`
      },
      autoFocus: false,

    })
    dialogRef.afterClosed().pipe(
      filter(res=> !!res))
      .subscribe(res => {
        this.store.dispatch(recipesActions.deleteRecipe({index: this.recipe.id}));
      })
  }
}
