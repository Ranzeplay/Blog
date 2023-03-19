import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ArticleReadComponent implements OnInit {
  articleId: string = '';
  content: Article = Article.newEmpty();
  text: string = '';

  constructor(
    public route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleId = params['id'];

      this.articleService.getArticle(this.articleId).subscribe((val) => {
        this.content = val;
        this.text = val.content;
      });
    });
  }
}
