import { Component, Inject, Input, OnInit } from '@angular/core';
import { marked } from 'marked';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ArticleViewComponent implements OnInit {
  @Input() articleId: string = '';

  markdown: string = '';

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // console.log(this.markdown);

    this.articleService.getArticle(this.articleId).subscribe(article => {
      this.markdown = article.content;

      this.applyRawMarkdown();
      this.updateStyles();
    })
  }

  private applyRawMarkdown() {
    var container = document.getElementById('article-content');
    if (container != null) {
      var html = marked.parse(this.markdown);
      container.innerHTML = html;
    }
  }

  private updateStyles() {
    var container = document.getElementById('article-content')!;

    container?.querySelectorAll('h1').forEach((e) => e.className = 'article-h1');
    container?.querySelectorAll('h2').forEach((e) => e.className = 'article-h2');
    container?.querySelectorAll('h3').forEach((e) => e.className = 'article-h3');
    container?.querySelectorAll('h4').forEach((e) => e.className = 'article-h4');
    container?.querySelectorAll('h5').forEach((e) => e.className = 'article-h5');
    container?.querySelectorAll('h6').forEach((e) => e.className = 'article-h6');

    container?.querySelectorAll('ul').forEach((e) => e.className = 'article-ul');
    container?.querySelectorAll('ol').forEach((e) => e.className = 'article-ol');

    container?.querySelectorAll('p').forEach((e) => e.className = 'article-p');

    container?.querySelectorAll('a').forEach((e) => e.className = 'article-a');

    container?.querySelectorAll('code').forEach((e) => e.className = 'article-code');

    container?.querySelectorAll('em').forEach((e) => e.className = 'article-em');
    container?.querySelectorAll('strong').forEach((e) => e.className = 'article-strong');

    container?.querySelectorAll('blockquote').forEach((e) => {
      e.className = 'article-blockquote-outline';

      // Adjust child paragraph, not recursively
      e.childNodes.forEach(c => {
        if(c.nodeName === 'p') {
          (c as HTMLParagraphElement).className = 'article-blockquote-p';
        }
      })
    });

    container?.querySelectorAll('img').forEach((e) => {
      e.className = 'article-img';

      // Update URL
      var img = e as HTMLImageElement;
      var imgUrl = new URL(img.src);
      var newUrl = this.baseUrl + '/Article/Asset/' + this.articleId + '/' + imgUrl.pathname.split('/').pop();
      img.src = newUrl;
    });
  }
}
