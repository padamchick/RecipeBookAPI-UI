import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../../store/app.reducer'
import {Store} from '@ngrx/store';
import {Recipe} from '../../old-recipes/old-recipe.model';
import {NgxMasonryAnimations, NgxMasonryOptions} from 'ngx-masonry';
import {animate, style} from '@angular/animations';
import {ActivatedRoute, Params} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.less']
})
export class RecipesComponent implements OnInit {

  ngOnInit(): void {
  }

}
