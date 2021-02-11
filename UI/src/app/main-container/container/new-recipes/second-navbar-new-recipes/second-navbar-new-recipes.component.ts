import { Component, OnInit } from '@angular/core';
import {NewRecipeService} from '../new-recipe.service';
import {Category} from '../models/category.model';

@Component({
  selector: 'app-second-navbar-new-recipes',
  templateUrl: './second-navbar-new-recipes.component.html',
  styleUrls: ['./second-navbar-new-recipes.component.less']
})
export class SecondNavbarNewRecipesComponent implements OnInit {

  categories: Category[];

  constructor(private recipeService: NewRecipeService) { }

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories
      console.log('Categories', categories)
    });
  }

}
