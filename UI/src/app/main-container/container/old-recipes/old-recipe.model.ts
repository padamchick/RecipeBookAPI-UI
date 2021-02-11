import { Ingredient } from '../../../shared/ingredient.model';
import {Category} from '../recipes/models/category.model';

export class Recipe {
  constructor(public id: number,
              public name: string,
              public description: string,
              public imagePath:string,
              public ingredients: Ingredient[],
              public category: Category) {
  }
}
