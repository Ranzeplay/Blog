import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { ArticleMetadata } from '../models/articleMetadata';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  public getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(this.baseUrl + '/Article/Read/' + id);
  }

  public indexArticles(): Observable<ArticleMetadata[]> {
    return this.http.get<ArticleMetadata[]>(this.baseUrl + '/Article/List/');
  }
}
