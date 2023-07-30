import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() articleId: string | undefined;

  emailAddress: string = '';
  nickName: string = '';
  content: string = '';

  comments: Comment[] = [];

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    // Try get saved data
    this.emailAddress = localStorage.getItem('emailAddress') ?? '';
    this.nickName = localStorage.getItem('nickName') ?? '';

    this.fetchComments();
  }

  submit() {
    this.httpClient
      .post(this.baseUrl + '/Comment/Send', {
        emailAddress: this.emailAddress,
        author: this.nickName,
        content: this.content,
        articleId: this.articleId,
      })
      .subscribe(_ => {
        // Save user preferences
        localStorage.setItem('emailAddress', this.emailAddress);
        localStorage.setItem('nickName', this.nickName);

        // Clear text inputs after submission
        this.emailAddress = this.nickName = this.content = "";

        this.fetchComments();
      });
  }

  fetchComments() {
    this.articleService.getComments(this.articleId!).subscribe((val) => {
      this.comments = val;
    });
  }
}
