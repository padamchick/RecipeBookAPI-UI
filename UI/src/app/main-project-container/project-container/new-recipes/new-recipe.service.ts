import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {Category} from './models/category.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewRecipeService {

  private apiUrl = environment.apiUrl;
  categories = [];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<string[]>(`${this.apiUrl}/recipes/categories`).pipe(
      map(res => this.convertToCategories(res))
    )
  }

  private convertToCategories(res: string[]): Category[] {
    return res.map(category => {
      return this.categoryMap[category];
    })
  }

  private categoryMap: { [name: string]: Category } = {
    'all': {
      name: 'All',
      iconName: 'menu_book'
    },
    'main': {
      name: 'Main Dishes',
      iconName: 'fastfood'
    },
    'small': {
      name: 'Small Dishes',
      iconName: 'tapas'
    },
    'soups': {
      name: 'Soups',
      iconName: 'local_cafe'
    },
    'desserts': {
      name: 'Desserts',
      iconName: 'cake'
    },
    'drinks': {
      name: 'Main Dishes',
      iconName: 'local_bar'
    },
    'liqueurs': {
      name: 'Liqueurs',
      iconName: 'wine_bar'
    }
  }
}
