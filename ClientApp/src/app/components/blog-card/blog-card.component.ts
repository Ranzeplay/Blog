import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent {
  @Input() title: string | undefined;
  @Input() backgroundUrl: string | undefined;
  @Input() category: string | undefined;
  @Input() articleId: string | undefined;

  constructor(private router: Router){}

  navigateToArticle() {
    window.scrollTo({ top: 0 });
    this.router.navigate(['/article/read/' + this.articleId]);
  }
}
