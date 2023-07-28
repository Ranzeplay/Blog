import { Component, OnInit } from '@angular/core';
import { ArticleMetadata } from 'src/app/models/articleMetadata';
import { ArticleService } from 'src/app/services/article.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ArticleListComponent implements OnInit {
  articles: ArticleMetadata[] = [];
  query: string = '';

  shownArticles: ArticleMetadata[] = [];

  constructor(
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.articleService.indexArticles().subscribe((val) => {
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

  formattedTime(time: Date): string {
    return dateFormat(time, 'yyyy-mm-dd h:MM:ss') + ' UTC';
  }
}
