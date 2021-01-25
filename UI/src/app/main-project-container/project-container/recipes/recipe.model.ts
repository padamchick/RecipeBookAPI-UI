import { Ingredient } from '../../../shared/ingredient.model';
import {Category} from '../new-recipes/models/category.model';

export class Recipe {
  constructor(private id: number,
              private name: string,
              private desc: string,
              private imagePath:string,
              private ingredients: Ingredient[],
              private category: Category) {
  }
}
