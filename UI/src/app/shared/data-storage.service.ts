import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { map, tap} from "rxjs/operators";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable({ providedIn: "root" })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private shoppingService: ShoppingListService
  ) {}

  saveRecipe(recipe: Recipe) {
    this.http
      .post(
        "http://localhost:8080/recipes",
        recipe
      )
      .pipe(
        tap((recipe: Recipe) => {
          this.recipeService.addRecipe(recipe);
        })
      )
      .subscribe((response) => {
        console.log("POST saveRecipe works");
        console.log(response);
      });
  }

  updateRecipe(recipe: Recipe) {
    this.http
      .put("http://localhost:8080/recipes",
      recipe
      )
      .subscribe((response) => {
        console.log("PUT updateRecipe works");
        console.log(response);
      })
  }

  deleteRecipe(id: number) {
    this.http
    .delete<Recipe>("http://localhost:8080/recipes/"+id)
    .subscribe((response) => {
      console.log("DELETE deleteRecipe works");
        console.log(response);
    })

  }

  fetchData() {

    return this.http
      .get<Recipe[]>(
        "http://localhost:8080/recipes/all",
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              // pobierz wszystkie wlasciwosci recipe
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  storeIngredients(ingredients: Ingredient[]) {
    // const ingredients = this.shoppingService.getIngredients();
    this.http
      .post(
        "http://localhost:8080/shopping-list/from-recipe",
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
        //  console.log(response);
      });
  }

  updateIngredient(ingredient: Ingredient) {
    this.http
      .put<Ingredient>("http://localhost:8080/shopping-list", ingredient)
      .subscribe((response) => {
      });
  }

  deleteIngredient(dbId: number, arrayId: number) {
    this.http
    .delete("http://localhost:8080/shopping-list/"+dbId)
    .pipe(
      tap(
        () => {
          this.shoppingService.deleteIngredient(arrayId);
        }
      )
    )
    .subscribe((response) => {
    })
  }


  addIngredient(ingredient: Ingredient) {
    this.http
      .post<Ingredient>("http://localhost:8080/shopping-list", ingredient)
      .pipe(
        tap((ingredient: Ingredient) => {
          this.shoppingService.addIngredient(ingredient);
        })
      )
      .subscribe((response) => {})
  }

  fetchIngredients() {

    return this.http
      .get<Ingredient[]>(
        "http://localhost:8080/shopping-list",
      )
      .pipe(
        map((ingredients) => {
          if (!ingredients) {
            return [];
          } else {
            return ingredients
          }
        }),
        tap((ingredients) => {
          this.shoppingService.setIngredients(ingredients);
        })
      );
  }
}
