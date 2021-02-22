import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Category} from '../models/category.model';

@Component({
  selector: 'app-second-navbar-new-recipes',
  templateUrl: './second-navbar-new-recipes.component.html',
  styleUrls: ['./second-navbar-new-recipes.component.less']
})
export class SecondNavbarNewRecipesComponent implements OnInit {

  categories: Category[];
  font_class = 'icofont-coffee-alt';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe(categories => {
      this.categories = categories
    });
  }

}
