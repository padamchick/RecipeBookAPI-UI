import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import * as fromApp from '../../../../../store/app.reducer';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Recipe} from '../../../old-recipes/old-recipe.model';

@Component({
  selector: 'app-top-bar-recipes',
  templateUrl: './top-bar-recipes.component.html',
  styleUrls: ['./top-bar-recipes.component.less']
})
export class TopBarRecipesComponent implements OnInit{
  @Output() searchCriteria = new EventEmitter<string>();
  @ViewChild('input') searchInput: ElementRef;

  searchWord: string;
  recipes;
  searchMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    // this.store.select('recipes')
    //   .subscribe(({recipes}) => {
    //     this.recipeNames = recipes.map(recipe => recipe.name);
    //   }
    // );
    // this.filteredOptions = this.searchInput.nativeElement.valueChanges.pipe(
    //   startWith(''),
    //   map((value: any) => this._filter(value))
    // );
  }

  doFilter() {
    this.searchThis();
    this.recipes = this.store.select('recipes')
      .pipe(
        map(state => state.recipes),
        map(recipes => this.filter(recipes)),
      )
  }

  filter(values) {
    return values.filter(recipe =>
      recipe.name.toLowerCase().includes(this.searchWord))
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.recipeNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  // }



  searchThis() {
    this.searchCriteria.emit(this.searchWord)
  }

  switchSearchMode() {
    this.searchMode = !this.searchMode;
  }
}
