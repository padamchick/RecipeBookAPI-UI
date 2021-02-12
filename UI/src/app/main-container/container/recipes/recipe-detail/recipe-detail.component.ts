import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../store/app.reducer';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes')
      }),
      map(state => state.recipes.find(recipe => recipe.id === this.id))
    )
      .subscribe(recipe => {
      this.recipe = recipe;
    })
  }

}
