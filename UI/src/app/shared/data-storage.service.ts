import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

import {Recipe} from '../main-container/container/old-recipes/old-recipe.model';
import {OldRecipeService} from '../main-container/container/old-recipes/old-recipe.service';
import {ShoppingListService} from '../main-container/container/shopping-list/shopping-list.service';
import {Ingredient} from './ingredient.model';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: OldRecipeService,
    private shoppingService: ShoppingListService
  ) {
  }

  private apiUrl = environment.apiUrl;

  storeIngredients(ingredients: Ingredient[]) {
    // const ingredients = this.shoppingService.getIngredients();
    this.http
      .post(
        `${this.apiUrl}/shopping-list/from-recipe`,
        ingredients
      )
      .pipe(
        tap(
          (ingredients: Ingredient[]) => {
            this.recipeService.addIngredientsToShoppingList(ingredients);
          }
        )
      )
      .subscribe((response) => {
      });
  }

  updateIngredient(ingredient: Ingredient) {
    this.http
      .put<Ingredient>(`${this.apiUrl}/shopping-list`, ingredient)
      .subscribe((response) => {
      });
  }

  deleteIngredient(dbId: number, arrayId: number) {
    this.http
      .delete(`${this.apiUrl}/shopping-list/` + dbId)
      .pipe(
        tap(
          () => {
            this.shoppingService.deleteIngredient(arrayId);
          }
        )
      )
      .subscribe((response) => {
      });
  }


  addIngredient(ingredient: Ingredient) {
    this.http
      .post<Ingredient>(`${this.apiUrl}/shopping-list`, ingredient)
      .pipe(
        tap((ingredient: Ingredient) => {
          this.shoppingService.addIngredient(ingredient);
        })
      )
      .subscribe((response) => {
      });
  }

  fetchIngredients() {

    return this.http
      .get<Ingredient[]>(
        `${this.apiUrl}/shopping-list`,
      )
      .pipe(
        map((ingredients) => {
          if (!ingredients) {
            return [];
          } else {
            return ingredients;
          }
        }),
        tap((ingredients) => {
          this.shoppingService.setIngredients(ingredients);
        })
      );
  }
}
