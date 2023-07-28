import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { PageMetadata } from '../models/pageMetadata';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public getPage(id: string): Observable<Page> {
    return this.http.get<Page>(this.baseUrl + '/Page/Read/' + id);
  }

  public indexPage(): Observable<PageMetadata[]> {
    return this.http.get<PageMetadata[]>(this.baseUrl + '/Page/List/');
  }

  public getHomePageId(): Observable<string> {
    return this.http.get<string>(this.baseUrl + '/Page/HomeId/');
  }
}
