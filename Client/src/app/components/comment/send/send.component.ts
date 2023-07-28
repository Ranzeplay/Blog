import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-comment-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent {
  @Input() articleId: string | undefined;

  emailAddress: string = '';
  nickName: string = '';
  content: string = '';

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) {}

  submit() {
    this.httpClient
      .post(this.baseUrl + '/Comment/Send', {
        emailAddress: this.emailAddress,
        author: this.nickName,
        content: this.content,
        articleId: this.articleId,
      })
      .subscribe(_ => {
        // Clear textboxes after submission
        this.emailAddress = this.nickName = this.content = "";
      });
  }
}
