import { Component, Input, OnInit } from '@angular/core';
import { marked } from 'marked';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-article-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ArticleViewComponent implements OnInit {
  @Input() markdown: string = '';

  ngOnInit(): void {
    // console.log(this.markdown);
    this.applyRawMarkdown();
    this.updateStyles();
  }

  private applyRawMarkdown() {
    var container = document.getElementById('article-content');
    if(container != null) {
      var html = marked.parse(this.markdown);
      container.innerHTML = html;
    }
  }

  private updateStyles() {
    jQuery('h1','#article-content').toggleClass('text-6xl font-semibold mt-4');
    jQuery('h2','#article-content').toggleClass('text-5xl font-semibold mt-3');
    jQuery('h3','#article-content').toggleClass('text-4xl font-semibold mt-3');
    jQuery('h4','#article-content').toggleClass('text-3xl font-semibold mt-2');
    jQuery('h5','#article-content').toggleClass('text-2xl font-semibold mt-1');
    jQuery('h6','#article-content').toggleClass('text-xl font-semibold mt-1');

    jQuery('ul','#article-content').toggleClass('ml-4 list-disc');
    jQuery('ol','#article-content').toggleClass('ml-4 list-decimal');

    jQuery('p','#article-content').toggleClass('mt-1');

    jQuery('a','#article-content').toggleClass('font-medium text-blue-600 hover:underline');

    jQuery('code','#article-content').toggleClass('bg-gray-100 text-red');

    jQuery('em','#article-content').toggleClass('italic');
    jQuery('strong','#article-content').toggleClass('font-semibold');

    jQuery('blockquote','#article-content').toggleClass('p-2 my-4 border-l-4 border-gray-300 bg-gray-50');
    jQuery('blockquote > p','#article-content').toggleClass('text-md italic font-medium leading-relaxed text-gray-900');
  }
}
