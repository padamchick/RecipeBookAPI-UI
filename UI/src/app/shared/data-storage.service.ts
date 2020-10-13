import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap, take, exhaustMap } from "rxjs/operators";

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

  updateRecipe(recipesIndex: number, recipe: Recipe) {
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

  storeIngredients() {
    const ingredients = this.shoppingService.getIngredients();
    this.http
      .put(
        "https://course-recipe-book-30496.firebaseio.com/ingredients.json",
        ingredients
      )
      .subscribe((response) => {
        //  console.log(response);
      });
  }

  fetchIngredients() {

    return this.http
      .get<Ingredient[]>(
        "https://course-recipe-book-30496.firebaseio.com/ingredients.json",
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
