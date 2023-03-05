import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ArticleReadComponent implements OnInit, OnDestroy {
  blogId: string;
  routeSubscription: Subscription;
  content!: Article;
  text: string;

  constructor(
    public route: ActivatedRoute,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.blogId = '';
    this.routeSubscription = new Subscription();
    this.text = '';
  }

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.blogId = params['id'];

      this.http.get<Article>(this.baseUrl + '/Article/Read/' + this.blogId).subscribe(val => {
        this.content = val;
        this.text = val.content;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
