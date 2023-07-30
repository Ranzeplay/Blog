import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() category: string | undefined;
  @Input() articleId: string | undefined;

  backgroundUrl: string = '';

  constructor(private router: Router, private articleService: ArticleService){}

  ngOnInit(): void {
    this.backgroundUrl = this.articleService.getHeadImagePath(this.articleId!);
  }

  navigateToArticle() {
    window.scrollTo({ top: 0 });
    this.router.navigate(['/article/read/' + this.articleId]);
  }
}
