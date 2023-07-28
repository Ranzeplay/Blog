import { Component, Input } from '@angular/core';
import dateFormat from 'dateformat';
import { ArticleMetadata } from 'src/app/models/articleMetadata';

@Component({
  selector: 'app-article-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class ArticleCardComponent {
  @Input() metadata: ArticleMetadata = ArticleMetadata.newEmpty();

  formattedTime(): string {
    return dateFormat(this.metadata.time, 'yyyy-mm-dd h:MM:ss') + ' UTC';
  }
}
