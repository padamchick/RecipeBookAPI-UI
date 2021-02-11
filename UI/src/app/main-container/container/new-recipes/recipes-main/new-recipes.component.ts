import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromApp from '../../../../store/app.reducer'
import {Store} from '@ngrx/store';
import {Recipe} from '../../recipes/recipe.model';
import {NgxMasonryAnimations, NgxMasonryOptions} from 'ngx-masonry';
import {animate, style} from '@angular/animations';
import {ActivatedRoute, Params} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-new-recipes',
  templateUrl: './new-recipes.component.html',
  styleUrls: ['./new-recipes.component.less']
})
export class NewRecipesComponent implements OnInit {

  ngOnInit(): void {
  }

}
