import { Component, Inject, Input, OnInit } from '@angular/core';
import { marked } from 'marked';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ArticleViewComponent implements OnInit {
  @Input() markdown: string = '';

  routeSubscription: Subscription;
  blogId: string;

  constructor(
    public route: ActivatedRoute,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.blogId = '';
    this.routeSubscription = new Subscription();
  }

  ngOnInit(): void {
    // console.log(this.markdown);
    this.applyRawMarkdown();

    this.routeSubscription = this.route.params.subscribe((params) => {
      this.blogId = params['id'];

      this.updateStyles();
    });
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

    container?.querySelectorAll('h1').forEach((e) => e.className = 'text-6xl font-semibold mt-4');
    container?.querySelectorAll('h2').forEach((e) => e.className = 'text-5xl font-semibold mt-3');
    container?.querySelectorAll('h3').forEach((e) => e.className = 'text-4xl font-semibold mt-3');
    container?.querySelectorAll('h4').forEach((e) => e.className = 'text-3xl font-semibold mt-2');
    container?.querySelectorAll('h5').forEach((e) => e.className = 'text-2xl font-semibold mt-1');
    container?.querySelectorAll('h6').forEach((e) => e.className = 'text-xl font-semibold mt-1');

    container?.querySelectorAll('ul').forEach((e) => e.className = 'mt-1 ml-4 list-disc');
    container?.querySelectorAll('ol').forEach((e) => e.className = 'mt-1 ml-4 list-decimal');

    container?.querySelectorAll('p').forEach((e) => e.className = 'mt-1');

    container?.querySelectorAll('a').forEach((e) => e.className = 'font-medium text-blue-600 hover:underline');

    container?.querySelectorAll('code').forEach((e) => e.className = 'bg-gray-100 text-red');

    container?.querySelectorAll('em').forEach((e) => e.className = 'italic');
    container?.querySelectorAll('strong').forEach((e) => e.className = 'font-semibold');

    container?.querySelectorAll('blockquote').forEach((e) => {
      e.className = 'p-4 my-4 border-l-4 border-gray-300 bg-gray-50';

      // Adjust child paragraph, not recursively
      e.childNodes.forEach(c => {
        if(c.nodeName === 'p') {
          (c as HTMLParagraphElement).className = 'ml-3 border-l-4 border-gray-300 bg-gray-50';
        }
      })
    });

    container?.querySelectorAll('img').forEach((e) => {
      e.className = 'mt-2 rounded-xl drop-shadow-lg border-2';

      // Update URL
      var img = e as HTMLImageElement;
      var imgUrl = new URL(img.src);
      var newUrl = this.baseUrl + '/Article/Asset/' + this.blogId + '/' + imgUrl.pathname.split('/').pop();
      img.src = newUrl;
    });
  }
}
