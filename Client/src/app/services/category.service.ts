import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryDetail } from '../models/categoryDetail';
import { CategoryIndex } from '../models/categoryIndex';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public indexCategories(): Observable<CategoryIndex[]> {
    return this.http.get<CategoryIndex[]>(this.baseUrl + '/Category/List/');
  }

  public getCategory(name: string): Observable<CategoryDetail> {
    return this.http.get<CategoryDetail>(
      this.baseUrl + '/Category/Detail/' + name
    );
  }
}
