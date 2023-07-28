import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comment-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @Input() comment: Comment | undefined;
}
