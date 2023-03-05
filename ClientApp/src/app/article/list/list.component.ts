import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ArticleMetadata } from 'src/app/models/articleMetadata';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles!: ArticleMetadata[];
  query: string = '';

  shownArticles!: ArticleMetadata[];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  ngOnInit(): void {
    this.http
      .get<ArticleMetadata[]>(this.baseUrl + '/Article/List/')
      .subscribe((val) => {
        this.articles = val;
        this.shownArticles = this.articles;
      });
  }

  public queryArticles(query: string) {
    var lo = query.toLowerCase();
    this.shownArticles = this.articles.filter(
      (article) =>
        article.title.toLowerCase().includes(lo) ||
        article.category.toLowerCase().includes(lo) ||
        article.tags.some((t) => t.toLowerCase().includes(lo))
    );
  }
}
