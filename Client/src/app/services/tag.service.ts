import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagDetail } from '../models/tagDetail';
import { TagIndex } from '../models/tagIndex';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public indexTags(): Observable<TagIndex[]> {
    return this.http.get<TagIndex[]>(this.baseUrl + '/Tag/List/');
  }

  public getTag(name: string): Observable<TagDetail> {
    return this.http.get<TagDetail>(
      this.baseUrl + '/Tag/Detail/' + name
    );
  }
}
