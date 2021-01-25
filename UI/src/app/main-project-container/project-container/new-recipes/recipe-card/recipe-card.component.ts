import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipes/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.less']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe: Recipe

  constructor() { }

  ngOnInit(): void {
  }

}
