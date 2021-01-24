import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {Category} from './models/category.model';
import {Observable} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NewRecipeService {

  private apiUrl = environment.apiUrl;
  categories = [];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<string[]>(`${this.apiUrl}/recipes/categories`).pipe(
      map (res => [...res, 'all']),
      map(res => this.convertToCategories(res))
    )
  }

  private convertToCategories(res: string[]): Category[] {
    let categories = res.map(category => {
      return this.categoryMap[category];
    });
    return _.sortBy(categories, 'sortIndex');
  }

  private categoryMap: { [name: string]: Category } = {
    'all': {
      name: 'All',
      iconName: 'menu_book',
      sortIndex: 1
    },
    'main': {
      name: 'Main Dishes',
      iconName: 'fastfood',
      sortIndex: 2
    },
    'small': {
      name: 'Small Dishes',
      iconName: 'tapas',
      sortIndex: 3
    },
    'soups': {
      name: 'Soups',
      iconName: 'local_cafe',
      sortIndex: 4
    },
    'desserts': {
      name: 'Desserts',
      iconName: 'cake',
      sortIndex: 5
    },
    'drinks': {
      name: 'Drinks',
      iconName: 'local_bar',
      sortIndex: 6
    },
    'liqueurs': {
      name: 'Liqueurs',
      iconName: 'wine_bar',
      sortIndex: 7
    }
  }
}
