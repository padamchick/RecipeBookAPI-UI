import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../../old-recipes/old-recipe.model';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.less']
})
export class RecipeCardComponent implements OnInit {
  @Input() set recipe(recipe) { this._recipe = recipe }

  _recipe: Recipe;
  category: string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
    })


  }

  log() {
    console.log('Recipe', this._recipe)
  }

  onClick(e: MouseEvent) {
    e.stopPropagation();
  }
}
