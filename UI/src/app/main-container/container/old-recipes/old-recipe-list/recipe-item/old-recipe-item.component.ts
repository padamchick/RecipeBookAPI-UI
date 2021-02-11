import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../old-recipe.model';
import { OldRecipeService } from '../../old-recipe.service';

@Component({
  selector: 'app-old-recipe-item',
  templateUrl: './old-recipe-item.component.html',
  styleUrls: ['./old-recipe-item.component.less']
})
export class OldRecipeItemComponent {
  @Input() recipe: Recipe;

}
