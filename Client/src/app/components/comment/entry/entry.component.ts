import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-comment-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() comment: Comment | undefined;

  formattedTime(): string {
    return dateFormat(this.comment!.time, 'yyyy-mm-dd h:MM:ss') + ' UTC';
  }
}
