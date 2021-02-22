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
export class RecipeService {

  private apiUrl = environment.apiUrl;
  categories = [];

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/recipes/categories`).pipe(
      map ((res: Category[]) => _.sortBy(res, 'sortIndex'))
    )
  }


}
